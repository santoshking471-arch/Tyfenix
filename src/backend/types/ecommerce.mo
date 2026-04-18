import Common "common";

module {
  public type UserId = Common.UserId;
  public type ProductId = Common.ProductId;
  public type OrderId = Common.OrderId;
  public type Timestamp = Common.Timestamp;

  // --- Variants ---

  public type ProductCategory = {
    #Electronics;
    #Clothing;
    #HomeGarden;
    #Sports;
    #Beauty;
    #Books;
    #Food;
    #Other;
  };

  public type OrderStatus = {
    #Pending;
    #Confirmed;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type UserRole = {
    #Customer;
    #Admin;
  };

  // --- Core Types ---

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : ProductCategory;
    stock : Nat;
    rating : Float;
    createdAt : Timestamp;
    isActive : Bool;
  };

  public type OrderItem = {
    productId : ProductId;
    quantity : Nat;
    unitPrice : Nat;
  };

  public type ShippingAddress = {
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type Order = {
    id : OrderId;
    customerId : UserId;
    items : [OrderItem];
    status : OrderStatus;
    shippingAddress : ShippingAddress;
    totalAmount : Nat;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type Customer = {
    id : UserId;
    name : Text;
    email : Text;
    addresses : [ShippingAddress];
    createdAt : Timestamp;
    role : UserRole;
  };

  public type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  // --- Analytics Types ---

  public type ProductSales = {
    productId : ProductId;
    name : Text;
    totalSold : Nat;
    revenue : Nat;
  };

  public type Analytics = {
    totalRevenue : Nat;
    orderCount : Nat;
    topProducts : [ProductSales];
  };

  // --- Result Types ---

  public type Error = {
    #NotFound : Text;
    #AlreadyExists : Text;
    #Unauthorized : Text;
    #InvalidInput : Text;
    #OutOfStock : Text;
  };

  public type Result<T> = { #ok : T; #err : Error };
};
