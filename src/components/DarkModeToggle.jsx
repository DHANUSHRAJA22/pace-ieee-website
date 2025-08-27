import React, { useState, useEffect } from 'react';

/**
 * DarkModeToggle Component
 * 
 * A comprehensive dark mode toggle switch with:
 * - Persistent theme preference using localStorage
 * - System preference detection
 * - Smooth transitions and animations
 * - Accessibility features (WCAG 2.1 AA compliant)
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Touch-friendly mobile design
 * 
 * @component
 */
const DarkModeToggle = ({ className = '', size = 'md' }) => {
  // State for current theme
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Size variants
  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8'
  };

  const thumbSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Initialize theme on component mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const savedTheme = localStorage.getItem('pace-ieee-theme');
        
        if (savedTheme) {
          const isDarkSaved = savedTheme === 'dark';
          setIsDark(isDarkSaved);
          applyTheme(isDarkSaved);
        } else {
          // Fall back to system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDark(prefersDark);
          applyTheme(prefersDark);
        }
      } catch (error) {
        // Fallback to light mode if localStorage is unavailable
        console.warn('Theme initialization failed, defaulting to light mode:', error);
        setIsDark(false);
        applyTheme(false);
      }
      
      setIsLoading(false);
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only update if no user preference is saved
      const savedTheme = localStorage.getItem('pace-ieee-theme');
      if (!savedTheme) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  /**
   * Apply theme to document and save preference
   * @param {boolean} dark - Whether to apply dark theme
   */
  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save preference to localStorage
    try {
      localStorage.setItem('pace-ieee-theme', dark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference:', error);
    }
  };

  /**
   * Toggle theme and announce to screen readers
   */
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);

    // Announce theme change to screen readers
    const announcement = `Theme switched to ${newTheme ? 'dark' : 'light'} mode`;
    announceToScreenReader(announcement);
  };

  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   */
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleTheme();
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className={`
          inline-flex items-center justify-center
          ${sizeClasses[size]} 
          bg-gray-200 dark:bg-gray-700 
          rounded-full animate-pulse
          ${className}
        `}
        aria-label="Loading theme toggle"
      >
        <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Toggle Switch */}
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center
          ${sizeClasses[size]}
          bg-gradient-to-r
          ${isDark 
            ? 'from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/25' 
            : 'from-gray-200 to-gray-300 shadow-md shadow-gray-300/50'
          }
          rounded-full p-1
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
          focus:ring-opacity-50
          hover:shadow-lg
          ${isDark ? 'hover:shadow-blue-500/30' : 'hover:shadow-gray-400/40'}
          transform hover:scale-105 active:scale-95
          touch-manipulation
          select-none
        `}
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        aria-describedby="theme-description"
      >
        {/* Track */}
        <span className="sr-only">
          {isDark ? 'Dark mode enabled' : 'Light mode enabled'}
        </span>
        
        {/* Thumb */}
        <span
          className={`
            ${thumbSizes[size]}
            bg-white dark:bg-gray-100
            rounded-full shadow-lg
            transform transition-all duration-300 ease-in-out
            flex items-center justify-center
            ${isDark ? 'translate-x-5' : 'translate-x-0'}
          `}
        >
          {/* Icons */}
          {isDark ? (
            // Moon icon
            <svg 
              className="w-3 h-3 text-gray-700" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
                clipRule="evenodd" 
              />
            </svg>
          ) : (
            // Sun icon
            <svg 
              className="w-3 h-3 text-yellow-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </span>
      </button>

      {/* Hidden description for screen readers */}
      <span id="theme-description" className="sr-only">
        Toggle between light and dark theme. Current theme: {isDark ? 'dark' : 'light'} mode.
      </span>
    </div>
  );
};

export default DarkModeToggle;

/*
 * Usage Examples:
 * 
 * Basic usage:
 * <DarkModeToggle />
 * 
 * With custom size:
 * <DarkModeToggle size="lg" />
 * 
 * With custom styling:
 * <DarkModeToggle className="ml-4" size="sm" />
 * 
 * Integration in Navigation:
 * <nav className="flex items-center justify-between p-4">
 *   <div>Logo</div>
 *   <DarkModeToggle size="md" className="ml-auto" />
 * </nav>
 */

/*
 * Required Tailwind CSS Configuration:
 * 
 * In your tailwind.config.js:
 * 
 * module.exports = {
 *   darkMode: 'class', // Enable class-based dark mode
 *   content: [
 *     './src/**/*.{js,jsx,ts,tsx}',
 *   ],
 *   theme: {
 *     extend: {
 *       // Add custom colors if needed
 *     },
 *   },
 * }
 * 
 * Utility classes for screen reader only content:
 * Add these to your global CSS:
 * 
 * .sr-only {
 *   position: absolute;
 *   width: 1px;
 *   height: 1px;
 *   padding: 0;
 *   margin: -1px;
 *   overflow: hidden;
 *   clip: rect(0, 0, 0, 0);
 *   white-space: nowrap;
 *   border: 0;
 * }
 */
