import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  LayoutGrid,
  BarChart3,
  ShieldCheck,
  Activity,
  Bell,
  Monitor,
  CheckCircle2,
  Lock,
  Layers,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload important images/assets
    const imagesToPreload = [
      "https://media.giphy.com/media/tq3BP6bsQ0Jwc/giphy.gif",
    ];

    const imagePromises = imagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    const docLoad = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve());
      }
    });

    Promise.all([...imagePromises, docLoad]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="min-h-screen font-sans bg-background text-on-background flex flex-col selection:bg-primary/30">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[110] bg-background flex flex-col items-center justify-center text-on-background"
          >
            <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
            <h2 className="text-xl font-bold tracking-widest uppercase font-display">
              Loading
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BEGIN: SiteHeader */}
      <header className="flex flex-col md:grid md:grid-cols-12 border-b border-outline-variant/20 bg-background sticky top-0 z-50">
        <div className="flex justify-between border-b border-outline-variant/20 md:border-b-0 md:contents">
          {/* Logo Section */}
          <Link
            to="/"
            className="p-5 md:p-6 border-r border-outline-variant/20 md:col-span-4 flex items-center gap-3 hover:bg-on-background/5 transition-colors text-on-background flex-1 md:flex-none"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <LayoutGrid size={18} />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight font-display uppercase italic">
              DashboardTemplate
            </span>
          </Link>
          {/* Mobile Theme Toggle */}
          <div className="md:hidden flex items-center px-4 border-r border-outline-variant/20">
            <ThemeToggle className="w-10 h-10" />
          </div>
          {/* Mobile Sign In */}
          <Link
            to="/login"
            className="md:hidden flex flex-1 items-center justify-center bg-transparent hover:bg-on-background/5 transition-colors uppercase text-xs font-bold font-label tracking-widest opacity-80 hover:opacity-100"
          >
            Sign In
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex md:contents">
          <nav className="flex-1 md:col-span-4 border-r border-outline-variant/20 flex items-center justify-center gap-6 md:gap-8 px-4 md:px-8 py-4 md:py-0">
            <a
              href="#features"
              className="uppercase opacity-70 hover:opacity-100 transition-opacity font-label text-xs tracking-widest font-bold"
            >
              Features
            </a>
            <a
              href="#analytics"
              className="uppercase opacity-70 hover:opacity-100 transition-opacity font-label text-xs tracking-widest font-bold"
            >
              Analytics
            </a>
            <a
              href="#docs"
              className="uppercase opacity-70 hover:opacity-100 transition-opacity font-label text-xs tracking-widest font-bold"
            >
              Docs
            </a>
          </nav>
          <div className="flex-1 md:col-span-2 md:border-r border-outline-variant/20 flex items-center justify-center gap-4 px-4 py-4 md:py-0">
             <ThemeToggle className="hidden md:flex w-10 h-10" />
             <Link 
              to="/login" 
              className="hidden md:flex uppercase text-xs font-bold font-label tracking-widest opacity-80 hover:opacity-100"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Desktop Live Demo */}
        <div className="hidden md:flex md:col-span-2 items-center justify-center bg-primary hover:bg-primary-dim transition-colors">
          <Link
            to="/signup"
            className="uppercase text-xs font-bold font-label tracking-widest text-white w-full h-full flex items-center justify-center"
          >
            Live Demo
          </Link>
        </div>
      </header>
      {/* END: SiteHeader */}

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <HomeSection />
        <TrustStrip />
        <FeaturesSection />
        <AnalyticsSection />
        <CTASection />
      </div>
    </div>
  );
}

