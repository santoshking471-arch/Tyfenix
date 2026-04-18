import type { backendInterface, Product, Customer, Order, Analytics, CartItem, ShippingAddress } from "../backend";
import { OrderStatus, ProductCategory, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleAddress: ShippingAddress = {
  street: "123 Neon Street",
  city: "SlimeCity",
  state: "CA",
  postalCode: "90210",
  country: "US",
};

const sampleProducts: Product[] = [
  {
    id: BigInt(0),
    name: "HyperSlime Pro Wireless Headphones",
    description: "Premium noise-cancelling headphones with 40hr battery life and crystal-clear sound.",
    price: BigInt(12999),
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: ProductCategory.Electronics,
    stock: BigInt(50),
    isActive: true,
    rating: 4.8,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(1),
    name: "NeonEdge Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches and full N-key rollover.",
    price: BigInt(8999),
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    category: ProductCategory.Electronics,
    stock: BigInt(35),
    isActive: true,
    rating: 4.6,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(2),
    name: "SlimeWave Smart Watch Pro",
    description: "Track your health and stay connected. Heart rate monitoring, GPS, sleep tracking.",
    price: BigInt(24999),
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: ProductCategory.Electronics,
    stock: BigInt(28),
    isActive: true,
    rating: 4.9,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(3),
    name: "GlowFlex Yoga Mat Premium",
    description: "Non-slip 6mm thick eco-friendly yoga mat with alignment marks and carrying strap.",
    price: BigInt(4999),
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    category: ProductCategory.Sports,
    stock: BigInt(80),
    isActive: true,
    rating: 4.5,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(4),
    name: "Urban Drift Sneakers",
    description: "Lightweight performance sneakers with cushioned sole and breathable mesh upper.",
    price: BigInt(7499),
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: ProductCategory.Clothing,
    stock: BigInt(60),
    isActive: true,
    rating: 4.4,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(5),
    name: "AromaBurst Luxury Candle Set",
    description: "Set of 4 hand-poured soy wax candles in premium glass jars.",
    price: BigInt(3499),
    imageUrl: "https://images.unsplash.com/photo-1602178506379-8f26789a0ff3?w=400",
    category: ProductCategory.HomeGarden,
    stock: BigInt(120),
    isActive: true,
    rating: 4.7,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(6),
    name: "Nano Mist Facial Skincare Kit",
    description: "Complete 5-step skincare routine kit including cleanser, toner, serum, and moisturizer.",
    price: BigInt(5999),
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    category: ProductCategory.Beauty,
    stock: BigInt(45),
    isActive: true,
    rating: 4.6,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(7),
    name: "The Art of Deep Focus",
    description: "Bestselling guide on productivity, mindfulness, and achieving peak mental performance.",
    price: BigInt(1299),
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    category: ProductCategory.Books,
    stock: BigInt(200),
    isActive: true,
    rating: 4.3,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

const sampleCustomer: Customer = {
  id: { toText: () => "aaaaa-bbbbb" } as unknown as Principal,
  name: "Alex SlimeFan",
  email: "alex@slimeshop.io",
  role: UserRole.Customer,
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  addresses: [sampleAddress],
};

const sampleOrders: Order[] = [
  {
    id: BigInt(0),
    customerId: sampleCustomer.id,
    items: [
      { productId: BigInt(0), quantity: BigInt(1), unitPrice: BigInt(12999) },
      { productId: BigInt(1), quantity: BigInt(2), unitPrice: BigInt(8999) },
    ],
    totalAmount: BigInt(30997),
    status: OrderStatus.Delivered,
    shippingAddress: sampleAddress,
    createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(1),
    customerId: sampleCustomer.id,
    items: [
      { productId: BigInt(2), quantity: BigInt(1), unitPrice: BigInt(24999) },
    ],
    totalAmount: BigInt(24999),
    status: OrderStatus.Shipped,
    shippingAddress: sampleAddress,
    createdAt: BigInt(Date.now() - 3600000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

const sampleCart: CartItem[] = [
  { productId: BigInt(3), quantity: BigInt(1) },
  { productId: BigInt(4), quantity: BigInt(2) },
];

const sampleAnalytics: Analytics = {
  totalRevenue: BigInt(458920),
  orderCount: BigInt(42),
  topProducts: [
    { productId: BigInt(2), name: "SlimeWave Smart Watch Pro", totalSold: BigInt(18), revenue: BigInt(449982) },
    { productId: BigInt(0), name: "HyperSlime Pro Wireless Headphones", totalSold: BigInt(15), revenue: BigInt(194985) },
    { productId: BigInt(1), name: "NeonEdge Gaming Mechanical Keyboard", totalSold: BigInt(12), revenue: BigInt(107988) },
  ],
};

export const mockBackend: backendInterface = {
  addAddress: async (_address) => ({ __kind__: "ok", ok: sampleCustomer }),
  addToCart: async (_productId, _quantity) => ({ __kind__: "ok", ok: null }),
  clearCart: async () => undefined,
  createProduct: async (name, description, price, imageUrl, category, stock) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      isActive: true,
      rating: 0,
      createdAt: BigInt(Date.now()) * BigInt(1000000),
    },
  }),
  deleteProduct: async (_id) => ({ __kind__: "ok", ok: null }),
  getAnalytics: async () => sampleAnalytics,
  getCart: async () => sampleCart,
  getMyProfile: async () => sampleCustomer,
  getOrder: async (id) => sampleOrders.find(o => o.id === id) ?? null,
  getProduct: async (id) => sampleProducts.find(p => p.id === id) ?? null,
  listAllOrders: async () => sampleOrders,
  listCustomers: async () => [sampleCustomer],
  listMyOrders: async () => sampleOrders,
  listProducts: async (category) =>
    category === null ? sampleProducts : sampleProducts.filter(p => p.category === category),
  placeOrder: async (shippingAddress) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      customerId: sampleCustomer.id,
      items: sampleCart.map(c => ({ productId: c.productId, quantity: c.quantity, unitPrice: BigInt(5000) })),
      totalAmount: BigInt(15000),
      status: OrderStatus.Pending,
      shippingAddress,
      createdAt: BigInt(Date.now()) * BigInt(1000000),
      updatedAt: BigInt(Date.now()) * BigInt(1000000),
    },
  }),
  registerCustomer: async (name, email) => ({
    __kind__: "ok",
    ok: { ...sampleCustomer, name, email },
  }),
  removeFromCart: async (_productId) => ({ __kind__: "ok", ok: null }),
  searchProducts: async (term) =>
    sampleProducts.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    ),
  setCustomerRole: async (_customerId, role) => ({
    __kind__: "ok",
    ok: { ...sampleCustomer, role },
  }),
  updateCartItem: async (_productId, _quantity) => ({ __kind__: "ok", ok: null }),
  updateOrderStatus: async (id, status) => {
    const order = sampleOrders.find(o => o.id === id);
    if (!order) return { __kind__: "err", err: { __kind__: "NotFound", NotFound: "Order not found" } };
    return { __kind__: "ok", ok: { ...order, status } };
  },
  updateProduct: async (id, name, description, price, imageUrl, category, stock, isActive) => {
    const product = sampleProducts.find(p => p.id === id);
    if (!product) return { __kind__: "err", err: { __kind__: "NotFound", NotFound: "Product not found" } };
    return {
      __kind__: "ok",
      ok: {
        ...product,
        name: name ?? product.name,
        description: description ?? product.description,
        price: price ?? product.price,
        imageUrl: imageUrl ?? product.imageUrl,
        category: category ?? product.category,
        stock: stock ?? product.stock,
        isActive: isActive ?? product.isActive,
      },
    };
  },
  updateProfile: async (name, email) => ({
    __kind__: "ok",
    ok: {
      ...sampleCustomer,
      name: name ?? sampleCustomer.name,
      email: email ?? sampleCustomer.email,
    },
  }),
  uploadProductImage: async (_id, _imageUrl) => ({ __kind__: "ok", ok: null }),
};
