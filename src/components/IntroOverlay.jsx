import React, { useState } from 'react';
import { Heart, Sparkles, Music, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IntroOverlay({ onEnter }) {
  const [isFading, setIsFading] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    // Trigger celebratory stardust confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#c084fc', '#fde047', '#ffffff']
    });

    setIsFading(true);
    setTimeout(() => {
      setHasEntered(true);
      onEnter();
    }, 900);
  };

  if (hasEntered) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#040612',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.22) 0%, rgba(147, 51, 234, 0.15) 45%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '540px' }}>
        {/* Beating Heart Icon */}
        <div
          className="animate-heartbeat"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(251, 113, 133, 0.15)',
            border: '1px solid rgba(251, 113, 133, 0.4)',
            boxShadow: '0 0 35px rgba(251, 113, 133, 0.4)',
            marginBottom: '28px',
          }}
        >
          <Heart size={38} color="#fb7185" fill="#fb7185" />
        </div>

        <p
          style={{
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#fda4af',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          A Little Corner of the Universe
        </p>

        <h1
          className="font-serif gradient-text"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '20px',
            textShadow: '0 0 25px rgba(251, 113, 133, 0.3)',
          }}
        >
          I Made This For You, <br />Because I Miss You
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#cbd5e1',
            marginBottom: '36px',
            fontWeight: 300,
          }}
        >
          Put on your headphones or turn up your volume. <br />
          Under the exact same night sky, here are our cherished moments.
        </p>

        <button
          onClick={handleEnter}
          className="btn-primary"
          style={{
            fontSize: '1.1rem',
            padding: '16px 36px',
            boxShadow: '0 0 30px rgba(251, 113, 133, 0.5)',
          }}
        >
          <Sparkles size={20} />
          <span>Enter Our Starry Sky</span>
          <Music size={18} style={{ opacity: 0.85 }} />
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
            color: '#94a3b8',
            fontSize: '0.82rem',
          }}
        >
          <Star size={13} fill="#fde047" color="#fde047" />
          <span>Best experienced with sound enabled</span>
          <Star size={13} fill="#fde047" color="#fde047" />
        </div>
      </div>
    </div>
  );
}
