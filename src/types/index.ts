export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
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
