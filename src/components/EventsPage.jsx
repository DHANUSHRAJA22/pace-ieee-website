import React, { useState } from 'react';
import { events } from '../utils/events';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();

  const getFilteredEvents = () => {
    switch (activeFilter) {
      case 'upcoming': return events.filter(event => new Date(event.date) >= currentDate);
      case 'past': return events.filter(event => new Date(event.date) < currentDate);
      case 'all':
      default: return events;
    }
  };

  const filteredEvents = getFilteredEvents();
  const handleFilterClick = (filter) => setActiveFilter(filter);
  const handleEventClick = (event) => { setSelectedEvent(event); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedEvent(null); };

  const getStatusBadgeClass = (status) => {
    const classes = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      ongoing: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return classes[status] || classes.completed;
  };

  const getTypeBadgeClass = (type) => {
    const classes = {
      workshop: 'bg-purple-100 text-purple-800 border-purple-200',
      seminar: 'bg-orange-100 text-orange-800 border-orange-200',
      competition: 'bg-red-100 text-red-800 border-red-200'
    };
    return classes[type] || 'bg-indigo-100 text-indigo-800 border-indigo-200';
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PACE IEEE Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and participate in our exciting workshops, seminars, competitions, and networking events.
            Stay connected with the IEEE Student Branch community.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {[['all', 'All Events'], ['upcoming', 'Upcoming'], ['past', 'Past Events']].map(([filter, label]) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === filter
                      ? 'text-blue-600 bg-blue-100 border-2 border-blue-200 shadow-md'
                      : 'text-gray-600 bg-white hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label} ({filter === 'all' ? events.length : events.filter(event => 
                    filter === 'upcoming' ? new Date(event.date) >= currentDate : new Date(event.date) < currentDate
                  ).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadgeClass(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                      <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
                  <button
                    className={`w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 ${
                      event.status === 'upcoming' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                    onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                  >
                    {event.status === 'upcoming' ? 'Join Event' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">No events match the current filter. Try selecting a different filter or check back soon for new events.</p>
            <button onClick={() => handleFilterClick('all')} className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">
              Show All Events
            </button>
          </div>
        )}
      </div>

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(selectedEvent.status)}`}>
                      {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeBadgeClass(selectedEvent.type)}`}>
                      {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                    </span>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  <span className="font-medium">{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  <span>{selectedEvent.time}</span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedEvent.status === 'upcoming' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}>
                  {selectedEvent.status === 'upcoming' ? 'Register for Event' : 'View Event Details'}
                </button>
                <button onClick={closeModal} className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
