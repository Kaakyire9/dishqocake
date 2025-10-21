export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
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
