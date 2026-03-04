/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Map as MapIcon, ChevronRight, X, Play, Music, Image as ImageIcon, Newspaper, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as d3 from 'd3-geo';
import { PINS, PEDRA_DO_SAL_PROFILE, PELOURINHO_PROFILE, MASP_PROFILE, RIO_PROFILE, SP_PROFILE, SALVADOR_PROFILE, MANAUS_PROFILE, BH_PROFILE } from './data';
import { Pin, LocationProfile, Category } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const BRAZIL_GEOJSON_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';
const MAP_WIDTH = 800;
const MAP_HEIGHT = 800;

const CATEGORY_LABELS: Record<Category, string> = {
  cultura: 'Culture',
  natureza: 'Nature',
  gastronomia: 'Gastronomy',
  historia: 'History',
  city: 'City',
  state: 'State',
};

// --- Components ---

const Header = ({ 
  onSearch, 
  breadcrumb,
  searchResults,
  onSelectResult
}: { 
  onSearch: (val: string) => void;
  breadcrumb: string[];
  searchResults: Pin[];
  onSelectResult: (pin: Pin) => void;
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#009B3A] rounded-lg flex items-center justify-center">
            <MapIcon className="text-white w-5 h-5" />
          </div>
          <h1 className="font-sans font-bold text-lg tracking-tight">Brasil com S</h1>
        </div>

        <nav className="hidden md:flex items-center gap-2 text-sm text-black/40">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              <span className={cn(i === breadcrumb.length - 1 && "text-[#009B3A] font-medium")}>{item}</span>
              {i < breadcrumb.length - 1 && <ChevronRight className="w-3 h-3" />}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            value={query}
            placeholder="Search location..." 
            className="bg-black/5 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-[#009B3A]/20 transition-all outline-none"
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              onSearch(val);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
          />

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && query.length > 1 && (
              <>
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setShowResults(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden py-2"
                >
                  {searchResults.length > 0 ? searchResults.map(pin => (
                    <button
                      key={pin.id}
                      className="w-full px-4 py-3 text-left hover:bg-black/5 flex items-center gap-3 transition-colors"
                      onClick={() => {
                        onSelectResult(pin);
                        setShowResults(false);
                        setQuery('');
                      }}
                    >
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          pin.category === 'cultura' ? 'bg-[#FFCC00]' :
                          pin.category === 'natureza' ? 'bg-[#009B3A]' :
                          pin.category === 'gastronomia' ? 'bg-[#FF6B00]' : 
                          pin.category === 'historia' ? 'bg-[#002776]' : 'bg-zinc-900'
                        )} />
                      <div>
                        <p className="text-sm font-bold">{pin.name}</p>
                        <p className="text-[10px] text-[#009B3A]/60 uppercase tracking-wider font-bold">
                          {pin.level === 1 ? 'State' : CATEGORY_LABELS[pin.category]}
                        </p>
                      </div>
                    </button>
                  )) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-xs text-[#009B3A]/60 font-bold">No locations found</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <Info className="w-5 h-5 text-[#009B3A]/60" />
        </button>
      </div>
    </header>
  );
};

const ProfileModal = ({ 
  profile, 
  onClose 
}: { 
  profile: LocationProfile; 
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'audios' | 'fotos' | 'noticias'>('videos');

  const filteredMedia = useMemo(() => {
    const typeMap = {
      videos: 'video',
      audios: 'audio',
      fotos: 'foto',
      noticias: 'noticia'
    };
    return profile.media.filter(m => m.type === typeMap[activeTab]);
  }, [activeTab, profile]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/10"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 bg-black/5 hover:bg-black/10 text-black rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Profile & Info */}
        <div className="w-full md:w-[380px] border-r border-black/10 flex flex-col bg-[#FAF9F6] overflow-y-auto shrink-0">
          <div className="p-8 space-y-8">
            {/* Profile Pic Area */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img 
                  src={`https://picsum.photos/seed/${profile.id}-profile/400/400`} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
                <p className="text-[#009B3A] font-medium text-sm uppercase tracking-widest">{profile.state}</p>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
              <p className="text-black/70 leading-relaxed text-sm italic">
                "{profile.description}"
              </p>
            </div>

            {/* Metrics Grid (4 boxes) */}
            <div className="grid grid-cols-2 gap-3">
              {profile.metrics.slice(0, 4).map((m, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-center items-center text-center">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#009B3A]/60 mb-1">{m.label}</p>
                  <p className="text-sm font-bold truncate w-full">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Extra Info */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-3 text-xs text-black/40">
                <MapIcon className="w-3 h-3" />
                <span>Region: {profile.region}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-black/40">
                <Info className="w-3 h-3" />
                <span>Official Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media Panel */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Tabs Area (Ovals) */}
          <div className="p-4 md:p-6 pl-6 md:pl-8 pr-14 md:pr-16 border-b border-black/5 flex justify-start md:justify-center gap-2 md:gap-3 bg-[#FAF9F6]/50 overflow-x-auto no-scrollbar">
            {[
              { id: 'videos', icon: Play, label: 'Videos' },
              { id: 'audios', icon: Music, label: 'Audios' },
              { id: 'fotos', icon: ImageIcon, label: 'Photos' },
              { id: 'noticias', icon: Newspaper, label: 'News' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-2",
                  activeTab === tab.id 
                    ? "bg-[#009B3A] border-[#009B3A] text-white shadow-lg shadow-[#009B3A]/20" 
                    : "bg-white border-black/10 text-black/40 hover:border-black/20 hover:text-black"
                )}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Media Content Panel */}
          <div className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredMedia.length > 0 ? filteredMedia.map((item) => (
                  <div key={item.id} className="group bg-[#FAF9F6] border border-black/5 rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                    {item.type === 'foto' || item.type === 'video' ? (
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={item.thumbnail || item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-black ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-[#009B3A]/5 flex items-center justify-center">
                        {item.type === 'audio' ? <Music className="w-12 h-12 text-[#009B3A]/20" /> : <Newspaper className="w-12 h-12 text-[#009B3A]/20" />}
                      </div>
                    )}
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-bold text-base leading-tight group-hover:text-[#009B3A] transition-colors line-clamp-2">{item.title}</h4>
                        <ExternalLink className="w-4 h-4 text-black/20 group-hover:text-[#009B3A] transition-colors shrink-0" />
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {item.author && <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{item.author}</span>}
                        {item.date && <span className="text-[10px] text-black/20">• {item.date}</span>}
                      </div>
                      
                      {item.summary && <p className="text-xs text-black/60 leading-relaxed line-clamp-3 mb-4">{item.summary}</p>}
                      
                      <div className="mt-auto flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-bold bg-white border border-black/5 px-2.5 py-1 rounded-full text-black/40 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-32 text-center space-y-4">
                    <div className="w-20 h-20 bg-[#009B3A]/5 rounded-full flex items-center justify-center mx-auto">
                      <Info className="w-10 h-10 text-[#009B3A]/20" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-black/60">No {activeTab} yet</p>
                      <p className="text-sm text-black/30 max-w-xs mx-auto">We are currently gathering more cultural content for this location.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};



interface MapPinProps {
  pin: Pin;
  onClick: () => void;
  zoomLevel: number;
  projection: d3.GeoProjection;
  opacity?: number;
}

const MapPin: React.FC<MapPinProps> = ({ 
  pin, 
  onClick, 
  zoomLevel,
  projection,
  opacity = 1
}) => {
  const isVisible = useMemo(() => {
    // If we are in a state view (zoom is reset to 1 but filteredPins only has level 2), 
    // we should show the pins.
    // The parent App component already filters pins by level based on selectedStateId.
    return true; 
  }, []);

  const pos = useMemo(() => projection([pin.lng, pin.lat]), [pin, projection]);

  if (!pos) return null;

  const colors = {
    cultura: 'bg-[#FFCC00]', // Vibrant Gold
    natureza: 'bg-[#009B3A]', // Amazon Green
    gastronomia: 'bg-[#FF6B00]', // Dendê Orange
    historia: 'bg-[#002776]', // Colonial Blue
    city: 'bg-zinc-900', // Neutral Dark
    state: 'bg-zinc-900' // Neutral Dark
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ 
        scale: isVisible ? 1 / zoomLevel : 0, 
        opacity: isVisible ? opacity : 0,
        x: '-50%', 
        y: '-50%' 
      }}
      exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      transition={{ 
        type: 'spring', 
        damping: 25, 
        stiffness: 200,
        opacity: { duration: 0.2 }
      }}
      className={cn(
        "absolute cursor-pointer group pointer-events-auto",
        isVisible ? "block" : "hidden"
      )}
      style={{
        left: pos[0],
        top: pos[1],
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={cn(
        "w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-125",
        colors[pin.category as keyof typeof colors] || 'bg-zinc-900',
        pin.isReal && "ring-4 ring-[#009B3A]/30"
      )} />
      
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl">
          {pin.name}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(zoom);
  const offsetRef = useRef(offset);

  useEffect(() => {
    zoomRef.current = zoom;
    offsetRef.current = offset;
  }, [zoom, offset]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [pendingStateId, setPendingStateId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch(BRAZIL_GEOJSON_URL)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Error loading GeoJSON:', err));
  }, []);

  const currentGeoData = useMemo(() => {
    if (!geoData || !selectedStateId) return geoData;
    const statePin = PINS.find(p => p.id === selectedStateId);
    if (!statePin) return geoData;
    
    const feature = geoData.features.find((f: any) => 
      f.properties.name === statePin.name || f.properties.sigla === statePin.name
    );
    return feature ? { type: 'FeatureCollection', features: [feature] } : geoData;
  }, [geoData, selectedStateId]);

  const projection = useMemo(() => {
    const p = d3.geoMercator();
    if (currentGeoData) {
      p.fitSize([MAP_WIDTH, MAP_HEIGHT], currentGeoData);
    } else {
      p.center([-55, -15]) // Center of Brazil
        .scale(1000)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
    }
    return p;
  }, [currentGeoData]);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  const breadcrumb = useMemo(() => {
    const base = ['Brasil'];
    if (selectedStateId) {
      const state = PINS.find(p => p.id === selectedStateId);
      if (state) base.push(state.name);
    }
    if (selectedPin && selectedPin.level === 2) base.push(selectedPin.name);
    return base;
  }, [selectedStateId, selectedPin]);

  const filteredPins = useMemo(() => {
    if (!selectedStateId) {
      return []; // Don't show pins at the national level
    }
    return PINS.filter(p => p.level === 2 && p.stateId === selectedStateId);
  }, [selectedStateId]);

  const handleZoom = (delta: number) => {
    const currentZoom = zoom;
    const currentOffset = offset;
    const newZoom = Math.min(Math.max(currentZoom + delta, 1), 30);
    
    if (newZoom !== currentZoom) {
      setOffset({
        x: currentOffset.x * (newZoom / currentZoom),
        y: currentOffset.y * (newZoom / currentZoom)
      });
      setZoom(newZoom);
    }
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (e.buttons === 1) {
      const dx = Math.abs(e.clientX - dragStartPos.x);
      const dy = Math.abs(e.clientY - dragStartPos.y);
      
      if (dx > 5 || dy > 5) {
        if (!isDragging) setIsDragging(true);
        setOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentZoom = zoomRef.current;
      const currentOffset = offsetRef.current;
      
      // Increase step for zoom out (deltaY > 0)
      const delta = e.deltaY > 0 ? -4 : 2;
      
      const newZoom = Math.min(Math.max(currentZoom + delta, 1), 30);
      if (newZoom !== currentZoom) {
        setOffset({
          x: currentOffset.x * (newZoom / currentZoom),
          y: currentOffset.y * (newZoom / currentZoom)
        });
        setZoom(newZoom);
      }
    };

    main.addEventListener('wheel', handleWheel, { passive: false });
    return () => main.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePinClick = (pin: Pin) => {
    if (pin.level === 1) {
      setPendingStateId(pin.id);
      const pos = projection([pin.lng, pin.lat]);
      if (!pos) return;

      // 1. Zoom into the state on the Brazil map
      const targetZoom = 6;
      const targetOffset = {
        x: -(pos[0] - 400) * targetZoom,
        y: -(pos[1] - 400) * targetZoom
      };

      setZoom(targetZoom);
      setOffset(targetOffset);

      // 2. Start the swap halfway through the zoom
      setTimeout(() => {
        setSelectedStateId(pin.id);
      }, 400);

      // 3. Reset the camera once the Brazil map is mostly faded and the swap has started
      setTimeout(() => {
        setPendingStateId(null);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      }, 700);
      return;
    }

    const pos = projection([pin.lng, pin.lat]);
    if (!pos) return;

    // Determine target zoom based on level
    const targetZoom = 8;
    
    // Calculate offset to center the pin
    const targetOffset = {
      x: -(pos[0] - 400) * targetZoom,
      y: -(pos[1] - 400) * targetZoom
    };

    setZoom(targetZoom);
    setOffset(targetOffset);

    if (pin.isReal) {
      setSelectedPin(pin);
    } else {
      setSelectedPin(null);
      setTimeout(() => {
        alert(`Content under construction: Only "Pedra do Sal", "Pelourinho", and "MASP" are available in the demo.`);
      }, 500);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return PINS.filter(pin => 
      pin.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSelectSearchResult = (pin: Pin) => {
    if (pin.level === 1) {
      setSelectedStateId(pin.id);
      resetView();
    } else if (pin.stateId) {
      setSelectedStateId(pin.stateId);
      // We need to wait for the projection to update before clicking the pin
      setTimeout(() => {
        handlePinClick(pin);
      }, 100);
    }
  };

  const activeProfile = useMemo(() => {
    if (!selectedPin) return null;
    if (selectedPin.id === 'pedra-do-sal') return PEDRA_DO_SAL_PROFILE;
    if (selectedPin.id === 'pelourinho') return PELOURINHO_PROFILE;
    if (selectedPin.id === 'masp') return MASP_PROFILE;
    if (selectedPin.id === 'city-rj') return RIO_PROFILE;
    if (selectedPin.id === 'city-sp') return SP_PROFILE;
    if (selectedPin.id === 'city-salvador') return SALVADOR_PROFILE;
    if (selectedPin.id === 'city-manaus') return MANAUS_PROFILE;
    if (selectedPin.id === 'city-bh') return BH_PROFILE;
    return null;
  }, [selectedPin]);

  return (
    <div className="h-screen w-screen bg-[#FAF9F2] overflow-hidden font-sans text-black selection:bg-[#009B3A] selection:text-white">
      <Header 
        onSearch={setSearchQuery} 
        breadcrumb={breadcrumb}
        searchResults={searchResults}
        onSelectResult={handleSelectSearchResult}
      />

      <main 
        ref={mainRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[#FAF9F2]"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            x: offset.x,
            y: offset.y,
            scale: zoom
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut"
          }}
        >
          <div className="relative w-[800px] h-[800px]">
            {/* Real Brazil Map */}
            <AnimatePresence>
              <motion.svg 
                key={selectedStateId || 'brazil'}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedStateId ? 1 : (zoom > 1 ? Math.max(0, 1 - (zoom - 1) / 2.5) : 1),
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} 
                className="absolute inset-0 w-full h-full overflow-visible"
              >
                <g className={cn(
                  "stroke-black/20 stroke-[1] transition-colors duration-700",
                  selectedStateId ? "fill-white/50" : "fill-[#E8E6D1]"
                )}>
                  {currentGeoData && currentGeoData.features.map((feature: any, i: number) => {
                    const statePin = PINS.find(p => p.level === 1 && (feature.properties.name === p.name || feature.properties.sigla === p.name));
                    const stateName = PINS.find(p => p.id === pendingStateId)?.name;
                    const isTarget = pendingStateId && (feature.properties.name === stateName || feature.properties.sigla === stateName);
                    const opacity = (pendingStateId && !isTarget) ? Math.max(0, 1 - (zoom - 1) / 1.2) : 1;
                    const blur = (pendingStateId && !isTarget) ? Math.min(4, (zoom - 1) * 2) : 0;
                    
                    const isHovered = statePin && hoveredStateId === statePin.id;
                    const isSelected = statePin && selectedStateId === statePin.id;

                    return (
                      <path 
                        key={i} 
                        d={pathGenerator(feature) || ''} 
                        style={{ 
                          opacity, 
                          filter: `blur(${blur}px)`,
                          fill: (isHovered && !selectedStateId) ? '#009B3A' : (isSelected ? '#009B3A' : undefined)
                        }}
                        className={cn(
                          "transition-all duration-500 cursor-default",
                          !selectedStateId && statePin ? "hover:fill-[#009B3A] cursor-pointer" : ""
                        )}
                        onMouseEnter={() => !selectedStateId && statePin && setHoveredStateId(statePin.id)}
                        onMouseLeave={() => setHoveredStateId(null)}
                        onClick={() => !selectedStateId && statePin && handlePinClick(statePin)}
                      />
                    );
                  })}
                </g>
                <text x="400" y="400" className="fill-black/[0.03] font-bold text-9xl pointer-events-none select-none" textAnchor="middle">
                  {selectedStateId ? PINS.find(p => p.id === selectedStateId)?.name.toUpperCase() : 'BRAZIL'}
                </text>
              </motion.svg>
            </AnimatePresence>

            {/* Pins Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full pointer-events-none">
                <AnimatePresence>
                  {filteredPins.map(pin => {
                    const pinOpacity = pendingStateId ? Math.max(0, 1 - (zoom - 1) / 2.5) : 1;
                    
                    return (
                      <MapPin 
                        key={pin.id} 
                        pin={pin} 
                        zoomLevel={zoom}
                        projection={projection}
                        onClick={() => handlePinClick(pin)}
                        opacity={pinOpacity}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zoom Controls */}
        <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-3 items-start">
          <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-1 flex flex-col">
            <button 
              onClick={() => handleZoom(3)}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/5 rounded-xl transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="h-px bg-black/5 mx-2" />
            <button 
              onClick={() => handleZoom(-6)}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/5 rounded-xl transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={resetView}
              className="bg-white w-11 h-11 flex items-center justify-center rounded-2xl shadow-xl border border-black/5 hover:bg-black/5 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {selectedStateId && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelectedStateId(null);
                  setSelectedPin(null);
                  resetView();
                }}
                className="bg-[#002776] text-[#E6F0FF] px-4 h-11 rounded-2xl shadow-xl flex items-center gap-2 hover:bg-[#011c52] transition-colors border border-[#002776]/10"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Back to Brasil</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="fixed bottom-8 right-8 z-40 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-black/5 shadow-xl hidden md:block">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#009B3A]/60 mb-3">Legend</p>
          <div className="space-y-2">
            {[
              { color: 'bg-[#FFCC00]', label: 'Culture' },
              { color: 'bg-[#009B3A]', label: 'Nature' },
              { color: 'bg-[#FF6B00]', label: 'Gastronomy' },
              { color: 'bg-[#002776]', label: 'History' }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", item.color)} />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State Hover Label */}
        <AnimatePresence>
          {hoveredStateId && !selectedStateId && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed pointer-events-none z-50 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-black/5 text-xs font-bold text-[#009B3A] flex items-center gap-2"
              style={{ left: mousePos.x + 20, top: mousePos.y - 20 }}
            >
              <MapIcon className="w-3 h-3" />
              {PINS.find(p => p.id === hoveredStateId)?.name}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Profile Modal */}
      <AnimatePresence>
        {activeProfile && (
          <ProfileModal 
            profile={activeProfile} 
            onClose={() => setSelectedPin(null)} 
          />
        )}
      </AnimatePresence>

      {/* Landing Overlay */}
      {zoom === 1 && !selectedPin && !selectedStateId && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="text-center space-y-4 max-w-md px-6">
            <motion.h2 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-5xl font-bold tracking-tighter text-[#009B3A]"
            >
              Brasil com S
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[#009B3A]/60 font-medium"
            >
              Select a state to explore its local culture, history and nature.
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
