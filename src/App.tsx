import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, X, Phone, MapPin, Clock, 
  Instagram, Facebook, Twitter, ChevronRight, 
  Star, Utensils, Coffee, Calendar, Users, 
  MessageSquare, ArrowUp, Sun, Moon, LogIn, 
  LayoutDashboard
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  type User
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

// --- Page Components ---

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Menu />
      <MenuCard />
      <VideoShowcase />
      <BookingForm />
      <Gallery />
      <Reviews />
      <Contact />
    </main>
  );
};

const MenuCardPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-accent/10 dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Traditional View</span>
        <h1 className="text-5xl font-serif mb-8">Our Physical Menu Card</h1>
        <p className="text-secondary/70 dark:text-accent/70 mb-12 max-w-2xl mx-auto">
          Browse our full selection of pure vegetarian delicacies. 
          Authentic recipes passed down through generations.
        </p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-4xl mx-auto bg-white dark:bg-bg-dark p-4 rounded-3xl shadow-2xl border border-black/5 dark:border-white/5"
        >
          <img 
            src="kranti-menucard" 
              src="kranti-menucard2" 
            alt="Menu Card" 
            className="w-full rounded-2xl shadow-inner"
            referrerPolicy="no-referrer"
          />
          <div className="mt-8 flex justify-center">
            <button className="btn-primary">Download PDF Menu</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const VideosPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const displayVideos = videos.length > 0 ? videos : [
    { id: '1', title: 'Our Signature Misal Pav', url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-salad-4044-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000' },
    { id: '2', title: 'Kitchen Hygiene Standards', url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-vegetables-in-a-kitchen-4042-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Behind the Scenes</span>
          <h1 className="text-5xl font-serif mb-6">Experience Our Kitchen</h1>
          <p className="text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto">
            Watch how we prepare your favorite dishes with love and care. 
            Pure ingredients, authentic recipes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayVideos.map((video) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl"
            >
              <video 
                src={video.url} 
                poster={video.thumbnail}
                controls
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="p-6 bg-white dark:bg-bg-dark">
                <h3 className="text-xl font-serif font-bold">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FacilitiesPage = () => {
  const facilities = [
    { title: 'Spacious Dining Hall', desc: 'Comfortable seating for over 100 guests, perfect for families and large groups.', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Hygienic Kitchen', desc: 'State-of-the-art kitchen facilities maintaining the highest standards of cleanliness.', img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Ample Parking', desc: 'Secure and spacious parking area for all our guests.', img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Pure RO Water', desc: 'We serve only purified RO drinking water to ensure your health and safety.', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-accent/10 dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Our Amenities</span>
          <h1 className="text-5xl font-serif mb-6">World-Class Facilities</h1>
          <p className="text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto">
            We go beyond just food to provide you with a comfortable and memorable experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((fac, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-bg-dark rounded-3xl overflow-hidden shadow-xl group"
            >
              <div className="h-64 overflow-hidden">
                <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-3">{fac.title}</h3>
                <p className="text-secondary/70 dark:text-accent/70">{fac.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode, user }: { darkMode: boolean, setDarkMode: (v: boolean) => void, user: User | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = user?.email === "ayansayyad010@gmail.com";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'Menu Card', href: '/menu-card', isPage: true },
    { name: 'Videos', href: '/videos', isPage: true },
    { name: 'Facilities', href: '/facilities', isPage: true },
    { name: 'Contact', href: '/#contact', isPage: false },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled || location.pathname !== '/' ? "bg-white/90 dark:bg-bg-dark/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">K</div>
          <span className={cn("font-serif text-2xl font-bold tracking-tight", isScrolled || location.pathname !== '/' ? "text-secondary dark:text-primary" : "text-white")}>
            Kranti <span className="text-primary">Pure Veg</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors",
                  isScrolled || location.pathname !== '/' ? "text-secondary dark:text-accent" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors",
                  isScrolled || location.pathname !== '/' ? "text-secondary dark:text-accent" : "text-white"
                )}
              >
                {link.name}
              </a>
            )
          ))}
          {isAdmin && (
            <Link 
              to="/admin" 
              className={cn(
                "text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1",
                isScrolled ? "text-secondary dark:text-accent" : "text-white"
              )}
            >
              <LayoutDashboard size={16} /> Admin
            </Link>
          )}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={cn("p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors", isScrolled ? "text-secondary dark:text-accent" : "text-white")}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {!user ? (
            <button 
              onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
              className="btn-primary py-2 px-6 text-sm"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-primary" />
              <button onClick={() => signOut(auth)} className="text-xs uppercase tracking-tighter opacity-70 hover:opacity-100">Logout</button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={cn("p-2", isScrolled ? "text-secondary dark:text-accent" : "text-white")}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("p-2", isScrolled ? "text-secondary dark:text-accent" : "text-white")}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-bg-dark shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              link.isPage ? (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-secondary dark:text-accent border-b border-black/5 dark:border-white/5 pb-2"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-secondary dark:text-accent border-b border-black/5 dark:border-white/5 pb-2"
                >
                  {link.name}
                </a>
              )
            ))}
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-secondary dark:text-accent border-b border-black/5 dark:border-white/5 pb-2 flex items-center gap-2"
              >
                <LayoutDashboard size={20} /> Admin Panel
              </Link>
            )}
            {!user ? (
              <button 
                onClick={() => {
                  signInWithPopup(auth, new GoogleAuthProvider());
                  setIsMobileMenuOpen(false);
                }}
                className="btn-primary w-full"
              >
                Login
              </button>
            ) : (
              <button onClick={() => signOut(auth)} className="btn-outline w-full">Logout</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Restaurant" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-medium tracking-[0.3em] uppercase mb-4 block">Welcome to Excellence</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight">
            Hotel Kranti <br /> <span className="italic text-primary">Pure Veg</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Experience the authentic taste of Mirajgaon with our premium pure vegetarian delicacies. 
            A perfect blend of tradition and luxury.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#booking" className="btn-primary w-full sm:w-auto">Book Table</a>
            <a href="#menu" className="btn-outline border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto">View Menu</a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-accent/30 dark:bg-bg-dark/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070" 
            alt="Chef Cooking" 
            className="rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 h-64 bg-primary rounded-2xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-secondary dark:text-accent">A Legacy of Pure Taste</h2>
          <p className="text-secondary/70 dark:text-accent/70 mb-6 leading-relaxed text-lg">
            Located in the heart of Mirajgaon, Hotel Kranti Pure Veg has been a symbol of quality and hygiene for over a decade. 
            We believe that food is not just about taste, but about the experience and the memories created around the table.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Utensils size={24} /></div>
              <div>
                <h4 className="font-bold text-secondary dark:text-accent">100% Pure Veg</h4>
                <p className="text-sm opacity-70">Strictly vegetarian kitchen</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users size={24} /></div>
              <div>
                <h4 className="font-bold text-secondary dark:text-accent">Family Friendly</h4>
                <p className="text-sm opacity-70">Spacious dining area</p>
              </div>
            </div>
          </div>
          <button className="btn-primary">Learn More</button>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Breakfast', 'Cold Drinks', 'Main Course', 'Desserts'];

  const menuItems = [
    { id: 1, name: 'Special Misal Pav', price: 120, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000', desc: 'Spicy and authentic Maharashtrian misal served with fresh pav.' },
    { id: 2, name: 'Masala Dosa', price: 90, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000', desc: 'Crispy rice crepe filled with spiced potato mash.' },
    { id: 3, name: 'Paneer Tikka Masala', price: 280, category: 'Main Course', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1000', desc: 'Grilled paneer cubes in a rich and creamy tomato gravy.' },
    { id: 4, name: 'Fresh Lime Soda', price: 60, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000', desc: 'Refreshing lime soda with a hint of mint.' },
    { id: 5, name: 'Gulab Jamun', price: 80, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=1000', desc: 'Soft milk solids dumplings soaked in rose sugar syrup.' },
    { id: 6, name: 'Veg Kolhapuri', price: 240, category: 'Main Course', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000', desc: 'Spicy mixed vegetable curry from the heart of Kolhapur.' },
  ];

  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Delicious Selection</span>
          <h2 className="section-title">Our Signature Menu</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full border transition-all duration-300",
                  activeCategory === cat ? "bg-primary border-primary text-secondary" : "border-black/10 dark:border-white/10 hover:border-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white dark:bg-bg-dark border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-secondary font-bold px-3 py-1 rounded-lg">
                    ₹{item.price}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-bold uppercase tracking-tighter mb-1 block">{item.category}</span>
                  <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                  <p className="text-sm opacity-70 line-clamp-2 mb-4">{item.desc}</p>
                  <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Order Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const MenuCard = () => {
  return (
    <section id="menu-card" className="py-24 px-6 bg-accent/30 dark:bg-bg-dark/50">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Traditional View</span>
        <h2 className="section-title">Our Physical Menu Card</h2>
        <p className="text-secondary/70 dark:text-accent/70 mb-12 max-w-2xl mx-auto">
          Prefer the classic feel? View our full physical menu card.
        </p>
        
        <Link to="/menu-card" className="relative group block max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-black/5 dark:border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=2000" 
              alt="Menu Card" 
              className="w-full group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="btn-primary">Open Full Menu</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const displayVideos = videos.length > 0 ? videos : [
    { id: '1', title: 'Our Signature Misal Pav', url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-salad-4044-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <section id="videos" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Behind the Scenes</span>
          <h2 className="section-title">Experience Our Kitchen</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
            <img src={displayVideos[0].thumbnail} className="w-full h-full object-cover" />
            <Link to="/videos" className="absolute inset-0 bg-black/40 flex items-center justify-center group">
              <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronRight size={40} />
              </div>
            </Link>
          </div>
          <div>
            <h3 className="text-3xl font-serif mb-4">Watch Our Culinary Journey</h3>
            <p className="text-secondary/70 dark:text-accent/70 mb-8">
              We believe in transparency and quality. Watch our chefs in action as they prepare authentic dishes with the freshest ingredients.
            </p>
            <Link to="/videos" className="btn-primary">View All Videos</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      // WhatsApp Integration
      const message = `New Booking Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}`;
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      
      setSuccess(true);
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setSuccess(false);
        setFormData({ name: '', phone: '', date: '', time: '', guests: 2 });
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-secondary text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Reservation</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Book Your Table</h2>
          <p className="text-white/70 mb-8 text-lg">
            Planning a family dinner or a special celebration? Secure your spot at Hotel Kranti Pure Veg. 
            We recommend booking at least 2 hours in advance.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary"><Phone size={20} /></div>
              <div>
                <p className="text-sm text-white/50">Call for instant booking</p>
                <p className="text-xl font-bold">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary"><Clock size={20} /></div>
              <div>
                <p className="text-sm text-white/50">Opening Hours</p>
                <p className="text-xl font-bold">08:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white text-secondary p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={40} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Booking Received!</h3>
              <p className="text-secondary/70">Redirecting to WhatsApp for confirmation...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Your Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-accent/50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3 bg-accent/50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-3 bg-accent/50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Time</label>
                  <input 
                    required
                    type="time" 
                    className="w-full px-4 py-3 bg-accent/50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    className="flex-1 accent-primary"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                  />
                  <span className="w-12 h-12 bg-primary text-secondary font-bold rounded-full flex items-center justify-center">{formData.guests}</span>
                </div>
              </div>
              <button 
                disabled={loading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : <><Calendar size={20} /> Confirm Booking</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=1000"
  ];

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Visual Feast</span>
          <h2 className="section-title">Our Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Rahul Sharma", text: "The best misal pav in Mirajgaon! The hygiene and service are top-notch.", rating: 5 },
    { name: "Priya Patil", text: "Perfect place for a family dinner. The Paneer Tikka is a must-try.", rating: 5 },
    { name: "Amit Deshmukh", text: "Luxury experience at affordable prices. Highly recommended!", rating: 4 },
  ];

  return (
    <section id="reviews" className="py-24 px-6 bg-accent/30 dark:bg-bg-dark/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-bg-dark p-8 rounded-3xl shadow-sm border border-black/5 dark:border-white/5"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} fill={j < review.rating ? "#D4AF37" : "none"} color={j < review.rating ? "#D4AF37" : "#ccc"} />
                ))}
              </div>
              <p className="text-secondary/70 dark:text-accent/70 italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  {review.name[0]}
                </div>
                <h4 className="font-bold">{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Reach Us</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Get In Touch</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><MapPin size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Our Location</h4>
                <p className="text-secondary/70 dark:text-accent/70">Main Road, Mirajgaon, Ahmednagar, Maharashtra 414401</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><Phone size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                <p className="text-secondary/70 dark:text-accent/70">+91 98765 43210</p>
                <p className="text-secondary/70 dark:text-accent/70">+91 98765 43211</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><Clock size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                <p className="text-secondary/70 dark:text-accent/70">Monday - Sunday: 08:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <a href="tel:+919876543210" className="btn-primary flex items-center gap-2"><Phone size={18} /> Call Now</a>
            <a href="https://wa.me/919876543210" className="btn-outline flex items-center gap-2"><MessageSquare size={18} /> WhatsApp</a>
          </div>
        </div>

        <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-bg-dark">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2123456789!2d74.987654321!3d18.987654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzE1LjYiTiA3NMKwNTknMTUuNiJF!5e0!3m2!1sen!2sin!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">K</div>
            <span className="font-serif text-2xl font-bold tracking-tight">
              Kranti <span className="text-primary">Pure Veg</span>
            </span>
          </Link>
          <p className="text-white/50 max-w-md mb-8">
            The finest pure vegetarian dining experience in Mirajgaon. 
            We take pride in our authentic recipes and world-class hospitality.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all"><Facebook size={20} /></a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-white/50">
            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#menu" className="hover:text-primary transition-colors">Our Menu</a></li>
            <li><a href="#booking" className="hover:text-primary transition-colors">Book Table</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-white/50 mb-4 text-sm">Subscribe to get special offers and menu updates.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/10 border-none rounded-lg px-4 py-2 w-full outline-none focus:ring-1 focus:ring-primary" />
            <button className="bg-primary text-secondary p-2 rounded-lg"><ChevronRight /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-white/30 text-sm">
        <p>&copy; {new Date().getFullYear()} Hotel Kranti Pure Veg. All rights reserved.</p>
      </div>
    </footer>
  );
};

const AdminPanel = ({ user }: { user: User | null }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', thumbnail: '' });
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== "ayansayyad010@gmail.com") {
      navigate('/');
      return;
    }

    const qBookings = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qVideos = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubVideos = onSnapshot(qVideos, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubBookings();
      unsubVideos();
    };
  }, [user, navigate]);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'videos'), {
        ...newVideo,
        createdAt: serverTimestamp()
      });
      setNewVideo({ title: '', url: '', thumbnail: '' });
      setIsAddingVideo(false);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 dark:bg-bg-dark pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <Link to="/" className="btn-outline py-2 px-4 text-sm">Back to Site</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-bg-dark rounded-3xl shadow-xl overflow-hidden border border-black/5 dark:border-white/5">
            <div className="p-6 border-b border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar size={20} className="text-primary" /> Recent Bookings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-accent/50 dark:bg-white/5 text-xs font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Guests</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-accent/20 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold">{booking.name}</div>
                        <div className="text-xs opacity-50">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{booking.date}</div>
                        <div className="text-xs opacity-50">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4">{booking.guests}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                          booking.status === 'pending' ? "bg-yellow-100 text-yellow-700" : 
                          booking.status === 'confirmed' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:underline text-sm font-bold">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-bg-dark rounded-3xl shadow-xl p-6 border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Utensils size={20} className="text-primary" /> Videos
                </h2>
                <button 
                  onClick={() => setIsAddingVideo(!isAddingVideo)}
                  className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold"
                >
                  {isAddingVideo ? 'Cancel' : '+ Add Video'}
                </button>
              </div>

              {isAddingVideo && (
                <form onSubmit={handleAddVideo} className="space-y-4 mb-6 p-4 bg-accent/30 rounded-2xl">
                  <input 
                    required
                    type="text" 
                    placeholder="Video Title" 
                    className="w-full px-4 py-2 rounded-lg bg-white border-none text-sm outline-none"
                    value={newVideo.title}
                    onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                  />
                  <input 
                    required
                    type="url" 
                    placeholder="Video URL (.mp4)" 
                    className="w-full px-4 py-2 rounded-lg bg-white border-none text-sm outline-none"
                    value={newVideo.url}
                    onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                  />
                  <input 
                    type="url" 
                    placeholder="Thumbnail URL" 
                    className="w-full px-4 py-2 rounded-lg bg-white border-none text-sm outline-none"
                    value={newVideo.thumbnail}
                    onChange={e => setNewVideo({...newVideo, thumbnail: e.target.value})}
                  />
                  <button type="submit" className="btn-primary w-full py-2 text-sm">Save Video</button>
                </form>
              )}

              <div className="space-y-4">
                {videos.map(video => (
                  <div key={video.id} className="flex gap-3 items-center p-3 hover:bg-accent/30 rounded-2xl transition-colors">
                    <div className="w-16 h-10 bg-black rounded-lg overflow-hidden shrink-0">
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{video.title}</h4>
                      <p className="text-[10px] opacity-50 truncate">{video.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className={cn(darkMode && "dark")}>
        <div className="min-h-screen bg-white dark:bg-bg-dark text-secondary dark:text-accent transition-colors duration-300">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu-card" element={<MenuCardPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/admin" element={<AdminPanel user={user} />} />
          </Routes>

          <Footer />

          {/* Floating WhatsApp */}
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noreferrer"
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
          >
            <MessageSquare size={28} />
          </a>

          {/* Scroll to Top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-24 right-6 w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40"
              >
                <ArrowUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}
