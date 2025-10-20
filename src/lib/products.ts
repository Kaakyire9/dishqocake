export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  { id: "1", name: "Classic Vanilla Cake", description: "Soft vanilla sponge with buttercream.", price: 25, image: "/products/vanilla.svg" },
  { id: "2", name: "Chocolate Truffle", description: "Rich chocolate layers with ganache.", price: 30, image: "/products/chocolate.svg" },
  { id: "3", name: "Strawberry Delight", description: "Fresh strawberries and cream.", price: 28, image: "/products/strawberry.svg" },
  { id: "4", name: "Lemon Tart", description: "Zesty lemon curd on a crisp crust.", price: 18, image: "/products/lemon.svg" },
  { id: "5", name: "Red Velvet Romance", description: "Velvety red cake with cream cheese icing.", price: 32, image: "/products/redvelvet.svg" },
  { id: "6", name: "Almond Praline", description: "Crunchy praline and almond sponge.", price: 29, image: "/products/almond.svg" },
];
