import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getBookingById } from "../service/bookingApi";


//local host
// const socket = io(
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8010",
//   {
//     withCredentials: true,
//   }
// );

//production
const socket = io(
  import.meta.env.VITE_SOCKET_URL || "http://localhost:8010/api/v1",
  {
    withCredentials: true,

// const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8010", {
//   withCredentials: true,
// });
const socket = io(import.meta.env.VITE_SOCKET_URL || "https://api.parrotconsult.com/api/v1", {
  withCredentials: true,
});



let hasPlayedRemote = false;
const cleanupWebRTC = ({ peerConnection, localStream, localVideo, remoteVideo }) => {
  console.log("🧹 Cleaning up WebRTC");

  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }

  if (localStream.current) {
    localStream.current.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  }

  if (remoteVideo.current) {
    remoteVideo.current.srcObject = null;
  }

  if (localVideo.current) {
    localVideo.current.srcObject = null;

  }

  hasPlayedRemote = false;
};


export default function MeetingRoom() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [connectionState, setConnectionState] = useState("new");
  const [remoteStreamReceived, setRemoteStreamReceived] = useState(false);

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const booking = await getBookingById(bookingId);
        const rawUser =
          localStorage.getItem("user") || localStorage.getItem("consultant");
        if (!rawUser) throw new Error("User not logged in");

        const parsed = JSON.parse(rawUser);
        const currentUser = parsed.data || parsed;

        const consultantId =
          typeof booking.consultant === "object"
            ? booking.consultant._id
            : booking.consultant;
        const userId =
          typeof booking.user === "object" ? booking.user._id : booking.user;

        const isConsultant = currentUser._id === consultantId;
        const isUser = currentUser._id === userId;

        if (!isConsultant && !isUser) {
          alert("Unauthorized");
          return navigate("/");
        }

        setAccessAllowed(true);
        await setupWebRTC(bookingId);
      } catch (err) {
        console.error("Initialization failed:", err);
        alert("Failed to join meeting.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    init();

    // Cleanup on unmount
    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.off();
    };
  }, [bookingId]);




  const setupWebRTC = async (roomId) => {
    let isOfferer = false;
   

    try {
      console.log("🎬 Setting up WebRTC for room:", roomId);
      
      // Get user media
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      //   audio: true,
      // });
      const requestMediaStream = () =>
        new Promise((resolve, reject) => {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
              localStream.current = stream;
              if (localVideo.current) localVideo.current.srcObject = stream;
              console.log("✅ Media stream acquired");
              resolve(stream); // ✅ return stream
            })
            .catch((err) => {
              console.warn("❌ First attempt failed, retrying in 500ms...", err);
              setTimeout(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                  .then((stream) => {
                    localStream.current = stream;
                    if (localVideo.current) localVideo.current.srcObject = stream;
                    console.log("✅ Media stream acquired on retry");
                    resolve(stream); // ✅ return stream
                  })
                  .catch((finalErr) => {
                    console.error("🚫 Final camera/mic error:", finalErr);
                    alert("Could not access camera or mic. Please check permissions.");
                    reject(finalErr);
                  });
              }, 500);
            });
        });
      

      const stream = await requestMediaStream();

      localStream.current = stream;

      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }

      // Create peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" }
        ],
      });

      // Add local stream tracks
      stream.getTracks().forEach((track) => {
        console.log("➕ Adding track:", track.kind);
        peerConnection.current.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        console.log("🎥 Remote stream received:", event);
        console.log("Remote streams count:", event.streams.length);
        
        // if (event.streams && event.streams[0]) {
        //   setRemoteStreamReceived(true);
        //   if (remoteVideo.current) {
        //     remoteVideo.current.srcObject = event.streams[0];
        //     console.log("✅ Remote video element updated");
        //   }
        // }

        if (event.streams && event.streams[0]) {
          setRemoteStreamReceived(true);
        
          const remoteStream = event.streams[0];
          if (
            remoteVideo.current &&
            (!remoteVideo.current.srcObject || remoteVideo.current.srcObject !== remoteStream)
          ) {
            remoteVideo.current.srcObject = remoteStream;
            console.log("✅ Remote video stream assigned");
        
            setTimeout(() => {
              remoteVideo.current
                .play()
                .then(() => {
                  console.log("📺 Remote video is playing");
                  hasPlayedRemote = true;
                })
                .catch((err) => {
                  console.error("❌ Remote video play() failed:", err);
                });
            }, 50);
          }
        }
        
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("🧊 Sending ICE candidate");
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        } else {
          console.log("🧊 All ICE candidates sent");
        }
      };

      // Handle connection state changes
      peerConnection.current.onconnectionstatechange = () => {
        const state = peerConnection.current.connectionState;
        console.log("🔗 Connection state changed:", state);
        setConnectionState(state);
      };

      peerConnection.current.onicegatheringstatechange = () => {
        console.log("🧊 ICE gathering state:", peerConnection.current.iceGatheringState);
      };

      peerConnection.current.oniceconnectionstatechange = () => {
        console.log("🧊 ICE connection state:", peerConnection.current.iceConnectionState);
      };

      // Clear previous listeners to avoid duplicates
      socket.off("ready");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-disconnected");

      // Join room
      socket.emit("join-room", roomId, (response) => {
        console.log("🏠 Join room response:", response);
        if (typeof response === 'number') {
          // Old callback style
          const clientCount = response;
          console.log("Joined room. Total clients:", clientCount);
          if (clientCount === 1) {
            isOfferer = true;
            console.log("👤 I am the offerer");
          }
        } else if (response && response.clientCount) {
          // New callback style
          console.log("Joined room. Total clients:", response.clientCount);
          if (response.clientCount === 1) {
            isOfferer = true;
            console.log("👤 I am the offerer");
          }
        }
      });

      // Handle ready signal (when second user joins)
      socket.on("ready", async () => {
        console.log("🚀 Ready signal received, isOfferer:", isOfferer);
        if (isOfferer) {
          try {
            console.log("📤 Creating offer...");
            const offer = await peerConnection.current.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            await peerConnection.current.setLocalDescription(offer);
            console.log("📤 Sending offer:", offer);
            socket.emit("offer", { sdp: offer, roomId });
          } catch (err) {
            console.error("❌ Error creating offer:", err);
          }
        }
      });

      // Handle incoming offer
      socket.on("offer", async (data) => {
        console.log("📥 Offer received:", data);
        try {
          // Check if data is the SDP object directly or wrapped
          const sdpData = data.sdp || data;
          console.log("📥 SDP data:", sdpData);
          
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdpData));
          
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          
          console.log("📤 Sending answer:", answer);
          socket.emit("answer", { sdp: answer, roomId });
        } catch (err) {
          console.error("❌ Error handling offer:", err);
        }
      });

      // Handle incoming answer
      socket.on("answer", async (data) => {
        console.log("📥 Answer received:", data);
        try {
          // Check if data is the SDP object directly or wrapped
          const sdpData = data.sdp || data;
          console.log("📥 SDP data:", sdpData);
          
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdpData));
          console.log("✅ Remote description set successfully");
        } catch (err) {
          console.error("❌ Error handling answer:", err);
        }
      });

      // Handle ICE candidates
      socket.on("ice-candidate", async (data) => {
        console.log("🧊 ICE candidate received:", data);
        try {
          const { candidate } = data;
          if (candidate && peerConnection.current.remoteDescription) {
            await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            console.log("✅ ICE candidate added successfully");
          } else {
            console.log("⏳ Queueing ICE candidate (no remote description yet)");
          }
        } catch (err) {
          console.error("❌ Failed to add ICE candidate:", err);
        }
      });

      // Handle user disconnection
      // socket.on("user-disconnected", () => {
      //   console.log("👋 User disconnected");
      //   setRemoteStreamReceived(false);
      //   if (remoteVideo.current) {
      //     remoteVideo.current.srcObject = null;
      //   }
      // });
      socket.on("user-disconnected", () => {
        console.log("👋 Remote user disconnected");
        setRemoteStreamReceived(false);
        cleanupWebRTC({ peerConnection, localStream, localVideo, remoteVideo });
      });
      
      

    } catch (err) {
      console.error("🚫 setupWebRTC error:", err);
      alert("Could not access camera/mic or establish connection.");
    }
  };

  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  // const endCall = () => {
  //   if (localStream.current) {
  //     localStream.current.getTracks().forEach(track => track.stop());
  //   }
  //   if (peerConnection.current) {
  //     peerConnection.current.close();
  //   }
  //   socket.disconnect();
  //   navigate("/");
  // };

  const endCall = () => {
    cleanupWebRTC({ peerConnection, localStream, localVideo, remoteVideo });
    socket.emit("leave-room", bookingId);
    socket.disconnect();
    navigate("/");
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!accessAllowed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionState === 'connected' ? 'bg-green-500' : 
              connectionState === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
              'bg-red-500 animate-pulse'
            }`}></div>
            <h1 className="text-xl font-semibold text-white">Meeting Room</h1>
            <span className="text-xs text-gray-400 capitalize">({connectionState})</span>
          </div>
          <div className="text-sm text-gray-300">
            Room ID: {bookingId?.slice(-8)}
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Remote Video - Main */}
            <div className="relative group order-2 lg:order-1">
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video
                  ref={remoteVideo}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!remoteStreamReceived && (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 text-sm">Waiting for remote user...</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">Remote</span>
                    </div>
                  </div>
                </div>
                {/* Connection Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${
                      remoteStreamReceived ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-white text-xs">
                      {remoteStreamReceived ? 'Connected' : 'Waiting...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Video - Picture in Picture */}
            <div className="relative group order-1 lg:order-2">
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video
                  ref={localVideo}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">You</span>
                    </div>
                  </div>
                </div>
                {/* Video Off Overlay */}
                {isVideoOff && (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 text-sm">Camera Off</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex justify-center">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isMuted 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                  }`}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMuted ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    )}
                  </svg>
                </button>

                {/* Video Toggle */}
                <button
                  onClick={toggleVideo}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isVideoOff 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                  }`}
                  title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isVideoOff ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12l-1.41-1.41L16 13.17V6a2 2 0 00-2-2H4.83l1.58-1.58L5 1l-4 4v1h1v10a2 2 0 002 2h10a2 2 0 002-2v-7.17l2.59 2.58L20 12z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                </button>

                {/* End Call */}
                <button
                  onClick={endCall}
                  className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105"
                  title="End call"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 16.5v2.25A2.25 2.25 0 005.25 21h2.25M3 16.5V14.25A2.25 2.25 0 015.25 12H8.5m7 8.25h2.25A2.25 2.25 0 0020.25 18.75V16.5M17.5 12h2.25A2.25 2.25 0 0122.5 14.25V16.5" />
                  </svg>
                </button>

                {/* Screen Share (Placeholder) */}
                <button
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                  title="Share screen"
                  disabled
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>

                {/* Settings (Placeholder) */}
                <button
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                  title="Settings"
                  disabled
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}