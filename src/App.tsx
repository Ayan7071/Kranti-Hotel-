import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, X, Phone, MapPin, Clock, 
  Instagram, Facebook, Twitter, ChevronRight, 
  Star, Utensils, Coffee, Calendar, Users, Heart,
  MessageSquare, ArrowUp, Sun, Moon, LogIn, 
  LayoutDashboard, ShoppingBag, Package, Trash2, Edit2, Plus
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
  getDoc,
  updateDoc,
  deleteDoc,
  where
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const WHATSAPP_NUMBER = "919834166661";

// --- Types ---

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// --- Components ---

// --- Page Components ---

const FamilyExperience = () => {
  return (
    <section className="py-24 px-6 bg-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=1000" 
                alt="Family Dining" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full -z-10 opacity-20 blur-3xl" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary rounded-full -z-10 opacity-10 blur-2xl" />
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-bg-dark p-8 rounded-3xl shadow-xl z-20 max-w-[200px]"
            >
              <div className="text-4xl font-serif text-primary mb-2">100%</div>
              <div className="text-sm font-medium opacity-70">Pure Vegetarian Quality Ingredients</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary font-medium tracking-widest uppercase mb-4 block">Quality & Tradition</span>
              <h2 className="text-5xl lg:text-6xl font-serif leading-tight mb-6">
                Where Every Meal <br /> 
                <span className="italic text-primary">Feels Like Home</span>
              </h2>
              <p className="text-lg text-secondary/70 dark:text-accent/70 leading-relaxed">
                At Hotel Kranti, we believe that the best memories are made around a dinner table. 
                Our recipes have been passed down through generations, prepared with the freshest 
                organic ingredients and a whole lot of love.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Users size={24} />
                </div>
                <h4 className="text-xl font-serif">Family First</h4>
                <p className="text-sm opacity-60">Spacious seating designed for large family gatherings and celebrations.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Star size={24} />
                </div>
                <h4 className="text-xl font-serif">Premium Quality</h4>
                <p className="text-sm opacity-60">We source only the finest local vegetables and authentic spices.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/facilities" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                Explore Our Facilities <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Ingredients",
              desc: "Daily sourced organic vegetables from local farmers.",
              img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=500"
            },
            {
              title: "Hygienic Kitchen",
              desc: "Maintaining the highest standards of cleanliness and safety.",
              img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=500"
            },
            {
              title: "Authentic Taste",
              desc: "Traditional spices blended to perfection for every dish.",
              img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=500"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <img 
                src={feature.img} 
                alt={feature.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FamilyMoments = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1547573854-74d2a71d0827?auto=format&fit=crop&q=80&w=2070",
      title: "Family Dinner",
      desc: "Creating memories over delicious food."
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
      title: "Celebrations",
      desc: "The perfect place for your special moments."
    },
    {
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=2070",
      title: "Togetherness",
      desc: "Pure vegetarian joy for all generations."
    }
  ];

  return (
    <section className="py-24 px-6 bg-accent/30 dark:bg-bg-dark/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase mb-2 block"
          >
            Cherished Memories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Happy Family Moments
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto mt-4"
          >
            At Hotel Kranti, we don't just serve food; we serve happiness. 
            Join us for an unforgettable dining experience with your loved ones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.desc}</p>
              </div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart size={20} className="fill-primary text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuCardPreview = () => {
  return (
    <section id="menu" className="py-24 px-6 bg-accent/30 dark:bg-bg-dark/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Our Offerings
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold leading-tight"
            >
              Explore Our <span className="text-primary italic">Digital Menu Card</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/menu-card" 
              className="group flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl hover:bg-primary hover:text-secondary transition-all duration-300 shadow-xl"
            >
              <span className="font-bold">View Full Menu</span>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                <ChevronRight size={20} />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Starters & Snacks", 
              items: ["Papad", "Tandoor Starter", "Breakfast"],
              image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800"
            },
            { 
              title: "Main Course", 
              items: ["Paneer Special", "Veg Main Course", "Handi"],
              image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
            },
            { 
              title: "Roti & Rice", 
              items: ["Tandoori Roti", "Jeera Rice", "Biryani"],
              image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800"
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
            >
              <Link to="/menu-card">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">{card.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.items.map((item, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ addToCart, cart }: { addToCart: (item: any) => void, cart: CartItem[] }) => {
  return (
    <main>
      <Hero />
      <About />
      <FamilyExperience />
      <DeliveryTeaser />
      <FamilyMoments />
      <MenuCardPreview />
      <VideoShowcase />
      <BookingForm />
      <Gallery />
      <Reviews />
      <Contact />
    </main>
  );
};

const OnlineDeliveryPage = ({ addToCart, cart }: { addToCart: (item: any) => void, cart: CartItem[] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dbMenuItems, setDbMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'menuItems'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDbMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Breakfast', 'Tandoor Starter', 'Papad', 'Chai / Coffee', 'Cold Drinks', 'Paneer Special', 'Main Course', 'Rice', 'Roti', 'Handi', 'Thali'];

  const hardcodedMenuItems = [
    // Papad
    { id: 1, name: 'Plain Papad', price: 20, category: 'Papad', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=plain_papad', desc: 'Crispy and light plain papad.' },
    { id: 2, name: 'Masala Papad', price: 30, category: 'Papad', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=masala_papad', desc: 'Papad topped with spicy onion and tomato masala.' },
    { id: 3, name: 'Roasted Papad', price: 20, category: 'Papad', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=roasted_papad', desc: 'Perfectly roasted crispy papad.' },
    
    // Tandoor Starter
    { id: 4, name: 'Paneer Chilli', price: 190, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1000&sig=paneer_chilli', desc: 'Spicy and tangy paneer cubes with bell peppers.' },
    { id: 5, name: 'Paneer 65', price: 170, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1000&sig=paneer_65', desc: 'Deep-fried spicy paneer appetizer.' },
    { id: 6, name: 'Soybean Chilli', price: 150, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000&sig=soybean_chilli', desc: 'Spicy soybean chunks tossed in chilli sauce.' },
    { id: 7, name: 'Veg Manchurian', price: 150, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000&sig=veg_manchurian', desc: 'Vegetable balls in a savory manchurian sauce.' },
    { id: 8, name: 'Soybean Roast', price: 100, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000&sig=soybean_roast', desc: 'Roasted soybean chunks with spices.' },
    { id: 9, name: 'Batata Finger', price: 80, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=1000&sig=batata_finger', desc: 'Crispy potato fingers.' },
    { id: 10, name: 'Veg Manchow Soup', price: 60, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000&sig=manchow_soup', desc: 'Spicy and sour vegetable soup with fried noodles.' },
    { id: 11, name: 'Tomato Soup', price: 60, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000&sig=tomato_soup', desc: 'Creamy and rich tomato soup.' },
    { id: 12, name: 'Veg Soup', price: 50, category: 'Tandoor Starter', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000&sig=veg_soup', desc: 'Healthy and light vegetable soup.' },

    // Chai / Coffee
    { id: 13, name: 'Chai', price: 10, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=1000&sig=chai_tea', desc: 'Traditional Indian masala tea.' },
    { id: 14, name: 'Lemon Tea', price: 10, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1544787210-2827448b303c?auto=format&fit=crop&q=80&w=1000&sig=lemon_tea', desc: 'Refreshing lemon infused tea.' },
    { id: 15, name: 'Black Tea', price: 10, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1544787210-2827448b303c?auto=format&fit=crop&q=80&w=1000&sig=black_tea', desc: 'Strong and pure black tea.' },
    { id: 16, name: 'Coffee', price: 20, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000&sig=hot_coffee', desc: 'Rich and aromatic coffee.' },
    { id: 17, name: 'Boost', price: 20, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=1000&sig=boost_drink', desc: 'Energy boosting chocolate malt drink.' },
    { id: 18, name: 'Tak', price: 30, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000&sig=buttermilk', desc: 'Traditional spiced buttermilk.' },
    { id: 19, name: 'Lassi', price: 40, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000&sig=sweet_lassi', desc: 'Sweet and creamy yogurt drink.' },
    { id: 20, name: 'Dahi Vati', price: 30, category: 'Chai / Coffee', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000&sig=yogurt_bowl', desc: 'Fresh and cool yogurt bowl.' },

    // Breakfast
    { id: 21, name: 'Sada Misal Pav', price: 100, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000', desc: 'Authentic spicy misal served with pav.' },
    { id: 22, name: 'Special Misal Pav', price: 150, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000&sig=special', desc: 'Our signature special misal with extra toppings.' },
    { id: 23, name: 'Puri Bhaji', price: 100, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000', desc: 'Fluffy puris served with spiced potato bhaji.' },
    { id: 24, name: 'Idli', price: 80, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=idli', desc: 'Soft and steamed rice cakes.' },
    { id: 25, name: 'Udid Vada', price: 50, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=vada', desc: 'Crispy and savory lentil donuts.' },
    { id: 26, name: 'Poha', price: 30, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000&sig=poha', desc: 'Flattened rice cooked with onions and spices.' },
    { id: 27, name: 'Plain Dosa', price: 60, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=dosa', desc: 'Crispy golden rice crepe.' },
    { id: 28, name: 'Masala Dosa', price: 80, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=masaladosa', desc: 'Dosa filled with spiced potato mash.' },
    { id: 29, name: 'Cut Dosa', price: 90, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=cutdosa', desc: 'Crispy dosa cut into pieces for easy sharing.' },
    { id: 30, name: 'Paneer Dosa', price: 100, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=paneerdosa', desc: 'Dosa filled with spiced paneer.' },
    { id: 31, name: 'Dosa', price: 100, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=dosa_plain', desc: 'Special crispy dosa.' },
    { id: 32, name: 'Sada Uthappa', price: 60, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=uthappa', desc: 'Thick and soft rice pancake.' },
    { id: 33, name: 'Kanda Uthappa', price: 70, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=kandauthappa', desc: 'Uthappa topped with onions.' },
    { id: 34, name: 'Tomato Uthappa', price: 70, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=tomatouthappa', desc: 'Uthappa topped with tomatoes.' },
    { id: 35, name: 'Kanda + Tomato Uthappa', price: 80, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=ktuthappa', desc: 'Uthappa topped with onions and tomatoes.' },
    { id: 36, name: 'Butter Uthappa', price: 80, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000&sig=butteruthappa', desc: 'Rich and buttery uthappa.' },
    { id: 37, name: 'Sabudana Khichdi / Sagwara', price: 60, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000&sig=sabudana', desc: 'Tapioca pearls cooked with peanuts and spices.' },

    // Cold Drinks
    { id: 38, name: 'Miranda', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=miranda', desc: 'Refreshing orange soda.' },
    { id: 39, name: 'Jeera Soda', price: 20, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000&sig=jeera', desc: 'Spiced cumin soda.' },
    { id: 40, name: 'Maaza', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000&sig=maaza', desc: 'Sweet mango drink.' },
    { id: 41, name: 'Slice', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000&sig=slice', desc: 'Delicious mango beverage.' },
    { id: 42, name: 'Fruity', price: 20, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000&sig=fruity', desc: 'Classic mango fruit drink.' },
    { id: 43, name: 'Red Bull', price: 120, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=redbull_blue', desc: 'Energy drink to keep you going.' },
    { id: 44, name: 'Monster', price: 120, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=monster', desc: 'Powerful energy drink.' },
    { id: 45, name: 'Sprite', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=sprite', desc: 'Lemon-lime flavored soda.' },
    { id: 46, name: 'Thumbs Up', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=thumbsup', desc: 'Strong and spicy cola.' },
    { id: 47, name: 'Pepsi', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=pepsi', desc: 'Classic cola beverage.' },
    { id: 48, name: '7UP', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=7up', desc: 'Refreshing lemon-lime soda.' },
    { id: 49, name: 'Limca', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=limca', desc: 'Cloudy lemon-lime soda.' },
    { id: 50, name: 'Fanta', price: 30, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?auto=format&fit=crop&q=80&w=1000&sig=fanta', desc: 'Vibrant orange soda.' },

    // Paneer Special
    { id: 50, name: 'Kaju Paneer Masala', price: 200, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=kajupaneer', desc: 'Rich paneer curry with cashews.' },
    { id: 51, name: 'Paneer Masala', price: 150, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneermasala', desc: 'Classic spiced paneer curry.' },
    { id: 52, name: 'Matar Paneer', price: 170, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=matarpaneer', desc: 'Paneer and green peas in tomato gravy.' },
    { id: 53, name: 'Paneer Butter Masala', price: 150, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=butterpaneer', desc: 'Creamy and buttery paneer curry.' },
    { id: 54, name: 'Paneer Tikka Masala', price: 170, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=tikkapaneer', desc: 'Grilled paneer in a spicy gravy.' },
    { id: 55, name: 'Paneer Chingari', price: 160, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerchingari', desc: 'Spicy and flavorful paneer dish.' },
    { id: 56, name: 'Paneer Kadai', price: 170, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=kadaipaneer', desc: 'Paneer cooked in a traditional kadai with spices.' },
    { id: 57, name: 'Paneer Kolhapuri', price: 180, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=kolhapuripaneer', desc: 'Extra spicy paneer curry from Kolhapur.' },
    { id: 58, name: 'Shahi Paneer', price: 220, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=shahipaneer', desc: 'Royal paneer curry in a white creamy gravy.' },
    { id: 59, name: 'Paneer Bhurji', price: 180, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerbhurji', desc: 'Scrambled paneer with onions and spices.' },
    { id: 60, name: 'Paneer Tufani', price: 260, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneertufani', desc: 'Spicy and rich paneer specialty.' },
    { id: 61, name: 'Paneer Angara', price: 230, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerangara', desc: 'Smoky and spicy paneer curry.' },
    { id: 62, name: 'Paneer Korama', price: 200, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerkorama', desc: 'Paneer in a rich and creamy korma gravy.' },
    { id: 63, name: 'Paneer Hyderabadi', price: 180, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerhyderabadi', desc: 'Paneer in a green spinach and mint gravy.' },
    { id: 64, name: 'Paneer Diluba', price: 180, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerdiluba', desc: 'Sweet and spicy paneer delight.' },
    { id: 65, name: 'Paneer Patiala', price: 220, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerpatiala', desc: 'Paneer stuffed papad in a rich gravy.' },
    { id: 66, name: 'Paneer Nababi', price: 160, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneernababi', desc: 'Royal paneer preparation with mild spices.' },
    { id: 67, name: 'Paneer Kaju Masala', price: 180, category: 'Paneer Special', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1000&sig=paneerkajumasala', desc: 'Paneer and cashews in a creamy tomato gravy.' },

    // Main Course
    { id: 67, name: 'Veg Kadai', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegkadai', desc: 'Mixed vegetables in a spicy kadai gravy.' },
    { id: 68, name: 'Veg Tawa', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegtawa', desc: 'Assorted vegetables cooked on a tawa.' },
    { id: 69, name: 'Dal Fry', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=dalfry', desc: 'Yellow lentils tempered with spices.' },
    { id: 70, name: 'Dal Tadka', price: 140, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=daltadka', desc: 'Lentils with a double tempering of spices.' },
    { id: 71, name: 'Shev Bhaji', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=shevbhaji', desc: 'Spicy curry with crispy gram flour noodles.' },
    { id: 72, name: 'Green Peas Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=greenpeas', desc: 'Green peas in a spiced tomato-onion gravy.' },
    { id: 73, name: 'Mataki Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=matakimasala', desc: 'Sprouted moth beans in a spicy gravy.' },
    { id: 74, name: 'Mataki Fry', price: 140, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=matakifry', desc: 'Crispy fried sprouted moth beans with spices.' },
    { id: 75, name: 'Baingan Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=bainganmasala', desc: 'Eggplant in a rich and spicy masala.' },
    { id: 76, name: 'Baingan Fry', price: 130, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=bainganfry', desc: 'Crispy fried eggplant slices.' },
    { id: 77, name: 'Bhindi Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=bhindimasala', desc: 'Okra cooked with onions and spices.' },
    { id: 78, name: 'Bhindi Fry', price: 130, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=bhindifry', desc: 'Crispy fried okra.' },
    { id: 79, name: 'Methi Masala', price: 130, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=methimasala', desc: 'Fenugreek leaves in a spiced gravy.' },
    { id: 80, name: 'Soybean Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=soybeanmasala', desc: 'Soybean chunks in a spicy curry.' },
    { id: 81, name: 'Chana Masala', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=chanamasala', desc: 'Chickpeas in a tangy and spicy gravy.' },
    { id: 82, name: 'Tava Besan', price: 100, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=tavabesan', desc: 'Gram flour preparation cooked on a tawa.' },
    { id: 83, name: 'Aalu Matar', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=aalumatar', desc: 'Potatoes and green peas in a spiced curry.' },
    { id: 84, name: 'Tomato Chutney', price: 60, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=tomatochutney', desc: 'Tangy tomato-based side dish.' },
    { id: 85, name: 'Akkha Masur', price: 140, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=akkhamasur', desc: 'Whole black lentils in a spicy gravy.' },
    { id: 86, name: 'Mix Veg', price: 150, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=mixveg', desc: 'Assorted vegetables in a balanced curry.' },
    { id: 87, name: 'Veg Kolhapuri', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegkolhapuri', desc: 'Spicy mixed vegetable curry.' },
    { id: 88, name: 'Veg Bhuna', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegbhuna', desc: 'Vegetables roasted with spices.' },
    { id: 89, name: 'Panjabi Aalu', price: 150, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=panjabiaalu', desc: 'Potatoes cooked in Punjabi style.' },
    { id: 90, name: 'Mashrum Masala', price: 200, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=mashrummasala', desc: 'Mushrooms in a spiced gravy.' },
    { id: 91, name: 'Malae Kofta', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=malaikofta', desc: 'Soft vegetable balls in a creamy gravy.' },
    { id: 92, name: 'Mashrum Kaju Masala', price: 220, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=mashrumkajumasala', desc: 'Mushrooms and cashews in a rich gravy.' },
    { id: 93, name: 'Veg Angara', price: 180, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegangara', desc: 'Smoky flavored mixed vegetable curry.' },
    { id: 94, name: 'Veg Chingari', price: 180, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegchingari', desc: 'Spicy and vibrant vegetable dish.' },
    { id: 95, name: 'Veg Jaipuri', price: 170, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegjaipuri', desc: 'Vegetables cooked with Jaipur-style spices.' },
    { id: 96, name: 'Veg Maratha', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=vegmaratha', desc: 'Spicy vegetable cutlets in a Maharashtrian gravy.' },
    { id: 97, name: 'Bebycon Masala', price: 160, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000&sig=babycorn', desc: 'Baby corn in a spiced tomato gravy.' },

    // Rice
    { id: 98, name: 'Plane Rice', price: 90, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=planerice', desc: 'Simple steamed basmati rice.' },
    { id: 99, name: 'Steam Rice', price: 100, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=steamrice', desc: 'Perfectly steamed fluffy rice.' },
    { id: 100, name: 'Jeera Rice', price: 120, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=jeerarice', desc: 'Basmati rice tempered with cumin seeds.' },
    { id: 101, name: 'Masala Rice', price: 120, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=masalarice', desc: 'Spiced and flavorful rice.' },
    { id: 102, name: 'Veg Biryani', price: 170, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=vegbiryani', desc: 'Fragrant rice layered with spiced vegetables.' },
    { id: 103, name: 'Veg Pulao', price: 150, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=vegpulao', desc: 'Rice cooked with mixed vegetables and mild spices.' },
    { id: 104, name: 'Daal Khichdi', price: 150, category: 'Rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000&sig=daalkhichdi', desc: 'Comforting mix of rice and lentils.' },

    // Roti
    { id: 105, name: 'Plain Roti', price: 15, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=plainroti', desc: 'Simple whole wheat flatbread.' },
    { id: 106, name: 'Butter Roti', price: 20, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=butterroti', desc: 'Soft whole wheat bread with butter.' },
    { id: 107, name: 'Plain Naan', price: 30, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=plainnaan', desc: 'Traditional leavened bread.' },
    { id: 108, name: 'Butter Naan', price: 40, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=butternaan', desc: 'Leavened bread with butter.' },
    { id: 109, name: 'Garlic Naan', price: 60, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=garlicnaan', desc: 'Naan topped with minced garlic.' },
    { id: 110, name: 'Chapati', price: 20, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=chapati', desc: 'Traditional homemade flatbread.' },
    { id: 111, name: 'Jari Bhakri', price: 25, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=jaribhakri', desc: 'Traditional sorghum flatbread.' },
    { id: 112, name: 'Bajari Bhakri', price: 25, category: 'Roti', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1000&sig=bajaribhakri', desc: 'Traditional pearl millet flatbread.' },

    // Handi
    { id: 113, name: 'Kaju Masala Handi', price: 400, category: 'Handi', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=kajumasalahandi', desc: 'Cashews cooked in a rich handi gravy.' },
    { id: 114, name: 'Paneer Handi', price: 400, category: 'Handi', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=paneerhandi', desc: 'Paneer cooked in a special handi gravy.' },
    { id: 115, name: 'Umber Handi', price: 550, category: 'Handi', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=umberhandi', desc: 'Our signature specialty handi dish.' },
    { id: 116, name: 'Shevga Handi', price: 500, category: 'Handi', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=shevgahandi', desc: 'Drumsticks cooked in a spicy handi gravy.' },
    { id: 117, name: 'Veg Handi', price: 350, category: 'Handi', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000&sig=veghandi', desc: 'Mixed vegetables in a rich handi sauce.' },

    // Thali
    { id: 118, name: 'Kranti Special Thali', price: 330, category: 'Thali', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000&sig=thali', desc: 'Our signature thali with a complete meal experience.' },
  ];

  const currentMenuItems = dbMenuItems.length > 0 ? dbMenuItems : hardcodedMenuItems;
  const filteredItems = activeCategory === 'All' ? currentMenuItems : currentMenuItems.filter(item => item.category === activeCategory);

  if (loading && dbMenuItems.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Fast & Fresh</span>
          <h1 className="text-5xl font-serif mb-6">Online Delivery</h1>
          <p className="text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto">
            Get your favorite Kranti Pure Veg dishes delivered to your doorstep. 
            Experience the same signature taste at home.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
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
            {filteredItems.map((item) => {
              const cartItem = cart.find(i => i.id === item.id);
              return (
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
                    <button 
                      onClick={() => addToCart(item)}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {cartItem ? `Added (${cartItem.quantity})` : 'Add to Cart'} <ShoppingBag size={18} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DeliveryTeaser = () => {
  return (
    <section className="py-24 px-6 bg-primary/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Convenience</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Fresh Food, <br />Delivered Fast</h2>
          <p className="text-secondary/70 dark:text-accent/70 mb-8 text-lg">
            Can't make it to the restaurant? No problem. Use our online delivery system to order your favorite meals. 
            We show real-time stock so you always know what's fresh and ready.
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary"><ChevronRight size={14} /></div>
              <p className="font-medium">Real-time stock tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary"><ChevronRight size={14} /></div>
              <p className="font-medium">Direct WhatsApp ordering</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary"><ChevronRight size={14} /></div>
              <p className="font-medium">Hygienic packaging</p>
            </div>
          </div>
          <Link to="/delivery" className="btn-primary">Order Online Now</Link>
        </div>
        <div className="order-1 md:order-2 relative">
          <img 
            src="https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=1000" 
            alt="Delivery" 
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-6 -right-6 bg-white dark:bg-bg-dark p-6 rounded-2xl shadow-xl border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Package size={20} /></div>
              <div>
                <p className="text-xs opacity-50 font-bold uppercase">Live Stock</p>
                <p className="font-bold">Misal Pav: 15 Left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhysicalMenuCard = ({ title, sections, items, showImages }: { title: string, sections?: any[], items?: any[], showImages?: boolean }) => {
  return (
    <div className="bg-[#f4e4bc] p-4 md:p-8 rounded-xl shadow-2xl border-8 border-[#d4c49c] relative overflow-hidden mb-12">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      
      {/* Logo Header */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-full p-3 shadow-lg border-2 border-primary">
          <img src="https://hotelkranti.com/wp-content/uploads/2023/05/Hotel-Kranti-Logo.png" alt="Hotel Kranti" className="h-12 md:h-16 w-auto" />
        </div>
      </div>

      {/* Main Title Header */}
      <div className="bg-[#333] py-2 px-4 rounded-lg mb-6 flex justify-between items-center">
        <h2 className="text-[#ffcc00] text-lg md:text-xl font-bold">{title.split(' / ')[0]}</h2>
        <h2 className="text-[#ffcc00] text-lg md:text-xl font-bold">{title.split(' / ')[1]}</h2>
      </div>

      {/* Render Sections or direct items */}
      {sections ? (
        sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-8 last:mb-0">
            <div className="bg-[#333]/10 py-1 px-4 rounded-md mb-4 flex justify-between items-center border-y border-[#333]/20">
              <h3 className="text-[#333] font-bold text-base md:text-lg">{section.title.split(' / ')[0]}</h3>
              {section.headers && (
                <div className="flex gap-8 text-xs md:text-sm font-bold text-[#333]">
                  {section.headers.map((h: string, i: number) => <span key={i}>{h}</span>)}
                </div>
              )}
              <h3 className="text-[#333] font-bold text-base md:text-lg">{section.title.split(' / ')[1]}</h3>
            </div>
            <div className="space-y-1">
              {section.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-2 md:gap-4 text-[#1a1a1a] font-medium border-b border-black/5 pb-1 hover:bg-black/5 transition-colors">
                  <span className="w-6 md:w-8 text-xs md:text-sm">{item.id})</span>
                  <span className="flex-1 text-left text-xs md:text-base">{item.marathi}</span>
                  <div className="flex gap-4 md:gap-8 min-w-[80px] md:min-w-[120px] justify-center">
                    {Array.isArray(item.price) ? (
                      item.price.map((p: string, i: number) => (
                        <span key={i} className="text-red-600 font-bold text-xs md:text-base">{p}</span>
                      ))
                    ) : (
                      <span className="text-red-600 font-bold text-xs md:text-base">{item.price}</span>
                    )}
                  </div>
                  <span className="flex-1 text-right text-xs md:text-base">{item.english}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : items ? (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 md:gap-4 text-[#1a1a1a] font-medium border-b border-black/5 pb-1 hover:bg-black/5 transition-colors">
              <span className="w-6 md:w-8 text-xs md:text-sm">{item.id})</span>
              <span className="flex-1 text-left text-xs md:text-base">{item.marathi}</span>
              <span className="text-red-600 font-bold px-2 text-xs md:text-base">{item.price}</span>
              <span className="flex-1 text-right text-xs md:text-base">{item.english}</span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Optional Images Footer (like in the physical card) */}
      {showImages && (
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8">
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#333]/20">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" alt="Food 1" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#333]/20">
            <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400" alt="Food 2" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#333]/20">
            <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400" alt="Food 3" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};

const MenuCardPage = () => {
  const starterSection = [
    {
      title: "पापड / Papad",
      items: [
        { id: 1, marathi: "प्लेन पापड", english: "Plain Papad", price: "20.00" },
        { id: 2, marathi: "मसाला पापड", english: "Masala Papad", price: "30.00" },
        { id: 3, marathi: "रोस्टेड पापड", english: "Rosted Papad", price: "20.00" }
      ]
    },
    {
      title: "तंदुर स्टार्टर / Tandoor Starter",
      items: [
        { id: 1, marathi: "पनीर चिल्ली", english: "Paneer Chilli", price: "190.00" },
        { id: 2, marathi: "पनीर ६५", english: "Paneer 65", price: "170.00" },
        { id: 3, marathi: "सोयाबीन चिल्ली", english: "Soybean Chilli", price: "150.00" },
        { id: 4, marathi: "व्हेज मनच्युरियन", english: "Veg Manchurian", price: "150.00" },
        { id: 5, marathi: "सोयाबीन रोस्ट", english: "Soybean Rroast", price: "100.00" },
        { id: 6, marathi: "बटाटा फिंगर", english: "Btata Finger", price: "80.00" },
        { id: 7, marathi: "व्हेज मंच्याव सुप", english: "Veg Manchow Soup", price: "60.00" },
        { id: 8, marathi: "टोमॅटो सुप", english: "Tomato Soup", price: "60.00" },
        { id: 9, marathi: "व्हेज सुप", english: "Veg Soup", price: "50.00" }
      ]
    },
    {
      title: "चाय / कॉफी / Chai / Coffee",
      items: [
        { id: 1, marathi: "चाय", english: "Chai", price: "10.0" },
        { id: 2, marathi: "ब्लॅक टी", english: "Black Ti", price: "10.00" },
        { id: 3, marathi: "लेमन टी", english: "Lemon Ti", price: "10.00" },
        { id: 4, marathi: "कॉफी", english: "Coffee", price: "20.00" },
        { id: 5, marathi: "बुस्ट", english: "Boost", price: "20.00" },
        { id: 6, marathi: "ताक", english: "Tak", price: "30.00" },
        { id: 7, marathi: "लस्सी", english: "Lassi", price: "40.00" },
        { id: 8, marathi: "दही वाटी", english: "Dahi Vati", price: "30.00" }
      ]
    }
  ];

  const breakfastSection = [
    {
      title: "नाष्टा / Brackfast",
      items: [
        { id: 1, marathi: "सादा मिसल पाव", english: "Sada Misal Pav", price: "100.00" },
        { id: 2, marathi: "स्पेशल मिसल पाव", english: "Special Misal Pav", price: "150.00" },
        { id: 3, marathi: "पुरी भाजी", english: "Puri Bhaji", price: "100.00" },
        { id: 4, marathi: "इडली", english: "Edali", price: "80.00" },
        { id: 5, marathi: "उडीद वडा", english: "Udid Vada", price: "50.00" },
        { id: 6, marathi: "पोहा", english: "Poha", price: "30.00" },
        { id: 7, marathi: "प्लेन डोसा", english: "Plane Dosa", price: "60.00" },
        { id: 8, marathi: "मसाला डोसा", english: "Masala Dosa", price: "80.00" },
        { id: 9, marathi: "कट डोसा", english: "Cut Dosa", price: "90.00" },
        { id: 10, marathi: "पनीर डोसा", english: "Paneer Dosa", price: "100.00" },
        { id: 11, marathi: "रपंच डोसा", english: "Dosa", price: "100.00" },
        { id: 12, marathi: "सादा उतप्पा", english: "Sada Uthappa", price: "60.00" },
        { id: 13, marathi: "कांदा उतप्पा", english: "Kanda Utappa", price: "70.00" },
        { id: 14, marathi: "टोमॅटो उतप्पा", english: "Tomato Uttappa", price: "70.00" },
        { id: 15, marathi: "कांदा + टोमॅटो उतप्पा", english: "Kanda + Tomato Utapa", price: "80.00" },
        { id: 16, marathi: "बटर उतप्पा", english: "Butter Uttappa", price: "80.00" },
        { id: 17, marathi: "साबु खिचडी/साबुवडा", english: "Sabudana Khichdi / Sagwara", price: "60.00" }
      ]
    },
    {
      title: "कोल्ड्रिंग / Colddrink",
      items: [
        { id: 1, marathi: "मिरिंडा", english: "Miranda", price: "30.00" },
        { id: 2, marathi: "जिरा सोडा", english: "Jeera Soda", price: "20.00" },
        { id: 3, marathi: "माझा", english: "Majha", price: "30.00" },
        { id: 4, marathi: "स्लाईस", english: "Slice", price: "30.00" },
        { id: 5, marathi: "फ्रुटी", english: "Fruity", price: "20.00" },
        { id: 6, marathi: "रेडबुल", english: "Red Bull", price: "120.00" },
        { id: 7, marathi: "मोनस्टर", english: "Monster", price: "120.00" },
        { id: 8, marathi: "स्प्राईट", english: "Sprite", price: "30.00" },
        { id: 9, marathi: "थम्सअप", english: "Thumbs Up", price: "30.00" },
        { id: 10, marathi: "पेप्सी", english: "Pepsi", price: "30.00" },
        { id: 11, marathi: "सेवन अप", english: "7UP", price: "30.00" },
        { id: 12, marathi: "लिमका", english: "Limca", price: "30.00" },
        { id: 13, marathi: "फन्टा", english: "Fanta", price: "30.00" }
      ]
    }
  ];

  const mainCourseSection = [
    {
      title: "पनीर मेन कोर्स / Paneer Main Course",
      items: [
        { id: 1, marathi: "काजू पनीर मसाला", english: "Kaju Paneer Masala", price: "200.00" },
        { id: 2, marathi: "पनीर मसाला", english: "Paneer Masala", price: "150.00" },
        { id: 3, marathi: "मटर पनीर", english: "Matar Paneer", price: "170.00" },
        { id: 4, marathi: "पनीर बटर मसाला", english: "Paneer Butter Masala", price: "150.00" },
        { id: 5, marathi: "पनीर टिक्का मसाला", english: "Paneer Tikka Masala", price: "170.00" },
        { id: 6, marathi: "पनीर चिंगारी", english: "Paneer Chingari", price: "160.00" },
        { id: 7, marathi: "पनीर कढाई", english: "Paneer Kadai", price: "170.00" },
        { id: 8, marathi: "पनीर कोल्हापूरी", english: "Paneer Kolhapuri", price: "180.00" },
        { id: 9, marathi: "पनीर तुफानी", english: "Paneer Tufani", price: "260.00" },
        { id: 10, marathi: "शाही पनीर", english: "Shahi Paneer", price: "220.00" },
        { id: 11, marathi: "पनीर अंगारा", english: "Paneer Angara", price: "230.00" },
        { id: 12, marathi: "पनीर कोरमा", english: "Paneer Korama", price: "200.00" },
        { id: 13, marathi: "पनीर हैद्राबादी", english: "Paneer Hyderabadi", price: "180.00" },
        { id: 14, marathi: "पनीर दिलऊबा", english: "Paneer Diluba", price: "180.00" },
        { id: 15, marathi: "पनीर भुर्जी", english: "Paneer Bhurji", price: "180.00" },
        { id: 16, marathi: "पनीर पटियाला", english: "Paneer Patiala", price: "220.00" },
        { id: 17, marathi: "पनीर नबाबी", english: "Paneer Nababe", price: "160.00" },
        { id: 18, marathi: "पनीर काजु मसाला", english: "Paneer Kaju Masala", price: "180.00" }
      ]
    },
    {
      title: "मेन कोर्स / Main Course",
      items: [
        { id: 1, marathi: "व्हेज कढाई", english: "Veg Kadai", price: "160.00" },
        { id: 2, marathi: "व्हेज तवा", english: "Veg Tawa", price: "160.00" },
        { id: 3, marathi: "दाळ फ्राय", english: "Dal Fry", price: "120.00" },
        { id: 4, marathi: "दाळ तडका", english: "Dal Tadka", price: "140.00" },
        { id: 5, marathi: "शेव भाजी", english: "Shev Bhaji", price: "120.00" },
        { id: 6, marathi: "ग्रीन पीस मसाला", english: "Green Peas Masala", price: "120.00" },
        { id: 7, marathi: "मटकी मसाला", english: "Mataki Masala", price: "120.00" },
        { id: 8, marathi: "मटकी फ्राय", english: "Mataki Fry", price: "140.00" },
        { id: 9, marathi: "बेंगन मसाला", english: "Baingan Masala", price: "120.00" },
        { id: 10, marathi: "बेंगन फ्राय", english: "Baingan Fry", price: "130.00" },
        { id: 11, marathi: "भेंडी मसाला", english: "Bhindi Masala", price: "120.00" },
        { id: 12, marathi: "भेंडी फ्राय", english: "Bhindi Fry", price: "130.00" },
        { id: 13, marathi: "मेथी मसाला", english: "Methi Masala", price: "130.00" },
        { id: 14, marathi: "सोयाबीन मसाला", english: "Soybean Masala", price: "120.00" },
        { id: 15, marathi: "चना मसाला", english: "Chana Masala", price: "120.00" },
        { id: 16, marathi: "तवा बेसन", english: "Tava Besan", price: "100.00" },
        { id: 17, marathi: "आलू मटर", english: "Aalu Matar", price: "120.00" },
        { id: 18, marathi: "टेमॅटो चटणी", english: "Tomato Chutney", price: "60.00" },
        { id: 19, marathi: "अख्खा मसूर", english: "Akkha Masur", price: "140.00" },
        { id: 20, marathi: "मिक्स व्हेज", english: "Mix Veg", price: "150.00" },
        { id: 21, marathi: "व्हेज कोल्हापूरी", english: "Veg Kolhapuri", price: "160.00" },
        { id: 22, marathi: "व्हेज भुना", english: "Veg Bhuna", price: "160.00" },
        { id: 23, marathi: "पंजाबी आलू", english: "Panjabi Aalu", price: "150.00" },
        { id: 24, marathi: "मशरुम मसाला", english: "Mashrum Masala", price: "200.00" },
        { id: 25, marathi: "मलाई कोफ्ता", english: "Malae Kofta", price: "160.00" },
        { id: 26, marathi: "मशरुम काजु मसाला", english: "Mashrum Kaju Masala", price: "220.00" },
        { id: 27, marathi: "व्हेज अंगारा", english: "Veg Angara", price: "180.00" },
        { id: 28, marathi: "व्हेज चिंगारी", english: "Veg Chingari", price: "180.00" },
        { id: 29, marathi: "व्हेज जयपुरी", english: "Veg Jaipuri", price: "170.00" },
        { id: 30, marathi: "व्हेज मराठा", english: "Veg Maratha", price: "160.00" },
        { id: 31, marathi: "बेबीकॉन मसाला", english: "Bebycon Masala", price: "160.00" }
      ]
    }
  ];

  const rotiRiceSection = [
    {
      title: "राईस / Rice",
      headers: ["फुल", "हाफ"],
      items: [
        { id: 1, marathi: "प्लेन राईस", english: "Plane Rice", price: ["90.00", "50.00"] },
        { id: 2, marathi: "स्टीम राईस", english: "Steam Rice", price: ["100.00", "60.00"] },
        { id: 3, marathi: "जीरा राईस", english: "Jeera Rice", price: ["120.00", "70.00"] },
        { id: 4, marathi: "मसाला राईस", english: "Masala Rice", price: ["120.00", ""] },
        { id: 5, marathi: "व्हेज बिर्याणी", english: "Veg Biryani", price: ["170.00", ""] },
        { id: 6, marathi: "व्हेज पुलाव", english: "Veg Pulao", price: ["150.00", ""] },
        { id: 7, marathi: "डाळ खिचडी", english: "Daal Khichdi", price: ["150.00", ""] }
      ]
    },
    {
      title: "तंदुर रोटी / Tandoori Roti",
      items: [
        { id: 1, marathi: "प्लेन रोटी", english: "Plain Roti", price: "15.00" },
        { id: 2, marathi: "बटर रोटी", english: "Butter Roti", price: "20.00" },
        { id: 3, marathi: "प्लेन नान", english: "Plain Naan", price: "30.00" },
        { id: 4, marathi: "बटर नान", english: "Butter Naan", price: "40.00" },
        { id: 5, marathi: "गारलीक नान", english: "Garlic Naan", price: "60.00" },
        { id: 6, marathi: "चपाती", english: "Chapati", price: "20.00" },
        { id: 7, marathi: "ज्वारी भाकर", english: "Jari Bhakri", price: "25.00" },
        { id: 8, marathi: "बाजरी भाकर", english: "Bajari Bhakri", price: "25.00" }
      ]
    },
    {
      title: "हंडी / Handi",
      items: [
        { id: 1, marathi: "काजु मसाला हंडी", english: "Kaju Masala Handi", price: "400.00" },
        { id: 2, marathi: "पनीर हंडी", english: "Paneer Handi", price: "400.00" },
        { id: 3, marathi: "उंबर हंडी", english: "Umber Handi", price: "550 / 300" },
        { id: 4, marathi: "शेवगा हंडी", english: "Shevga Handi", price: "500 / 300" },
        { id: 5, marathi: "व्हेज हंडी", english: "Veg Handi", price: "350.00" }
      ]
    }
  ];

  const specialThaliItems = [
    { id: 1, marathi: "उंबर हंडी", english: "Umber Handi", price: "550 / 300" },
    { id: 2, marathi: "क्रांती स्पेशल थाळी", english: "Kranti Spacial Thali", price: "330.00" },
    { id: 3, marathi: "शेवगा हंडी", english: "Shevga Handi", price: "500 / 300" }
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-6 min-h-screen bg-accent/10 dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-primary font-medium tracking-widest uppercase mb-2 block">Traditional View</span>
        <h1 className="text-4xl md:text-5xl font-serif mb-8">Our Physical Menu Card</h1>
        <p className="text-secondary/70 dark:text-accent/70 mb-12 max-w-2xl mx-auto">
          Browse our full selection of pure vegetarian delicacies. 
          Authentic recipes passed down through generations.
        </p>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PhysicalMenuCard title="नाष्टा & कोल्ड्रिंग / Breakfast & Cold Drinks" sections={breakfastSection} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PhysicalMenuCard title="स्टार्टर & पेय / Starters & Beverages" sections={starterSection} showImages />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PhysicalMenuCard title="मेन कोर्स / Main Course" sections={mainCourseSection} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PhysicalMenuCard title="रोटी & राईस / Roti & Rice" sections={rotiRiceSection} showImages />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PhysicalMenuCard title="क्रांती स्पेशल थाळी / Kranti Special Thali" items={specialThaliItems} />
          </motion.div>
          
          <div className="mt-8 flex justify-center">
            <button className="btn-primary">Download PDF Menu</button>
          </div>
        </div>
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
    { name: 'Delivery', href: '/delivery', isPage: true },
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
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      
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

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn-primary flex items-center gap-2"><Phone size={18} /> Call Now</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="btn-outline flex items-center gap-2"><MessageSquare size={18} /> WhatsApp</a>
          </div>
        </div>

        <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-bg-dark">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15097.436156789!2d75.0063!3d18.6631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc344f6e5e5e5e5%3A0x0!2zMTjCsDM5JzQ3LjIiTiA3NcKwMDAnMjIuNyJF!5e0!3m2!1sen!2sin!4v1234567890" 
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
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', thumbnail: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: 'Breakfast', image: '', isAvailable: true, stock: 0 });
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
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

    const qMenu = query(collection(db, 'menuItems'), orderBy('name', 'asc'));
    const unsubMenu = onSnapshot(qMenu, (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubBookings();
      unsubVideos();
      unsubMenu();
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

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), {
          ...newItem,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'menuItems'), {
          ...newItem,
          createdAt: serverTimestamp()
        });
      }
      setNewItem({ name: '', description: '', price: 0, category: 'Breakfast', image: '', isAvailable: true, stock: 0 });
      setEditingItem(null);
      setIsAddingItem(false);
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Delete this item?')) {
      try {
        await deleteDoc(doc(db, 'menuItems', id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Delete this video?')) {
      try {
        await deleteDoc(doc(db, 'videos', id));
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setNewItem({ ...item });
    setIsAddingItem(true);
  };

  return (
    <div className="min-h-screen bg-accent/30 dark:bg-bg-dark pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <Link to="/" className="btn-outline py-2 px-4 text-sm">Back to Site</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-bg-dark p-6 rounded-3xl shadow-lg border border-black/5 dark:border-white/5">
            <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Total Bookings</div>
            <div className="text-3xl font-serif text-primary">{bookings.length}</div>
          </div>
          <div className="bg-white dark:bg-bg-dark p-6 rounded-3xl shadow-lg border border-black/5 dark:border-white/5">
            <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Menu Items</div>
            <div className="text-3xl font-serif text-primary">{menuItems.length}</div>
          </div>
          <div className="bg-white dark:bg-bg-dark p-6 rounded-3xl shadow-lg border border-black/5 dark:border-white/5">
            <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Videos</div>
            <div className="text-3xl font-serif text-primary">{videos.length}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Bookings Table */}
            <div className="bg-white dark:bg-bg-dark rounded-3xl shadow-xl overflow-hidden border border-black/5 dark:border-white/5">
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
                          <div className="flex gap-2">
                            <select 
                              className="text-xs bg-accent/30 rounded px-2 py-1 outline-none"
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button onClick={() => handleDeleteBooking(booking.id)} className="p-1 hover:bg-red-500/10 rounded text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Menu Items Management */}
            <div className="bg-white dark:bg-bg-dark rounded-3xl shadow-xl overflow-hidden border border-black/5 dark:border-white/5">
              <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" /> Menu & Stock Management
                </h2>
                <button 
                  onClick={() => {
                    setIsAddingItem(!isAddingItem);
                    setEditingItem(null);
                    setNewItem({ name: '', description: '', price: 0, category: 'Breakfast', image: '', isAvailable: true, stock: 0 });
                  }}
                  className="btn-primary py-1 px-4 text-xs"
                >
                  {isAddingItem ? 'Cancel' : '+ Add Item'}
                </button>
              </div>

              {isAddingItem && (
                <form onSubmit={handleSaveItem} className="p-6 bg-accent/20 grid md:grid-cols-2 gap-4">
                  <input required placeholder="Item Name" className="admin-input" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                  <input required type="number" placeholder="Price (₹)" className="admin-input" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} />
                  <select className="admin-input" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Tandoor Starter">Tandoor Starter</option>
                    <option value="Papad">Papad</option>
                    <option value="Chai / Coffee">Chai / Coffee</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Paneer Special">Paneer Special</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Rice">Rice</option>
                    <option value="Roti">Roti</option>
                    <option value="Handi">Handi</option>
                    <option value="Thali">Thali</option>
                  </select>
                  <input required type="number" placeholder="Stock Quantity" className="admin-input" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: parseInt(e.target.value)})} />
                  <input placeholder="Image URL" className="admin-input md:col-span-2" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                  <textarea placeholder="Description" className="admin-input md:col-span-2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input type="checkbox" checked={newItem.isAvailable} onChange={e => setNewItem({...newItem, isAvailable: e.target.checked})} />
                    <label className="text-sm font-bold">Available for Menu</label>
                  </div>
                  <button type="submit" className="btn-primary md:col-span-2 py-3">{editingItem ? 'Update Item' : 'Add Item'}</button>
                </form>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-accent/50 dark:bg-white/5 text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-accent/20 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm opacity-70">{item.category}</td>
                        <td className="px-6 py-4 font-bold">₹{item.price}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold",
                            item.stock > 10 ? "bg-green-100 text-green-700" : 
                            item.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          )}>
                            {item.stock} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditItem(item)} className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteItem(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Video Management */}
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
                    <button onClick={() => handleDeleteVideo(video.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    const itemsList = cart.map(item => `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`).join('\n');
    const message = `*New Order Request*\n\n${itemsList}\n\n*Total: ₹${totalPrice}*\n\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCart([]);
    setIsCartOpen(false);
  };

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
            <Route path="/" element={<HomePage addToCart={addToCart} cart={cart} />} />
            <Route path="/menu-card" element={<MenuCardPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/delivery" element={<OnlineDeliveryPage addToCart={addToCart} cart={cart} />} />
            <Route path="/admin" element={<AdminPanel user={user} />} />
          </Routes>

          <Footer />

          {/* Cart Drawer */}
          <AnimatePresence>
            {isCartOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCartOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-bg-dark z-[70] shadow-2xl flex flex-col"
                >
                  <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                    <h2 className="text-2xl font-serif flex items-center gap-2">
                      <ShoppingBag className="text-primary" /> Your Cart
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <Package size={64} className="mb-4" />
                        <p className="text-xl">Your cart is empty</p>
                        <button onClick={() => setIsCartOpen(false)} className="text-primary font-bold mt-2 underline">Start adding items</button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-primary font-bold">₹{item.price}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                              >
                                -
                              </button>
                              <span className="font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 p-2 hover:bg-red-50/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="p-6 border-t border-black/5 dark:border-white/5 bg-accent/30 dark:bg-bg-dark/50">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg opacity-70">Total Amount:</span>
                        <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                      </div>
                      <button 
                        onClick={handleConfirmOrder}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                      >
                        Confirm Order on WhatsApp <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Floating Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 left-6 w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
          >
            <div className="relative">
              <ShoppingBag size={28} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-bg-dark">
                  {totalItems}
                </span>
              )}
            </div>
          </button>

          {/* Floating WhatsApp */}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
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
