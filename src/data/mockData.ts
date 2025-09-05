export const mockUser = {
  name: "Alex Johnson",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  trustScore: 85,
  role: "student" as const,
  email: "alex.johnson@university.edu",
  university: "Tech University",
  graduationYear: 2024,
};

export const mockCredentials = [
  {
    id: "1",
    title: "Full Stack Development Project",
    issuer: "GitHub",
    type: "github" as const,
    status: "verified" as const,
    date: "March 2024",
    description: "Built a complete e-commerce platform with React and Node.js",
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: "2", 
    title: "React - Complete Developer Course",
    issuer: "Coursera",
    type: "coursera" as const,
    status: "verified" as const,
    date: "February 2024",
    description: "Comprehensive course covering React fundamentals to advanced patterns",
    skills: ["React", "JavaScript", "Redux", "Testing"],
  },
  {
    id: "3",
    title: "HackTech 2024 Winner",
    issuer: "TechCorp",
    type: "hackathon" as const,
    status: "flagged" as const,
    date: "January 2024", 
    description: "1st place in healthcare innovation track",
    skills: ["Innovation", "Healthcare", "AI", "Teamwork"],
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    type: "certificate" as const,
    status: "verified" as const,
    date: "December 2023",
    description: "Cloud computing fundamentals and AWS services",
    skills: ["AWS", "Cloud Computing", "DevOps"],
  },
];

export const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    trustScore: 85,
    verifiedCredentials: 3,
    totalCredentials: 4,
    email: "alex.johnson@university.edu",
  },
  {
    id: "2", 
    name: "Sarah Chen",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b6d5bff7?w=150&h=150&fit=crop&crop=face",
    trustScore: 92,
    verifiedCredentials: 5,
    totalCredentials: 5,
    email: "sarah.chen@university.edu",
  },
  {
    id: "3",
    name: "Marcus Williams",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    trustScore: 78,
    verifiedCredentials: 4,
    totalCredentials: 6,
    email: "marcus.williams@university.edu",
  },
];

export const mockAdoptionData = [
  { month: "Jan", students: 120, verified: 95 },
  { month: "Feb", students: 180, verified: 152 },
  { month: "Mar", students: 250, verified: 218 },
  { month: "Apr", students: 320, verified: 289 },
  { month: "May", students: 410, verified: 374 },
  { month: "Jun", students: 480, verified: 445 },
];

export const mockSkills = [
  "React",
  "Node.js", 
  "Python",
  "Machine Learning",
  "AWS",
  "Docker",
  "MongoDB",
  "JavaScript",
];