import React, { useState } from 'react';
import { Mail, Heart, X, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetterModal({ letter, partnerName }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#fb7185', '#fda4af', '#fef08a'],
    });
  };

  return (
    <section id="letter" style={{ padding: '60px 24px 100px 24px', maxWidth: '850px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <div
        className="glass-panel"
        style={{
          padding: '48px 32px',
          border: '1px solid rgba(251, 113, 133, 0.35)',
          background: 'linear-gradient(135deg, rgba(28, 22, 60, 0.75), rgba(12, 16, 42, 0.9))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(251, 113, 133, 0.2)',
          position: 'relative',
        }}
      >
        <div
          className="animate-float"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
            boxShadow: '0 0 25px rgba(251, 113, 133, 0.5)',
            marginBottom: '24px',
          }}
        >
          <Mail size={32} color="#fff" />
        </div>

        <h2 className="font-serif gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 700, marginBottom: '14px' }}>
          A Sealed Letter For {partnerName || 'You'}
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 32px auto' }}>
          When words aren't enough to describe how much I miss you, I poured everything into this letter.
        </p>

        <button
          onClick={handleOpen}
          className="btn-primary"
          style={{ fontSize: '1.05rem', padding: '14px 34px' }}
        >
          <Sparkles size={18} />
          <span>Break the Wax Seal & Read</span>
          <Heart size={16} fill="#fff" />
        </button>
      </div>

      {/* Love Letter Popup Dialog */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 7, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              backgroundColor: '#fffcf7',
              color: '#1e293b',
              padding: '44px 38px',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(220, 180, 140, 0.25)',
              border: '8px solid #f8f1e5',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b',
              }}
            >
              <X size={18} />
            </button>

            {/* Wax Seal Aesthetic header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '44px',
                  height: '44px',
                  lineHeight: '44px',
                  borderRadius: '50%',
                  background: '#991b1b',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(153, 27, 27, 0.4)',
                  fontSize: '18px',
                  marginBottom: '10px',
                }}
              >
                💌
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#881337', marginBottom: '4px' }}>
                {letter.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#78716c', letterSpacing: '0.05em' }}>
                {letter.date}
              </p>
            </div>

            <div
              className="font-handwriting"
              style={{
                fontSize: '1.5rem',
                lineHeight: 1.6,
                color: '#292524',
                whiteSpace: 'pre-line',
                textAlign: 'left',
                marginBottom: '32px',
              }}
            >
              {letter.content}
            </div>

            <div style={{ textAlign: 'right', borderTop: '1px dashed #d6d3d1', paddingTop: '18px' }}>
              <p className="font-handwriting" style={{ fontSize: '1.4rem', color: '#991b1b', fontWeight: 600 }}>
                {letter.signoff}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#78716c', marginTop: '4px' }}>
                Under the very same sky ✨
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
