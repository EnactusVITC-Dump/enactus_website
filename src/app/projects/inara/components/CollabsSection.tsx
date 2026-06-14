import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MascotCoco from './MascotCoco';

interface ConstellationNode {
  id: string;
  label: string;
  tagline: string;
  stat: string;
  description: string;
  connections: string[];
  x: number; // percentage in canvas width
  y: number; // percentage in canvas height
  color: string;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: "farmers",
    label: "Farmers",
    tagline: "Groves & Cultivators",
    stat: "140+ Sourced Growers",
    description: "Sustaining coastal agriculture by upcycling standard agricultural crop residues directly.",
    connections: ["collectors", "communities"],
    x: 18,
    y: 30,
    color: "#4A6741"
  },
  {
    id: "collectors",
    label: "Shell Collectors",
    tagline: "Regional Hubs",
    stat: "15,000+ Shells Reclaimed",
    description: "Sorting and dry scrubbing shells sourced from community temple programs and groves.",
    connections: ["farmers", "artisans", "communities"],
    x: 15,
    y: 65,
    color: "#2A6B72"
  },
  {
    id: "artisans",
    label: "Women Artisans",
    tagline: "Irular Livelihood Circles",
    stat: "32 Fair-Wage Careers",
    description: "Providing training, independent income, and continuous leadership circles directly to tribal women.",
    connections: ["collectors", "craftsmen", "communities"],
    x: 35,
    y: 82,
    color: "#D4A843"
  },
  {
    id: "craftsmen",
    label: "Craftsmen",
    tagline: "Engraving & Carving Elite",
    stat: "100% Authentic Handcraft",
    description: "Smoothing, grain-finishing, and creating detailed bohemian filigree cuts using heirloom expertise.",
    connections: ["artisans", "designers", "communities"],
    x: 65,
    y: 82,
    color: "#C4894F"
  },
  {
    id: "designers",
    label: "Designers",
    tagline: "Enactus & Creative Minds",
    stat: "40+ Custom Sketches",
    description: "Iterating eco-luxury utility blueprints that combine modern fashion with raw coastal heritage.",
    connections: ["craftsmen", "logistics", "communities"],
    x: 85,
    y: 65,
    color: "#8AAF6E"
  },
  {
    id: "logistics",
    label: "Logistics",
    tagline: "Carbon-Offset Routing",
    stat: "0% Plastic Waste",
    description: "Wrapping every parcel in raw coir rope and post-consumer recycled cardboard packs.",
    connections: ["designers", "customers", "communities"],
    x: 82,
    y: 30,
    color: "#E6DECE"
  },
  {
    id: "customers",
    label: "Customers",
    tagline: "Conscious Advocates",
    stat: "10,000+ Patrons Worldwide",
    description: "Empowering communities globally through ecological lifestyle investments and support.",
    connections: ["logistics", "communities"],
    x: 50,
    y: 15,
    color: "#FAF6EE"
  },
  {
    id: "communities",
    label: "Inara Hub",
    tagline: "The Core Catalyst",
    stat: "6 UN SDG Alignments",
    description: "Bridging the grassroot supply loops into luxury design markets with complete revenue transparency.",
    connections: ["farmers", "collectors", "artisans", "craftsmen", "designers", "logistics", "customers"],
    x: 50,
    y: 50,
    color: "#D4A843"
  }
];

