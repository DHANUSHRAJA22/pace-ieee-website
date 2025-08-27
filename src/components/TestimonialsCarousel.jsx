import React, { useState, useEffect } from 'react';

// Sample testimonials data - in a real app, this would come from an API or database
const testimonialsData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    image: '/images/testimonials/rajesh.jpg',
    quote: 'IEEE PACE Student Branch transformed my understanding of technology and leadership. The hands-on workshops and networking opportunities were invaluable for my career growth.',
    rating: 5,
    year: '2023'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    image: '/images/testimonials/priya.jpg',
    quote: 'The technical seminars and research projects I participated in through IEEE helped me develop critical thinking skills that I use every day in my current role.',
    rating: 5,
    year: '2022'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Product Manager',
    company: 'StartUp Ventures',
    image: '/images/testimonials/amit.jpg',
    quote: 'Being part of IEEE PACE was a game-changer. The leadership opportunities and collaborative projects prepared me for managing diverse teams in the tech industry.',
    rating: 5,
    year: '2023'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Machine Learning Engineer',
    company: 'AI Solutions Ltd.',
    image: '/images/testimonials/sneha.jpg',
    quote: 'The research competitions and peer collaboration at IEEE PACE pushed me to excel academically and professionally. Highly recommend to all engineering students!',
    rating: 5,
    year: '2024'
  },
  {
    id: 5,
    name: 'Karthik Krishnan',
    role: 'Systems Architect',
    company: 'Cloud Systems Corp.',
    image: '/images/testimonials/karthik.jpg',
    quote: 'The mentorship and technical guidance I received through IEEE activities were instrumental in shaping my career path in cloud computing and distributed systems.',
    rating: 5,
    year: '2023'
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotation functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToTestimonial = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for mobile swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
    
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What Our Alumni Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our successful alumni about their transformative experiences with IEEE PACE Student Branch.
          </p>
        </div>

        {/* Main Carousel */}
        <div 
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pause/Play Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            aria-label={isAutoPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isAutoPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {/* Testimonial Content */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Quote and Content */}
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="text-blue-600">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {renderStars(currentTestimonial.rating)}
                  <span className="ml-2 text-sm text-gray-500">({currentTestimonial.rating}/5)</span>
                </div>

                {/* Attribution */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-gray-600">
                    {currentTestimonial.company} • Class of {currentTestimonial.year}
                  </p>
                </div>
              </div>

              {/* Right: Photo */}
              <div className="relative">
                <div className="relative w-64 h-64 mx-auto">
                  {/* Photo Container with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full p-1">
                    <div className="w-full h-full bg-white rounded-full p-2">
                      <img
                        src={currentTestimonial.image}
                        alt={`${currentTestimonial.name} - ${currentTestimonial.role}`}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&size=256&background=3B82F6&color=ffffff&font-size=0.5`;
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Floating IEEE Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-blue-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span
