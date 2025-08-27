import React, { useState } from 'react';

/**
 * NewsletterSignup Component
 * 
 * A responsive React email capture component with validation, Tailwind styling,
 * accessibility features, and extensibility for backend integration.
 * 
 * Features:
 * - Email validation with real-time feedback
 * - Responsive design for all devices
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Loading states during form submission
 * - Customizable styling and messaging
 * - Backend integration ready
 */
const NewsletterSignup = ({
  onSubmit,
  apiEndpoint,
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  successMessage = "Thank you for subscribing!",
  className = "",
  disabled = false
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid
   */
  const validateEmail = (email) => {
    return emailRegex.test(email.trim());
  };

  /**
   * Handles email input changes with real-time validation
   * @param {Event} e - Input change event
   */
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    setIsSuccess(false);
    
    // Real-time validation
    if (value.trim() === '') {
      setIsValid(true); // Don't show error for empty field
    } else {
      setIsValid(validateEmail(value));
    }
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    
    // Validate email before submission
    if (!trimmedEmail) {
      setError('Email address is required');
      setIsValid(false);
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Custom onSubmit handler if provided
      if (onSubmit) {
        await onSubmit(trimmedEmail);
      } else if (apiEndpoint) {
        // Default API call
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: trimmedEmail })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        // Simulate API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setIsSuccess(true);
      setEmail('');
      setIsValid(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles keyboard navigation
   * @param {Event} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={`newsletter-signup ${className}`}>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        noValidate
      >
        {/* Email Input */}
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className={`
              w-full px-4 py-3 text-sm border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200 ease-in-out
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${
                !isValid && email.trim() !== ''
                  ? 'border-red-500 focus:ring-red-500 bg-red-50'
                  : 'hover:border-gray-400'
              }
              ${
                isSuccess
                  ? 'border-green-500 bg-green-50'
                  : ''
              }
            `}
            aria-invalid={!isValid && email.trim() !== ''}
            aria-describedby="email-error email-success"
            required
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled || isLoading || (!isValid && email.trim() !== '')}
          className={`
            px-6 py-3 text-sm font-medium text-white rounded-lg
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:cursor-not-allowed min-w-[120px] h-12
            ${
              disabled || isLoading || (!isValid && email.trim() !== '')
                ? 'bg-gray-400 focus:ring-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800'
            }
          `}
          aria-label={isLoading ? 'Subscribing...' : buttonText}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Subscribing...</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </form>
      
      {/* Error Message */}
      {error && (
        <div 
          id="email-error"
          className="mt-3 text-sm text-red-600 text-center"
          role="alert"
          aria-live="polite"
        >
          <svg 
            className="inline w-4 h-4 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          {error}
        </div>
      )}
      
      {/* Success Message */}
      {isSuccess && (
        <div 
          id="email-success"
          className="mt-3 text-sm text-green-600 text-center"
          role="alert"
          aria-live="polite"
        >
          <svg 
            className="inline w-4 h-4 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          {successMessage}
        </div>
      )}
      
      {/* Validation hint for screen readers */}
      {!isValid && email.trim() !== '' && (
        <div className="sr-only" aria-live="polite">
          Please enter a valid email address
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;
