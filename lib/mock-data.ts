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
