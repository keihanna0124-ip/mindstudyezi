
import React from 'react';
import { Home, Brain, Route, Timer, ListChecks, Trophy, ClipboardCopy, Cloud, Headset, ChevronDown, Power, X, Menu, Atom, Sparkles, EllipsisVertical, Eye, Link, RotateCw } from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  'home': Home,
  'brain': Brain,
  'route': Route,
  'stopwatch': Timer,
  'list-checks': ListChecks,
  'trophy': Trophy,
  'clipboard-copy': ClipboardCopy,
  'cloud': Cloud,
  'headset': Headset,
  'power': Power,
  'x': X,
  'menu': Menu,
  'atom': Atom,
  'sparkles': Sparkles,
  'ellipsis-vertical': EllipsisVertical,
  'eye': Eye,
  'link': Link,
  'rotate-cw': RotateCw,
};

interface HeaderProps {
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
  onReset: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export type SectionId = 'home' | 'study' | 'relax' | 'contact' | 'roadmap' | 'pomodoro' | 'reminders' | 'progress' | 'flashcards' | 'none';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  type: 'main' | 'parent';
  subItems?: NavItem[];
}

const renderNavItems = (
  items: NavItem[],
  activeSection: SectionId,
  handleNavigation: (id: SectionId) => void,
  setActiveSection: (id: SectionId) => void,
  iconMap: { [key: string]: React.ElementType },
  isMobileMenuOpen: boolean,
  level: number = 0
) => {
  return items.map((item) => {
    const isActive = activeSection === item.id;
    const isParent = item.type === 'parent';

    const buttonClasses = `
      px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2
      ${isActive ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-indigo-400'}
      ${isMobileMenuOpen ? 'w-full justify-start' : ''}
      ${isMobileMenuOpen && level > 0 ? 'pl-8' : ''}
      ${isMobileMenuOpen && level > 1 ? 'pl-12' : ''}
      ${!isMobileMenuOpen && window.innerWidth < 768 && level === 0 ? 'hidden' : ''} /* Hide top-level main nav items on mobile when menu is closed */
    `;

    const subMenuClasses = `
      ${isMobileMenuOpen ? 'flex flex-col items-start w-full' : 'md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 mt-2 md:mt-4 bg-white p-4 rounded-2xl shadow-xl flex flex-col gap-2 min-w-[180px]'}
    `;

    return (
      <div key={item.id} className={`relative ${isMobileMenuOpen ? 'w-full' : 'group'}`}>
        <button
          onClick={() => {
            if (isParent) {
              setActiveSection(isActive ? 'none' as SectionId : item.id); // Toggle active state for parent on mobile
            } else {
              handleNavigation(item.id);
            }
          }}
          className={buttonClasses}
        >
          {React.createElement(iconMap[item.icon], { className: "w-4 h-4" })}
          {item.label}
          {isParent && <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isActive && isMobileMenuOpen ? 'rotate-180' : ''}`} />}
        </button>
        {isParent && isActive && (
          <div className={subMenuClasses}>
            {renderNavItems(item.subItems || [], activeSection, handleNavigation, setActiveSection, iconMap, isMobileMenuOpen, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

export const roadmapSubItems: NavItem[] = [
  { id: 'roadmap', label: 'Lộ trình', icon: 'route', type: 'main' },
  { id: 'pomodoro', label: 'Tập trung', icon: 'stopwatch', type: 'main' },
  { id: 'reminders', label: 'Checklist', icon: 'list-checks', type: 'main' },
  { id: 'progress', label: 'Kỷ lục', icon: 'trophy', type: 'main' },
  { id: 'flashcards', label: 'Flashcard', icon: 'clipboard-copy', type: 'main' }
];

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, onReset, isMenuOpen, setIsMenuOpen }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Trang chủ', icon: 'home', type: 'main' },
    { id: 'study', label: 'Cá nhân hóa', icon: 'brain', type: 'parent', subItems: roadmapSubItems},
    { id: 'relax', label: 'Chill', icon: 'cloud', type: 'main' },
    { id: 'contact', label: 'Kết nối', icon: 'headset', type: 'main' },
  ];

  const handleNavigation = (id: SectionId) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass transition-all duration-300 border-b border-white/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveSection('home')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity"></div>
            {/* Minimalist Professional Logo */}
            <div className="relative w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover:rotate-[10deg] transition-all duration-500 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-80"></div>
               {React.createElement(iconMap['atom'], { className: "w-6 h-6 relative z-10 animate-spin-slow" })}
            </div>
          </div>
          <div className="flex flex-col pt-1 overflow-visible">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent leading-none pb-4 overflow-visible">
              MindStudy
            </span>
          </div>
        </div>

        <nav className={`fixed inset-0 bg-slate-50/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:relative md:flex md:flex-row md:items-center md:gap-2 md:bg-slate-100/30 md:p-1.5 md:rounded-full md:backdrop-blur-3xl md:border md:border-white/10 md:shadow-inner transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          {renderNavItems(navItems, activeSection, handleNavigation, setActiveSection, iconMap, isMenuOpen)}

          {isMenuOpen && (
            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 text-slate-500 hover:text-red-400 mt-8"
            >
              <RotateCw className="w-4 h-4" /> Reset
            </button>
          )}


        </nav>

        <button
          onClick={onReset}
          className="hidden md:flex px-5 py-2.5 rounded-full text-xs font-black transition-all items-center gap-2 text-slate-500 hover:text-red-400"
        >
          <RotateCw className="w-4 h-4" /> Reset
        </button>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-slate-500 relative z-50">
          {isMenuOpen ? <X className="w-6 h-6" /> : <EllipsisVertical className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <button onClick={() => setIsMenuOpen(false)} className="md:hidden text-2xl text-slate-500 absolute top-6 right-6 z-50 p-2">
            <X className="w-8 h-8" />
          </button>
        )}
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; } 
        .glass { background-color: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); }
      `}</style>
    </header>
  );
};

export default Header;
