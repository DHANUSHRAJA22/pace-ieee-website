# pace-ieee-website

Official website for PACE IEEE Student Branch showcasing events, activities, and executive committee information.

## Features

### EventsPage Component

The EventsPage is a comprehensive React component that provides an interactive interface for browsing and managing IEEE Student Branch events. It offers a modern, responsive design with advanced filtering capabilities and detailed event information.

![EventsPage Screenshot](./docs/images/events-page-screenshot.png)

#### Key Features

- **Interactive Event Filtering**: Filter events by status (All Events, Upcoming, Past Events)
- **Responsive Card Layout**: Clean, modern card-based design that adapts to different screen sizes
- **Event Modal System**: Click any event to view detailed information in an overlay modal
- **Dynamic Status Badges**: Visual indicators showing event status (upcoming, ongoing, completed) and type (workshop, seminar, competition)
- **Real-time Event Counts**: Filter buttons show live count of events in each category
- **Date Formatting**: Human-readable date display with proper formatting
- **Interactive Hover Effects**: Smooth animations and transitions for better user experience

#### Event Data Structure

Events are stored in `src/utils/events.js` with the following structure:

```javascript
{
  id: 1,
  title: "Event Title",
  date: "YYYY-MM-DD",
  time: "HH:MM AM/PM - HH:MM AM/PM",
  description: "Detailed event description",
  status: "upcoming|ongoing|completed",
  type: "workshop|seminar|competition",
  location: "Event venue"
}
```

#### How to Use

##### Filtering Events

1. **All Events**: View all events regardless of status
2. **Upcoming**: Filter to show only future events (based on current date)
3. **Past Events**: View completed events for reference

Each filter button displays the count of events in that category, updating dynamically as the current date changes.

##### Viewing Event Details

1. **Card View**: Each event displays as an interactive card showing:
   - Event title with hover effects
   - Date and time with icons
   - Brief description (truncated)
   - Status and type badges
   - Action button ("Join Event" for upcoming, "View Details" for completed)

2. **Modal View**: Click any event card or the action button to open a detailed modal featuring:
   - Full event information
   - Complete description
   - Registration/details button
   - Close functionality

##### Managing Event Data

**Adding New Events:**

1. Navigate to `src/utils/events.js`
2. Add a new event object to the `events` array:

```javascript
{
  id: nextAvailableId,
  title: "Your Event Title",
  date: "2025-MM-DD",
  time: "Start Time - End Time",
  description: "Comprehensive event description with details about what attendees will learn or experience.",
  status: "upcoming", // upcoming, ongoing, or completed
  type: "workshop",   // workshop, seminar, or competition
  location: "Event Location"
}
```

**Event Status Management:**

The component automatically determines event status based on the current date:
- Events with dates >= today are considered "upcoming"
- Events with dates < today are considered "past"
- Manually set status in the data for special cases

**Customizing Event Types:**

Supported event types with color-coded badges:
- **Workshop** (Purple badge): Hands-on learning sessions
- **Seminar** (Orange badge): Educational presentations
- **Competition** (Red badge): Competitive programming or technical contests

#### Component Architecture

**State Management:**
- `activeFilter`: Controls which events are displayed
- `selectedEvent`: Stores the event selected for modal display
- `isModalOpen`: Controls modal visibility

**Key Functions:**
- `getFilteredEvents()`: Returns events based on active filter
- `handleEventClick()`: Opens event details in modal
- `formatDate()`: Converts date strings to readable format
- `getStatusBadgeClass()`: Returns appropriate CSS classes for status badges
- `getTypeBadgeClass()`: Returns appropriate CSS classes for type badges

#### Responsive Design

The EventsPage adapts to different screen sizes:
- **Desktop**: 3-column grid layout with hover effects
- **Tablet**: 2-column grid layout
- **Mobile**: Single-column stack with touch-friendly interactions

#### Usage in Application

```jsx
import EventsPage from './components/EventsPage';
import { events } from './utils/events';

function App() {
  return (
    <div className="App">
      <EventsPage />
    </div>
  );
}
```

## Installation

```bash
# Clone the repository
git clone https://github.com/DHANUSHRAJA22/pace-ieee-website.git

# Navigate to project directory
cd pace-ieee-website

# Install dependencies
npm install

# Start development server
npm start
```

## Technology Stack

- **React**: Component-based UI framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **JavaScript ES6+**: Modern JavaScript features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is maintained by PACE IEEE Student Branch.
