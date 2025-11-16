import type { NavItem, Stat, Testimonial, Feature, TrainingModule, QuizQuestion, Product, Violation, Vehicle, Facility, UserBadge, Reward } from '@/lib/types';
import { Truck, Users, Recycle, BarChart, PieChart, Map, Award, ShoppingCart, User, LogIn, LocateFixed, GitBranchPlus, Trash2, Sprout, Lightbulb, BadgeCheck, Gift, Star, DollarSign } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export const homeNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/#features" },
  { title: "Community", href: "/#community" },
  { title: "Join", href: "/#join" },
];

export const mainNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Training", href: "/training" },
  { title: "Recycle", href: "/recycle" },
  { title: "Report Waste", href: "/report-waste" },
  { title: "e-Shop", href: "/shop" },
  { title: "Rewards", href: "/rewards" },
  { title: "Facilities", href: "/facilities" },
];

export const landingStats = [
  { label: "Tonnes Waste Treated", value: 1200, icon: Recycle },
  { label: "Citizens Trained", value: 8500, icon: Users },
  { label: "Vehicles Tracked", value: 300, icon: Truck },
];

export const landingFeatures: Feature[] = [
  {
    title: 'Citizen Training',
    description: 'Learn waste segregation, composting, and recycling through interactive modules.',
    icon: Award,
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Report Waste',
    description: 'Quickly report illegal dumping with photo uploads and geo-tagging.',
    icon: Trash2,
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Track Vehicles',
    description: 'Monitor waste collection vehicles in your area in real-time.',
    icon: Map,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
  },
  {
    title: 'e-Shop',
    description: 'Purchase compost bins, segregation bags, and other utilities.',
    icon: ShoppingCart,
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Anjali Sharma',
    role: 'Green Champion',
    quote: 'The training modules are fantastic! I learned so much about composting and now manage my own kitchen waste effectively.',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-avatar-1')?.imageUrl || 'https://picsum.photos/seed/avatar1/100/100'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Community Volunteer',
    quote: 'Reporting waste has never been easier. The app is intuitive and the response from authorities is prompt. A real game-changer for our neighborhood.',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-avatar-2')?.imageUrl || 'https://picsum.photos/seed/avatar2/100/100'
  },
  {
    name: 'Priya Singh',
    role: 'Student',
    quote: 'I love tracking the collection trucks. It helps us know exactly when to put our bins out. Super convenient!',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-avatar-3')?.imageUrl || 'https://picsum.photos/seed/avatar3/100/100'
  }
];

export const trainingModules: TrainingModule[] = [
  { id: '1', title: 'Waste Segregation 101', description: 'Master the art of separating wet, dry, and hazardous waste.', duration: '45 mins', imageUrl: PlaceHolderImages.find(p => p.id === 'training-segregation')?.imageUrl || 'https://picsum.photos/seed/segregation/400/300', imageHint: 'recycling bins', isLocked: false },
  { id: '2', title: 'Home Composting', description: 'Turn your kitchen scraps into valuable compost for your plants.', duration: '60 mins', imageUrl: PlaceHolderImages.find(p => p.id === 'training-composting')?.imageUrl || 'https://picsum.photos/seed/composting/400/300', imageHint: 'garden compost', isLocked: true },
  { id: '3', title: 'E-Waste Management', description: 'Learn how to safely dispose of electronic waste.', duration: '30 mins', imageUrl: PlaceHolderImages.find(p => p.id === 'training-ewaste')?.imageUrl || 'https://picsum.photos/seed/ewaste/400/300', imageHint: 'electronic circuit', isLocked: true },
  { id: '4', title: 'Plastic-Free Living', description: 'Tips and tricks to reduce plastic consumption in daily life.', duration: '45 mins', imageUrl: 'https://picsum.photos/seed/plasticfree/400/300', imageHint: 'reusable bags', isLocked: true },
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Which of these is considered "wet waste"?',
    options: ['Plastic bottle', 'Fruit peels', 'Newspaper', 'Used battery'],
    correctAnswer: 1
  },
  {
    question: 'What is the ideal color of mature compost?',
    options: ['Green', 'Black', 'Dark brown', 'Yellow'],
    correctAnswer: 2
  },
  {
    question: 'Which item is NOT e-waste?',
    options: ['Old mobile phone', 'Light bulb', 'Food processor', 'Used AA battery'],
    correctAnswer: 3
  }
];

export const products: Product[] = [
  { id: 'p1', name: 'Segregation Dustbins (Set of 3)', category: 'Bins', price: 1299, imageUrl: PlaceHolderImages.find(p => p.id === 'product-dustbin-set')?.imageUrl || 'https://picsum.photos/seed/dustbin/400/400', imageHint: 'three recycling bins' },
  { id: 'p2', name: 'Home Compost Kit', category: 'Composting', price: 2499, imageUrl: PlaceHolderImages.find(p => p.id === 'product-compost-kit')?.imageUrl || 'https://picsum.photos/seed/compostkit/400/400', imageHint: 'compost bin' },
  { id: 'p3', name: 'Reusable Safety Gloves', category: 'Accessories', price: 199, imageUrl: PlaceHolderImages.find(p => p.id === 'product-gloves')?.imageUrl || 'https://picsum.photos/seed/gloves/400/400', imageHint: 'gardening gloves' },
  { id: 'p4', name: 'Biodegradable Garbage Bags (100 pcs)', category: 'Bags', price: 349, imageUrl: PlaceHolderImages.find(p => p.id === 'product-garbage-bags')?.imageUrl || 'https://picsum.photos/seed/bags/400/400', imageHint: 'biodegradable bags' },
  { id: 'p5', name: 'Compost Accelerator Powder', category: 'Composting', price: 499, imageUrl: PlaceHolderImages.find(p => p.id === 'product-compost-powder')?.imageUrl || 'https://picsum.photos/seed/powder/400/400', imageHint: 'compost powder' },
  { id: 'p6', name: 'Car Odor-Free Bin', category: 'Bins', price: 799, imageUrl: PlaceHolderImages.find(p => p.id === 'product-car-bin')?.imageUrl || 'https://picsum.photos/seed/carbin/400/400', imageHint: 'car trash can' },
];

