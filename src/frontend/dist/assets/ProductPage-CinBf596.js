import { c as useParams, d as useNavigate, r as reactExports, a as useCart, j as jsxRuntimeExports, S as Skeleton, L as Link, b as ue } from "./index-C-xUBXvy.js";
import { B as Button, a as Badge } from "./button-YysK_q9R.js";
import { S as SlimeCard, G as GradientText, a as ShoppingCart } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { b as useProduct } from "./useBackend-kSR7reZp.js";
import { P as Package } from "./package-DAmhj-Wa.js";
import { A as ArrowLeft } from "./arrow-left-C8-eApCu.js";
import { S as Star } from "./star-Cy93rEy1.js";
import { S as Shield } from "./user-wbdDhPfK.js";
import { T as Truck } from "./truck-DrLHHEJo.js";
import "./input-DdCZie-x.js";
function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const [quantity, setQuantity] = reactExports.useState(1);
  const { data: product, isLoading } = useProduct(id ? BigInt(id) : null);
  const { addItem } = useCart();
  const handleAddToCart = async () => {
    if (!product) return;
    await addItem(product.id, BigInt(quantity));
    ue.success(`${product.name} ×${quantity} added to cart!`, {
      icon: "🛒"
    });
  };
  const handleBuyNow = async () => {
    if (!product) return;
    await addItem(product.id, BigInt(quantity));
    navigate({ to: "/cart" });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-3xl bg-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 bg-white/5 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3 bg-white/5 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full bg-white/5 rounded-2xl" })
      ] })
    ] }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 py-24 text-center",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 64, className: "mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "rounded-2xl",
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              children: "Back to Store"
            }
          ) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm",
        "data-ocid": "product.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
          "Back to Store"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SlimeCard, { className: "aspect-square overflow-hidden p-0 rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.imageUrl || "/assets/images/placeholder.svg",
          alt: product.name,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.target.src = "/assets/images/placeholder.svg";
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "mb-3 rounded-xl",
              style: {
                background: "rgba(0,255,136,0.15)",
                color: "oklch(0.68 0.25 150)"
              },
              children: product.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display leading-tight mb-2", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 16,
                className: s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              product.rating.toFixed(1),
              " rating"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-4xl font-bold", as: "div", children: [
          "$",
          (Number(product.price) / 100).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: product.stock > 0n ? "text-primary" : "text-destructive",
              children: product.stock > 0n ? `${Number(product.stock)} in stock` : "Out of stock"
            }
          )
        ] }),
        product.stock > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Quantity:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 glass-card rounded-2xl px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQuantity(Math.max(1, quantity - 1)),
                className: "text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center",
                "data-ocid": "product.qty_decrease_button",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold w-6 text-center", children: quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQuantity(Math.min(Number(product.stock), quantity + 1)),
                className: "text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center",
                "data-ocid": "product.qty_increase_button",
                children: "+"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddToCart,
              disabled: product.stock === 0n || !product.isActive,
              size: "lg",
              variant: "outline",
              className: "flex-1 rounded-2xl border-primary/30 hover:border-primary/60 gap-2",
              "data-ocid": "product.add_to_cart_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18 }),
                "Add to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleBuyNow,
              disabled: product.stock === 0n || !product.isActive,
              size: "lg",
              className: "flex-1 rounded-2xl font-semibold pulsing-glow",
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              "data-ocid": "product.buy_now_button",
              children: "Buy Now"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-2", children: [
          { icon: Shield, label: "Secure Payment" },
          { icon: Truck, label: "Fast Delivery" },
          { icon: Package, label: "Easy Returns" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-3 text-center rounded-2xl flex flex-col items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
            ]
          },
          label
        )) })
      ] })
    ] })
  ] }) });
}
export {
  ProductPage as default
};
