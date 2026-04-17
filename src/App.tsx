import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Lock, Unlock, Mail, Shield, FileText, ArrowRight, Clock, User, CheckCircle, ChevronDown, ChevronUp, AlertCircle, RefreshCw, Workflow } from 'lucide-react';

// Simple, minimalist abstract logo
const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="#00E599" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2.5" fill="#00E599"/>
  </svg>
);

// Reusable 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 z-0"></div>
      <div style={{ transform: "translateZ(10px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeEcoStep, setActiveEcoStep] = useState(0);

  // Ecosystem Simulation
  const ecoSteps = [
    { title: "Work Delivered", icon: FileText, desc: "You send the locked invoice link." },
    { title: "EarnLock Locks", icon: Lock, desc: "Client sees preview, but can't download." },
    { title: "Client Pays", icon: RefreshCw, desc: "Funds move to your account." },
    { title: "Files Unlock", icon: Unlock, desc: "Access granted automatically." },
    { title: "Freelancer Relaxed", icon: User, desc: "No begging. Just getting paid." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEcoStep((prev) => (prev + 1) % ecoSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [ecoSteps.length]);

  const openWaitlistForm = () => {
    window.open('https://forms.gle/VezZfE83ZT1Fj1My5', '_blank', 'noopener,noreferrer');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const faqs = [
    {
      q: "Is this free?",
      a: "Yes, the first 100 waitlist users get 1-month completely free access to test the full system."
    },
    {
      q: "Does it touch my payment system?",
      a: "No, you remain in control. EarnLock only manages the follow-ups and file unlocking. Payments are routed safely to you."
    },
    {
      q: "Do I need to deliver files manually?",
      a: "Not at all. Upload once to EarnLock; we automate everything up to the moment the client pays, at which point the files unlock automatically."
    },
    {
      q: "Is it secure?",
      a: "Yes. Files are strictly encrypted. We don't have access to your raw work, and payments are routed securely through Stripe, PayPal, or bKash."
    },
    {
      q: "Can I customize follow-ups?",
      a: "Yes, the automatic sequence is adjustable. You can tweak the frequency and wording to match your style."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-white font-sans selection:bg-[#00E599] selection:text-[#030508] font-light overflow-x-hidden w-full max-w-[100vw]">
      {/* Animated Gradient Background & 3D Floating Shapes */}
      <div className="fixed inset-0 z-[0] pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[#030508] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,153,0.15),rgba(3,5,8,1))]"></div>
        <motion.div 
          animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0], rotate: [0, 90, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-[100px] bg-[#00E599]/5 blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], rotate: [0, -90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#00E599]/5 blur-[150px]"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-5 py-5 md:py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm">
        <div className="text-xl font-bold tracking-tight flex items-center gap-3">
          <Logo />
          EarnLock
        </div>
        <button 
          onClick={openWaitlistForm}
          className="text-gray-300 hover:text-[#00E599] font-medium text-sm transition-colors"
        >
          Sign In
        </button>
      </nav>

      <main className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full lg:w-[55%] text-center lg:text-left"
          >
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-md cursor-pointer"
             >
              <span className="w-2 h-2 rounded-full bg-[#00E599] md:animate-pulse"></span>
              Accepting 100 Early Adopters
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] mb-6 leading-[1.05] drop-shadow-sm">
              Stop Doing Free Work for Ghosting Clients.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              You deliver work. You send the invoice. Then… silence. EarnLock locks your files, auto-chases unpaid invoices, and ensures you get paid — without stress or awkward emails.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openWaitlistForm}
                className="w-full sm:w-auto bg-[#00E599] hover:bg-[#00CC88] text-[#030508] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(0,229,153,0.3)] hover:shadow-[0_0_40px_rgba(0,229,153,0.5)] flex items-center justify-center gap-2"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Free 1-Month Early Access</p>
            </div>
          </motion.div>

          <div className="w-full lg:w-[45%]">
            <TiltCard>
               <div className="bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#00E599]/30 transition-colors duration-500">
                 {/* Mockup Top Bar */}
                 <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#05070A] rounded-t-2xl">
                   <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                 </div>
                 
                 {/* Animated Screen */}
                 <div className="relative aspect-[4/3] bg-[#030508] overflow-hidden rounded-b-2xl flex justify-center items-center">
                   <img 
                     src="https://picsum.photos/seed/creative/800/600" 
                     alt="Creative Work Design" 
                     className="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                     referrerPolicy="no-referrer"
                   />
                   
                   {/* Locked Overlay */}
                   <div className="absolute inset-0 bg-[#030508]/60 backdrop-blur-[8px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-transparent flex flex-col justify-center items-center z-10">
                     <div className="flex flex-col items-center group-hover:opacity-0 transition-opacity duration-500 transform group-hover:translate-y-4">
                       <div className="w-20 h-20 bg-[#00E599]/10 rounded-2xl flex items-center justify-center border border-[#00E599]/30 mb-6 backdrop-blur-md">
                         <Lock className="w-10 h-10 text-[#00E599]" />
                       </div>
                       <button className="bg-[#00E599] text-[#030508] px-8 py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(0,229,153,0.3)] text-lg">
                         Pay $1,500 to Unlock
                       </button>
                     </div>
                   </div>

                   {/* Unlocked Overlay */}
                   <div className="absolute inset-0 flex flex-col justify-center items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none text-center bg-black/20">
                       <div className="w-20 h-20 bg-[#00E599] rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(0,229,153,0.6)] transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-200">
                         <Unlock className="w-10 h-10 text-[#030508]" />
                       </div>
                       <h3 className="text-white font-bold text-3xl drop-shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">Payment Secured</h3>
                   </div>
                 </div>
               </div>
            </TiltCard>
          </div>
        </section>

        {/* 2. Story Section */}
        <section className="px-6 py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0D14]/50 to-transparent"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center relative z-10">
            <TiltCard className="w-full md:w-5/12">
              <div className="bg-[#0A0D14]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl group">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E599]/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#00E599]/10 transition-colors"></div>
                 
                 <div className="flex flex-col gap-8 relative z-10">
                    <motion.div whileHover={{ x: 10 }} className="flex gap-4 items-center opacity-70 transition-all cursor-default">
                       <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-gray-300" /></div>
                       <div className="flex-1 h-2 bg-white/5 rounded-full"></div>
                       <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Delivered</span>
                    </motion.div>
                    
                    <motion.div whileHover={{ x: 10 }} className="flex gap-4 items-center opacity-90 transition-all cursor-default">
                       <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center"><Clock className="w-4 h-4 text-yellow-500" /></div>
                       <div className="flex-1 h-2 bg-yellow-500/20 rounded-full flex overflow-hidden">
                         <motion.div initial={{ width: "0%" }} animate={{ width: "50%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="bg-yellow-500/40 h-full w-1/2 rounded-full"></motion.div>
                       </div>
                       <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Ghosted</span>
                    </motion.div>
                    
                    <motion.div whileHover={{ x: 10 }} className="flex gap-4 items-center transition-all cursor-default">
                       <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 font-bold">!</div>
                       <div className="flex-1 h-2 bg-red-500/20 rounded-full"></div>
                       <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Waiting</span>
                    </motion.div>
                 </div>
              </div>
            </TiltCard>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="w-full md:w-7/12"
            >
              <h2 className="text-[#00E599] font-bold tracking-widest uppercase text-xs mb-3">Why EarnLock Exists</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Built out of frustration.</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                "I’m a solo freelancer. I delivered a massive project, sent the invoice, and then… got completely ghosted."
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                "No tools existed to protect my payment. EarnLock is built from the ground up to protect freelancers’ payments, giving you control, confidence, and peace of mind."
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Pain Section */}
        <section className="px-6 py-28 relative">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="w-full lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
                Freelancers'<br/><span className="text-gray-500">Daily Nightmare.</span>
              </h2>
              <ul className="space-y-4 text-gray-400 text-lg font-normal">
                <li className="flex gap-4 items-start"><AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" /> Clients ghost after work is delivered.</li>
                <li className="flex gap-4 items-start"><AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" /> Polite follow-ups ignored repeatedly.</li>
                <li className="flex gap-4 items-start"><AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" /> Net-30/60 invoices become months of uncertainty.</li>
                <li className="flex gap-4 items-start"><AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" /> Anxiety, lost cash flow, wasted time.</li>
              </ul>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <blockquote className="text-xl text-gray-300 font-medium font-serif italic border-l-2 border-white/20 pl-4 py-1">
                  "I sent 15 reminders… still no reply."
                </blockquote>
                <blockquote className="text-xl text-gray-300 font-medium font-serif italic border-l-2 border-white/20 pl-4 py-1">
                  "Lost $2,500 because I trusted a client."
                </blockquote>
                <blockquote className="text-xl text-gray-300 font-medium font-serif italic border-l-2 border-white/20 pl-4 py-1">
                  "Friday never came."
                </blockquote>
              </div>
            </motion.div>
            
            <TiltCard className="w-full lg:w-1/2">
              <div className="bg-[#0A0D14]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
                 <div className="absolute left-[39px] lg:left-[55px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-white/10 via-yellow-500/50 to-red-500/50"></div>

                 <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-6 relative z-10 transition-transform cursor-default">
                    <div className="w-12 h-12 rounded-full bg-[#11131A] flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                       <FileText className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="pt-2">
                       <h4 className="font-bold text-lg leading-none mb-2 text-white">Work Delivered</h4>
                       <p className="text-sm text-gray-500">Excitement, relief, invoice sent.</p>
                    </div>
                 </motion.div>

                 <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-6 relative z-10 transition-transform cursor-default">
                    <div className="w-12 h-12 rounded-full bg-[#11131A] flex items-center justify-center shrink-0 border border-yellow-500/30">
                       <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="pt-2">
                       <h4 className="font-bold text-lg leading-none mb-2 text-white">Ghosted & Waiting</h4>
                       <p className="text-sm text-gray-500">2 weeks pass. "Just checking in!" ignored.</p>
                    </div>
                 </motion.div>

                 <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-6 relative z-10 transition-transform cursor-default">
                    <div className="w-12 h-12 rounded-full bg-[#11131A] flex items-center justify-center shrink-0 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                       <User className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="pt-2">
                       <h4 className="font-bold text-red-400 text-lg leading-none mb-2">Stress Builds</h4>
                       <p className="text-sm text-gray-500">Rent is due. You feel like a beggar.</p>
                    </div>
                 </motion.div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* 4. Solution Section */}
        <section className="px-6 py-28 relative bg-gradient-to-b from-transparent via-[#00E599]/5 to-transparent">
          <div className="max-w-6xl mx-auto text-center border-t border-white/5 pt-28">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">EarnLock — Your Payment Bodyguard</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-20 leading-relaxed font-normal">
                Not just another invoicing tool. EarnLock protects your work, ensures payment, and entirely removes the stress of collection.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
              {/* Connecting line visible only on desktop */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-white/5 z-0"></div>
              
              {/* Step 1 */}
              <TiltCard className="h-full z-10 w-full">
                <div className="h-full bg-[#0A0D14]/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-left hover:border-[#00E599]/30 transition-all duration-300 group shadow-lg">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#030508] border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#00E599]/10 group-hover:border-[#00E599]/30 transition-all group-hover:scale-110 shadow-inner">
                    <Lock className="w-7 h-7 text-white group-hover:text-[#00E599] transition-colors relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">1. Lock Your Files</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Secure watermarked preview; client cannot download until they have paid.
                  </p>
                </div>
              </TiltCard>

              {/* Step 2 */}
              <TiltCard className="h-full z-10 w-full">
                <div className="h-full bg-[#0A0D14]/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-left hover:border-[#00E599]/30 transition-all duration-300 group shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-[#030508] border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#00E599]/10 group-hover:border-[#00E599]/30 transition-all group-hover:scale-110 shadow-inner">
                    <Mail className="w-7 h-7 text-white group-hover:text-[#00E599] transition-colors relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">2. Auto-Follow Ups</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Friendly → Firm → Final notice. Includes optional WhatsApp escalation for unresponsive clients.
                  </p>
                </div>
              </TiltCard>

              {/* Step 3 */}
              <TiltCard className="h-full z-10 w-full">
                <div className="h-full bg-[#0A0D14]/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-left hover:border-[#00E599]/60 transition-all duration-300 group shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_40px_rgba(0,229,153,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E599]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#00E599]/20 transition-all"></div>
                  <div className="w-16 h-16 rounded-2xl bg-[#030508] border border-[#00E599]/40 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    <Unlock className="w-7 h-7 text-[#00E599] relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-white relative z-10">3. Instant Payment & Peace</h3>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                    Files unlock automatically; optional legal-style letter for extreme non-paying clients.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* 7. Interactive Ecosystem Simulation */}
        <section className="px-6 py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative">
            <h2 className="text-3xl font-bold mb-12 text-center tracking-tight text-white drop-shadow-sm">See EarnLock in Action</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative">
               {/* Connecting track */}
               <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-white/10"></div>
               <div className="hidden md:block absolute top-[28px] left-[10%] h-[2px] bg-[#00E599] transition-all duration-500 ease-out" style={{ width: `${(activeEcoStep / (ecoSteps.length - 1)) * 80}%` }}></div>

               {ecoSteps.map((step, idx) => {
                 const isActive = idx === activeEcoStep;
                 const isPassed = idx < activeEcoStep;
                 return (
                   <motion.div 
                     key={idx} 
                     className="flex flex-col items-center relative z-10 w-full md:w-48 mb-8 md:mb-0 group cursor-pointer"
                     onClick={() => setActiveEcoStep(idx)}
                     whileHover={{ y: -5 }}
                   >
                     <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 mb-4 ${isActive ? 'bg-[#00E599] border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.5)] scale-110' : isPassed ? 'bg-[#030508] border-[#00E599] scale-100' : 'bg-[#030508] border-white/10 scale-100'}`}>
                        <step.icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-[#030508]' : isPassed ? 'text-[#00E599]' : 'text-gray-500'}`} />
                     </div>
                     <h4 className={`text-center font-bold text-sm mb-2 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-500'}`}>{step.title}</h4>
                     <p className={`text-center text-xs px-2 transition-colors duration-500 ${isActive ? 'text-gray-400' : 'text-gray-600 opacity-0 md:opacity-100'}`}>{step.desc}</p>
                   </motion.div>
                 );
               })}
            </div>
            
            <div className="mt-12 text-center">
               <button 
                  onClick={() => setActiveEcoStep(0)} 
                  className="text-xs text-gray-400 hover:text-[#00E599] transition-colors border border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2"
               >
                  Restart Flow
               </button>
            </div>
          </div>
        </section>

        {/* 6. How It Solves the Problem */}
        <section className="px-6 py-28 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">From Stress → Payment Confidence</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Protect Deliverables", text: "Files never leave control until paid. View-only access.", icon: Lock },
                { title: "Auto-Chase Invoices", text: "Email & WhatsApp automated escalation schedules.", icon: Mail },
                { title: "Enforce Agreements", text: "Deposits, milestones, and late fees applied automatically.", icon: FileText },
                { title: "Peace of Mind", text: "Timestamped delivery logs and full clarity on views.", icon: Shield },
              ].map((feature, i) => (
                <TiltCard key={i} className="h-full">
                  <div className="bg-[#0A0D14]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl flex flex-col h-full hover:bg-white/[0.02] hover:border-[#00E599]/20 transition-all shadow-lg group">
                    <div className="w-12 h-12 bg-[#030508] border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#00E599]/30 transition-transform">
                       <feature.icon className="w-5 h-5 text-[#00E599]" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.text}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Benefits Section */}
        <section className="px-6 py-24 relative border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="w-full lg:w-5/12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Why Freelancers Will Love EarnLock</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Reclaim your time, professional leverage, and peace of mind by automating the worst part of independent work.
              </p>
            </motion.div>

            <div className="w-full lg:w-7/12 space-y-4">
              {[
                { icon: Clock, title: "Stop chasing payments", desc: "Automatic follow-ups keep the pressure on." },
                { icon: Shield, title: "Stay professional", desc: "Maintain your creative reputation while we act firm." },
                { icon: Mail, title: "Track everything", desc: "Know exactly when your invoices and files are viewed." },
                { icon: Lock, title: "Protect your work", desc: "Files remain mathematically locked until payment." },
                { icon: AlertCircle, title: "Optional legal leverage", desc: "Physical demand letters for extreme cases." }
              ].map((benefit, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: 20 }} 
                   whileInView={{ opacity: 1, x: 0 }} 
                   viewport={{ once: true }} 
                   transition={{ delay: idx * 0.1 }} 
                   className="flex items-start gap-5 p-6 bg-[#0A0D14]/50 backdrop-blur-sm border border-white/5 rounded-3xl hover:border-[#00E599]/20 hover:bg-[#0A0D14] transition-all duration-300 hover:transform hover:translate-x-[-8px] group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#030508] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#00E599]/50 group-hover:scale-110 transition-all shadow-sm">
                     <benefit.icon className="w-5 h-5 text-[#00E599]" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg mb-1 tracking-tight text-white transition-colors">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="px-6 py-28 relative">
          <div className="max-w-3xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Questions You Might Have</h2>
             </div>

             <div className="space-y-4">
                {faqs.map((faq, index) => (
                   <div 
                     key={index} 
                     className="border border-white/5 bg-[#0A0D14]/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
                   >
                     <button 
                       onClick={() => setOpenFaq(openFaq === index ? null : index)}
                       className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors focus:outline-none"
                     >
                       <span className="font-bold text-lg tracking-tight">{faq.q}</span>
                       {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-[#00E599] shrink-0" />
                       ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                       )}
                     </button>
                     <AnimatePresence>
                        {openFaq === index && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                           >
                             <div className="p-6 pt-0 text-gray-400 text-md leading-relaxed border-t border-white/5 mt-2">
                               {faq.a}
                             </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* 9. Waitlist CTA */}
        <section id="waitlist" className="px-5 py-24 md:py-32 relative overflow-hidden flex flex-col items-center border-t border-white/5 w-full">
          <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E599]/15 via-transparent to-transparent pointer-events-none"
          ></motion.div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight drop-shadow-lg leading-tight px-2 [text-wrap:balance]">
              Want EarnLock to Protect Your Payments?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              EarnLock is a new SaaS. If enough freelancers join the waitlist, I’ll start building immediately. Early access gives <strong className="text-white font-semibold">1-month free usage</strong> and a chance to shape the product.
            </p>
            
            <div className="flex justify-center mt-6 w-full px-4">
              <motion.button 
                onClick={openWaitlistForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00E599] hover:bg-[#00CC88] text-[#030508] w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl transition-all shadow-[0_0_30px_rgba(0,229,153,0.4)] hover:shadow-[0_0_50px_rgba(0,229,153,0.6)] flex items-center justify-center gap-3"
              >
                <span className="whitespace-normal sm:whitespace-nowrap">Join the Waitlist — Free 1-Month</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 backdrop-blur-md bg-[#030508]/80">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6 opacity-80">
            <Logo />
            <span className="text-gray-500 font-bold tracking-tight text-lg">EarnLock</span>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-center mb-8 px-6 leading-relaxed">
            Built for freelancers, by someone who's been ghosted too many times. Minimalist, professional, and built on trust.
          </p>
          <div className="text-gray-700 text-xs font-medium">
            © 2026 EarnLock. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
