// Event data for PACE IEEE website
export const events = [
  {
    id: 1,
    title: "React Workshop for Beginners",
    date: "2025-09-15",
    time: "10:00 AM - 4:00 PM",
    description: "Learn the fundamentals of React development with hands-on exercises and real-world projects. This workshop covers components, state management, and modern React patterns.",
    status: "upcoming",
    type: "workshop",
    location: "PACE Computer Lab 1"
  },
  {
    id: 2,
    title: "IEEE Technical Seminar Series",
    date: "2025-09-22",
    time: "2:00 PM - 5:00 PM",
    description: "Industry experts sharing insights on emerging technologies and career opportunities in tech. Topics include AI, IoT, and software engineering trends.",
    status: "upcoming",
    type: "seminar",
    location: "PACE Auditorium"
  },
  {
    id: 3,
    title: "Coding Competition - CodeStorm 2025",
    date: "2025-10-05",
    time: "9:00 AM - 6:00 PM",
    description: "Annual programming contest with exciting prizes and networking opportunities. Test your coding skills against fellow students in algorithmic challenges.",
    status: "upcoming",
    type: "competition",
    location: "PACE Main Campus"
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    date: "2025-08-20",
    time: "10:00 AM - 6:00 PM",
    description: "Intensive full-stack web development training covering modern frameworks and best practices. HTML, CSS, JavaScript, React, Node.js, and database integration.",
    status: "completed",
    type: "workshop",
    location: "PACE Computer Lab 2",
    // Additional fields for Past Events Gallery
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400"
    ],
    postEventSummary: "Successful bootcamp with 45 participants learning full-stack development. Students built and deployed their first web applications using modern frameworks. High engagement and positive feedback from industry mentors.",
    attendanceCount: 45,
    highlights: [
      "45 students successfully completed the program",
      "15 projects deployed to live servers",
      "Industry mentors from top tech companies",
      "100% participant satisfaction rate"
    ],
    year: 2025
  },
  {
    id: 5,
    title: "AI & Machine Learning Symposium",
    date: "2025-08-10",
    time: "1:00 PM - 7:00 PM",
    description: "Exploring the latest trends in artificial intelligence and machine learning applications. Presentations on neural networks, deep learning, and practical AI implementations.",
    status: "completed",
    type: "seminar",
    location: "PACE Conference Hall",
    // Additional fields for Past Events Gallery
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    ],
    postEventSummary: "Insightful symposium featuring renowned AI researchers and industry experts. Covered cutting-edge topics in machine learning with practical demonstrations. Networking sessions facilitated valuable connections between students and professionals.",
    attendanceCount: 120,
    highlights: [
      "120 participants from various engineering disciplines",
      "5 keynote speakers from industry",
      "3 hands-on AI workshop sessions",
      "Research collaboration opportunities established"
    ],
    year: 2025
  },
  {
    id: 6,
    title: "Mobile App Development Workshop",
    date: "2025-11-15",
    time: "9:00 AM - 5:00 PM",
    description: "Build your first mobile application using React Native. Learn cross-platform development, state management, and app deployment strategies.",
    status: "upcoming",
    type: "workshop",
    location: "PACE Computer Lab 3"
  },
  {
    id: 7,
    title: "Cybersecurity Awareness Session",
    date: "2025-09-08",
    time: "3:00 PM - 5:00 PM",
    description: "Essential cybersecurity practices for students and professionals. Topics include password security, phishing awareness, and secure coding practices.",
    status: "upcoming",
    type: "seminar",
    location: "PACE Lecture Hall"
  },
  {
    id: 8,
    title: "Open Source Contribution Hackathon",
    date: "2025-07-25",
    time: "10:00 AM - 8:00 PM",
    description: "24-hour hackathon focused on contributing to open source projects. Collaborate with peers, learn version control, and make meaningful contributions to the community.",
    status: "completed",
    type: "competition",
    location: "PACE Innovation Lab",
    // Additional fields for Past Events Gallery
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400"
    ],
    postEventSummary: "Amazing 24-hour hackathon where teams contributed to major open source projects. Participants learned collaborative development practices and made significant contributions to popular repositories. Event fostered innovation and community engagement.",
    attendanceCount: 75,
    highlights: [
      "75 participants in 15 teams",
      "25+ pull requests merged to open source projects",
      "Contributions to React, Vue.js, and Node.js ecosystems",
      "Best contribution team received internship opportunities"
    ],
    year: 2025
  },
  // Additional past events with enhanced data for gallery
  {
    id: 9,
    title: "Arduino & IoT Workshop",
    date: "2024-12-15",
    time: "10:00 AM - 4:00 PM",
    description: "Hands-on workshop exploring Internet of Things development using Arduino microcontrollers. Build smart devices and learn sensor integration.",
    status: "completed",
    type: "workshop",
    location: "PACE Electronics Lab",
    images: [
      "https://images.unsplash.com/photo-1518331647614-221afb97ee4a?w=400",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400"
    ],
    postEventSummary: "Interactive IoT workshop where students built smart home devices using Arduino. Participants created temperature monitoring systems, automated lighting, and security sensors. Great introduction to embedded systems programming.",
    attendanceCount: 35,
    highlights: [
      "35 students built working IoT prototypes",
      "10+ smart device projects completed",
      "Industry partnership with local tech companies",
      "Follow-up advanced IoT course planned"
    ],
    year: 2024
  },
  {
    id: 10,
    title: "Tech Career Fair 2024",
    date: "2024-11-20",
    time: "9:00 AM - 5:00 PM",
    description: "Annual career fair connecting students with leading technology companies. Job opportunities, internships, and networking with industry professionals.",
    status: "completed",
    type: "seminar",
    location: "PACE Main Auditorium",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    ],
    postEventSummary: "Successful career fair with 25+ companies participating. Students had opportunities to interview for internships and full-time positions. Multiple on-the-spot job offers and valuable networking connections made.",
    attendanceCount: 200,
    highlights: [
      "200+ students participated",
      "25 companies with active recruitment",
      "50+ job offers extended",
      "Highest placement rate in college history"
    ],
    year: 2024
  }
];

// Helper function to get past events for gallery
export const getPastEvents = () => {
  return events.filter(event => event.status === 'completed');
};

// Helper function to get events by year
export const getEventsByYear = (year) => {
  return getPastEvents().filter(event => event.year === year);
};

// Helper function to get events by type
export const getEventsByType = (type) => {
  return getPastEvents().filter(event => event.type === type);
};

// Helper function to get unique years
export const getUniqueYears = () => {
  const years = getPastEvents().map(event => event.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort descending
};

// Helper function to get unique event types from past events
export const getUniqueTypes = () => {
  const types = getPastEvents().map(event => event.type);
  return [...new Set(types)];
};