export const dashboardStats: Stat[] = [
  { label: "Segregation Rate", value: "82%", icon: PieChart },
  { label: "Reports Filed", value: "12", icon: GitBranchPlus },
  { label: "Vehicles on Road", value: "24", icon: Truck },
  { label: "Points Earned", value: "1,250", icon: Award },
];

export const wasteGenerationData = [
  { month: "Jan", total: Math.floor(Math.random() * 300) + 100 },
  { month: "Feb", total: Math.floor(Math.random() * 300) + 100 },
  { month: "Mar", total: Math.floor(Math.random() * 300) + 100 },
  { month: "Apr", total: Math.floor(Math.random() * 300) + 100 },
  { month: "May", total: Math.floor(Math.random() * 300) + 100 },
  { month: "Jun", total: Math.floor(Math.random() * 300) + 100 },
];

export const segregationData = [
  { name: "Wet Waste", value: 45, fill: "var(--color-chart-1)" },
  { name: "Dry Waste", value: 35, fill: "var(--color-chart-2)" },
  { name: "Hazardous", value: 5, fill: "var(--color-chart-3)" },
  { name: "Unsegregated", value: 15, fill: "var(--color-chart-4)" },
];

export const violations: Violation[] = [
  { id: 'V001', date: '2024-07-20', location: 'Koramangala, Blr', type: 'Illegal Dumping', status: 'Resolved', reporter: 'AI Flagged' },
  { id: 'V002', date: '2024-07-21', location: 'Indiranagar, Blr', type: 'Mixed Waste', status: 'Pending', reporter: 'Citizen' },
  { id: 'V003', date: '2024-07-22', location: 'HSR Layout, Blr', type: 'Construction Debris', status: 'In Progress', reporter: 'AI Flagged' },
  { id: 'V004', date: '2024-07-23', location: 'Jayanagar, Blr', type: 'Illegal Dumping', status: 'Pending', reporter: 'Citizen' },
];

export const vehicles: Vehicle[] = [
  { id: 'V01', lat: 12.9352, lng: 77.6245, status: 'active' },
  { id: 'V02', lat: 12.9279, lng: 77.6271, status: 'active' },
  { id: 'V03', lat: 12.9121, lng: 77.6446, status: 'inactive' },
  { id: 'V04', lat: 12.9716, lng: 77.5946, status: 'maintenance' },
];

export const facilities: Facility[] = [
  { id: 'F01', name: 'Koramangala WTE', type: 'WTE', lat: 12.9392, lng: 77.6275 },
  { id: 'F02', name: 'HSR Recycling Hub', type: 'Recycling', lat: 12.9121, lng: 77.6376 },
  { id: 'F03', name: 'Bellandur Biomethanation', type: 'Biomethanation', lat: 12.9304, lng: 77.6784 },
  { id: 'F04', name: 'Jayanagar Recycling Center', type: 'Recycling', lat: 12.9218, lng: 77.5838 },
];

export const sidebarNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: BarChart },
  { title: "My Reports", href: "/profile", icon: GitBranchPlus },
  { title: "Live Map", href: "/facilities", icon: Map },
  { title: "Training", href: "/training", icon: Sprout },
];

export const userBadges: UserBadge[] = [
  { id: 'b1', name: 'Segregation Starter', description: 'Completed the Waste Segregation 101 module.', icon: Sprout, unlocked: true },
  { id: 'b2', name: 'Compost Champion', description: 'Completed the Home Composting module.', icon: Recycle, unlocked: true },
  { id: 'b3', name: 'First Report', description: 'Filed your first waste report.', icon: GitBranchPlus, unlocked: true },
  { id: 'b4', name: 'E-Waste Expert', description: 'Completed the E-Waste Management module.', icon: Lightbulb, unlocked: false },
  { id: 'b5', name: 'Green Guru', description: 'Unlock all other badges to achieve this.', icon: BadgeCheck, unlocked: false },
];

export const rewards: Reward[] = [
    {
        icon: Gift,
        title: "e-Shop Discount",
        description: "Get 15% off your next purchase. Earn points by filing reports.",
        points: 500,
        unlocked: true,
    },
    {
        icon: DollarSign,
        title: "Redeem for Cash",
        description: "Convert your points into real cash. 100 points = ₹10.",
        points: 1000,
        unlocked: false,
    },
     {
        icon: Sprout,
        title: "Tree Plantation",
        description: "A tree will be planted in your name for your contribution.",
        points: 2500,
        unlocked: false,
    }
];
