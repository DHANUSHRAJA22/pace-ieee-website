import React, { useState, useEffect } from 'react';
import { getPastEvents, getUniqueYears, getUniqueTypes } from '../utils/events';

const PastEventsGallery = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const events = getPastEvents();
    setPastEvents(events);
    setFilteredEvents(events);
  }, []);

  useEffect(() => {
    let filtered = pastEvents;
    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(event => event.year === parseInt(selectedYear));
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'attendance':
          return (b.attendanceCount || 0) - (a.attendanceCount || 0);
        default:
          return 0;
      }
    });
    
    setFilteredEvents(filtered);
  }, [selectedYear, selectedType, searchQuery, pastEvents, sortBy]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setIsImageGalleryOpen(false);
    setCurrentImageIndex(0);
  };

  const openImageGallery = (index) => {
    setCurrentImageIndex(index);
    setIsImageGalleryOpen(true);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  const clearAllFilters = () => {
    setSelectedYear('all');
    setSelectedType('all');
    setSearchQuery('');
    setSortBy('date-desc');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeBadgeClass = (type) => {
    const baseClasses = 'inline-block px-3 py-1 text-xs font-semibold rounded-full';
    switch (type) {
      case 'workshop':
        return `${baseClasses} bg-purple-100 text-purple-800 border border-purple-200`;
      case 'seminar':
        return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`;
      case 'competition':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      case 'conference':
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
      case 'networking':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  const uniqueYears = getUniqueYears();
  const uniqueTypes = getUniqueTypes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Past Events Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our rich history of successful IEEE Student Branch events and memorable moments.
          </p>
        </div>

        {/* Enhanced Filter & Search Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Events
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                <option value="all">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="attendance">Most Attended</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Showing {filteredEvents.length} of {pastEvents.length} events
              </div>
              {(selectedYear !== 'all' || selectedType !== 'all' || searchQuery.trim()) && (
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {filteredEvents.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Event Image */}
                <div className={`relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 ${
                  viewMode === 'list' ? 'md:w-80 h-64 md:h-auto flex-shrink-0' : 'h-56'
                }`}>
                  {event.images && event.images.length > 0 ? (
                    <>
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {event.images.length > 1 && (
                        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          <span>{event.images.length}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h
