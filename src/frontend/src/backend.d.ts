import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Product;
} | {
    __kind__: "err";
    err: Error_;
};
export interface ProductSales {
    revenue: bigint;
    name: string;
    productId: ProductId;
    totalSold: bigint;
}
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    postalCode: string;
    state: string;
}
export interface OrderItem {
    productId: ProductId;
    quantity: bigint;
    unitPrice: bigint;
}
export type Error_ = {
    __kind__: "InvalidInput";
    InvalidInput: string;
} | {
    __kind__: "OutOfStock";
    OutOfStock: string;
} | {
    __kind__: "NotFound";
    NotFound: string;
} | {
    __kind__: "Unauthorized";
    Unauthorized: string;
} | {
    __kind__: "AlreadyExists";
    AlreadyExists: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Customer;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Order {
    id: OrderId;
    status: OrderStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalAmount: bigint;
    shippingAddress: ShippingAddress;
    customerId: UserId;
    items: Array<OrderItem>;
}
export interface Customer {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
    addresses: Array<ShippingAddress>;
}
export type UserId = Principal;
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Order;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Analytics {
    orderCount: bigint;
    topProducts: Array<ProductSales>;
    totalRevenue: bigint;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    stock: bigint;
    imageUrl: string;
    category: ProductCategory;
    rating: number;
    price: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum ProductCategory {
    Food = "Food",
    Books = "Books",
    Other = "Other",
    Beauty = "Beauty",
    Electronics = "Electronics",
    HomeGarden = "HomeGarden",
    Clothing = "Clothing",
    Sports = "Sports"
}
export enum UserRole {
    Customer = "Customer",
    Admin = "Admin"
}
export interface backendInterface {
    addAddress(address: ShippingAddress): Promise<Result_1>;
    addToCart(productId: ProductId, quantity: bigint): Promise<Result>;
    clearCart(): Promise<void>;
    createProduct(name: string, description: string, price: bigint, imageUrl: string, category: ProductCategory, stock: bigint): Promise<Result_2>;
    deleteProduct(id: ProductId): Promise<Result>;
    getAnalytics(): Promise<Analytics>;
    getCart(): Promise<Array<CartItem>>;
    getMyProfile(): Promise<Customer | null>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    listAllOrders(): Promise<Array<Order>>;
    listCustomers(): Promise<Array<Customer>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(category: ProductCategory | null): Promise<Array<Product>>;
    placeOrder(shippingAddress: ShippingAddress): Promise<Result_3>;
    registerCustomer(name: string, email: string): Promise<Result_1>;
    removeFromCart(productId: ProductId): Promise<Result>;
    searchProducts(term: string): Promise<Array<Product>>;
    setCustomerRole(customerId: UserId, role: UserRole): Promise<Result_1>;
    updateCartItem(productId: ProductId, quantity: bigint): Promise<Result>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Result_3>;
    updateProduct(id: ProductId, name: string | null, description: string | null, price: bigint | null, imageUrl: string | null, category: ProductCategory | null, stock: bigint | null, isActive: boolean | null): Promise<Result_2>;
    updateProfile(name: string | null, email: string | null): Promise<Result_1>;
    uploadProductImage(id: ProductId, imageUrl: string): Promise<Result>;
}
