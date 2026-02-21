import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Flame, 
  Utensils, 
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
  Grid,
  Maximize2,
  Calendar,
  Clock,
  Users,
  Sun,
  Moon,
  Coffee,
  CheckCircle,
  Image as ImageIcon,
  Home
} from 'lucide-react';

/* =============================================================================
  🚨 USER CONFIGURATION SECTION 🚨
  =============================================================================
*/

const DATA = {
  details: {
    name: "Chai Bar",
    location: "Dhule, Maharashtra",
    mapLink: "https://www.google.com/maps/place/Chai+Bar/@20.9159954,74.7697833,359m/data=!3m1!1e3!4m6!3m5!1s0x3bdec59dc18d1b89:0xd494f7c434db5823!8m2!3d20.9159137!4d74.7707989!16s%2Fg%2F11fzylrh0m",
    logo: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&q=80&w=100" 
  },
  hero: {
    image: "/images/ambience 2.png", 
    title: "Brewing Stories, One Cup at a Time.",
    subtitle: "From authentic Masala Chai to delicious quick bites, Chai Bar is your perfect spot to relax and recharge."
  },
  interior: [
    "/images/ambience 3.png",
    "/images/ambience.png",
    "/images/Interior2.png",
    "/images/Interior1.png", 
  ],
  ambience: [
    "/images/Interior3.png",
    "/images/Interior4.png",
    "/images/ambience 4.png",
  ],
  sitting: [
    "/images/sitting3.png",
    "/images/sitting 2.png",
  ],
  // 🟢 NEW SECTION: Insert images for the separate Gallery Page here
  galleryPage: [
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507133750069-41d33ad98ab9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=800",
  ],
  menuItems: Array.from({ length: 30 }).map((_, i) => ({
    name: i === 0 ? "Masala Chai" : i === 1 ? "Bun Maska" : i === 2 ? "Cold Coffee" : `Menu Item ${i + 1}`,
    price: `₹${(i + 1) * 10 + 20}`,
    desc: "Delicious fresh prepared item.",
    image: "https://images.unsplash.com/photo-1626139576127-4588df88863f?auto=format&fit=crop&q=80&w=800"
  })),
  reviews: [
    {
      name: "Rahul S.",
      text: "The best place in Dhule for evening chai and snacks! The vibe is unmatched.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Priya M.",
      text: "Love the Bun Maska here. It's my go-to spot for working remotely.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Amit K.",
      text: "Amazing cold coffee and the staff is very friendly. Highly recommended!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
  ]
};

// --- COMPONENTS ---

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ subtitle, title, light = false, darkMode = false }) => (
  <RevealOnScroll>
    <div className="text-center mb-12">
      <h2 className={`font-bold uppercase tracking-widest text-sm mb-3 ${light ? 'text-blue-200' : (darkMode ? 'text-blue-400' : 'text-blue-600')}`}>{subtitle}</h2>
      <h3 className={`text-3xl md:text-5xl font-serif font-bold ${light ? 'text-white' : (darkMode ? 'text-white' : 'text-gray-900')}`}>{title}</h3>
    </div>
  </RevealOnScroll>
);

