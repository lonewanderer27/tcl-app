export enum PaymentOptionType {
  OverTheCounter = "Over the Counter",
  GCash = "GCash",
  LazadaPay = "Lazada Wallet",
  ShopeePay = "Shopee Pay",
  PayMaya = "PayMaya",
  CoinsPH = "Coins.ph",
  GooglePay = "Google Pay",
  ApplePay = "Apple Pay",
  CreditCard = "Credit Card",
  DebitCard = "Debit Card",
}

export enum PaymentStatusType {
  Paid = "paid",
  Pending = "pending",
}

export type CardItemType = {
  id?: string;
  cardNumber: string;
  cardHolder: string;
  cardType?: string;
  expiryDate?: string;
  cvc?: string;
  default?: boolean;
};
