export type {
  Product,
  Order,
  OrderItem,
  Customer,
  CartItem,
  Analytics,
  ShippingAddress,
  ProductSales,
  Error_,
  Timestamp,
  ProductId,
  OrderId,
  UserId,
  Result,
  Result_1,
  Result_2,
  Result_3,
  Option,
  Some,
  None,
} from "../backend.d";

export { OrderStatus, ProductCategory, UserRole } from "../backend.d";

// UI-extended types
export interface CartItemWithProduct {
  productId: bigint;
  quantity: bigint;
  product?: import("../backend.d").Product;
}
