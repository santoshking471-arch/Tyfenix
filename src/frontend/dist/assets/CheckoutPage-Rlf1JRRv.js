import { a as useCart, e as useAuth, d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-C-xUBXvy.js";
import { B as Button } from "./button-YysK_q9R.js";
import { I as Input } from "./input-DdCZie-x.js";
import { L as Label } from "./label-DxJJGHq_.js";
import { S as SlimeCard, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { c as usePlaceOrder } from "./useBackend-kSR7reZp.js";
import { C as CircleCheck } from "./circle-check-ITTQN9av.js";
import { A as ArrowLeft } from "./arrow-left-C8-eApCu.js";
import { M as MapPin } from "./map-pin-4W5ha7J5.js";
import "./user-wbdDhPfK.js";
const emptyAddress = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: ""
};
function CheckoutPage() {
  const { items, products, totalPrice, clearCart } = useCart();
  const { isAuthenticated, customer } = useAuth();
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();
  const [address, setAddress] = reactExports.useState(
    (customer == null ? void 0 : customer.addresses[0]) ?? emptyAddress
  );
  const [placed, setPlaced] = reactExports.useState(false);
  const handleField = (field) => (e) => {
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      ue.error("Please sign in to place an order.");
      return;
    }
    try {
      await placeOrder.mutateAsync(address);
      await clearCart();
      setPlaced(true);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to place order");
    }
  };
  if (placed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 py-24 text-center float-entrance", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-12", glowing: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 64, className: "mx-auto text-primary mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-3xl font-bold block mb-3", as: "h2", children: "Order Placed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Your order has been confirmed and is being processed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "rounded-2xl border-white/10",
            onClick: () => navigate({ to: "/orders" }),
            "data-ocid": "checkout.view_orders_button",
            children: "View Orders"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "rounded-2xl font-semibold",
            style: {
              background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
              color: "#0a0e27"
            },
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "checkout.continue_shopping_button",
            children: "Keep Shopping"
          }
        )
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/cart" }),
        className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm",
        "data-ocid": "checkout.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
          "Back to Cart"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display mb-8 float-entrance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { as: "span", children: "Checkout" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }),
          "Shipping Address"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Street Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: address.street,
                onChange: handleField("street"),
                placeholder: "123 Main St",
                required: true,
                className: "bg-white/5 border-white/10 rounded-2xl",
                "data-ocid": "checkout.street_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: address.city,
                  onChange: handleField("city"),
                  placeholder: "New York",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "checkout.city_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: address.state,
                  onChange: handleField("state"),
                  placeholder: "NY",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "checkout.state_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Postal Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: address.postalCode,
                  onChange: handleField("postalCode"),
                  placeholder: "10001",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "checkout.postal_code_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: address.country,
                  onChange: handleField("country"),
                  placeholder: "United States",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "checkout.country_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: placeOrder.isPending || items.length === 0,
              className: "w-full rounded-2xl font-semibold mt-2 pulsing-glow",
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              "data-ocid": "checkout.place_order_button",
              children: placeOrder.isPending ? "Placing Order…" : "Place Order"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-6", glowing: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4 max-h-64 overflow-y-auto", children: items.map((item) => {
          const product = products.get(item.productId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: (product == null ? void 0 : product.imageUrl) || "/assets/images/placeholder.svg",
                    alt: product == null ? void 0 : product.name,
                    className: "w-10 h-10 rounded-xl object-cover shrink-0",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-foreground", children: (product == null ? void 0 : product.name) ?? "…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                    "×",
                    Number(item.quantity)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground shrink-0", children: [
                  "$",
                  product ? (Number(product.price) * Number(item.quantity) / 100).toFixed(2) : "—"
                ] })
              ]
            },
            item.productId.toString()
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-4 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-xl font-bold", children: [
            "$",
            (Number(totalPrice) / 100).toFixed(2)
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  CheckoutPage as default
};
