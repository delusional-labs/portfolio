import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import ThreeScene from "./components/ThreeModel";
import Simulation from "./pages/Simulation";
import sphereImg from "./assets/sphere_offground.png";

function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // Adjusted for more slides
  
  // Sphere interaction based on scroll
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const sphereRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <main className="relative text-white bg-[#191919] selection:bg-emerald-500 selection:text-white font-sans">
      {/* Texture Background */}
      <div className="grainy-bg opacity-20 fixed inset-0 pointer-events-none z-50" />
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] blur-[100px]" />
      </div>

      {/* LITERAL OFFGROUND HERO */}
      <section className="paragraph paragraph--type--panel-custom-animated-background paragraph--view-mode--default panel-animated-bg-with-text big-p image-bg-1 no-space-top no-space-bottom text-center-align text-readability-on content-full-width-on text-not-center-align mobileExtraImage font_color_main relative h-screen bg-black overflow-hidden" data-title="Animated BG Image & Text" data-type="panel-animated-bg-with-text" data-paragraph-id="252">
        <div className="ratio-wrap h-full">
          <div className="rel h-full">
            <div className="hero-three-js h-full relative flex items-center justify-center">
              <div className="hero-logo z-20">
                <img 
                  src="https://offground.solutions/themes/legend/images/logo_white-offground.svg" 
                  alt="Offground Logo"
                  className="w-[30vw] min-w-[300px] h-auto"
                />
              </div>
              <div className="absolute inset-0 z-0 bg-[#121212]">
                {/* Fallback for their custom three.js canvas */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://offground.solutions/sites/default/files/2025-09/background_hero-Offground-min.png')] bg-cover bg-center" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-overlay background_color_main absolute inset-0 bg-black/15 pointer-events-none"></div>
      </section>

      {/* LITERAL OFFGROUND CONTENT BELOW HERO */}
      <div className="offground-replicated-content relative z-20">
        
        {/* Animated Sphere (Dynamic) */}
        <motion.div 
          style={{ 
            rotate: sphereRotate, 
            bottom: "-20rem", 
            left: "-20rem",
            scale: sphereScale,
            opacity: sphereOpacity
          }}
          className="fixed z-40 pointer-events-none w-[40rem] md:w-[50rem]"
        >
          <img src={sphereImg} alt="" className="w-full h-auto drop-shadow-[0_0_80px_rgba(0,0,0,0.5)]" />
        </motion.div>

        {/* 1. SERVICES SIDE SCROLL (LITERAL PORT) */}
        <section className="panel-custom-services-side-scroll">
          <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-[#191919]">
              
              <div className="slides-header absolute top-10 left-10 z-50 flex gap-8 text-[10px] uppercase tracking-widest opacity-30">
                <span>Web Development</span>
                <span>Design</span>
                <span>Automation</span>
                <span>Consulting</span>
              </div>

              <motion.div style={{ x }} className="flex h-full w-[500vw]">
                {/* SLIDE 0 */}
                <div className="slide-ele h-screen w-screen shrink-0 flex items-center px-10 md:px-32">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
                    <div className="text-wrap">
                      <h1 className="text-5xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter">We specialize in<br/>customer happiness.</h1>
                      <div className="mt-10 opacity-20"><Plus size={40} /></div>
                    </div>
                  </div>
                </div>

                {/* SLIDE 1 */}
                <div className="slide-ele h-screen w-screen shrink-0 flex items-center px-10 md:px-32 bg-[#111111]">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
                    <div className="text-wrap">
                      <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">We love to code.</h2>
                      <p className="text-xl opacity-40 mt-6 max-w-xl">Animated panels, lovely transitions and beautiful designs. But what is good design, without function?</p>
                    </div>
                  </div>
                </div>

                {/* SLIDE 2 - Experience */}
                <div className="slide-ele h-screen w-screen shrink-0 flex items-center px-10 md:px-32 bg-[#050505]">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
                    <div className="text-wrap">
                      <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">Years of experience backing our expertise.</h2>
                    </div>
                  </div>
                </div>

                {/* SLIDE 3 - Automation */}
                <div className="slide-ele h-screen w-screen shrink-0 flex items-center px-10 md:px-32 bg-[#0e4134]">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
                    <div className="text-wrap">
                      <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">We automate the heavy lifting.</h2>
                      <p className="text-xl opacity-60 mt-6 max-w-xl">Intelligent background systems that ensure your business scales without friction.</p>
                    </div>
                  </div>
                </div>

                {/* SLIDE 4 - All in one */}
                <div className="slide-ele h-screen w-screen shrink-0 flex items-center px-10 md:px-32 bg-white text-black">
                  <div className="flex flex-col items-center justify-center w-full text-center">
                    <h1 className="text-6xl md:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter">Your all in one agency</h1>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. WHO WE ARE (LITERAL PORT) */}
        <section className="bg-white py-40 px-10 text-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-20 opacity-30 text-center">By nurturing</h3>
            <div className="flex flex-col gap-2 items-center text-5xl md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-center">
              <span>Pattern breakers,</span>
              <span>Builders of brands,</span>
              <span>Strategic designers,</span>
              <span>Shapers of interfaces,</span>
              <span>Coders with taste.</span>
            </div>
          </div>
        </section>

        {/* 3. IMAGE & TEXT SECTION (LITERAL) */}
        <section className="bg-black py-40 px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 aspect-square rounded-3xl overflow-hidden bg-zinc-900">
               <img src="https://offground.solutions/sites/default/files/2026-01/bridge_up-Offground.jpg" className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="flex-1 flex flex-col gap-10">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">Knowledge is built on experience. And we’ve got a ton.</h2>
              <div className="flex flex-col gap-6 text-xl opacity-40 leading-relaxed font-medium">
                <p>Outside the current client list, we built our know-how through years of work with industry-leading companies.</p>
                <p>And with OffGROUND, we aim to bring Apple Inc.-level quality to everybody.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="bg-white py-60 px-10 text-black text-center relative">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-7xl md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter mb-16">
              We challenge you<br/>to challenge us.
            </h1>
            <button className="px-16 py-6 bg-black text-white rounded-full text-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95">
              GAME ON
            </button>
          </div>
        </section>

        {/* 5. FOOTER (LITERAL PORT) */}
        <footer className="bg-[#191919] pt-40 pb-20 px-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 text-sm opacity-50 font-medium">
              <div className="flex flex-col gap-6">
                <span className="text-xl font-bold text-white tracking-tighter">OffGROUND</span>
                <p className="leading-relaxed">Independent Digital Agency based in Munich, Germany</p>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-white transition-colors font-bold text-white mb-2">Contact</a>
                <a href="mailto:info@offground.solutions" className="hover:text-white transition-colors">info@offground.solutions</a>
                <a href="tel:+498923044873" className="hover:text-white transition-colors">+49 89 230 448 73</a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-white transition-colors">Imprint</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
              </div>
            </div>
            
            <div className="mt-40 pt-20 border-t border-white/5 flex justify-between items-center opacity-20 text-[10px] uppercase tracking-widest">
               <span>© 2026 OffGROUND</span>
               <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulate" element={<Simulation />} />
    </Routes>
  );
}

export default App;
