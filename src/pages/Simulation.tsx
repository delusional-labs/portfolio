import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Simulation() {
  const [tema, setTema] = useState<"claro" | "escuro">("escuro");

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-between p-6 md:p-10 overflow-hidden relative">
      <div className="fixed inset-0 grainy-bg opacity-10 pointer-events-none" />
      
      {/* Topo Minimalista */}
      <header className="w-full flex justify-between items-center z-50">
        <Link to="/" className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20 hover:opacity-100 transition-opacity">
          Sair
        </Link>
        <div className="text-[10px] font-black tracking-[0.4em] uppercase text-white/10">
          Studio Configurator
        </div>
      </header>

      {/* Área Central - Preview */}
      <main className="flex-1 w-full max-w-5xl flex items-center justify-center p-4">
        <div 
          className={`relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border transition-all duration-1000 
            ${tema === "escuro" ? "bg-[#0a0a0a] border-white/5" : "bg-white border-black/5"}`}
        >
          
          {/* Skeleton Content */}
          <div className="w-full h-full flex flex-col p-16 md:p-24 space-y-12">
             <div className="space-y-4">
                <div className={`w-24 h-2 rounded-full transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
                <div className={`w-3/4 h-12 md:h-20 rounded-2xl transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
                <div className={`w-1/2 h-12 md:h-20 rounded-2xl transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
             </div>
             
             <div className="grid grid-cols-2 gap-8 pt-8">
                <div className={`aspect-video rounded-3xl transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
                <div className={`aspect-video rounded-3xl transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
             </div>

             <div className="flex gap-4">
                <div className={`w-40 h-10 rounded-full transition-colors duration-1000 ${tema === "escuro" ? "bg-brand-primary/20" : "bg-brand-primary/10"}`} />
                <div className={`w-32 h-10 rounded-full transition-colors duration-1000 ${tema === "escuro" ? "bg-white/5" : "bg-black/5"}`} />
             </div>
          </div>

          {/* Internals */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
        </div>
      </main>

      {/* Tray de Controles na Base */}
      <footer className="w-full flex flex-col items-center gap-6 pb-4">
        <div className="text-[11px] font-black tracking-[0.4em] uppercase opacity-40">
           Atmosfera do site
        </div>
        
        <ThemeSwitcher currentTheme={tema} onChange={(t) => setTema(t)} />
      </footer>
    </div>
  );
}
