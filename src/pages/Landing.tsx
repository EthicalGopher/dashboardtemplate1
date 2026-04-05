import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutGrid, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Bell, 
  ArrowRight, 
  GitBranch, 
  Monitor,
  CheckCircle2,
  Lock,
  Layers
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary-fixed to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <LayoutGrid size={22} />
            </div>
            <span className="text-xl font-black tracking-tight font-display uppercase italic">
              DashboardTemplate
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold uppercase tracking-widest font-label hover:text-primary transition-colors">Features</a>
            <a href="#analytics" className="text-sm font-bold uppercase tracking-widest font-label hover:text-primary transition-colors">Analytics</a>
            <a href="#design" className="text-sm font-bold uppercase tracking-widest font-label hover:text-primary transition-colors">Design</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle className="w-10 h-10" />
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-bold text-xs uppercase tracking-widest font-label ambient-shadow hover:bg-surface-container-low transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-widest font-label shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Ambient Background Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <ShieldCheck size={16} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-label">
                Premium Risk & Security Template
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8 font-display"
            >
              Visualize Your <br />
              <span className="text-primary drop-shadow-[0_0_15px_rgba(90,42,247,0.3)]">Digital Fortress</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-on-surface-variant text-lg lg:text-xl font-medium mb-12"
            >
              A high-performance React dashboard template designed for modern enterprise 
              risk management, compliance tracking, and real-time security monitoring. 
              Beautifully crafted with Tailwind CSS 4.0.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest font-display shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-surface-container-lowest text-on-surface font-black text-sm uppercase tracking-widest font-display ambient-shadow hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <GitBranch size={20} />
                Explore Documentation
              </a>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden border border-outline-variant/30 shadow-2xl bg-surface-container-lowest/50 backdrop-blur-sm p-2">
              <div className="rounded-2xl overflow-hidden bg-background aspect-video flex items-center justify-center relative group">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                    <Activity size={32} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y border-outline-variant/10 bg-surface-container-low/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-8 font-label">
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

      {/* Features Grid */}
      <section id="features" className="py-24 lg:py-40 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight uppercase italic font-display mb-6">
              Enterprise <span className="text-primary">Features</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">
              A comprehensive toolkit for building robust, secure, and insightful administrative interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/20 ambient-shadow hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 lg:py-40 bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <BarChart3 size={16} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-label">
                  Data-Driven Insights
                </span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] font-display">
                Insightful <br />
                <span className="text-primary">Analytics</span>
              </h2>
              <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
                Transform complex security data into clear, actionable insights. 
                Our template includes specialized charts for risk distribution, 
                compliance trends, and incident frequency.
              </p>
              <ul className="space-y-4">
                {[
                  "Dynamic Risk Scoring widgets",
                  "Compliance Trend monitoring",
                  "Vendor Criticality tracking",
                  "Real-time patching status"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-sm uppercase tracking-wide">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                      <CheckCircle2 size={10} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="bg-background rounded-3xl border border-outline-variant/30 p-8 shadow-2xl relative">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant font-label tracking-widest uppercase">System Analytics</span>
                </div>
                <div className="space-y-6">
                  <div className="h-4 bg-primary/20 rounded w-full"></div>
                  <div className="h-32 bg-primary/10 rounded-xl flex items-end gap-2 p-4">
                    <div className="bg-primary/40 w-full h-[60%] rounded-t-lg"></div>
                    <div className="bg-primary/60 w-full h-[80%] rounded-t-lg"></div>
                    <div className="bg-primary/40 w-full h-[40%] rounded-t-lg"></div>
                    <div className="bg-primary w-full h-[95%] rounded-t-lg shadow-lg shadow-primary/30"></div>
                    <div className="bg-primary/60 w-full h-[70%] rounded-t-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-4 bg-on-surface-variant/10 rounded w-full"></div>
                    <div className="h-4 bg-on-surface-variant/10 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
              {/* Decorative Blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 lg:py-40 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-white font-display mb-10">
            Build Your Next <br />
            Dashboard Today.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-primary font-black text-sm uppercase tracking-widest font-display shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-primary-dim text-white border-2 border-white/20 font-black text-sm uppercase tracking-widest font-display hover:bg-white/10 active:scale-95 transition-all"
            >
              Live Preview
            </Link>
          </div>
          <p className="mt-12 text-white/60 font-medium text-sm">
            Fully customizable. TypeScript & React. Production ready.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-background border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <LayoutGrid size={18} />
                </div>
                <span className="text-lg font-black tracking-tight font-display uppercase italic">
                  DashboardTemplate
                </span>
              </div>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                The ultimate React dashboard template for enterprise-grade risk, security, and compliance monitoring.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"><GitBranch size={18} /></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface mb-6 font-label">Product</h5>
                <ul className="space-y-4 text-sm font-bold text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">Layouts</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Components</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Charts</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Auth Flow</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface mb-6 font-label">Features</h5>
                <ul className="space-y-4 text-sm font-bold text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">Dark Mode</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Responsive</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">TypeScript</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Lucide Icons</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface mb-6 font-label">Company</h5>
                <ul className="space-y-4 text-sm font-bold text-on-surface-variant">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-label">
              © 2026 DashboardTemplate. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-label">All Modules Functional</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
