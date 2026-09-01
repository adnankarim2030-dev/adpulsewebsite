import React from 'react';
import HeroLayout from '../../components/hero/HeroLayout';
import PulseCore from '../../components/hero/PulseCore';

export default function R3FPreviewPage() {
  return (
    <main>
      <HeroLayout 
        title="THE PULSE OF BRANDS"
        description="Where bold ideas, powerful media and creative technology come together to move brands forward."
        primaryCta="LET'S CREATE"
        secondaryCta="EXPLORE OUR WORK"
        SceneComponent={PulseCore}
      />
      <div style={{ height: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <h2>Scroll testing area...</h2>
      </div>
    </main>
  );
}
