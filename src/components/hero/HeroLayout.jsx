"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero3DScene from './Hero3DScene';

export default function HeroLayout({ title, description, primaryCta, secondaryCta, SceneComponent }) {
  // We apply pointer-events: none to the wrapper so it doesn't block scrolling, 
  // but we re-enable it for the content area and canvas where needed.
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '90vh',
      minHeight: '600px',
      backgroundColor: '#050505',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%'
    }}>
      {/* 3D Background Scene */}
      <Hero3DScene>
         {SceneComponent && <SceneComponent />}
      </Hero3DScene>

      {/* UI Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '650px',
        pointerEvents: 'auto' // Allow clicking buttons
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: 'clamp(3rem, 5vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-2px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ffffff, #aaaaaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: '1.25rem',
            color: '#cccccc',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '550px'
          }}
        >
          {description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
        >
          <a href="#" style={{
            background: '#FF6B00',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: '1px solid #FF6B00',
            boxShadow: '0 10px 30px rgba(255, 107, 0, 0.3)',
            display: 'inline-block'
          }}>{primaryCta}</a>
          
          <a href="#" style={{
            background: 'transparent',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'inline-block'
          }}>{secondaryCta}</a>
        </motion.div>
      </div>
    </section>
  );
}
