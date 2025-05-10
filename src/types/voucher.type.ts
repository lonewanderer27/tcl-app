import { Timestamp } from "firebase/firestore";

export interface VoucherType {
  id?: string;
  code: string;
  discount: number;
  min_spend: number;
  max_discount: number;
  start_date: Timestamp;
  end_date: Timestamp;
  active: boolean;
  type: "percent" | "fixed";
  created_at: Timestamp;
  updated_at: Timestamp;
}
