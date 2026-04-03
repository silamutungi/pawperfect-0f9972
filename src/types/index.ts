export interface Groomer {
  id: string;
  name: string;
  location: string;
  rating: number;
  review_count: number;
  specialties: string[];
  price_from: number;
  badge: string;
  bio: string;
  years_exp: number;
  verified: boolean;
  breeds_served: string[];
  next_available: string;
}

export interface Appointment {
  id: string;
  groomer_name: string;
  service: string;
  pet_name: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
  photo_proof?: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  coat_type: string;
  special_notes: string;
  behavioral_notes: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  groomer_id: string;
}
