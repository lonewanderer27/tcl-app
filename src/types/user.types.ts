import { Timestamp } from "firebase/firestore";

export type UserType = {
  id: string;
  addresses?: DeliveryAddressType[];
  default_address?: string;
  nickname?: string;
  gender?: string;
  pronouns?: string;
  favorites?: string[];
  updatedAt: Timestamp;
  createdAt: Timestamp;
  onboarded?: boolean;
};

export interface AddressType {
  id?: string;
  unit_number?: string;
  street_number?: string;
  street_name?: string;
  barangay: string;
  city: string;
  province?: string;
  region?: string;
  postal_code?: number;
  address_line2?: string;
  phone_number?: string;
  tel_number?: string;
  type: "home" | "work";
}

export interface DeliveryAddressType extends AddressType {
  name: string;
  user_uid: string;
  default: boolean;
}
