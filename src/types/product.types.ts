export type ProductType = {
  id: string;
  category: string;
  coffee_type?: CoffeeType;
  image?: string;
  name: string;
  description?: string;
  price: number;
  sales: number;
};

export type CoffeeType = "Hot Coffee" | "Cold Coffee" | "Hot Chocolate";

export type CategoryType = {
  id: string;
  name: string;
  altName?: string;
  description: string;
};

export type AddOn = {
  name: string;
  price: number;
};


export const Sizes: AddOn[] = [
  {
    name: "Tall",
    price: 0,
  },
  {
    name: "Grande",
    price: 17.99,
  },
  {
    name: "Venti",
    price: 22.99,
  },
];

export const Milks: AddOn[] = [
  {
    name: "Cow's",
    price: 2.9,
  },
  {
    name: "Lactose-Free",
    price: 5.0,
  },
  {
    name: "Skimmed",
    price: 2.9,
  },
  {
    name: "Vegetable",
    price: 7.9,
  },
];

export const Syrups: AddOn[] = [
  {
    name: "Amaretto",
    price: 3.75,
  },
  {
    name: "Caramel",
    price: 2.9,
  },
  {
    name: "Hazelnut",
    price: 3.75,
  },
  {
    name: "Irish Cream",
    price: 3.75,
  },
  {
    name: "Vanilla",
    price: 2.9,
  },
];

export const Additives: AddOn[] = [
  {
    name: "Ceylon Cinnamon",
    price: 1.25,
  },
  {
    name: "Grated Chocolate",
    price: 2.9,
  },
  {
    name: "Liquid Chocolate",
    price: 2.9,
  },
  {
    name: "Marshmallow",
    price: 1.25,
  },
  {
    name: "Whipped Cream",
    price: 2.9,
  },
  {
    name: "Nutmeg",
    price: 1.25,
  },
  {
    name: "Ice Cream",
    price: 5.0,
  },
];