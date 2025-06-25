import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Animated components
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





const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 px-0 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        onClick={onToggle}
      >
        <span className="text-gray-900 font-medium pr-4">{question}</span>
        <div className="transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '200px' : '0px',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-4 text-gray-600 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We offer expert consultation services in three main categories: IT Consulting (cloud migration, software development, cybersecurity), Business Strategy (growth planning, operations optimization, market analysis), and Finance (investment planning, financial analysis, risk management). Our consultants are industry experts with proven track records."
  },
  {
    id: 2,
    question: "How can I request a consultation?",
    answer: "Requesting a consultation is simple! First, browse our expert consultants using our search and filter tools. Once you find the right match, click 'Book Now' on their profile. You'll be able to select your preferred time slot and provide details about your specific needs. Payment is processed securely, and you'll receive a confirmation with meeting details."
  },
  {
    id: 3,
    question: "What are your consulting fees?",
    answer: "Our fees vary based on the consultant's expertise level and session duration. We offer three pricing tiers: Budget ($50-80/hour), Standard ($80-120/hour), and Premium ($120-200/hour). Most sessions are 60 minutes, but you can book extended sessions if needed. All pricing is transparent and shown upfront before booking."
  },
  {
    id: 4,
    question: "Can you provide examples of past work?",
    answer: "Absolutely! Our consultants have helped numerous clients achieve their goals. Recent successes include helping a startup scale from 10 to 100 employees, migrating enterprise systems to cloud infrastructure saving 40% in costs, and developing investment strategies that outperformed market averages by 15%. Client testimonials and case studies are available on each consultant's profile."
  },
  {
    id: 5,
    question: "How do you tailor your advice to each client?",
    answer: "Each consultation begins with understanding your unique situation, goals, and constraints. Our consultants use proven frameworks while adapting their approach to your industry, company size, and specific challenges. We provide actionable recommendations with clear implementation steps, and follow-up support is available to ensure successful execution of our advice."
  }
];

export default function HowItWorksAndFAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* FAQ Section */}
        <div>
          <AnimatedStep delay={1200}>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Frequently Asked</h2>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Questions</h2>
            <div className="w-24 h-1 bg-teal-600 mb-12"></div>
          </AnimatedStep>
          
          <AnimatedStep delay={1400}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {faqData.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => toggleFAQ(faq.id)}
                />
              ))}
            </div>
          </AnimatedStep>
        </div>
      </div>
    </div>
  );
}