function HomeSection() {
  return (
    <section id="home" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline-variant/20">
      {/* Left Graphic Column */}
      <div className="col-span-1 lg:col-span-8 lg:border-r lg:border-outline-variant/20 flex flex-col">
        {/* Top Graphic Block - Dashboard Preview */}
        <div className="flex-grow border-b border-outline-variant/20 relative overflow-hidden bg-surface-container-lowest min-h-[300px] md:min-h-[500px]">
          <img
            alt="Dashboard Preview Animation"
            className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale dark:invert dark:opacity-40"
            src="https://media.giphy.com/media/tq3BP6bsQ0Jwc/giphy.gif"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
        </div>
        {/* Bottom Title Block */}
        <div className="p-8 md:p-12 lg:p-16 bg-background relative flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-0">
          <div className="w-full text-center sm:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display uppercase italic tracking-tighter leading-[0.85] text-on-background">
              Visualize Your
              <br />
              <span className="text-primary">Digital Fortress</span>
            </h1>
          </div>
          {/* Interactive Explore Circle Button */}
          <div className="relative flex items-center justify-center shrink-0 my-4 sm:my-0 sm:mr-12">
            <a
              href="#features"
              className="z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-outline-variant/50 flex items-center justify-center bg-surface-container-lowest/30 backdrop-blur-sm hover:bg-surface-container-lowest/50 transition-all text-on-background"
            >
              <span className="text-xs font-bold uppercase tracking-widest font-label">Explore</span>
            </a>
            <div className="absolute w-32 sm:w-40 h-px bg-on-background/20 pointer-events-none"></div>
            <div className="absolute h-32 sm:h-40 w-px bg-on-background/20 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Right Content Column */}
      <div className="col-span-1 lg:col-span-4 flex flex-col">
        {/* Introduction Block */}
        <div className="flex-grow p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b border-outline-variant/20">
          <div className="mb-8">
             <ShieldCheck size={48} className="text-primary" />
          </div>
          <p className="text-xl lg:text-2xl font-medium leading-relaxed text-on-surface-variant max-w-sm">
            A high-performance React dashboard template designed for modern enterprise 
            risk management, compliance tracking, and real-time security monitoring.
          </p>
        </div>
        {/* Get Started Link Block */}
        <Link
          to="/signup"
          className="p-8 md:p-12 lg:p-16 flex-grow lg:flex-grow-0 lg:h-1/3 bg-primary flex items-center justify-center min-h-[150px] md:min-h-[200px] group hover:bg-primary-dim transition-colors text-white cursor-pointer"
        >
          <div className="flex items-center space-x-6">
            <span className="text-3xl md:text-4xl font-black font-display uppercase italic tracking-tighter">
              Get Started
            </span>
            <ArrowRight
              className="w-12 h-8 transform group-hover:translate-x-2 transition-transform"
              strokeWidth={3}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

function TrustStrip() {
    return (
        <section className="py-12 border-b border-outline-variant/20 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/60 mb-8 font-label">
              Powered by Industry-Standard Technology
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-black italic tracking-tighter uppercase font-display">React 19</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase font-display">Tailwind 4</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase font-display">TypeScript</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase font-display">Vite</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase font-display">Lucide</span>
            </div>
          </div>
        </section>
    );
}

function FeaturesSection() {
  const features = [
    {
      icon: <BarChart3 className="text-primary" size={24} />,
      title: "Advanced Analytics",
      desc: "Real-time data visualization with Recharts. Interactive, responsive, and theme-aware."
    },
    {
      icon: <Lock className="text-blue-500" size={24} />,
      title: "Secure Auth",
      desc: "Pre-built login, signup, and password recovery flows with JWT integration."
    },
    {
      icon: <Monitor className="text-purple-500" size={24} />,
      title: "Dark Mode 2.0",
      desc: "Seamless view-transition-based theme switching with OLED support."
    },
    {
      icon: <Layers className="text-yellow-500" size={24} />,
      title: "Component Library",
      desc: "Clean, reusable components: StatCards, Charts, Banners, and Sidebar."
    },
    {
      icon: <Activity className="text-green-500" size={24} />,
      title: "Incident Monitoring",
      desc: "Specialized views for tracking risks, patches, and security incidents."
    },
    {
      icon: <Bell className="text-red-500" size={24} />,
      title: "Real-time Alerts",
      desc: "Built-in notification system to keep administrators informed instantly."
    }
  ];

  return (
    <section id="features" className="flex flex-col border-b border-outline-variant/20 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline-variant/20">
        <div className="col-span-1 lg:col-span-6 p-8 md:p-12 lg:p-16 lg:border-r lg:border-outline-variant/20 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-display uppercase italic tracking-tighter leading-none mb-8">
            Enterprise
            <br />
            <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-on-surface-variant font-medium">
            A comprehensive toolkit for building robust, secure, and insightful administrative interfaces.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-6 bg-surface-container-lowest flex items-center justify-center p-8">
             <div className="grid grid-cols-2 gap-8 w-full">
                <div className="aspect-square bg-background rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-outline-variant/10">
                    <ShieldCheck size={40} className="text-primary mb-4" />
                    <span className="text-sm font-bold font-label uppercase tracking-widest">Security First</span>
                </div>
                <div className="aspect-square bg-background rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-outline-variant/10">
                    <Activity size={40} className="text-primary mb-4" />
                    <span className="text-sm font-bold font-label uppercase tracking-widest">Real-time</span>
                </div>
             </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-surface-container-lowest">
        {features.map((feature, idx) => (
          <div key={idx} className={`p-8 md:p-12 flex flex-col border-b border-outline-variant/20 ${idx % 3 !== 2 ? 'lg:border-r' : ''} hover:bg-background transition-colors group`}>
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-xl font-black font-display uppercase italic mb-3">{feature.title}</h4>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed font-medium">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnalyticsSection() {
  return (
    <section id="analytics" className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline-variant/20 bg-background">
      <div className="col-span-1 lg:col-span-6 p-8 md:p-12 lg:p-16 lg:border-r lg:border-outline-variant/20 flex flex-col justify-center order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 self-start">
            <BarChart3 size={16} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-label">
                Data-Driven Insights
            </span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-display uppercase italic tracking-tighter leading-none mb-8">
          Insightful
          <br />
          <span className="text-primary">Analytics</span>
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-on-surface-variant font-medium mb-12">
          Transform complex security data into clear, actionable insights. 
          Our template includes specialized charts for risk distribution, 
          compliance trends, and incident frequency.
        </p>
        <ul className="space-y-6">
          {[
            "Dynamic Risk Scoring widgets",
            "Compliance Trend monitoring",
            "Vendor Criticality tracking",
            "Real-time patching status"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 font-bold text-sm uppercase tracking-widest font-label">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                <CheckCircle2 size={12} />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-1 lg:col-span-6 bg-surface-container-lowest min-h-[400px] flex items-center justify-center p-8 order-1 lg:order-2 lg:border-l lg:border-outline-variant/20">
          <div className="w-full max-w-md bg-background rounded-3xl border border-outline-variant/20 p-8 shadow-xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant/60 font-label tracking-widest uppercase">System Analytics</span>
                </div>
                <div className="space-y-6">
                  <div className="h-4 bg-primary/20 rounded w-full"></div>
                  <div className="h-32 bg-surface-container-lowest rounded-xl flex items-end gap-2 p-4 border border-outline-variant/10">
                    <div className="bg-primary/30 w-full h-[60%] rounded-t-lg transition-all group-hover:h-[80%]"></div>
                    <div className="bg-primary/50 w-full h-[80%] rounded-t-lg transition-all group-hover:h-[40%]"></div>
                    <div className="bg-primary/30 w-full h-[40%] rounded-t-lg transition-all group-hover:h-[90%]"></div>
                    <div className="bg-primary w-full h-[95%] rounded-t-lg shadow-lg shadow-primary/30 transition-all group-hover:h-[60%]"></div>
                    <div className="bg-primary/50 w-full h-[70%] rounded-t-lg transition-all group-hover:h-[85%]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-4 bg-on-surface-variant/10 rounded w-full"></div>
                    <div className="h-4 bg-on-surface-variant/10 rounded w-2/3"></div>
                  </div>
                </div>
                {/* Decorative Crosshair */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <LayoutGrid size={80} />
                </div>
          </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 bg-primary">
      <div className="col-span-1 lg:col-span-8 p-8 md:p-12 lg:p-16 lg:border-r border-white/10 flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black font-display uppercase italic tracking-tighter leading-[0.85] text-white mb-12">
          Build Your
          <br />
          Next Dashboard
          <br />
          <span className="text-white/40">Today.</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
             <Link 
              to="/signup" 
              className="px-10 py-6 bg-white text-primary font-bold font-label uppercase tracking-widest text-center hover:bg-gray-100 transition-colors"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/login" 
              className="px-10 py-6 border-2 border-white text-white font-bold font-label uppercase tracking-widest text-center hover:bg-white/10 transition-colors"
            >
              Live Preview
            </Link>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-inverse-surface text-on-inverse-surface">
          <div>
            <p className="text-xs font-bold font-label uppercase tracking-[0.2em] opacity-40 mb-8">
                Capabilities
            </p>
            <ul className="space-y-4 text-xl md:text-2xl font-black font-display uppercase italic tracking-tighter">
                <li className="border-b border-white/10 pb-4">React 19</li>
                <li className="border-b border-white/10 pb-4">Tailwind 4</li>
                <li className="border-b border-white/10 pb-4">TypeScript</li>
                <li className="pb-4">Lucide Icons</li>
            </ul>
          </div>
          <div className="pt-12">
             <p className="text-sm font-medium opacity-60 mb-4">© 2026 DashboardTemplate</p>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest font-label">All Systems Operational</span>
             </div>
          </div>
      </div>
    </section>
  );
}
