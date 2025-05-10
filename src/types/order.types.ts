import { Ice, Milk, Size, Syrup } from "@/enums";

export interface ProductConfig {
  size: Size;
  quantity: number;
  milk: Milk;
  syrup: Syrup;
  additives: [];
  ice: Ice;
  name?: string;
}

export type OrderProductType = {
  product_id: string;
  quantity: number;
  size?: Size;
};
