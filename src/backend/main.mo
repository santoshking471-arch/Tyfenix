import Types "types/ecommerce";
import EcommerceApi "mixins/ecommerce-api";
import EcommerceLib "lib/ecommerce";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  let products = List.empty<Types.Product>();
  let orders = List.empty<Types.Order>();
  let customers = Map.empty<Types.UserId, Types.Customer>();
  let carts = Map.empty<Types.UserId, List.List<Types.CartItem>>();
  let nextProductId = { var value : Nat = 0 };
  let nextOrderId = { var value : Nat = 0 };

  include EcommerceApi(products, orders, customers, carts, nextProductId, nextOrderId);

  // Seed initial sample products on first deploy
  do {
    let seedProducts : [(Text, Text, Nat, Text, Types.ProductCategory, Nat)] = [
      (
        "HyperSlime Pro Wireless Headphones",
        "Premium noise-cancelling headphones with 40hr battery life and crystal-clear sound. Features active noise cancellation and premium drivers for an immersive audio experience.",
        12999,
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        #Electronics,
        50,
      ),
      (
        "NeonEdge Gaming Mechanical Keyboard",
        "RGB backlit mechanical keyboard with tactile switches, full N-key rollover, and per-key customizable lighting. Built for serious gamers.",
        8999,
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        #Electronics,
        35,
      ),
      (
        "SlimeWave Smart Watch Pro",
        "Track your health and stay connected. Heart rate monitoring, GPS, sleep tracking, and 7-day battery. Water-resistant up to 50m.",
        24999,
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        #Electronics,
        28,
      ),
      (
        "GlowFlex Yoga Mat Premium",
        "Non-slip 6mm thick eco-friendly yoga mat with alignment marks and carrying strap. Perfect for yoga, pilates, and floor workouts.",
        4999,
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
        #Sports,
        80,
      ),
      (
        "Urban Drift Sneakers",
        "Lightweight performance sneakers with cushioned sole and breathable mesh upper. Suitable for running, gym, or casual wear.",
        7499,
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        #Clothing,
        60,
      ),
      (
        "AromaBurst Luxury Candle Set",
        "Set of 4 hand-poured soy wax candles in premium glass jars. Scents include Lavender, Vanilla Bean, Sandalwood, and Ocean Breeze. 40hr burn time each.",
        3499,
        "https://images.unsplash.com/photo-1602178506379-8f26789a0ff3?w=400",
        #HomeGarden,
        120,
      ),
      (
        "Nano Mist Facial Skincare Kit",
        "Complete 5-step skincare routine kit including cleanser, toner, serum, moisturizer, and SPF50 sunscreen. Suitable for all skin types.",
        5999,
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        #Beauty,
        45,
      ),
      (
        "The Art of Deep Focus",
        "Bestselling guide on productivity, mindfulness, and achieving peak mental performance in the modern digital world. Hardcover edition.",
        1299,
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        #Books,
        200,
      ),
    ];

    for ((name, description, price, imageUrl, category, stock) in seedProducts.values()) {
      let id = nextProductId.value;
      nextProductId.value += 1;
      let product = EcommerceLib.createProduct(id, name, description, price, imageUrl, category, stock);
      products.add(product);
    };
  };
};
