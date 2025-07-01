// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });
// import app from "./app.js";
// import connectDB from "./db/index.js";

// connectDB()
//   .then(() => {
//     app.on("error", (err) => {
//       console.log("Server error: ", err);
//       throw err;
//     });
//     app.listen(process.env.PORT || 8010, () => {
//       console.log(`Server running on ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MONGODB connection failed", err);
//   });

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";
import connectDB from "./db/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Wrap express app in HTTP server
const server = createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join Room Logic
  // socket.on("join-room", (roomId) => {
  //   socket.join(roomId);

  //   const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
  //   console.log(`User ${socket.id} joined room ${roomId}. Total: ${clients.length}`);

  //   if (clients.length === 2) {
  //     // Notify both participants that room is ready
  //     io.to(roomId).emit("ready");
  //   }
  // });

  // socket.on("join-room", (roomId, callback) => {
  //   socket.join(roomId);
  //   const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
  //   console.log(`User ${socket.id} joined room ${roomId}. Total: ${clients.length}`);

  //   if (typeof callback === "function") {
  //     callback(clients.length);
  //   }

  //   if (clients.length === 2) {
  //     io.to(roomId).emit("ready");
  //   }
  // });

  socket.on("join-room", (roomId, callback) => {
    socket.join(roomId);
  
    // ✅ Wait a bit to ensure socket is actually in the room
    setTimeout(() => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      const clientCount = clients.length;
  
      console.log(`User ${socket.id} joined room ${roomId}. Total clients: ${clientCount}`);
  
      if (typeof callback === "function") {
        callback({ clientCount }); // always send as object
      }
  
      if (clientCount === 2) {
        io.to(roomId).emit("ready"); // trigger WebRTC
      }
    }, 50);
  });
  
  

  // Handle client asking who is in the room
  socket.on("get-room-users", (roomId, callback) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    callback(clients); // Will be received by the frontend
  });

  // WebRTC signaling events
  // socket.on("offer", (data) => {
  //   socket.to(data.roomId).emit("offer", data.sdp);
  // });

  // socket.on("answer", (data) => {
  //   socket.to(data.roomId).emit("answer", data.sdp);
  // });

  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", { sdp: data.sdp }); // ✅ wrapped inside { sdp }
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", { sdp: data.sdp }); // ✅ wrapped inside { sdp }
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", { candidate: data.candidate });
  });

  // Clean up on disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Server (index.js)
// socket.on("join-room", (roomId) => {
//   socket.join(roomId);
//   const clients = io.sockets.adapter.rooms.get(roomId);
//   const numClients = clients ? clients.size : 0;

//   console.log(`User ${socket.id} joined room ${roomId}. Total: ${numClients}`);

//   if (numClients === 2) {
//     // Second user triggers offer from first
//     socket.to(roomId).emit("ready");
//   }
// });

//   socket.on("offer", (data) => {
//     socket.to(data.roomId).emit("offer", data.sdp);
//   });

//   socket.on("answer", (data) => {
//     socket.to(data.roomId).emit("answer", data.sdp);
//   });

//   // socket.on("ice-candidate", (data) => {
//   //   socket.to(data.roomId).emit("ice-candidate", data.candidate);
//   // });

//   socket.on("ice-candidate", (data) => {
//     // Ensure we send an object with key `candidate`
//     socket.to(data.roomId).emit("ice-candidate", { candidate: data.candidate });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// Connect DB and start server
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8010, () => {
      console.log(`Server running on ${process.env.PORT || 8010}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed", err);
  });
