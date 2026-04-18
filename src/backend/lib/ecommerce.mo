import Types "../types/ecommerce";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  // --- Authorization Helpers ---

  public func isAdmin(customers : Map.Map<Types.UserId, Types.Customer>, caller : Types.UserId) : Bool {
    switch (customers.get(caller)) {
      case (?c) { c.role == #Admin };
      case null { false };
    };
  };

  // --- Product Operations ---

  public func createProduct(
    id : Types.ProductId,
    name : Text,
    description : Text,
    price : Nat,
    imageUrl : Text,
    category : Types.ProductCategory,
    stock : Nat,
  ) : Types.Product {
    {
      id;
      name;
      description;
      price;
      imageUrl;
      category;
      stock;
      rating = 0.0;
      createdAt = Time.now();
      isActive = true;
    };
  };

  public func updateProduct(
    self : Types.Product,
    name : ?Text,
    description : ?Text,
    price : ?Nat,
    imageUrl : ?Text,
    category : ?Types.ProductCategory,
    stock : ?Nat,
    isActive : ?Bool,
  ) : Types.Product {
    {
      self with
      name = switch (name) { case (?v) v; case null self.name };
      description = switch (description) { case (?v) v; case null self.description };
      price = switch (price) { case (?v) v; case null self.price };
      imageUrl = switch (imageUrl) { case (?v) v; case null self.imageUrl };
      category = switch (category) { case (?v) v; case null self.category };
      stock = switch (stock) { case (?v) v; case null self.stock };
      isActive = switch (isActive) { case (?v) v; case null self.isActive };
    };
  };

  public func adjustStock(self : Types.Product, delta : Int) : Types.Result<Types.Product> {
    let newStock : Int = self.stock.toInt() + delta;
    if (newStock < 0) {
      return #err(#OutOfStock("Insufficient stock for product " # self.name));
    };
    #ok({ self with stock = newStock.toNat() });
  };

  // --- Order Operations ---

  public func createOrder(
    id : Types.OrderId,
    customerId : Types.UserId,
    items : [Types.OrderItem],
    shippingAddress : Types.ShippingAddress,
  ) : Types.Order {
    let total = computeOrderTotal(items);
    {
      id;
      customerId;
      items;
      status = #Pending;
      shippingAddress;
      totalAmount = total;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
  };

  public func updateOrderStatus(self : Types.Order, status : Types.OrderStatus) : Types.Order {
    { self with status; updatedAt = Time.now() };
  };

  public func computeOrderTotal(items : [Types.OrderItem]) : Nat {
    items.foldLeft(0, func(acc : Nat, item : Types.OrderItem) : Nat {
      acc + item.quantity * item.unitPrice
    });
  };

  // --- Customer Operations ---

  public func createCustomer(
    id : Types.UserId,
    name : Text,
    email : Text,
  ) : Types.Customer {
    {
      id;
      name;
      email;
      addresses = [];
      createdAt = Time.now();
      role = #Customer;
    };
  };

  public func updateCustomer(
    self : Types.Customer,
    name : ?Text,
    email : ?Text,
  ) : Types.Customer {
    {
      self with
      name = switch (name) { case (?v) v; case null self.name };
      email = switch (email) { case (?v) v; case null self.email };
    };
  };

  public func addAddress(self : Types.Customer, address : Types.ShippingAddress) : Types.Customer {
    { self with addresses = self.addresses.concat([address]) };
  };

  public func setRole(self : Types.Customer, role : Types.UserRole) : Types.Customer {
    { self with role };
  };

  // --- Analytics Operations ---

  public func computeAnalytics(
    orders : [Types.Order],
    products : [Types.Product],
  ) : Types.Analytics {
    // Only count Delivered orders for revenue
    let deliveredOrders = orders.filter(func(o : Types.Order) : Bool { o.status == #Delivered });

    let totalRevenue = deliveredOrders.foldLeft(0, func(acc : Nat, o : Types.Order) : Nat {
      acc + o.totalAmount
    });

    let orderCount = orders.size();

    // Aggregate per-product revenue across delivered orders
    let revenueMap = Map.empty<Types.ProductId, Nat>();
    let soldMap = Map.empty<Types.ProductId, Nat>();
    deliveredOrders.forEach(func(o : Types.Order) {
      o.items.forEach(func(item : Types.OrderItem) {
        let prevRevenue = switch (revenueMap.get(item.productId)) {
          case (?r) r;
          case null 0;
        };
        let prevSold = switch (soldMap.get(item.productId)) {
          case (?s) s;
          case null 0;
        };
        revenueMap.add(item.productId, prevRevenue + item.quantity * item.unitPrice);
        soldMap.add(item.productId, prevSold + item.quantity);
      });
    });

    // Build top products list sorted by revenue descending (top 5)
    let productSalesList = List.empty<Types.ProductSales>();
    revenueMap.forEach(func(productId : Types.ProductId, revenue : Nat) {
      let name = switch (products.find(func(p : Types.Product) : Bool { p.id == productId })) {
        case (?p) p.name;
        case null "Unknown";
      };
      let totalSold = switch (soldMap.get(productId)) {
        case (?s) s;
        case null 0;
      };
      productSalesList.add({ productId; name; totalSold; revenue });
    });

    let sortedList = productSalesList.sort(func(a : Types.ProductSales, b : Types.ProductSales) : { #less; #equal; #greater } {
      if (a.revenue > b.revenue) #less
      else if (a.revenue < b.revenue) #greater
      else #equal
    });

    let topProducts = sortedList.toArray().sliceToArray(0, 5);

    { totalRevenue; orderCount; topProducts };
  };
};
