import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Clock, Shield, Star, ChevronRight, 
  Sparkles, TrendingUp, Heart, ShoppingBag, 
  Award, CheckCircle, Truck, Package, Phone, 
  MapPin, Zap, Users, ShoppingCart, CreditCard, 
  Headphones, Leaf, BatteryCharging, ChevronDown,
  Menu, X, Filter, ArrowRight, ArrowLeft,
  Bell, User, Home, Package2, BadgeCheck
} from 'lucide-react';
import './Home.css';

export default function DukaanHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('15-20 min');

  const heroRef = useRef(null);
  const notificationRef = useRef(null);

  // Modern theme colors
  const themeColors = {
    primary: '#FF3B30',      // Modern Red
    primaryLight: '#FF6961',
    primaryDark: '#D32F2F',
    secondary: '#00C853',    // Green
    secondaryLight: '#5EFC82',
    accent: '#FFD600',       // Yellow
    accentLight: '#FFF176',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1A1A1A',
    textLight: '#666666',
    border: '#E0E0E0',
    success: '#00C853',
    warning: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF9800 100%)',
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Get current time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      setTime(`${hour12}:${minutes} ${ampm}`);
      
      // Update delivery time based on current time
      if (hours >= 18 || hours < 6) {
        setDeliveryTime('25-30 min');
      } else {
        setDeliveryTime('15-20 min');
      }
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // Load featured products
    setFeaturedProducts([
      { 
        id: 1, 
        name: 'Fresh Tomatoes', 
        price: '₹45/kg', 
        originalPrice: '₹60/kg',
        rating: 4.5, 
        image: '🍅', 
        tag: 'Fresh', 
        category: 'vegetables',
        discount: '25%',
        unit: 'per kg',
        delivery: 'Today',
        bestSeller: true,
        stock: 'High',
      },
      { 
        id: 2, 
        name: 'Premium Atta', 
        price: '₹320', 
        originalPrice: '₹400',
        rating: 4.8, 
        image: '🌾', 
        tag: 'Best Seller', 
        category: 'staples',
        discount: '20%',
        unit: '5 kg pack',
        delivery: 'Today',
        bestSeller: true,
        stock: 'Medium',
      },
      { 
        id: 3, 
        name: 'Basmati Rice', 
        price: '₹85/kg', 
        originalPrice: '₹110/kg',
        rating: 4.3, 
        image: '🍚', 
        tag: 'Pure', 
        category: 'rice',
        discount: '23%',
        unit: 'per kg',
        delivery: 'Today',
        bestSeller: false,
        stock: 'High',
      },
      { 
        id: 4, 
        name: 'Fresh Milk', 
        price: '₹60', 
        originalPrice: '₹70',
        rating: 4.7, 
        image: '🥛', 
        tag: 'Daily', 
        category: 'dairy',
        discount: '14%',
        unit: '1 Liter',
        delivery: 'Today',
        bestSeller: true,
        stock: 'High',
      },
      { 
        id: 5, 
        name: 'Potato', 
        price: '₹25/kg', 
        originalPrice: '₹35/kg',
        rating: 4.6, 
        image: '🥔', 
        tag: 'Fresh', 
        category: 'vegetables',
        discount: '29%',
        unit: 'per kg',
        delivery: 'Today',
        bestSeller: false,
        stock: 'High',
      },
      { 
        id: 6, 
        name: 'Sugar', 
        price: '₹42/kg', 
        originalPrice: '₹50/kg',
        rating: 4.4, 
        image: '🍬', 
        tag: 'Essential', 
        category: 'staples',
        discount: '16%',
        unit: 'per kg',
        delivery: 'Today',
        bestSeller: false,
        stock: 'High',
      },
    ]);

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Click outside notifications
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    // Auto-slide for hero
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { name: 'Vegetables', icon: '🥬', category: 'vegetables', color: '#00C853' },
    { name: 'Fruits', icon: '🍎', category: 'fruits', color: '#FF3B30' },
    { name: 'Dairy', icon: '🥛', category: 'dairy', color: '#2196F3' },
    { name: 'Staples', icon: '🌾', category: 'staples', color: '#FF9800' },
    { name: 'Snacks', icon: '🍿', category: 'snacks', color: '#9C27B0' },
    { name: 'Beverages', icon: '🧃', category: 'beverages', color: '#0097A7' },
    { name: 'Personal Care', icon: '🧴', category: 'personal-care', color: '#E91E63' },
    { name: 'Home Care', icon: '🏠', category: 'home-care', color: '#795548' },
  ];

  const heroSlides = [
    {
      title: "Groceries in Minutes",
      subtitle: "Delivered fresh to your doorstep",
      bg: themeColors.gradient,
      cta: "Shop Now",
      image: "🚚"
    },
    {
      title: "25% OFF First Order",
      subtitle: "Use code: DUKAAN25",
      bg: 'linear-gradient(135deg, #00C853 0%, #64DD17 100%)',
      cta: "Grab Offer",
      image: "🎉"
    },
    {
      title: "Fresh Vegetables Daily",
      subtitle: "Farm to home in hours",
      bg: 'linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)',
      cta: "Buy Fresh",
      image: "🥦"
    }
  ];

  const features = [
    { 
      icon: <Truck style={{width: '28px', height: '28px'}} />,
      title: '15-30 Min Delivery', 
      desc: 'Fastest delivery in your city',
      color: themeColors.primary,
    },
    { 
      icon: <Shield style={{width: '28px', height: '28px'}} />,
      title: 'Quality Guarantee', 
      desc: 'Freshness guaranteed or money back',
      color: themeColors.success,
    },
    { 
      icon: <CreditCard style={{width: '28px', height: '28px'}} />,
      title: 'Easy Returns', 
      desc: '10-day return policy',
      color: themeColors.warning,
    },
    { 
      icon: <Headphones style={{width: '28px', height: '28px'}} />,
      title: '24/7 Support', 
      desc: 'Always here to help',
      color: themeColors.primary,
    },
  ];

  const quickLinks = [
    { name: 'Instant Delivery', icon: '⚡', link: '/instant' },
    { name: 'Top Deals', icon: '🔥', link: '/deals' },
    { name: 'Fresh Vegetables', icon: '🥦', link: '/vegetables' },
    { name: 'Dairy & Eggs', icon: '🥚', link: '/dairy' },
    { name: 'Snacks & Drinks', icon: '🍿', link: '/snacks' },
    { name: 'Home Essentials', icon: '🏠', link: '/home' },
  ];

  const notifications = [
    { id: 1, text: 'Your order will arrive in 15 minutes', time: '2 min ago', read: false },
    { id: 2, text: '25% off on fruits - Limited time', time: '1 hour ago', read: true },
    { id: 3, text: 'Payment successful for order #12345', time: '2 hours ago', read: true },
  ];

  const addToCart = (productId) => {
    setCartCount(prev => prev + 1);
    // Show success animation
    const addBtn = document.getElementById(`add-btn-${productId}`);
    if (addBtn) {
      addBtn.innerHTML = '✓ Added';
      addBtn.style.background = themeColors.success;
      setTimeout(() => {
        addBtn.innerHTML = 'Add to Cart';
        addBtn.style.background = themeColors.primary;
      }, 1500);
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === activeCategory);

  return (
    <div className="dukaan-container">
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              <span className="logo-text">Dukaan</span>
              <span className="logo-dot">.</span>
              <span className="logo-dar">Dar</span>
            </div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <p className="loading-text">Getting your groceries ready...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">Dukaan</span>
            <span className="logo-dot">.</span>
            <span className="logo-dar">Dar</span>
          </Link>

          {/* Delivery Location */}
          <div className="location-selector">
            <MapPin size={18} />
            <div className="location-text">
              <span className="deliver-to">Deliver to</span>
              <span className="address">Home •561/584 krishna nagar lucknow</span>
            </div>
            <ChevronDown size={16} />
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search vegetables, dairy, groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="header-actions">
            <div className="delivery-time">
              <Clock size={16} />
              <span>{deliveryTime}</span>
            </div>
            
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={22} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            <button className="profile-btn">
              <User size={22} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="notifications-dropdown" ref={notificationRef}>
            <div className="notifications-header">
              <h3>Notifications</h3>
              <button className="mark-all-read">Mark all as read</button>
            </div>
            <div className="notifications-list">
              {notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                  <div className="notification-content">
                    <p>{notif.text}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                  {!notif.read && <div className="unread-dot"></div>}
                </div>
              ))}
            </div>
            <Link to="/notifications" className="view-all-notifications">
              View all notifications
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-slides">
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ background: slide.bg }}
              >
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <Link to="/shop" className="hero-cta">
                    {slide.cta}
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="slide-image">
                  {slide.image}
                </div>
              </div>
            ))}
          </div>
          
          {/* Slide Indicators */}
          <div className="slide-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="quick-links-section">
          <div className="container">
            <h2 className="section-title">Quick Access</h2>
            <div className="quick-links-grid">
              {quickLinks.map((link, index) => (
                <Link 
                  key={link.name}
                  to={link.link}
                  className="quick-link-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="quick-link-icon">{link.icon}</span>
                  <span className="quick-link-text">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Shop by Category</h2>
              <Link to="/categories" className="view-all">
                View all
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="categories-scroll">
              <div className="categories-list">
                <button 
                  className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  <span className="category-icon">🛒</span>
                  <span className="category-name">All Items</span>
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.name}
                    className={`category-tab ${activeCategory === category.category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.category)}
                    style={{ '--category-color': category.color }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-badge">
                  <Sparkles size={16} />
                  <span>Featured Products</span>
                </div>
                <h2 className="section-title">Fresh Picks for You</h2>
              </div>
              
              <div className="filter-options">
                <button className="filter-btn">
                  <Filter size={18} />
                  Filter
                </button>
                <button className="sort-btn">
                  Sort by: Popular
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  {product.bestSeller && (
                    <div className="best-seller-badge">
                      <Star size={12} fill="#FFD600" />
                      Best Seller
                    </div>
                  )}
                  
                  {product.discount && (
                    <div className="discount-badge">
                      {product.discount} OFF
                    </div>
                  )}

                  <button className="wishlist-btn">
                    <Heart size={20} />
                  </button>

                  <div className="product-image">
                    <div className="image-wrapper">
                      {product.image}
                    </div>
                    {product.stock === 'Low' && (
                      <div className="stock-badge low">
                        Low Stock
                      </div>
                    )}
                  </div>

                  <div className="product-details">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-meta">
                      <div className="rating">
                        <Star size={14} fill="#FFD600" />
                        <span>{product.rating}</span>
                      </div>
                      <div className="delivery-info">
                        <Truck size={14} />
                        <span>{product.delivery}</span>
                      </div>
                    </div>

                    <div className="product-price">
                      <div className="current-price">{product.price}</div>
                      {product.originalPrice && (
                        <div className="original-price">{product.originalPrice}</div>
                      )}
                      <div className="price-unit">{product.unit}</div>
                    </div>

                    <button 
                      id={`add-btn-${product.id}`}
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="load-more-container">
              <button className="load-more-btn">
                Load More Products
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose DukaanDar?</h2>
            <p className="section-subtitle">We make grocery shopping simple, fast, and reliable</p>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div 
                    className="feature-icon"
                    style={{ background: `${feature.color}15`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Banner */}
        <section className="app-banner">
          <div className="container">
            <div className="app-content">
              <div className="app-text">
                <h2>Get the App</h2>
                <p>Order groceries even faster with our mobile app. Get exclusive app-only deals!</p>
                <div className="app-buttons">
                  <button className="app-store-btn">
                    <span className="store-icon">📱</span>
                    <div>
                      <span className="store-label">Download on the</span>
                      <span className="store-name">App Store</span>
                    </div>
                  </button>
                  <button className="play-store-btn">
                    <span className="store-icon">▶️</span>
                    <div>
                      <span className="store-label">GET IT ON</span>
                      <span className="store-name">Google Play</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="app-image">
                📱
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-text">Dukaan</span>
                <span className="logo-dot">.</span>
                <span className="logo-dar">Dar</span>
              </div>
              <p className="footer-tagline">Groceries delivered in minutes</p>
              <div className="social-links">
                {['f', 't', 'i', 'y'].map(icon => (
                  <button key={icon} className="social-icon">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <div className="link-column">
                <h3>Company</h3>
                <Link to="/about">About Us</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/press">Press</Link>
              </div>
              
              <div className="link-column">
                <h3>Support</h3>
                <Link to="/help">Help Center</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/safety">Safety Center</Link>
                <Link to="/guidelines">Community Guidelines</Link>
              </div>
              
              <div className="link-column">
                <h3>Legal</h3>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/accessibility">Accessibility</Link>
              </div>
              
              <div className="link-column">
                <h3>Download App</h3>
                <div className="download-badges">
                  <button className="app-badge">App Store</button>
                  <button className="play-badge">Google Play</button>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © 2024 DukaanDar. All rights reserved.
            </div>
            <div className="footer-country">
              <span className="flag">🇮🇳</span>
              India
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Your Cart ({cartCount})</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="cart-items">
              {[1, 2, 3].map(item => (
                <div key={item} className="cart-item">
                  <div className="item-image">🍅</div>
                  <div className="item-details">
                    <h4>Fresh Tomatoes</h4>
                    <div className="item-price">₹45/kg</div>
                    <div className="item-quantity">
                      <button className="quantity-btn">-</button>
                      <span>1 kg</span>
                      <button className="quantity-btn">+</button>
                    </div>
                  </div>
                  <button className="remove-item">✕</button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹170</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free">FREE</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹170</span>
              </div>
              
              <button className="checkout-btn">
                <CreditCard size={20} />
                Proceed to Checkout
              </button>
              
              <Link to="/cart" className="view-cart-link">
                View full cart
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/categories" className="nav-item">
          <Package2 size={24} />
          <span>Categories</span>
        </Link>
        <Link to="/search" className="nav-item search-nav">
          <Search size={24} />
          <span>Search</span>
        </Link>
        <Link to="/cart" className="nav-item">
          <ShoppingCart size={24} />
          <span>Cart</span>
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </Link>
        <Link to="/account" className="nav-item">
          <User size={24} />
          <span>Account</span>
        </Link>
      </nav>

      {/* Time Display */}
      <div className="time-display">
        <Clock size={14} />
        <span>{time}</span>
      </div>
    </div>
  );
}