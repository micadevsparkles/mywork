import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectContainer from './components/ProjectContainer';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();

  // Animação da Logo: Diminui e sobe conforme o scroll
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [3, 0.8]);
  const logoY = useTransform(scrollYProgress, [0, 0.2], ["45vh", "20px"]);

  return (
    <div className="app-container">
      {/* Logo Fixa que reage ao Scroll */}
      <motion.div 
        style={{ 
          position: 'fixed', 
          left: '50%', 
          x: '-50%', 
          scale: logoScale, 
          y: logoY, 
          zIndex: 100 
        }}
      >
        <img src="assets/images/decorative/logo.png" alt="Logo" style={{ width: '100px' }} />
      </motion.div>

      {/* Seção Hero - Página 2 */}
      <section className="hero-section" style={{ backgroundColor: '#000639', minHeight: '100vh' }}>
        <motion.div 
          className="profile-photo"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="assets/images/decorative/profile.png" alt="Micael Silva" />
        </motion.div>
        
        {/* Títulos em 45 graus com Slide Left In */}
        <div className="hero-titles">
          <motion.h2 initial={{ x: 300, rotate: 45 }} whileInView={{ x: 0 }}>Technical Problem Solver</motion.h2>
          <motion.h2 initial={{ x: 300, rotate: 0 }} whileInView={{ x: 0 }}>Product-Minded Integrator</motion.h2>
          <motion.h2 initial={{ x: 300, rotate: -45 }} whileInView={{ x: 0 }}>AI-Driven Developer</motion.h2>
        </div>
      </section>

      {/* Containers de Projetos (Páginas 4 e 5) */}
      <ProjectContainer 
        title={<span><strong>Lights</strong>Blocker</span>}
        textPath="assets/texts/lightsblocker.txt"
        imagePath="assets/images/content/lightsblocker_main.png"
      />
      
      <ProjectContainer 
        isJeans={true}
        title="Mundo do Jeans"
        textPath="assets/texts/mundodojeans.txt"
        imagePath="assets/images/content/mundodojeans_main.png"
      />

      <Footer />
    </div>
  );
}

export default App;
