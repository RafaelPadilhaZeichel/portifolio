import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Linkedin, Instagram, Mail, Smartphone, ExternalLink, Menu, X, XCircle, MapPin, Truck, Database, Globe } from 'lucide-react';
// Importação da imagem
import rafaelFoto from './rafael.jpg';

// --- Dados Globais ---
const PHONE_NUMBER = "5527995893556";
const WHATSAPP_MSG = encodeURIComponent("Olá Rafael, vi seu portfólio e gostaria de conversar!");
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MSG}`;

// --- Dados dos Projetos ---
const projectsData = [
  {
    id: 1,
    category: "SISTEMA LOGÍSTICO",
    title: "Vanguard Fleet",
    shortDesc: "Monitoramento de frota em tempo real com integração de mapas e dados críticos.",
    tech: ["React", "Leaflet Maps", "WebSocket", "Tailwind", "SAP API"],
    imageType: "custom_ui",
    fullDescription: {
      challenge: "A empresa perdia visibilidade da carga após a saída do centro de distribuição. O sistema antigo não oferecia rastreamento visual intuitivo.",
      solution: "Desenvolvi um Dashboard Web que consome dados de GPS em tempo real via WebSocket. Criei uma interface visual onde o gestor vê a frota no mapa e recebe alertas de manutenção.",
      result: "Aumento de 30% na pontualidade das entregas e redução drástica de ligações para motoristas."
    }
  },
  {
    id: 2,
    category: "LANDING PAGE & BRANDING",
    title: "Lumina Arch",
    shortDesc: "Site institucional com foco total em estética, animação e conversão.",
    tech: ["Vite", "Framer Motion", "GSAP", "Design Responsivo"],
    imageType: "img",
    imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    fullDescription: {
      challenge: "Um escritório de arquitetura precisava de um site que transmitisse elegância e minimalismo, diferenciando-se dos concorrentes locais.",
      solution: "Criei uma experiência imersiva com 'smooth scroll'. O uso de tipografia editorial e muito espaço em branco (whitespace) valorizou as fotos dos projetos.",
      result: "Aumento de 150% nos contatos qualificados via site no primeiro mês de lançamento."
    }
  }
];

// --- Componentes de UI ---

const Section = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen relative flex flex-col justify-center px-6 md:px-20 py-20 ${className}`}>
    {children}
  </section>
);

// Título animado (Scroll Trigger)
const AnimatedTitle = ({ children, className }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`font-bold text-5xl md:text-7xl tracking-tighter ${className}`}
  >
    {children}
  </motion.h2>
);

// Scroll manual
const handleScroll = (e, href, closeMenu) => {
  e.preventDefault();
  if(closeMenu) closeMenu();
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href}
    onClick={(e) => handleScroll(e, href, onClick)}
    className="text-sm font-bold uppercase tracking-widest hover:text-[#ccff00] transition-colors relative group cursor-pointer block w-full md:w-auto text-center md:text-left py-2 md:py-0"
  >
    {children}
    <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ccff00] group-hover:w-full transition-all duration-300"></span>
  </a>
);

