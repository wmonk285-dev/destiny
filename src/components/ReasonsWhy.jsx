import React, { useState } from 'react';
import { Star, Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReasonsWhy({ reasons }) {
  const [openedCards, setOpenedCards] = useState({});
  const [favorites, setFavorites] = useState({});

  const handleCardClick = (id, e) => {
    e.stopPropagation();
    if (!openedCards[id]) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#fda4af', '#fde047', '#c084fc'],
      });
    }
    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="reasons" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(253, 224, 71, 0.1)',
            border: '1px solid rgba(253, 224, 71, 0.3)',
            color: '#fef08a',
            fontSize: '0.88rem',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          <MessageCircleHeart size={15} />
          <span>Little whispers across the night</span>
        </div>

        <h2 className="font-serif gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '16px' }}>
          Little Things I Miss About You
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Click on any star card to unlock a memory I cherish deep in my heart.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {reasons.map((item) => {
          const isOpened = openedCards[item.id];
          const isFav = favorites[item.id];
          return (
            <div
              key={item.id}
              onClick={(e) => handleCardClick(item.id, e)}
              className="glass-panel"
              style={{
                padding: '28px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                background: isOpened
                  ? 'linear-gradient(135deg, rgba(25, 20, 52, 0.85), rgba(13, 17, 38, 0.95))'
                  : 'rgba(16, 20, 44, 0.55)',
                borderColor: isOpened ? 'rgba(251, 113, 133, 0.45)' : 'rgba(255, 255, 255, 0.1)',
                transform: isOpened ? 'scale(1.02)' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.starColor || '#fde047',
                    }}
                  >
                    <Star size={18} fill={isOpened ? item.starColor : 'none'} />
                  </div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.25rem',
                      color: isOpened ? '#fda4af' : '#f8fafc',
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: isFav ? '#fb7185' : '#64748b',
                    padding: '4px',
                    transition: 'transform 0.2s ease',
                  }}
                  title={isFav ? 'Favorited' : 'Add favorite'}
                >
                  <Heart size={18} fill={isFav ? '#fb7185' : 'none'} />
                </button>
              </div>

              {isOpened ? (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <p
                    style={{
                      fontSize: '1.02rem',
                      color: '#e2e8f0',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      marginBottom: '12px',
                    }}
                  >
                    "{item.text}"
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Tap to close • Cherished forever ✨
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>
                  <Sparkles size={14} color="#fda4af" />
                  <span>Tap to open this note...</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
