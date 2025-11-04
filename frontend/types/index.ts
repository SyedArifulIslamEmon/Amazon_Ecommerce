export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  category: string;
  subcategory?: string;
  brand?: string;
  images: string[];
  features: string[];
  specifications: Record<string, any>;
  rating: number;
  num_reviews: number;
  is_active: boolean;
  is_featured: boolean;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  roles: string[];
  is_active: boolean;
}

export interface OrderItem {
  product_id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddress {
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  phone_number?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
  status: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  sentiment?: string;
  verified_purchase: boolean;
  helpful_count: number;
  unhelpful_count: number;
}

export interface ChatMessage {
  sender_id: string;
  receiver_id: string;
  message: string;
  role: "user" | "agent" | "ai";
  created_at: string;
  metadata: Record<string, any>;
}

export interface ChatSession {
  session_id: string;
  user_id: string;
  is_active: boolean;
  messages: ChatMessage[];
}
