import { Timestamp } from "firebase/firestore";
import { PaymentStatusType, PaymentOptionType } from "./payment.types";
import { ProductType } from "./product.types";
import { BranchType, DeliveryStatusType, DeliveryOptionType } from "./delivery.types";
import { Milk, Syrup, Additive, Ice, Size } from "@/enums";

export type CartItemType = {
  index: number;
  product_snapshot: ProductType;
  product_id: string;
  quantity: number;
  size: Size;
  milk: Milk;
  syrup: Syrup;
  additives: Additive[];
  ice: Ice;
  name?: string;
};

export type OrderType = {
  id?: string;
  created_at: Timestamp;
  products: CartItemType[];
  total_price: number;
  user_uid: string;
  branch: BranchType;
  payment_status: PaymentStatusType;
  payment_at?: Timestamp;
  payment_option: PaymentOptionType;
  delivery_at?: Timestamp;
  delivery_status: DeliveryStatusType;
  delivery_option: DeliveryOptionType;
  delivery_address_id?: string;
  delivery_fee?: number;
};
