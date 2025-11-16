import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
};

export type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  imageHint: string;
  isLocked: boolean;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  imageHint: string;
};

export type Violation = {
  id: string;
  date: string;
  location: string;
  type: string;
  status: "Pending" | "Resolved" | "In Progress";
  reporter: string;
};

export type Vehicle = {
  id: string;
  lat: number;
  lng: number;
  status: "active" | "inactive" | "maintenance";
};

export type Facility = {
  id: string;
  name: string;
  type: "Biomethanation" | "Recycling" | "WTE";
  lat: number;
  lng: number;
};

export type UserBadge = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
};

export type Reward = {
    icon: LucideIcon;
    title: string;
    description: string;
    points: number;
    unlocked: boolean;
};