export default function CollabsSection() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [cocoPos, setCocoPos] = useState({ x: 50, y: 50, nextIndex: 1 });

  // Let Mascot Coco wander around the active nodes loop beautifully
  useEffect(() => {
    const wanderNodes = [
      { x: 50, y: 50 }, // Hub
      { x: 18, y: 30 }, // Farmers
      { x: 15, y: 65 }, // Collectors
      { x: 35, y: 82 }, // Artisans
      { x: 65, y: 82 }, // Craftsmen
      { x: 85, y: 65 }, // Designers
      { x: 82, y: 30 }, // Logistics
      { x: 50, y: 15 }, // Customers
    ];

    const interval = setInterval(() => {
      setCocoPos((prev) => {
        const nextIdx = (prev.nextIndex + 1) % wanderNodes.length;
        const target = wanderNodes[nextIdx];
        return {
          x: target.x,
          y: target.y,
          nextIndex: nextIdx
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const activeHoveredNode = CONSTELLATION_NODES.find(n => n.id === hoveredNodeId);

  // Connection active logic helpers
  const isNodeConnectedToHovered = (nodeId: string) => {
    if (!hoveredNodeId) return true;
    if (hoveredNodeId === nodeId) return true;
    const currentHoveredNode = CONSTELLATION_NODES.find(n => n.id === hoveredNodeId);
    return currentHoveredNode?.connections.includes(nodeId) || false;
  };

  const isLineActive = (fromId: string, toId: string) => {
    if (!hoveredNodeId) return false;
    return (hoveredNodeId === fromId && toId === hoveredNodeId) ||
           (hoveredNodeId === fromId && CONSTELLATION_NODES.find(n => n.id === fromId)?.connections.includes(toId)) ||
           (hoveredNodeId === toId && CONSTELLATION_NODES.find(n => n.id === toId)?.connections.includes(fromId));
  };

  return (
    <div
      id="collaborations-section"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 sm:px-16"
      style={{
        background: '#FAF6EE', // warm background
      }}
    >
      {/* Background paper noise fibers */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="absolute top-10 text-center select-none z-30">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="w-10 h-[1.2px] bg-[#C4894F]/60" />
          <h5 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C4894F]/85 font-black">
            The Living Ecosystem
          </h5>
          <span className="w-10 h-[1.2px] bg-[#C4894F]/60" />
        </div>
        
        <h2 className="font-serif font-black text-[#3D1F0D] text-2xl sm:text-4xl">
          Inara Constellation
        </h2>
        <p className="font-sans text-[10px] sm:text-xs text-[#3D1F0D]/60 tracking-wider mt-1 font-bold">
          Every shell connects a maker, a community, and a future.
        </p>
      </div>

      {/* Main Constellation Board Canvas Container - Styled with Frosted Glass */}
      <div 
        className="relative w-full max-w-[1000px] h-3/4 sm:h-[550px] border border-white/40 bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl z-20 overflow-hidden cursor-default"
        onClick={() => setHoveredNodeId(null)}
      >
        
        {/* SVG CONNECTIONS LAYER */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A843" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C4894F" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="inactive-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#302010" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#504030" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Draw connection lines dynamically */}
          {CONSTELLATION_NODES.map((node) => {
            return node.connections.map((connId) => {
              const connectedNode = CONSTELLATION_NODES.find(n => n.id === connId);
              if (!connectedNode) return null;
              
              const active = isLineActive(node.id, connectedNode.id);
              const strokeColor = active ? "url(#glow-grad)" : "url(#inactive-grad)";
              const strokeWidth = active ? 0.6 : 0.15;

              return (
                <g key={`line-path-${node.id}-${connId}`}>
                  <motion.line
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    animate={active ? { strokeDasharray: ["2,2", "0,0"] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="transition-all duration-500"
                  />
                  
                  {/* Flowing cooperative dots along active trails */}
                  {active && (
                    <motion.circle
                      r="0.5"
                      fill="#FAF6EE"
                      filter="drop-shadow(0 0 2px #D4A843)"
                      animate={{
                        cx: [node.x, connectedNode.x],
                        cy: [node.y, connectedNode.y]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                      }}
                    />
                  )}
                </g>
              );
            });
          })}
        </svg>

        {/* COCO POSITIONED WANDERING HAPPILY ON CANVAS */}
        <motion.div
          className="absolute z-10 pointer-events-none"
          animate={{
            left: `${cocoPos.x}%`,
            top: `${cocoPos.y}%`,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut"
          }}
          style={{
            transform: 'translate(-50%, -50%) scale(0.65)',
            x: '-50%',
            y: '-50%'
          }}
        >
          <div className="relative">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-black/10 blur-[2.5px]" />
            <MascotCoco emotion="calm" size={60} />
          </div>
        </motion.div>

        {/* INTERACTIVE LABELED NODE ELEMENTS */}
        {CONSTELLATION_NODES.map((node) => {
          const isCenter = node.id === 'communities';
          const isHovered = hoveredNodeId === node.id;
          const isConnected = isNodeConnectedToHovered(node.id);
          
          let sizeClass = "w-6 h-6 sm:w-8 sm:h-8";
          if (isCenter) sizeClass = "w-14 h-14 sm:w-16 sm:h-16";
          else if (node.id === 'artisans' || node.id === 'craftsmen') sizeClass = "w-10 h-10 sm:w-12 sm:h-12";

          const focusStyle = isHovered 
            ? "scale-125 shadow-[0_0_20px_#D4A843] ring-4 ring-[#D4A843]/30" 
            : isConnected 
              ? "scale-100 opacity-100" 
              : "opacity-45 scale-90";

          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              {/* Node Interactive Circle */}
              <button
                className={`rounded-full flex items-center justify-center font-bold text-center transition-all duration-500 ${sizeClass} ${focusStyle} cursor-pointer select-none outline-none`}
                style={{
                  background: isCenter 
                    ? 'radial-gradient(circle, #D4A843 0%, #C4894F 100%)' 
                    : isHovered 
                      ? '#FAF6EE' 
                      : `${node.color}cc`,
                  border: isHovered 
                    ? '2px solid #D4A843' 
                    : '1.5px solid rgba(255, 255, 255, 0.4)',
                  color: isHovered || isCenter ? '#3D1F0D' : '#FAF6EE',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => {
                  // Only clear if we are not actively on touch screen
                  if (window.matchMedia("(pointer: fine)").matches) {
                    setHoveredNodeId(null);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredNodeId(hoveredNodeId === node.id ? null : node.id);
                }}
              >
                {isCenter ? (
                  <span className="text-[10px] sm:text-xs select-none uppercase tracking-wider font-black leading-none text-center">
                    Inara<br/>Core
                  </span>
                ) : (
                  <span className="text-[10px] font-black pointer-events-none">
                    {node.label.charAt(0)}
                  </span>
                )}
              </button>

              {/* Node beautiful label tag */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-white/30 backdrop-blur-md border border-white/20 rounded-md px-2 py-0.5 shadow-md text-[8px] sm:text-[10px] text-[#3D1F0D] select-none font-black transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                {node.label}
              </div>
            </div>
          );
        })}

        {/* CONSTELLATION METRIC FLOATING POSTER NOTE (Glassmorphism card detailing) */}
        <AnimatePresence>
          {activeHoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-6 left-6 right-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-96 bg-white/30 backdrop-blur-2xl border border-white/25 text-[#3D1F0D] rounded-3xl p-5 shadow-2xl z-30 select-none rotate-[1.5deg]"
            >
              {/* Beautiful luxury hanger attachment pin */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-800 shadow-md" />

              <div className="text-center pt-2">
                <span className="text-[8px] font-mono tracking-widest uppercase text-amber-900/60 block font-black">
                  {activeHoveredNode.tagline}
                </span>
                
                <h4 className="font-serif font-black text-lg mt-1 text-[#3D1F0D]">
                  {activeHoveredNode.label}
                </h4>

                {/* Sparkling gold statistic metric key */}
                <span className="mt-1 inline-block bg-amber-750/15 border border-[#D4A843]/30 text-[#966432] text-[9px] sm:text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full font-mono">
                  ✨ {activeHoveredNode.stat}
                </span>
                
                <span className="w-12 h-[1px] bg-[#3D1F0D]/15 block mx-auto my-2" />

                <p className="font-handwritten text-sm text-[#3D1F0D] leading-snug font-bold">
                  "{activeHoveredNode.description}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="absolute bottom-6 text-center italic text-[#C4894F] font-handwritten text-sm opacity-60">
        hover nodes to highlight connection pathways and statistics
      </div>
    </div>
  );
}
