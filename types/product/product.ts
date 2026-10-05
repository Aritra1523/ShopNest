export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  brand?: string;
  rating?: number;
  stock?: number;
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
