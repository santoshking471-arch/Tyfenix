import { r as reactExports, j as jsxRuntimeExports, f as cn } from "./index-C-xUBXvy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function GradientText({
  children,
  className,
  as: Tag = "span",
  variant = "primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      className: cn(
        "text-transparent bg-clip-text inline-block",
        variant === "primary" && "glow-neon-primary",
        variant === "accent" && "glow-neon-accent",
        className
      ),
      style: variant === "primary" ? {
        backgroundImage: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))"
      } : {
        backgroundImage: "linear-gradient(90deg, oklch(0.75 0.22 145), oklch(0.68 0.25 150))"
      },
      children
    }
  );
}
function AnimatedBlobs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 pointer-events-none overflow-hidden",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-animate absolute",
            style: {
              width: "600px",
              height: "600px",
              borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
              background: "radial-gradient(ellipse at center, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.04) 50%, transparent 70%)",
              top: "-150px",
              left: "-100px",
              filter: "blur(40px)",
              animationDelay: "0s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-animate absolute",
            style: {
              width: "700px",
              height: "700px",
              borderRadius: "40% 60% 30% 70% / 60% 40% 50% 50%",
              background: "radial-gradient(ellipse at center, rgba(183,0,255,0.10) 0%, rgba(183,0,255,0.04) 50%, transparent 70%)",
              top: "30%",
              right: "-200px",
              filter: "blur(50px)",
              animationDelay: "2s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-animate absolute",
            style: {
              width: "500px",
              height: "500px",
              borderRadius: "50% 50% 60% 40% / 40% 60% 50% 50%",
              background: "radial-gradient(ellipse at center, rgba(100,50,255,0.08) 0%, rgba(0,200,100,0.05) 50%, transparent 70%)",
              bottom: "10%",
              left: "20%",
              filter: "blur(45px)",
              animationDelay: "4s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-animate absolute",
            style: {
              width: "300px",
              height: "300px",
              borderRadius: "70% 30% 40% 60% / 40% 70% 30% 60%",
              background: "radial-gradient(ellipse at center, rgba(0,255,136,0.08) 0%, transparent 70%)",
              bottom: "5%",
              right: "10%",
              filter: "blur(35px)",
              animationDelay: "1s"
            }
          }
        )
      ]
    }
  );
}
function SlimeCard({
  children,
  className,
  glowing = false,
  hoverable = false,
  onClick,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "glass-card float-entrance",
        glowing && "glow-border",
        hoverable && "hover-lift cursor-pointer",
        className
      ),
      onClick,
      onKeyUp: onClick ? (e) => e.key === "Enter" && onClick() : void 0,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      "data-ocid": dataOcid,
      style: {
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-3xl pointer-events-none",
            style: {
              background: "linear-gradient(135deg, rgba(0,255,136,0.03) 0%, rgba(183,0,255,0.03) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children })
      ]
    }
  );
}
export {
  AnimatedBlobs as A,
  GradientText as G,
  Menu as M,
  SlimeCard as S,
  X,
  ShoppingCart as a,
  createLucideIcon as c
};
