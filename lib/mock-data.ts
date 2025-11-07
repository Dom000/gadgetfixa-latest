const artisansData = [
  {
    id: "1",
    name: "Marcus Johnson",
    shopName: "TechFix Pro",
    description:
      "Specialized in smartphone and tablet repairs with over 8 years of experience. I handle everything from screen replacements to water damage recovery.",
    category: "Phone Repair",
    rating: 4.9,
    reviewCount: 127,
    phone: "+1 (555) 123-4567",
    location: "Downtown, NY",
    isOnline: true,
    profileImage: "/artisan1.jpg",
    specialties: [
      "iPhone Repair",
      "Android Repair",
      "Screen Replacement",
      "Water Damage",
    ],
  },
  {
    id: "2",
    name: "Sofia Rodriguez",
    shopName: "Circuit Solutions",
    description:
      "Expert in electronics repair and circuit board diagnostics. I work with phones, laptops, gaming consoles, and more complex electronic devices.",
    category: "Electronics Repair",
    rating: 4.8,
    reviewCount: 89,
    phone: "+1 (555) 987-6543",
    location: "Tech District, CA",
    isOnline: true,
    profileImage: "/artisan2.jpg",
    specialties: [
      "Circuit Board Repair",
      "Gaming Consoles",
      "Laptop Repair",
      "Diagnostics",
    ],
  },
  {
    id: "3",
    name: "David Chen",
    shopName: "Mobile Masters",
    description:
      "Professional mobile device technician focusing on quick turnaround times and quality repairs. Certified in multiple device brands.",
    category: "Phone Repair",
    rating: 4.7,
    reviewCount: 156,
    phone: "+1 (555) 456-7890",
    location: "Silicon Valley, CA",
    isOnline: false,
    profileImage: "/artisan3.jpg",
    specialties: [
      "Battery Replacement",
      "Camera Repair",
      "Software Issues",
      "Data Recovery",
    ],
  },
  {
    id: "4",
    name: "Elena Petrov",
    shopName: "Gadget Guru",
    description:
      "Comprehensive electronics repair service with expertise in both hardware and software issues. I pride myself on honest service and fair pricing.",
    category: "Electronics Repair",
    rating: 4.9,
    reviewCount: 203,
    phone: "+1 (555) 321-0987",
    location: "Brooklyn, NY",
    isOnline: true,
    profileImage: "/artisan1.jpg",
    specialties: [
      "Tablet Repair",
      "Smartwatch Repair",
      "Audio Devices",
      "Custom Modifications",
    ],
  },
];

const categories = [
  "All Categories",
  "Phone Repair",
  "Electronics Repair",
  "Computer Repair",
  "Gaming Console",
];
export { artisansData, categories };

export const portfolioOptions = [
  {
    id: "1",
    title: "Smartphone Screen Repair",
    description:
      "Professional iPhone 14 screen replacement with original parts",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Laptop Battery Replacement",
    description: "MacBook Pro battery replacement service with 1-year warranty",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Gaming Console Repair",
    description: "PS5 overheating fix and thermal paste replacement",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
  },
  {
    id: "4",
    title: "Tablet Water Damage Recovery",
    description: "iPad water damage repair with data recovery service",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
  },
  {
    id: "5",
    title: "Smartwatch Band Replacement",
    description: "Apple Watch Series 8 band and crown repair service",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
  },
];

export const reviewSamples = [
  {
    id: "1",
    anonymous: false,
    anonymousName: null,
    name: "Alice Johnson",
    rating: 5,
    comment: "Excellent service! My phone looks brand new after the repair.",
    createdAt: new Date("2024-05-01"),
  },
  {
    id: "2",
    anonymous: false,
    anonymousName: null,
    name: "Bob Smith",
    rating: 4,
    comment: "Quick turnaround and fair pricing. Highly recommend!",
    createdAt: new Date("2024-04-15"),
  },
  {
    id: "3",
    anonymous: true,
    anonymousName: "Tech Enthusiast",
    name: undefined,
    rating: 5,
    comment: "Very professional and knowledgeable technician.",
    createdAt: new Date("2024-03-22"),
  },
  {
    id: "4",
    anonymous: false,
    anonymousName: null,
    name: "David Kim",
    rating: 3,
    comment: "Good service but took longer than expected.",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "5",
    anonymous: true,
    anonymousName: "Happy Customer",
    name: undefined,
    rating: 4,
    comment: "Affordable prices and friendly staff.",
    createdAt: new Date("2024-01-30"),
  },
];

export const options = [
  { label: "Plumbing", value: "Plumbing" },
  { label: "Electrical", value: "Electrical" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Landscaping", value: "Landscaping" },
  { label: "Cleaning", value: "Cleaning" },
  { label: "Painting", value: "Painting" },
  { label: "Roofing", value: "Roofing" },
  { label: "HVAC", value: "HVAC" },
  { label: "Flooring", value: "Flooring" },
  { label: "Masonry", value: "Masonry" },
  { label: "Fencing", value: "Fencing" },
  { label: "Iphone Repair", value: "Iphone Repair" },
  { label: "Computer Repair", value: "Computer Repair" },
  { label: "Appliance Repair", value: "Appliance Repair" },
  { label: "Auto Repair", value: "Auto Repair" },
  { label: "Other", value: "Other" },
];