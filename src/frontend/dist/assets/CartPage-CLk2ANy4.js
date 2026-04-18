import { a as useCart, d as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-C-xUBXvy.js";
import { B as Button } from "./button-YysK_q9R.js";
import { c as createLucideIcon, G as GradientText, S as SlimeCard } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { S as ShoppingBag } from "./shopping-bag-x08r9tY8.js";
import { P as Plus, T as Trash2 } from "./trash-2-une7tHpK.js";
import "./input-DdCZie-x.js";
import "./user-wbdDhPfK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function CartPage() {
  const {
    items,
    products,
    isLoading,
    totalItems,
    totalPrice,
    updateItem,
    removeItem,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-12 space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-card h-24 animate-pulse rounded-3xl bg-white/5"
      },
      i
    )) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold font-display mb-8 float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { as: "span", children: "Shopping Cart" }),
      totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 text-lg text-muted-foreground font-normal", children: [
        "(",
        totalItems,
        " item",
        totalItems !== 1 ? "s" : "",
        ")"
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-16 text-center", "data-ocid": "cart.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShoppingBag,
        {
          size: 64,
          className: "mx-auto text-muted-foreground mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Discover amazing products and add them to your cart." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "rounded-2xl font-semibold",
          style: {
            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
            color: "#0a0e27"
          },
          "data-ocid": "cart.continue_shopping_button",
          children: "Continue Shopping"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      items.map((item, idx) => {
        const product = products.get(item.productId);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlimeCard,
          {
            className: "p-4",
            "data-ocid": `cart.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/product/$id",
                  params: { id: item.productId.toString() },
                  className: "shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: (product == null ? void 0 : product.imageUrl) || "/assets/images/placeholder.svg",
                      alt: (product == null ? void 0 : product.name) ?? "Product",
                      className: "w-16 h-16 object-cover rounded-2xl",
                      onError: (e) => {
                        e.target.src = "/assets/images/placeholder.svg";
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/product/$id",
                    params: { id: item.productId.toString() },
                    className: "font-semibold text-foreground hover:text-primary transition-colors truncate block",
                    children: (product == null ? void 0 : product.name) ?? "Loading..."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "$",
                  product ? (Number(product.price) / 100).toFixed(2) : "—",
                  " ",
                  "each"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 glass-card rounded-2xl px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateItem(item.productId, item.quantity - 1n),
                    className: "w-7 h-7 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground",
                    "aria-label": "Decrease quantity",
                    "data-ocid": `cart.decrease.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-semibold text-sm", children: Number(item.quantity) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateItem(item.productId, item.quantity + 1n),
                    className: "w-7 h-7 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground",
                    "aria-label": "Increase quantity",
                    "data-ocid": `cart.increase.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-base font-bold shrink-0", children: [
                "$",
                product ? (Number(product.price) * Number(item.quantity) / 100).toFixed(2) : "—"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeItem(item.productId),
                  className: "text-muted-foreground hover:text-destructive transition-colors shrink-0",
                  "aria-label": "Remove item",
                  "data-ocid": `cart.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
                }
              )
            ] })
          },
          item.productId.toString()
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-6 mt-6", glowing: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-2xl font-bold", children: [
            "$",
            (Number(totalPrice) / 100).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Shipping and taxes calculated at checkout." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: clearCart,
              className: "text-muted-foreground hover:text-destructive rounded-2xl",
              "data-ocid": "cart.clear_button",
              children: "Clear Cart"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 rounded-2xl font-semibold gap-2 pulsing-glow",
              onClick: () => navigate({ to: "/checkout" }),
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              "data-ocid": "cart.checkout_button",
              children: [
                "Proceed to Checkout",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as default
};
