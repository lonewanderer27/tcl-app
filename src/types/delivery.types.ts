import { AddressType } from "./user.types";

export enum DeliveryStatusType {
  Pending = "Pending",
  Preparing = "Preparing",
  OnTheWay = "On the Way",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export enum DeliveryOptionType {
  Pickup = "Pickup",
  Delivery = "Delivery",
}

export type BranchType = {
  id?: string;
  name?: string;
  address: AddressType;
  main: boolean;
};
