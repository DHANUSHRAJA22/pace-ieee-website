import React from 'react';

// EventsPage Component with responsive grid-based event cards
const EventsPage = () => {
  // Placeholder event data
  const sampleEvents = [
    {
      id: 1,
      title: "React Workshop for Beginners",
      date: "2025-09-15",
      time: "10:00 AM - 4:00 PM",
      description: "Learn the fundamentals of React development with hands-on exercises and real-world projects.",
      status: "upcoming",
      type: "workshop"
    },
    {
      id: 2,
      title: "IEEE Technical Seminar Series",
      date: "2025-09-22",
      time: "2:00 PM - 5:00 PM",
      description: "Industry experts sharing insights on emerging technologies and career opportunities in tech.",
      status: "upcoming",
      type: "seminar"
    },
    {
      id: 3,
      title: "Coding Competition - CodeStorm 2025",
      date: "2025-10-05",
      time: "9:00 AM - 6:00 PM",
      description: "Annual programming contest with exciting prizes and networking opportunities.",
      status: "upcoming",
      type: "competition"
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      date: "2025-08-20",
      time: "10:00 AM - 6:00 PM",
      description: "Intensive full-stack web development training covering modern frameworks and best practices.",
      status: "completed",
      type: "workshop"
    },
    {
      id: 5,
      title: "AI & Machine Learning Symposium",
      date: "2025-08-10",
      time: "1:00 PM - 7:00 PM",
      description: "Exploring the latest trends in artificial intelligence and machine learning applications.",
      status: "completed",
      type: "seminar"
    }
  ];

  // Get status badge color classes
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get event type badge color classes
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'workshop':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'seminar':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'competition':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Event Card Component
  const EventCard = ({ event }) => {
    const isUpcoming = event.status === 'upcoming';
    const buttonText = isUpcoming ? 'Join Event' : 'View Details';
    const buttonClass = isUpcoming 
      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
      : 'bg-gray-600 hover:bg-gray-700 text-white';

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Event Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(event.status)}`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeBadgeClass(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-1">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{event.time}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-6 line-clamp-3">
            {event.description}
          </p>

          {/* Action Button */}
          <button 
            className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${buttonClass}`}
            onClick={() => {
              // Placeholder click handler
              console.log(`${buttonText} clicked for event: ${event.title}`);
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PACE IEEE Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and participate in our exciting workshops, seminars, competitions, and networking events.
            Stay connected with the IEEE Student Branch community.
          </p>
        </div>

        {/* Filter Section - Placeholder for future implementation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">
                All Events
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
                Upcoming
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
                Past Events
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sampleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* No Events Message - Hidden for now since we have sample data */}
        {sampleEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events available
            </h3>
            <p className="text-gray-500">
              Check back soon for upcoming IEEE Student Branch events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
