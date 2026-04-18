var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2["Delivered"] = "Delivered";
  OrderStatus2["Confirmed"] = "Confirmed";
  OrderStatus2["Cancelled"] = "Cancelled";
  OrderStatus2["Shipped"] = "Shipped";
  OrderStatus2["Pending"] = "Pending";
  return OrderStatus2;
})(OrderStatus || {});
var ProductCategory = /* @__PURE__ */ ((ProductCategory2) => {
  ProductCategory2["Food"] = "Food";
  ProductCategory2["Books"] = "Books";
  ProductCategory2["Other"] = "Other";
  ProductCategory2["Beauty"] = "Beauty";
  ProductCategory2["Electronics"] = "Electronics";
  ProductCategory2["HomeGarden"] = "HomeGarden";
  ProductCategory2["Clothing"] = "Clothing";
  ProductCategory2["Sports"] = "Sports";
  return ProductCategory2;
})(ProductCategory || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Customer"] = "Customer";
  UserRole2["Admin"] = "Admin";
  return UserRole2;
})(UserRole || {});
export {
  OrderStatus as O,
  ProductCategory as P,
  UserRole as U
};