// Modal
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-[#111] w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl relative custom-scrollbar"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-[#ccff00] transition-colors z-50">
          <XCircle size={40} />
        </button>
        <div className="p-8 md:p-12">
          <span className="inline-block px-3 py-1 bg-[#ccff00]/10 text-[#ccff00] font-bold tracking-widest text-xs rounded mb-4 border border-[#ccff00]/20">{project.category}</span>
          <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{project.title}</h3>
          <div className="space-y-10 text-gray-300 leading-relaxed text-lg">
            <div><h4 className="text-white font-bold text-xl mb-3 flex items-center gap-2"><span className="w-2 h-8 bg-[#ccff00] block rounded-sm"></span>O Desafio</h4><p className="opacity-80">{project.fullDescription.challenge}</p></div>
            <div><h4 className="text-white font-bold text-xl mb-3 flex items-center gap-2"><span className="w-2 h-8 bg-zinc-700 block rounded-sm"></span>A Solução</h4><p className="opacity-80">{project.fullDescription.solution}</p></div>
            <div><h4 className="text-white font-bold text-xl mb-3 flex items-center gap-2"><span className="w-2 h-8 bg-white block rounded-sm"></span>O Resultado</h4><p className="opacity-80">{project.fullDescription.result}</p></div>
          </div>
          <div className="mt-10 pt-10 border-t border-white/10">
            <h4 className="font-bold mb-4 text-white uppercase text-sm tracking-wider">Tecnologias:</h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map(tech => (
                <span key={tech} className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-[#ccff00] transition-colors cursor-default">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Componente Principal ---

const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Mouse Spotlight Logic (Desktop)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Variantes para animação em cascata do Menu Mobile
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-[#ccff00] selection:text-black relative overflow-x-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.07), transparent 80%)`
        }}
      />
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}>
      </div>
      <div className="fixed inset-0 z-0 opacity-[0.15]" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '100px 100px'
           }}>
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ccff00; }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-move 5s ease infinite;
        }
      `}</style>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      
      {/* Navbar Premium */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 backdrop-blur-md bg-black/60 border-b border-white/5 transition-all">
        <div className="flex justify-between items-center relative">
          <a href="#hero" onClick={(e) => handleScroll(e, '#hero', () => setIsMenuOpen(false))} className="text-2xl font-black tracking-widest border-2 border-white px-2 hover:bg-white hover:text-black transition-all">RPZ.</a>
          
          <div className="hidden md:flex gap-8 items-center">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#about">Sobre</NavLink>
            <NavLink href="#projects">Projetos</NavLink>
            <NavLink href="#contact">Contato</NavLink>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[#ccff00] text-black px-6 py-2 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] transition-all transform hover:-translate-y-1">Vamos conversar</a>
          </div>

          <button className="md:hidden relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:scale-95 transition-all" onClick={toggleMenu} aria-label="Menu">
            <AnimatePresence mode="wait">
              {isMenuOpen ? 
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} className="text-[#ccff00]" /></motion.div> : 
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* Menu Mobile com Animação em Cascata */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 flex flex-col items-center gap-6 md:hidden z-40"
            >
              <motion.div variants={itemVariants} className="w-full text-center"><NavLink href="#hero" onClick={toggleMenu}>Home</NavLink></motion.div>
              <motion.div variants={itemVariants} className="w-full text-center"><NavLink href="#about" onClick={toggleMenu}>Sobre</NavLink></motion.div>
              <motion.div variants={itemVariants} className="w-full text-center"><NavLink href="#projects" onClick={toggleMenu}>Projetos</NavLink></motion.div>
              <motion.div variants={itemVariants} className="w-full text-center"><NavLink href="#contact" onClick={toggleMenu}>Contato</NavLink></motion.div>
              <motion.div variants={itemVariants} className="w-full h-[1px] bg-white/10 my-2"></motion.div>
              <motion.a 
                variants={itemVariants}
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-[#ccff00] font-bold text-lg"
              >
                <Smartphone size={20}/>WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <Section id="hero" className="pt-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
          
          <div className="relative z-10 max-w-3xl mt-4 md:mt-0 order-2 md:order-1">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
                <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">Disponível para Projetos</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-extrabold leading-[0.9] mb-6">
                RAFAEL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-emerald-400 to-[#ccff00] animate-gradient">
                  PADILHA
                </span>
              </h1>
            </motion.div>
            
            <motion.p className="mt-8 text-xl md:text-2xl text-gray-400 max-w-xl border-l-4 border-[#ccff00] pl-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Do rigor do <span className="text-white font-bold">SAP ABAP</span> à criatividade do <span className="text-white font-bold">Frontend Moderno</span>.
            </motion.p>

            <motion.div className="mt-12 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#ccff00] transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">Ver Projetos <ArrowRight size={20}/></a>
              <a href={WHATSAPP_LINK} target="_blank" className="border border-white/30 backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2"><Smartphone size={20}/> WhatsApp</a>
            </motion.div>
          </div>

          {/* FOTO DESKTOP */}
          <motion.div style={{ y: yParallax }} className="order-1 md:order-2 relative w-[300px] md:w-[450px] h-[450px] md:h-[550px] mb-10 md:mb-0 z-0 hidden md:block">
              <div className="relative w-full h-full cursor-pointer group">
                <div className="absolute -top-10 -right-10 w-20 h-20 border-t-4 border-r-4 border-[#ccff00] opacity-50"></div>
                <div className="absolute -bottom-5 -left-5 w-full h-full border border-white/20 rounded-tl-[100px]"></div>
                <div className="w-full h-full overflow-hidden rounded-tl-[100px] bg-zinc-800 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-0 transition-opacity duration-700"></div>
                  <img src={rafaelFoto} alt="Rafael Padilha" className="object-cover w-full h-full opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
          </motion.div>

        </div>
        
        {/* FOTO MOBILE (Animação Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="md:hidden relative w-full h-[400px] mt-12 rounded-t-[50px] overflow-hidden order-3"
        >
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
             <motion.img 
               src={rafaelFoto}
               alt="Rafael Padilha" 
               className="object-cover w-full h-full"
               initial={{ filter: 'grayscale(100%)', opacity: 0.8 }}
               whileInView={{ filter: 'grayscale(0%)', opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               viewport={{ once: true, amount: 0.3 }}
             />
        </motion.div>
      </Section>

      {/* --- SOBRE --- */}
      <Section id="about" className="bg-white/5 backdrop-blur-sm border-y border-white/5 relative z-10">
        <Database className="absolute top-20 right-10 text-white/5 w-64 h-64 -rotate-12" />
        
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto w-full">
          <div className="md:w-1/2 relative z-10">
            <AnimatedTitle className="text-white mb-8">ENGENHARIA <br/> + DESIGN.</AnimatedTitle>
            <p className="text-xl leading-relaxed text-gray-400 mb-6">
              Minha base em <strong className="text-[#ccff00]">SAP ABAP</strong> me ensinou a lidar com sistemas críticos onde o erro não é uma opção. 
              Agora, aplico essa solidez no desenvolvimento Web.
            </p>
            <p className="text-lg text-gray-300">
              Não crio apenas telas bonitas; crio interfaces estruturadas, performáticas e prontas para escalar.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#ccff00] transition-colors"
              >
                <Code className="mb-2 text-[#ccff00]"/>
                <h3 className="font-bold">Frontend</h3>
                <p className="text-sm text-gray-500">React, Vite, Tailwind</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#ccff00] transition-colors"
              >
                <Globe className="mb-2 text-[#ccff00]"/>
                <h3 className="font-bold">Backend</h3>
                <p className="text-sm text-gray-500">Integração API, SAP, SQL</p>
              </motion.div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end w-full">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-md bg-black border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden group"
             >
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#ccff00] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <span className="block text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">2026</span>
               <p className="text-lg text-gray-300">
                 Pronto para transformar requisitos complexos em experiências digitais fluidas.
               </p>
             </motion.div>
          </div>
        </div>
      </Section>

      {/* --- PROJETOS --- */}
      <Section id="projects" className="relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-20">
            <AnimatedTitle>PROJETOS <br/> SELECIONADOS</AnimatedTitle>
            <span className="hidden md:block text-gray-500 text-lg">Clique nos cards &rarr;</span>
          </div>

          <div className="flex flex-col gap-24">
            {projectsData.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} // Animação começa um pouco antes
                transition={{ duration: 0.6 }} 
                className={`group relative grid md:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* CARD VISUAL */}
                <motion.div 
                   onClick={() => setSelectedProject(project)} 
                   whileTap={{ scale: 0.98 }} // Efeito de clique no Mobile
                   className={`md:col-span-7 relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-[#0f0f0f] ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors z-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/60 backdrop-blur-sm">
                    <span className="bg-[#ccff00] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-[0_0_20px_#ccff00]">Ver Detalhes <ExternalLink size={18}/></span>
                  </div>
                  
                  {project.imageType === 'custom_ui' ? (
                    <div className="w-full h-full p-6 flex flex-col relative group-hover:scale-[1.02] transition-transform duration-700">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3}}></div>
                      <div className="relative z-10 flex flex-col h-full gap-4">
                        <div className="flex justify-between items-center bg-zinc-800/80 backdrop-blur p-3 rounded-lg border border-white/10 shadow-lg">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div><span className="text-xs font-bold text-gray-300">LIVE TRACKING</span></div>
                          <span className="text-xs font-mono text-[#ccff00]">SYS.VANGUARD_V2</span>
                        </div>
                        <div className="flex gap-4 h-full">
                          <div className="w-1/3 bg-zinc-800/50 rounded-lg p-3 flex flex-col gap-3 border border-white/5"><div className="h-2 w-1/2 bg-zinc-600 rounded mb-2"></div>{[1,2,3].map(i => (<div key={i} className="bg-black/40 p-2 rounded border border-white/5 flex items-center justify-between"><div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center"><Truck size={14}/></div><div className="h-1 w-1 bg-[#ccff00] rounded-full"></div></div>))}</div>
                          <div className="flex-1 bg-zinc-800/80 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#ccff00]/20 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
                             <MapPin className="text-[#ccff00] drop-shadow-[0_0_15px_rgba(204,255,0,0.8)] z-10" size={48} />
                             <div className="absolute inset-0 bg-[url('https://assets.codepen.io/1462889/map-texture.png')] opacity-20 mix-blend-overlay"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  )}
                </motion.div>

                {/* TEXTO */}
                <div className={`md:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                   <span className="text-[#ccff00] font-bold tracking-widest mb-2 uppercase text-sm flex items-center gap-2">
                     <span className="w-8 h-[1px] bg-[#ccff00]"></span> {project.category}
                   </span>
                   <h3 className="text-4xl font-bold mb-4 text-white">{project.title}</h3>
                   <p className="text-gray-400 text-lg mb-6 leading-relaxed border-l border-white/10 pl-4">
                     {project.shortDesc}
                   </p>
                   <div className="flex flex-wrap gap-2 mb-6">
                     {project.tech.map(tech => (
                       <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-xs font-medium text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                   </div>
                   <button onClick={() => setSelectedProject(project)} className="w-max text-sm font-bold text-white border-b border-[#ccff00] pb-1 hover:text-[#ccff00] hover:pl-2 transition-all">
                     LER ESTUDO DE CASO &rarr;
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- CONTATO --- */}
      <section id="contact" className="relative z-10 bg-gradient-to-b from-[#0a0a0a] to-[#111] border-t border-white/5 pt-20 flex flex-col justify-between min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto text-center px-6 flex-grow flex flex-col justify-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-[#ccff00] font-mono mb-4 block">PRONTO PARA INICIAR?</span>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-8 text-white">
              VAMOS <br/> CONVERSAR.
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-2xl mx-auto">
              Seja para migrar sistemas legados ou criar novas experiências digitais.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[#ccff00] text-black px-10 py-5 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
            >
              <Smartphone size={24}/> Chamar no WhatsApp
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:padilharafael17@gmail.com" className="border border-white/20 bg-white/5 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              <Mail size={24}/> Enviar E-mail
            </motion.a>
          </div>
        </div>

        <div className="w-full p-8 border-t border-white/5 bg-black mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg text-white">RPZ.</p>
              <p className="text-sm text-gray-500">Rafael Padilha © 2026</p>
            </div>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/rafapz8/" target="_blank" className="text-gray-400 hover:text-[#ccff00] transition-colors"><Instagram size={24}/></a>
               <a href="https://www.linkedin.com/in/rafael-padilha-1594001a2/" target="_blank" className="text-gray-400 hover:text-[#ccff00] transition-colors"><Linkedin size={24}/></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;git add .