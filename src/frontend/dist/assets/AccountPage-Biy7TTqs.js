import { r as reactExports, j as jsxRuntimeExports, f as cn, e as useAuth, b as ue } from "./index-C-xUBXvy.js";
import { B as Button } from "./button-YysK_q9R.js";
import { I as Input } from "./input-DdCZie-x.js";
import { L as Label } from "./label-DxJJGHq_.js";
import { u as useDirection, a as useControllableState, P as Primitive, b as useId, c as composeEventHandlers, d as Presence, e as createContextScope } from "./index-2eVEModj.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope } from "./index-DfrNwFal.js";
import { c as createLucideIcon, S as SlimeCard, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { e as useUpdateProfile, d as useMyOrders } from "./useBackend-kSR7reZp.js";
import { U as User } from "./user-wbdDhPfK.js";
import { P as Package } from "./package-DAmhj-Wa.js";
import { M as MapPin } from "./map-pin-4W5ha7J5.js";
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
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function AccountPage() {
  const { isAuthenticated, customer, login, registerCustomer, refreshProfile } = useAuth();
  const updateProfile = useUpdateProfile();
  const { data: orders = [] } = useMyOrders();
  const [editName, setEditName] = reactExports.useState((customer == null ? void 0 : customer.name) ?? "");
  const [editEmail, setEditEmail] = reactExports.useState((customer == null ? void 0 : customer.email) ?? "");
  const [regName, setRegName] = reactExports.useState("");
  const [regEmail, setRegEmail] = reactExports.useState("");
  const [registering, setRegistering] = reactExports.useState(false);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-4 py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-12", "data-ocid": "account.auth_required", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 64, className: "mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Sign in to your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Manage your profile, orders, and addresses." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: login,
          className: "rounded-2xl font-semibold px-8 pulsing-glow",
          style: {
            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
            color: "#0a0e27"
          },
          "data-ocid": "account.login_button",
          children: "Sign In"
        }
      )
    ] }) }) });
  }
  if (!customer) {
    const handleRegister = async (e) => {
      e.preventDefault();
      if (!regName.trim() || !regEmail.trim()) return;
      setRegistering(true);
      try {
        await registerCustomer(regName, regEmail);
        ue.success("Account created!");
      } catch (err) {
        ue.error(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setRegistering(false);
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-8",
        glowing: true,
        "data-ocid": "account.registration_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold block mb-2", as: "h2", children: "Complete Your Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Set up your account to start shopping." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegister, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: regName,
                  onChange: (e) => setRegName(e.target.value),
                  placeholder: "Alex Johnson",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "account.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: regEmail,
                  onChange: (e) => setRegEmail(e.target.value),
                  placeholder: "alex@example.com",
                  required: true,
                  className: "bg-white/5 border-white/10 rounded-2xl",
                  "data-ocid": "account.email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: registering,
                className: "w-full rounded-2xl font-semibold",
                style: {
                  background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27"
                },
                "data-ocid": "account.register_submit_button",
                children: registering ? "Creating Account…" : "Create Account"
              }
            )
          ] })
        ]
      }
    ) }) });
  }
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({ name: editName, email: editEmail });
      await refreshProfile();
      ue.success("Profile updated!");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Update failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GradientText,
        {
          className: "text-3xl font-bold block font-display",
          as: "h1",
          children: "My Account"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
        "Welcome back, ",
        customer.name
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsList,
        {
          className: "mb-6 rounded-2xl p-1 h-auto gap-1",
          style: { background: "rgba(255,255,255,0.05)" },
          children: [
            { value: "profile", icon: User, label: "Profile" },
            { value: "orders", icon: Package, label: "Orders" },
            { value: "addresses", icon: MapPin, label: "Addresses" }
          ].map(({ value, icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value,
              className: "rounded-xl gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
              "data-ocid": `account.${value}_tab`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 }),
                label
              ]
            },
            value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 18, className: "text-primary" }),
          "Profile Settings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleUpdateProfile,
            className: "space-y-4 max-w-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: editName,
                    onChange: (e) => setEditName(e.target.value),
                    className: "bg-white/5 border-white/10 rounded-2xl",
                    "data-ocid": "account.edit_name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs mb-1.5 block", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    value: editEmail,
                    onChange: (e) => setEditEmail(e.target.value),
                    className: "bg-white/5 border-white/10 rounded-2xl",
                    "data-ocid": "account.edit_email_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: updateProfile.isPending,
                  className: "rounded-2xl font-semibold",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                    color: "#0a0e27"
                  },
                  "data-ocid": "account.save_profile_button",
                  children: updateProfile.isPending ? "Saving…" : "Save Changes"
                }
              )
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SlimeCard,
        {
          className: "p-12 text-center",
          "data-ocid": "account.orders_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Package,
              {
                size: 40,
                className: "mx-auto text-muted-foreground mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No orders yet." })
          ]
        }
      ) : orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlimeCard,
        {
          className: "p-4",
          "data-ocid": `account.order.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                "Order #",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                Number(order.createdAt) / 1e6
              ).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "font-bold", children: [
                "$",
                (Number(order.totalAmount) / 100).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.status })
            ] })
          ] })
        },
        order.id.toString()
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "addresses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Saved Addresses" })
        ] }),
        customer.addresses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-8",
            "data-ocid": "account.addresses_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  size: 40,
                  className: "mx-auto text-muted-foreground mb-3"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No saved addresses. Add one at checkout." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: customer.addresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-4 rounded-2xl text-sm",
            "data-ocid": `account.address.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: addr.street }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                addr.city,
                ", ",
                addr.state,
                " ",
                addr.postalCode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: addr.country })
            ]
          },
          `${addr.street}-${addr.city}-${i}`
        )) })
      ] }) })
    ] })
  ] }) });
}
export {
  AccountPage as default
};