const GalleryGrid = ({ title, images, gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", onImageClick, darkMode = false }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="py-12">
      <RevealOnScroll>
        <h4 className={`text-2xl font-serif font-bold mb-6 pl-4 border-l-4 border-red-500 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h4>
      </RevealOnScroll>
      <div className={`grid ${gridClass} gap-6`}>
        {images.map((img, idx) => (
          <RevealOnScroll key={idx} delay={idx * 100}>
            <div 
              className={`group relative overflow-hidden rounded-xl shadow-lg border-4 h-64 transition-all duration-300 cursor-zoom-in ${darkMode ? 'border-gray-800 hover:border-blue-500' : 'border-white hover:border-blue-200'}`}
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`${title} ${idx + 1}`} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white opacity-80" />
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

// --- LOADING SCREEN ---
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] bg-[#fffaf5] flex flex-col items-center justify-center transition-opacity duration-500">
    <div className="relative">
      <Coffee size={64} className="text-red-600 animate-bounce" />
      <div className="absolute -bottom-4 w-16 h-2 bg-black/10 rounded-full animate-pulse filter blur-sm"></div>
    </div>
    <h2 className="mt-8 text-2xl font-serif font-bold text-gray-800 animate-pulse">Chai Bar</h2>
    <p className="text-gray-500 text-sm mt-2">Brewing your experience...</p>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // NEW STATE: Page View ('home' | 'gallery')
  const [currentView, setCurrentView] = useState('home');

  // Gallery Modal State
  const [selectedImage, setSelectedImage] = useState(null);

  // Menu Scroll State
  const menuScrollRef = useRef(null);
  const [isAtMenuEnd, setIsAtMenuEnd] = useState(false);

  // Initial Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Listener for Navbar & Parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Review Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === DATA.reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Menu Scroll Handler
  const handleMenuScroll = () => {
    if (menuScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuScrollRef.current;
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setIsAtMenuEnd(isEnd);
    }
  };

  const scrollMenu = (direction) => {
    if (menuScrollRef.current) {
      if (direction === 'right' && isAtMenuEnd) {
        setShowFullMenu(true);
      } else {
        const scrollAmount = 350;
        menuScrollRef.current.scrollBy({
          left: direction === 'right' ? scrollAmount : -scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const ref = menuScrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleMenuScroll);
      return () => ref.removeEventListener('scroll', handleMenuScroll);
    }
  }, []);

  // Handle Reservation Submit
  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Booking...';
    btn.disabled = true;
    setTimeout(() => {
      alert("Table Reserved Successfully! We will confirm via phone shortly.");
      setShowReservation(false);
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  };

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // --- STYLES BASED ON THEME ---
  const bgBase = darkMode ? 'bg-gray-950' : 'bg-yellow-50';
  const bgCard = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-yellow-100';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const navBg = scrolled ? (darkMode ? 'bg-gray-900/95 shadow-md py-2' : 'bg-white/95 shadow-md py-2') : 'bg-transparent py-4';
  const navText = scrolled ? (darkMode ? 'text-white' : 'text-gray-900') : 'text-white';
  
  // Custom Navbar text color logic for different pages/states
  const getNavTextColor = () => {
    if (currentView === 'gallery') return darkMode ? 'text-white' : 'text-gray-900'; // Gallery always needs visible text
    return scrolled ? (darkMode ? 'text-white' : 'text-gray-900') : 'text-white'; // Home page hero is dark, so white text initially
  };
  const dynamicNavText = getNavTextColor();
  const dynamicNavBg = currentView === 'gallery' ? (darkMode ? 'bg-gray-900 shadow-md py-2' : 'bg-white shadow-md py-2') : navBg;


  if (loading) return <LoadingScreen />;

  return (
    <div className={`font-sans ${bgBase} transition-colors duration-500 scroll-smooth selection:bg-red-500 selection:text-white`}>
      
      {/* --- IMAGE LIGHTBOX MODAL (Shared) --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center animate-fade-in p-[5%]" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center p-0 md:p-[5%]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-[90vw] h-[60vh] md:w-[80vw] md:h-[80vh] bg-transparent shadow-2xl rounded-lg overflow-hidden transform transition-all scale-100 animate-zoom-in">
              <img 
                src={selectedImage} 
                alt="Fullscreen" 
                className="w-full h-full object-contain md:object-cover bg-black/50 rounded-lg"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors z-50"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RESERVATION MODAL --- */}
      {showReservation && (
        <div className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
           <div className={`relative w-full max-w-md ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl p-8 transform transition-all scale-100`}>
              <button 
                onClick={() => setShowReservation(false)}
                className={`absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors ${textSecondary}`}
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                  <Calendar size={32} />
                </div>
                <h2 className={`text-2xl font-serif font-bold ${textPrimary}`}>Book a Table</h2>
                <p className={`text-sm ${textSecondary}`}>Reserve your spot at Chai Bar</p>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Full Name</label>
                  <input required type="text" className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="John Doe" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Phone Number</label>
                  <input required type="tel" className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="+91 98765 43210" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Date</label>
                    <div className="relative">
                      <input required type="date" className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18}/>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Time</label>
                    <div className="relative">
                      <input required type="time" className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
                      <Clock className="absolute left-3 top-3.5 text-gray-400" size={18}/>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Guests</label>
                  <div className="relative">
                    <select className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all appearance-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                      <option value="more">More than 8</option>
                    </select>
                    <Users className="absolute left-3 top-3.5 text-gray-400" size={18}/>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transform transition-all hover:scale-[1.02] shadow-lg mt-4">
                  Confirm Booking
                </button>
              </form>
           </div>
        </div>
      )}

      {/* --- MENU POPUP MODAL --- */}
      {showFullMenu && (
        <div className={`fixed inset-0 z-[60] backdrop-blur-sm overflow-y-auto animate-fade-in ${darkMode ? 'bg-gray-950/95' : 'bg-white/95'}`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className={`flex justify-between items-center mb-8 sticky top-0 py-4 z-10 border-b ${darkMode ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-100'}`}>
              <h2 className={`text-3xl font-serif font-bold flex items-center gap-2 ${textPrimary}`}>
                <Utensils className="text-red-600" /> Full Menu
              </h2>
              <button 
                onClick={() => setShowFullMenu(false)}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA.menuItems.map((item, idx) => (
                <div key={idx} className={`border rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow ${bgCard}`}>
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div>
                    <h4 className={`font-bold text-lg ${textPrimary}`}>{item.name}</h4>
                    <span className="text-red-600 font-bold block mt-1">{item.price}</span>
                    <p className={`text-sm mt-2 ${textSecondary}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${dynamicNavBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => setCurrentView('home')}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 shadow-lg">
                <img src={DATA.details.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`font-serif text-2xl font-bold ${dynamicNavText}`}>
                {DATA.details.name}
              </span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              {/* Home Link */}
              <button 
                onClick={() => setCurrentView('home')} 
                className={`font-medium transition-colors ${dynamicNavText} hover:text-red-600`}
              >
                Home
              </button>

              <a 
                href="#about" 
                onClick={(e) => {
                  if (currentView === 'gallery') {
                     e.preventDefault();
                     setCurrentView('home');
                     setTimeout(() => {
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                     }, 100);
                  }
                }}
                className={`font-medium transition-colors ${dynamicNavText} hover:text-red-600`}
              >
                About
              </a>

              {/* Gallery Link -> NOW OPENS NEW PAGE */}
              <button 
                onClick={() => setCurrentView('gallery')} 
                className={`font-medium transition-colors ${dynamicNavText} hover:text-red-600 flex items-center gap-1`}
              >
                Gallery
              </button>

              <button onClick={() => setShowFullMenu(true)} className={`font-medium transition-colors ${dynamicNavText} hover:text-red-600`}>Menu</button>
              
              {/* Theme Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${scrolled || currentView === 'gallery' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600') : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Book Table Button */}
              <button 
                onClick={() => setShowReservation(true)}
                className={`px-6 py-2.5 bg-white text-red-600 border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white rounded-full font-bold transition-all shadow-lg hidden lg:block ${currentView === 'gallery' ? 'border-red-600 hover:text-red-600 hover:bg-red-50' : ''}`}
              >
                Book Table
              </button>

              <a href="#contact" className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30">Visit Us</a>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${dynamicNavText}`}>
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${dynamicNavText}`}>
                {isMenuOpen ? <X size={24} /> : <Grid size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden border-t absolute w-full shadow-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => {setCurrentView('home'); setIsMenuOpen(false)}} className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${textSecondary} hover:text-red-600 hover:bg-yellow-50`}>Home</button>
              <a href="#about" onClick={() => {setCurrentView('home'); setIsMenuOpen(false)}} className={`block px-3 py-3 rounded-md text-base font-medium ${textSecondary} hover:text-red-600 hover:bg-yellow-50`}>About</a>
              <button onClick={() => { setCurrentView('gallery'); setIsMenuOpen(false); }} className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${textSecondary} hover:text-red-600 hover:bg-yellow-50`}>Gallery</button>
              <button onClick={() => { setShowFullMenu(true); setIsMenuOpen(false); }} className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${textSecondary} hover:text-red-600 hover:bg-yellow-50`}>Full Menu</button>
              <button onClick={() => { setShowReservation(true); setIsMenuOpen(false); }} className={`block w-full text-left px-3 py-3 rounded-md text-base font-bold text-red-600 hover:bg-red-50`}>Book A Table</button>
            </div>
          </div>
        )}
      </nav>

      {/* =========================================
           VIEW SWITCHER
         ========================================= */}
      
      {currentView === 'home' ? (
        <>
          {/* --- HERO SECTION --- */}
          <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-blue-900">
            <div className="absolute inset-0 z-0">
              {/* Parallax Image */}
              <div 
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ 
                  transform: `translateY(${scrollY * 0.5}px)`,
                  willChange: 'transform'
                }}
              >
                <img src={DATA.hero.image} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
              <RevealOnScroll>
                <span className="inline-block py-1 px-4 rounded-full bg-yellow-400 text-blue-900 text-sm font-bold mb-6 border-2 border-white shadow-lg">{DATA.details.location}</span>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">{DATA.hero.title}</h1>
              </RevealOnScroll>
              <RevealOnScroll delay={400}>
                <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto font-light">{DATA.hero.subtitle}</p>
              </RevealOnScroll>
              <RevealOnScroll delay={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setShowReservation(true)} className="px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/50 border-2 border-transparent">Book Table</button>
                  <button onClick={() => setShowFullMenu(true)} className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg border-2 border-transparent">View Menu</button>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* --- ABOUT SECTION --- */}
          <section id="about" className={`py-24 px-4 overflow-hidden relative ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
            <div className={`absolute top-0 right-0 w-1/3 h-full -skew-x-12 opacity-50 z-0 ${darkMode ? 'bg-gray-900' : 'bg-yellow-50'}`}></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="relative order-2 lg:order-1">
                <RevealOnScroll>
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-200 rounded-2xl z-0"></div>
                  {DATA.interior[0] && (
                    <img src={DATA.interior[0]} alt="About Us" className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-white"/>
                  )}
                </RevealOnScroll>
              </div>
              <div className="order-1 lg:order-2">
                <RevealOnScroll delay={200}>
                  <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Who We Are</h2>
                  <h3 className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${textPrimary}`}>More than just a Chai Shop.</h3>
                  <p className={`text-lg mb-6 leading-relaxed ${textSecondary}`}>
                    We are a community hub where friends meet, ideas are exchanged, and laughter fills the air. Located in the heart of {DATA.details.location}, we take pride in serving not just beverages, but memories.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={400}>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full text-red-600 ${darkMode ? 'bg-gray-800' : 'bg-red-100'}`}><Flame size={24} /></div>
                      <div><h4 className={`font-bold ${textPrimary}`}>Fresh Brews</h4><p className={`text-sm ${textSecondary}`}>Made fresh on order.</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full text-blue-600 ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}><Utensils size={24} /></div>
                      <div><h4 className={`font-bold ${textPrimary}`}>Tasty Snacks</h4><p className={`text-sm ${textSecondary}`}>Perfect chai pairings.</p></div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>

          {/* --- MENU HIGHLIGHTS --- */}
          <section id="menu-highlights" className={`py-24 relative group/section ${bgBase}`}>
            <div className="max-w-7xl mx-auto px-4 relative">
              <SectionTitle subtitle="Our Favorites" title="Menu Highlights" darkMode={darkMode} />
              
              <button 
                onClick={() => scrollMenu('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg border transition-all transform hover:scale-110 -ml-2 md:-ml-6 ${darkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-blue-600' : 'bg-white text-blue-900 border-gray-100 hover:bg-blue-600 hover:text-white'}`}
              >
                <ChevronLeft size={24} />
              </button>

              <button 
                onClick={() => scrollMenu('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg border transition-all transform hover:scale-110 -mr-2 md:-mr-6 flex items-center gap-2
                  ${isAtMenuEnd 
                    ? 'bg-red-600 text-white pl-4 pr-3 hover:bg-red-700 border-red-600' 
                    : (darkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-blue-600' : 'bg-white text-blue-900 border-gray-100 hover:bg-blue-600 hover:text-white')
                  }`}
              >
                {isAtMenuEnd && <span className="text-sm font-bold">View More</span>}
                {isAtMenuEnd ? <ArrowRight size={20} /> : <ChevronRight size={24} />}
              </button>

              <div 
                ref={menuScrollRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-2" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {DATA.menuItems.slice(0, 6).map((item, idx) => (
                  <div key={idx} className={`min-w-[300px] md:min-w-[350px] snap-center rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${bgCard}`}>
                    <div className="h-56 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`text-xl font-bold ${textPrimary}`}>{item.name}</h4>
                        <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">{item.price}</span>
                      </div>
                      <p className={`text-sm ${textSecondary}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- GALLERY SECTION (Restored to Home) --- */}
          <section id="gallery" className={`py-24 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <SectionTitle subtitle="Visual Tour" title="Experience The Vibe" darkMode={darkMode} />
              
              <GalleryGrid title="Cozy Interiors" images={DATA.interior} gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-4" onImageClick={setSelectedImage} darkMode={darkMode} />
              <GalleryGrid title="Ambience & Lights" images={DATA.ambience} gridClass="grid-cols-1 md:grid-cols-3" onImageClick={setSelectedImage} darkMode={darkMode} />
              <GalleryGrid title="Sitting Facilities" images={DATA.sitting} gridClass="grid-cols-1 md:grid-cols-2" onImageClick={setSelectedImage} darkMode={darkMode} />
              
              <div className="text-center mt-12">
                 <button 
                   onClick={() => setCurrentView('gallery')}
                   className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 shadow-lg flex items-center gap-2 mx-auto"
                 >
                    <ImageIcon size={20} /> View All Uploads
                 </button>
              </div>
            </div>
          </section>

          {/* --- REVIEWS --- */}
          <section className="py-24 bg-blue-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-800 to-blue-950"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <SectionTitle subtitle="Community Love" title="What People Say" light={true} />
              <div className="relative max-w-4xl mx-auto h-[300px] flex items-center justify-center">
                <button onClick={() => setCurrentReviewIndex(prev => prev === 0 ? DATA.reviews.length - 1 : prev - 1)} className="absolute left-0 z-20 p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors hidden md:block"><ChevronLeft size={24} /></button>
                <button onClick={() => setCurrentReviewIndex(prev => (prev + 1) % DATA.reviews.length)} className="absolute right-0 z-20 p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors hidden md:block"><ChevronRight size={24} /></button>
                <div className="w-full relative h-full">
                  {DATA.reviews.map((review, idx) => (
                    <div key={idx} className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center p-6 ${idx === currentReviewIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95 pointer-events-none'}`}>
                      <Quote size={40} className="text-yellow-400 mb-6 opacity-80" />
                      <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed text-blue-50 max-w-2xl">"{review.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className="p-1 rounded-full border-2 border-yellow-400"><img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover" /></div>
                        <div className="text-left"><h5 className="font-bold text-lg text-white">{review.name}</h5><div className="text-blue-300 text-sm flex items-center gap-1"><span>Verified Customer</span></div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {DATA.reviews.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentReviewIndex(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === currentReviewIndex ? 'w-8 bg-red-600' : 'w-2 bg-white/30 hover:bg-white/50'}`}/>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* =========================================
             GALLERY PAGE VIEW (SEPARATE)
           ========================================= */
        <div className={`min-h-screen pt-24 pb-20 ${darkMode ? 'bg-gray-950' : 'bg-white'} animate-fade-in`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             
             {/* Header */}
             <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-8 border-gray-200 dark:border-gray-800">
               <div className="mb-6 md:mb-0">
                 <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-2 ${textPrimary}`}>All Photos</h1>
                 <p className={textSecondary}>Explore the corners, the cups, and the community.</p>
               </div>
               <button 
                 onClick={() => setCurrentView('home')}
                 className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-bold flex items-center gap-2 transition-all dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
               >
                 <ArrowRight className="rotate-180" size={20} /> Back to Home
               </button>
             </div>

             {/* Content: Gallery Page Grid */}
             <GalleryGrid title="Recent Uploads" images={DATA.galleryPage} gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" onImageClick={setSelectedImage} darkMode={darkMode} />
             
             {/* Bottom CTA */}
             <div className="text-center mt-16 pt-16 border-t border-gray-100 dark:border-gray-800">
                <h3 className={`text-2xl font-serif font-bold mb-4 ${textPrimary}`}>Like what you see?</h3>
                <button 
                  onClick={() => setShowReservation(true)}
                  className="px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30"
                >
                  Book a Table Now
                </button>
             </div>
          </div>
        </div>
      )}

      {/* --- FOOTER (Shared) --- */}
      <footer id="contact" className={`py-12 border-t ${darkMode ? 'bg-gray-950 text-white border-gray-800' : 'bg-gray-900 text-white border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6"><span className="font-serif text-2xl font-bold text-yellow-400">{DATA.details.name}</span></div>
              <p className="text-gray-400 text-sm leading-relaxed">The perfect place to unwind, work, or catch up with friends over a hot cup of chai and delicious bites.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-red-500">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                 <li className="flex items-start gap-3"><MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" /><span>{DATA.details.location}</span></li>
                 <li className="flex items-center gap-3"><Phone size={18} className="text-blue-400 shrink-0" /><span>+91 123 456 7890</span></li>
              </ul>
            </div>
             <div>
              <h4 className="font-bold text-lg mb-6 text-red-500">Opening Hours</h4>
              <ul className="space-y-3 text-gray-400 text-sm"><li className="flex justify-between"><span>Mon - Sun:</span> <span className="text-white">9:00 AM - 11:00 PM</span></li></ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-red-500">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} {DATA.details.name}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}