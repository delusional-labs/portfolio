import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed bottom-10 left-0 w-full z-50 px-8 flex justify-center">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
        className="vhs-grain glass px-8 py-4 md:px-12 md:py-6 flex items-center justify-between w-full max-w-5xl border border-white/10 bg-black/80 backdrop-blur-2xl"
      >
        <Link to="/" className="text-[12px] font-black brand-font tracking-[0.5em] uppercase hover:text-brand-primary transition-colors pr-12 border-r border-white/5">
          DELUSIONAL.
        </Link>
        
        <div className="flex gap-4 md:gap-12 items-center">
          <NavLink href="#about">01. SOBRE</NavLink>
          <NavLink href="#works">02. WORKS</NavLink>
          <NavLink href="/simulate" isInternal>03. SIMULATE</NavLink>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white px-8 py-3 font-bold text-[11px] tracking-[0.3em] transition-all duration-300 uppercase brand-font"
          >
            SAY HELLO
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
}

function NavLink({ href, children, isInternal = false }: { href: string; children: React.ReactNode; isInternal?: boolean }) {
  const Component = isInternal ? Link : "a";
  const props = isInternal ? { to: href } : { href };

  return (
    <motion.div className="flex items-center">
      {/* @ts-ignore */}
      <Component
        {...props}
        className="text-[11px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center uppercase brand-font"
      >
        {children}
      </Component>
    </motion.div>
  );
}
