
import React, { useState, useEffect } from 'react';
import Header, { roadmapSubItems, SectionId, NavItem } from './components/Header';
import Hero from './components/Hero';
import StudySection from './components/StudySection';
import RelaxSection from './components/RelaxSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'study' | 'relax' | 'contact' | 'roadmap' | 'pomodoro' | 'reminders' | 'progress' | 'flashcards' | 'none'>('home');

  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Always show onboarding on load
    setShowOnboarding(true);
  }, []);





  const handleReset = () => {
    setUserData(null);
    setShowOnboarding(true);
    setActiveSection('home');
  };

  const handleOnboardingComplete = (name: string) => {
    const data = { name }; // Email is no longer required
    setUserData(data);
    setShowOnboarding(false);
  };

  const handleRelaxTransition = () => {
    setActiveSection('relax');
    setTimeout(() => {
      document.getElementById('relax-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 text-slate-800">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 

        onReset={handleReset}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="flex-grow container mx-auto px-4 py-4 md:py-8">
        {activeSection === 'home' && <Hero onStart={() => setActiveSection('roadmap')} />}
        {['study', 'roadmap', 'pomodoro', 'reminders', 'progress', 'flashcards'].includes(activeSection) && (
          <StudySection 
            onRelaxClick={handleRelaxTransition} 
            userName={userData?.name || ''} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            roadmapSubItems={roadmapSubItems}
          />
        )}
        {activeSection === 'relax' && <RelaxSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default App;
