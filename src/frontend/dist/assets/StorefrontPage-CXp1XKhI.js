import { r as reactExports, u as useSearch, a as useCart, j as jsxRuntimeExports, L as Link, b as ue } from "./index-C-xUBXvy.js";
import { B as Button, a as Badge } from "./button-YysK_q9R.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-5qq_wYLR.js";
import { c as createLucideIcon, G as GradientText, S as SlimeCard } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { u as useProducts, a as useSearchProducts } from "./useBackend-kSR7reZp.js";
import { P as ProductCategory } from "./backend.d-WMp6k-0J.js";
import { S as ShoppingBag } from "./shopping-bag-x08r9tY8.js";
import { C as ChevronDown } from "./chevron-down-BnEBQWkT.js";
import { S as Star } from "./star-Cy93rEy1.js";
import "./index-2eVEModj.js";
import "./index-DfrNwFal.js";
import "./input-DdCZie-x.js";
import "./user-wbdDhPfK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const CATEGORIES = [
  { label: "All Products", value: null },
  { label: "Electronics", value: ProductCategory.Electronics },
  { label: "Clothing", value: ProductCategory.Clothing },
  { label: "Beauty", value: ProductCategory.Beauty },
  { label: "Home & Garden", value: ProductCategory.HomeGarden },
  { label: "Sports", value: ProductCategory.Sports },
  { label: "Books", value: ProductCategory.Books },
  { label: "Food", value: ProductCategory.Food },
  { label: "Other", value: ProductCategory.Other }
];
function StorefrontPage() {
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const searchParams = useSearch({ strict: false });
  const searchTerm = searchParams.q ?? "";
  const { data: allProducts = [], isLoading } = useProducts(selectedCategory);
  const { data: searchResults = [], isLoading: searchLoading } = useSearchProducts(searchTerm);
  const { addItem } = useCart();
  const products = searchTerm ? searchResults : allProducts;
  const loading = searchTerm ? searchLoading : isLoading;
  const handleAddToCart = async (productId, name) => {
    await addItem(productId, 1n);
    ue.success(`${name} added to cart!`, {
      icon: "🛒"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-20 px-4 text-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Premium Shopping Experience" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-6 leading-tight font-display", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { as: "span", children: "Discover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Amazing Products" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground max-w-xl mx-auto mb-8", children: "Shop the finest collection curated for you — from cutting-edge electronics to luxurious beauty essentials." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "rounded-2xl px-8 font-semibold pulsing-glow",
          style: {
            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
            color: "#0a0e27"
          },
          "data-ocid": "hero.shop_now_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "mr-2" }),
            "Shop Now"
          ]
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.slice(0, 5).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedCategory(cat.value),
          "data-ocid": `filter.${cat.label.replace(/\s+/g, "_").toLowerCase()}_tab`,
          className: `px-4 py-2 rounded-2xl text-sm font-medium transition-smooth ${selectedCategory === cat.value ? "text-background font-semibold" : "glass-card text-muted-foreground hover:text-foreground"}`,
          style: selectedCategory === cat.value ? {
            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))"
          } : {},
          children: cat.label
        },
        cat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-2 glass-card rounded-2xl text-muted-foreground",
            "data-ocid": "filter.more_categories_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14 }),
              "More",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14 })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DropdownMenuContent,
          {
            className: "border border-white/10 rounded-2xl",
            style: {
              background: "rgba(10,14,39,0.95)",
              backdropFilter: "blur(20px)"
            },
            children: CATEGORIES.slice(5).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownMenuItem,
              {
                onClick: () => setSelectedCategory(cat.value),
                className: "rounded-xl text-muted-foreground focus:text-foreground focus:bg-white/10 cursor-pointer",
                "data-ocid": `filter.${cat.label.replace(/\s+/g, "_").toLowerCase()}_item`,
                children: cat.label
              },
              cat.label
            ))
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 pb-16", children: [
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6 text-sm", children: [
        "Search results for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
          '"',
          searchTerm,
          '"'
        ] }),
        " ",
        "— ",
        products.length,
        " product",
        products.length !== 1 ? "s" : "",
        " found"
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "glass-card rounded-3xl h-72 animate-pulse bg-white/5"
        },
        key
      )) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card p-16 text-center rounded-3xl",
          "data-ocid": "products.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShoppingBag,
              {
                size: 48,
                className: "mx-auto text-muted-foreground mb-4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: searchTerm ? "Try a different search term." : "No products available in this category yet." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SlimeCard,
        {
          hoverable: true,
          glowing: true,
          className: "flex flex-col overflow-hidden p-0",
          "data-ocid": `products.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/product/$id",
                params: { id: product.id.toString() },
                className: "block",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-t-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl || "/assets/images/placeholder.svg",
                    alt: product.name,
                    className: "w-full h-full object-cover hover:scale-105 transition-smooth",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/product/$id",
                    params: { id: product.id.toString() },
                    className: "font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm leading-snug",
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "shrink-0 text-xs rounded-xl",
                    style: {
                      background: "rgba(0,255,136,0.15)",
                      color: "oklch(0.68 0.25 150)"
                    },
                    children: product.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 12,
                    className: "fill-yellow-400 text-yellow-400"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: product.rating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                  "(",
                  Number(product.stock),
                  " in stock)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-lg font-bold", children: [
                  "$",
                  (Number(product.price) / 100).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: () => handleAddToCart(product.id, product.name),
                    disabled: product.stock === 0n || !product.isActive,
                    className: "rounded-xl text-xs font-semibold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                      color: "#0a0e27"
                    },
                    "data-ocid": `products.add_to_cart.${idx + 1}`,
                    children: product.stock === 0n ? "Out of Stock" : "Add to Cart"
                  }
                )
              ] })
            ] })
          ]
        },
        product.id.toString()
      )) })
    ] })
  ] });
}
export {
  StorefrontPage as default
};
