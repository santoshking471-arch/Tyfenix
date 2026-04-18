import Types "../types/ecommerce";
import EcommerceLib "../lib/ecommerce";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  products : List.List<Types.Product>,
  orders : List.List<Types.Order>,
  customers : Map.Map<Types.UserId, Types.Customer>,
  carts : Map.Map<Types.UserId, List.List<Types.CartItem>>,
  nextProductId : { var value : Nat },
  nextOrderId : { var value : Nat },
) {

  // --- Product Queries ---

  public query func listProducts(category : ?Types.ProductCategory) : async [Types.Product] {
    let active = products.filter(func(p : Types.Product) : Bool { p.isActive });
    switch (category) {
      case null { active.toArray() };
      case (?cat) {
        active.filter(func(p : Types.Product) : Bool { p.category == cat }).toArray()
      };
    };
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.Product {
    products.find(func(p : Types.Product) : Bool { p.id == id and p.isActive });
  };

  public query func searchProducts(term : Text) : async [Types.Product] {
    let lower = term.toLower();
    products.filter(func(p : Types.Product) : Bool {
      p.isActive and (
        p.name.toLower().contains(#text lower) or
        p.description.toLower().contains(#text lower)
      )
    }).toArray();
  };

  // --- Product Admin ---

  public shared ({ caller }) func createProduct(
    name : Text,
    description : Text,
    price : Nat,
    imageUrl : Text,
    category : Types.ProductCategory,
    stock : Nat,
  ) : async Types.Result<Types.Product> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can create products"));
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    let product = EcommerceLib.createProduct(id, name, description, price, imageUrl, category, stock);
    products.add(product);
    #ok(product);
  };

  public shared ({ caller }) func updateProduct(
    id : Types.ProductId,
    name : ?Text,
    description : ?Text,
    price : ?Nat,
    imageUrl : ?Text,
    category : ?Types.ProductCategory,
    stock : ?Nat,
    isActive : ?Bool,
  ) : async Types.Result<Types.Product> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can update products"));
    };
    var updated : ?Types.Product = null;
    products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) {
        let u = p.updateProduct(name, description, price, imageUrl, category, stock, isActive);
        updated := ?u;
        u
      } else { p }
    });
    switch (updated) {
      case (?p) { #ok(p) };
      case null { #err(#NotFound("Product not found: " # id.toText())) };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Types.ProductId) : async Types.Result<()> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can delete products"));
    };
    var found = false;
    products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) { found := true; { p with isActive = false } } else { p }
    });
    if (found) { #ok(()) } else { #err(#NotFound("Product not found: " # id.toText())) };
  };

  public shared ({ caller }) func uploadProductImage(
    id : Types.ProductId,
    imageUrl : Text,
  ) : async Types.Result<()> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can upload product images"));
    };
    var found = false;
    products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) { found := true; { p with imageUrl } } else { p }
    });
    if (found) { #ok(()) } else { #err(#NotFound("Product not found: " # id.toText())) };
  };

  // --- Cart Operations ---

  public query ({ caller }) func getCart() : async [Types.CartItem] {
    switch (carts.get(caller)) {
      case (?cart) { cart.toArray() };
      case null { [] };
    };
  };

  public shared ({ caller }) func addToCart(productId : Types.ProductId, quantity : Nat) : async Types.Result<()> {
    // Validate product exists and has stock
    let product = switch (products.find(func(p : Types.Product) : Bool { p.id == productId and p.isActive })) {
      case (?p) { p };
      case null { return #err(#NotFound("Product not found: " # productId.toText())) };
    };

    // Get current cart quantity for this product
    let cart = switch (carts.get(caller)) {
      case (?c) { c };
      case null {
        let newCart = List.empty<Types.CartItem>();
        carts.add(caller, newCart);
        newCart
      };
    };

    let existingQty = switch (cart.find(func(ci : Types.CartItem) : Bool { ci.productId == productId })) {
      case (?ci) { ci.quantity };
      case null { 0 };
    };

    let totalQty = existingQty + quantity;
    if (totalQty > product.stock) {
      return #err(#OutOfStock("Only " # product.stock.toText() # " units available"));
    };

    if (existingQty > 0) {
      // Update existing cart item
      cart.mapInPlace(func(ci : Types.CartItem) : Types.CartItem {
        if (ci.productId == productId) { { ci with quantity = totalQty } } else { ci }
      });
    } else {
      cart.add({ productId; quantity });
    };
    #ok(());
  };

  public shared ({ caller }) func updateCartItem(productId : Types.ProductId, quantity : Nat) : async Types.Result<()> {
    let cart = switch (carts.get(caller)) {
      case (?c) { c };
      case null { return #err(#NotFound("Cart is empty")) };
    };

    if (quantity == 0) {
      // Remove item
      let filtered = cart.filter(func(ci : Types.CartItem) : Bool { ci.productId != productId });
      cart.clear();
      cart.append(filtered);
      return #ok(());
    };

    // Validate stock
    let product = switch (products.find(func(p : Types.Product) : Bool { p.id == productId and p.isActive })) {
      case (?p) { p };
      case null { return #err(#NotFound("Product not found: " # productId.toText())) };
    };

    if (quantity > product.stock) {
      return #err(#OutOfStock("Only " # product.stock.toText() # " units available"));
    };

    var found = false;
    cart.mapInPlace(func(ci : Types.CartItem) : Types.CartItem {
      if (ci.productId == productId) { found := true; { ci with quantity } } else { ci }
    });
    if (found) { #ok(()) } else { #err(#NotFound("Item not in cart")) };
  };

  public shared ({ caller }) func removeFromCart(productId : Types.ProductId) : async Types.Result<()> {
    switch (carts.get(caller)) {
      case null { #err(#NotFound("Cart is empty")) };
      case (?cart) {
        let filtered = cart.filter(func(ci : Types.CartItem) : Bool { ci.productId != productId });
        cart.clear();
        cart.append(filtered);
        #ok(())
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    switch (carts.get(caller)) {
      case null {};
      case (?cart) { cart.clear() };
    };
  };

  // --- Order Operations ---

  public shared ({ caller }) func placeOrder(shippingAddress : Types.ShippingAddress) : async Types.Result<Types.Order> {
    // Check customer registered
    switch (customers.get(caller)) {
      case null { return #err(#Unauthorized("Must register as customer before placing orders")) };
      case _ {};
    };

    let cart = switch (carts.get(caller)) {
      case (?c) { c };
      case null { return #err(#InvalidInput("Cart is empty")) };
    };

    if (cart.isEmpty()) {
      return #err(#InvalidInput("Cart is empty"));
    };

    // Build order items and validate stock
    let orderItems = List.empty<Types.OrderItem>();
    let cartArray = cart.toArray();

    for (ci in cartArray.values()) {
      let product = switch (products.find(func(p : Types.Product) : Bool { p.id == ci.productId and p.isActive })) {
        case (?p) { p };
        case null { return #err(#NotFound("Product not found: " # ci.productId.toText())) };
      };
      if (ci.quantity > product.stock) {
        return #err(#OutOfStock("Insufficient stock for " # product.name));
      };
      orderItems.add({ productId = ci.productId; quantity = ci.quantity; unitPrice = product.price });
    };

    // Deduct stock atomically
    for (ci in cartArray.values()) {
      products.mapInPlace(func(p : Types.Product) : Types.Product {
        if (p.id == ci.productId) {
          { p with stock = p.stock - ci.quantity }
        } else { p }
      });
    };

    // Create order
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = EcommerceLib.createOrder(id, caller, orderItems.toArray(), shippingAddress);
    orders.add(order);

    // Clear cart
    cart.clear();

    #ok(order);
  };

  public query ({ caller }) func listMyOrders() : async [Types.Order] {
    orders.filter(func(o : Types.Order) : Bool { o.customerId == caller }).toArray();
  };

  public query func getOrder(id : Types.OrderId) : async ?Types.Order {
    orders.find(func(o : Types.Order) : Bool { o.id == id });
  };

  public shared ({ caller }) func updateOrderStatus(
    id : Types.OrderId,
    status : Types.OrderStatus,
  ) : async Types.Result<Types.Order> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can update order status"));
    };
    var updated : ?Types.Order = null;
    orders.mapInPlace(func(o : Types.Order) : Types.Order {
      if (o.id == id) {
        let u = o.updateOrderStatus(status);
        updated := ?u;
        u
      } else { o }
    });
    switch (updated) {
      case (?o) { #ok(o) };
      case null { #err(#NotFound("Order not found: " # id.toText())) };
    };
  };

  // --- Customer / Profile ---

  public query ({ caller }) func getMyProfile() : async ?Types.Customer {
    customers.get(caller);
  };

  public shared ({ caller }) func registerCustomer(name : Text, email : Text) : async Types.Result<Types.Customer> {
    if (customers.containsKey(caller)) {
      return #err(#AlreadyExists("Customer already registered"));
    };
    let customer = EcommerceLib.createCustomer(caller, name, email);
    customers.add(caller, customer);
    #ok(customer);
  };

  public shared ({ caller }) func updateProfile(name : ?Text, email : ?Text) : async Types.Result<Types.Customer> {
    switch (customers.get(caller)) {
      case null { #err(#NotFound("Customer not registered")) };
      case (?c) {
        let updated = c.updateCustomer(name, email);
        customers.add(caller, updated);
        #ok(updated)
      };
    };
  };

  public shared ({ caller }) func addAddress(address : Types.ShippingAddress) : async Types.Result<Types.Customer> {
    switch (customers.get(caller)) {
      case null { #err(#NotFound("Customer not registered")) };
      case (?c) {
        let updated = c.addAddress(address);
        customers.add(caller, updated);
        #ok(updated)
      };
    };
  };

  // --- Admin ---

  public query ({ caller }) func listCustomers() : async [Types.Customer] {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      Runtime.trap("Unauthorized: Only admins can list customers");
    };
    customers.values().toArray();
  };

  public shared ({ caller }) func setCustomerRole(
    customerId : Types.UserId,
    role : Types.UserRole,
  ) : async Types.Result<Types.Customer> {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      return #err(#Unauthorized("Only admins can change customer roles"));
    };
    switch (customers.get(customerId)) {
      case null { #err(#NotFound("Customer not found")) };
      case (?c) {
        let updated = c.setRole(role);
        customers.add(customerId, updated);
        #ok(updated)
      };
    };
  };

  public query ({ caller }) func listAllOrders() : async [Types.Order] {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    orders.toArray();
  };

  public query ({ caller }) func getAnalytics() : async Types.Analytics {
    if (not EcommerceLib.isAdmin(customers, caller)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    EcommerceLib.computeAnalytics(orders.toArray(), products.toArray());
  };
};
