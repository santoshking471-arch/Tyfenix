import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// ─── Lazy page imports ─────────────────────────────────────────────────────
const StorefrontPage = lazy(() => import("./pages/StorefrontPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

// ─── Page fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-7xl mx-auto">
      <Skeleton className="h-8 w-48 bg-white/5" />
      <Skeleton className="h-64 w-full bg-white/5 rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["col1", "col2", "col3"].map((key) => (
          <Skeleton key={key} className="h-48 bg-white/5 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Query client ──────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

// ─── Routes ────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(10,14,39,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f2f2f2",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: StorefrontPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: AdminProducts,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: AdminOrders,
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/customers",
  component: AdminCustomers,
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/analytics",
  component: AdminAnalytics,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  accountRoute,
  adminRoute,
  adminProductsRoute,
  adminOrdersRoute,
  adminCustomersRoute,
  adminAnalyticsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
