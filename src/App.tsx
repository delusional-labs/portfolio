import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Shield, AppWindow } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import ThreeScene from "./components/ThreeModel";
import Navbar from "./components/Navbar";
import ScrambleText from "./components/ScrambleText";
import Simulation from "./pages/Simulation";
import StudioDisplay from "./components/StudioDisplay";
import InteractiveDivider from "./components/InteractiveDivider";

function Home() {
  return (
    <main className="relative min-h-screen text-white selection:bg-brand-primary selection:text-white overflow-x-hidden">
      {/* Texture Background - Top layer */}
      <div className="grainy-bg" />
      
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 text-brand-primary">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-brand-primary/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-tr from-cyan-500/5 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-20">
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ThreeScene />
          </div>

          <div className="max-w-6xl w-full ml-auto text-right flex flex-col items-end py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="mb-6 mr-4"
            >
               <span className="text-[10px] font-bold tracking-[0.8em] text-white/30 uppercase brand-font">Crafting Digital Authority</span>
            </motion.div>

            <div className="text-[18vw] md:text-[12vw] font-black tracking-tighter leading-[0.75] uppercase mb-16 brand-font flex flex-col items-end">
              <ScrambleText text="DELU" delay={0} />
              <ScrambleText text="SIONAL" delay={0.2} className="text-brand-primary" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2.2 }}
              className="flex flex-col items-end gap-16 w-full mr-2 relative z-30"
            >
              <p className="text-sm md:text-xl font-bold text-white/40 max-w-2xl tracking-[0.3em] text-right uppercase brand-font">
                DESIGN QUE DESAFIA A REALIDADE. <br />
                <span className="text-white">CONSTRUÍMOS PRESENÇA DIGITAL DE ALTO NÍVEL.</span>
              </p>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex items-center gap-6 text-white/10"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[9px] tracking-[0.5em] font-bold uppercase text-right">SCROLL TO EXPERIENCE</span>
                </div>
                <ChevronDown size={24} strokeWidth={1} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Statement/Values */}
        <section id="about" className="min-h-screen flex flex-col items-center justify-center relative px-8 py-32">
          <div className="max-w-4xl w-full text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-primary text-[10px] font-bold tracking-[0.5em] uppercase mb-8 block"
            >
              Nossa Filosofia
            </motion.span>
            
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-24 brand-font flex flex-col items-center">
              <span className="opacity-20 uppercase">Não entregamos</span>
              <span className="uppercase">Apenas sites.</span>
              <div className="h-4" />
              <span className="opacity-20 uppercase">Entregamos</span>
              <span className="text-brand-primary italic uppercase">Autoridade digital.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <FeatureCard 
                icon={<Zap size={24} />} 
                title="Performance" 
                desc="Velocidade que converte e posiciona sua marca no topo."
              />
              <FeatureCard 
                icon={<Shield size={24} />} 
                title="Autoridade" 
                desc="Design agressivo que comunica liderança em qualquer setor."
              />
              <FeatureCard 
                icon={<AppWindow size={24} />} 
                title="Experiência" 
                desc="Interfaces fluidas feitas sob medida para o seu negócio."
              />
            </div>
          </div>
        </section>


        {/* Morph Effect Filters */}
        <svg className="filters">
          <defs>
            <filter id="threshold">
              <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 25 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Section 3: The Art of Code (Morph Hero) */}
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
          {/* Studio Display behind text */}
          <StudioDisplay />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="morph-container text-center mb-32">
            <div className="word-rotator">
              <div className="word">CR<span className="text-brand-primary">E</span>ATE</div>
              <div className="word">DE<span className="text-brand-primary">S</span>IGN</div>
              <div className="word">DEV<span className="text-brand-primary">EL</span>OP</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="-mt-32"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-7 border border-white/20 text-white font-black rounded-sm transition-all duration-700 text-xs tracking-[0.4em] brand-font uppercase flex items-center gap-4"
            >
              Iniciar Projeto <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <InteractiveDivider />

        <Navbar />

        <footer className="relative py-32 md:py-48 px-8 md:px-24 footer-gradient overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
              <div className="col-span-1 md:col-span-2">
                <div className="text-3xl md:text-5xl font-black brand-font tracking-tighter mb-8 uppercase leading-none flex flex-col items-start text-left">
                  <span className="opacity-20">VAMOS CRIAR ALGO</span>
                  <span className="text-brand-primary">LENDÁRIO JUNTOS.</span>
                </div>
                <p className="footer-link hover:text-white normal-case tracking-normal text-lg">hello@delusional.studio</p>
              </div>
              
              <div className="flex flex-col gap-6">
                <span className="text-[10px] tracking-[0.3em] font-black text-white/10 uppercase mb-2">Social</span>
                <a href="#" className="footer-link">Instagram</a>
                <a href="#" className="footer-link">Awwwards</a>
                <a href="#" className="footer-link">Behance</a>
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-[10px] tracking-[0.3em] font-black text-white/10 uppercase mb-2">Estúdio</span>
                <a href="#about" className="footer-link">Sobre</a>
                <a href="#works" className="footer-link">Projetos</a>
                <a href="#" className="footer-link">Privacidade</a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-black brand-font tracking-tighter opacity-40">DELUSIONAL.</div>
                <p className="text-[8px] tracking-[0.5em] font-bold text-white/10 uppercase">Digital Craftsmanship</p>
              </div>
              
              <div className="text-[10px] tracking-[0.2em] font-bold text-white/20 uppercase">
                © 2024 ALL RIGHTS RESERVED
              </div>
            </div>
          </div>

          {/* Large background watermark */}
          <div className="absolute -bottom-20 -right-20 text-[20vw] font-black brand-font tracking-tighter text-white/[0.02] pointer-events-none select-none uppercase">
            STUDIO
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-brand-primary/30 transition-colors duration-500"
    >
      <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-lg font-bold tracking-tight mb-4 brand-font uppercase">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default App;
