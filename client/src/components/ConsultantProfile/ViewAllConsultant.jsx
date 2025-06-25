import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Star, User } from 'lucide-react';

// Framer Motion-like animation hook (simplified)
const useAnimation = (isVisible) => {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    transition: 'all 0.3s ease-in-out'
  };
};

const consultantData = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "IT Consulting",
    rating: 4.8,
    description: "Expert in cloud migration and digital transformation with 10+ years experience.",
    availability: "Available",
    price: "Premium",
    image: null
  },
  {
    id: 2,
    name: "Michael Chen",
    category: "Business Strategy",
    rating: 4.6,
    description: "Strategic planning specialist helping startups scale and optimize operations.",
    availability: "Busy",
    price: "Standard",
    image: null
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    category: "Marketing",
    rating: 4.9,
    description: "Digital marketing guru with expertise in SEO, content strategy, and analytics.",
    availability: "Available",
    price: "Budget",
    image: null
  },
  {
    id: 4,
    name: "David Thompson",
    category: "IT Consulting",
    rating: 4.5,
    description: "Full-stack developer and system architect specializing in enterprise solutions.",
    availability: "Available",
    price: "Premium",
    image: null
  },
  {
    id: 5,
    name: "Lisa Wang",
    category: "Finance",
    rating: 4.7,
    description: "Financial advisor and investment strategist with corporate finance background.",
    availability: "Busy",
    price: "Standard",
    image: null
  }
];

const categories = ["All Categories", "IT Consulting", "Business Strategy", "Marketing", "Finance"];
const availabilities = ["All Availability", "Available", "Busy"];
const priceRanges = ["All Prices", "Budget", "Standard", "Premium"];

const ConsultantCard = ({ consultant, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const animationStyle = useAnimation(true);
  
  const hoverStyle = {
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
    boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  };

  return (
    <div 
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ ...animationStyle, ...hoverStyle, animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{consultant.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{consultant.category}</p>
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(consultant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{consultant.rating}</span>
          </div>
          <p className="text-sm text-gray-700 mb-4">{consultant.description}</p>
          <button className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">{value}</span>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ConsultantSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');

  const filteredConsultants = useMemo(() => {
    return consultantData.filter(consultant => {
      const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           consultant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || consultant.category === selectedCategory;
      const matchesAvailability = selectedAvailability === 'All Availability' || consultant.availability === selectedAvailability;
      const matchesPrice = selectedPrice === 'All Prices' || consultant.price === selectedPrice;

      return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedAvailability, selectedPrice]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search consultants..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              
              <div className="space-y-6">
                <FilterDropdown
                  label="Category"
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
                
                <FilterDropdown
                  label="Availability"
                  options={availabilities}
                  value={selectedAvailability}
                  onChange={setSelectedAvailability}
                />
                
                <FilterDropdown
                  label="Price"
                  options={priceRanges}
                  value={selectedPrice}
                  onChange={setSelectedPrice}
                />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredConsultants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No consultants found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredConsultants.map((consultant, index) => (
                  <ConsultantCard key={consultant.id} consultant={consultant} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}