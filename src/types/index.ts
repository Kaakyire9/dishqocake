export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  /** Absolute or relative path to a photographic OG image (preferable for social previews) */
  ogImage?: string;
  /** Optional optimized WebP OG image (1200x630) generated into /public/og/ */
  ogWebp?: string;
};

export type SelectedOptions = {
  layers?: number;
  [key: string]: unknown;
};

export type CartItem = Product & {
  quantity: number;
  options?: SelectedOptions;
};

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status?: 'Pending' | 'Paid' | 'Delivered';
};
