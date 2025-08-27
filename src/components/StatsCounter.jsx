import React, { useState, useEffect, useRef } from 'react';

const StatsCounter = ({ number, label, speed = 50, suffix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Intersection Observer for scroll-based animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Animation logic
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const duration = Math.max(1000, number * 10); // Minimum 1 second
    const steps = Math.max(50, Math.min(100, number)); // Between 50-100 steps
    const increment = number / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, number, hasAnimated]);

  // Format number with commas for large numbers
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div
      ref={counterRef}
      className={`stats-counter text-center ${className}`}
      role="img"
      aria-label={`${formatNumber(number)}${suffix} ${label}`}
    >
      {/* Counter Number */}
      <div
        className={`text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-8'
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {formatNumber(count)}
        </span>
        {suffix && (
          <span className="text-blue-500 ml-1">{suffix}</span>
        )}
      </div>

      {/* Counter Label */}
      <div
        className={`text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mt-2 transition-all duration-1000 delay-300 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-4'
        }`}
      >
        {label}
      </div>

      {/* Decorative underline */}
      <div
        className={`mx-auto mt-3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 delay-500 ${
          isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

// Multi-counter component for homepage stats
const StatsCounterSection = ({
  stats = [
    { number: 500, label: 'Members', suffix: '+' },
    { number: 50, label: 'Events', suffix: '+' },
    { number: 5, label: 'Years', suffix: '' },
    { number: 25, label: 'Workshops', suffix: '+' }
  ],
  className = ''
}) => {
  return (
    <section
      className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}
      aria-labelledby="stats-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="stats-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how PACE IEEE Student Branch has been making a difference in the tech community
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          role="group"
          aria-label="Organization statistics"
        >
          {stats.map((stat, index) => (
            <StatsCounter
              key={`${stat.label}-${index}`}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              className="hover:scale-105 transition-transform duration-300 cursor-default p-6 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Export both components
export default StatsCounter;
export { StatsCounterSection };
