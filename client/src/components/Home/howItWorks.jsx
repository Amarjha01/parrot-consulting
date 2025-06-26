import React, { useState } from 'react'
import { Search, Users, Calendar, Monitor , MoveRight} from 'lucide-react';

const AnimatedStep = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(30px)'
      }}
    >
      {children}
    </div>
  );
};

  const StepCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedStep delay={delay}>
      <div 
        className="flex flex-col items-center text-center p-6 transition-all duration-300"
        style={{
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-teal-700">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
       
      </div>

    </AnimatedStep>
  );
};
const howItWorks = () => {

  return (
    <div className="my-20">
          <AnimatedStep>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">HOW IT WORKS</h2>
          </AnimatedStep>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center">
            {/* Step 1 */}
          <div className=' relative'>
              <StepCard
              icon={Search}
              title="Find a Consultant"
              description="Browse through our verified experts in IT, Business, and Finance"
              delay={200}
            />
             <MoveRight className=' absolute left-[45%] rotate-90 md:top-[50%] md:left-[100%] md:rotate-0 ' />
          </div>
           
            
            {/* Step 2 */}
            <div className=' relative'>
              <StepCard
              icon={Users}
              title="Choose Your Expert"
              description="Select the consultant that best matches your specific needs"
              delay={400}
            />
              <MoveRight className=' absolute left-[50%] rotate-90 md:top-[50%] md:left-[100%] md:rotate-0 ' />
            </div>
          
            
            {/* Step 4 */}
            <div className=" relative">
              <StepCard
                icon={Monitor}
                title="Join the Consultation"
                description="Connect via video call for your personalized consultation session"
                delay={800}
              />
                <MoveRight className=' absolute left-[50%] rotate-90 md:top-[50%] md:left-[100%] md:rotate-0 ' />
            </div>
            
            
            {/* Step 3 */}
            <div className="relative">
              <StepCard
                icon={Calendar}
                title="Schedule a Time"
                description="Book your preferred time slot that works for both you and the expert"
                delay={600}
              />
            </div>
          </div>
        </div>
  )
}

export default howItWorks