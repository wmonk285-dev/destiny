import React, { useState } from 'react';
import { RotateCw, Maximize2, Heart, X, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function PolaroidGallery({ polaroids, onUpdatePolaroid }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [zoomPhoto, setZoomPhoto] = useState(null);

  const toggleFlip = (id, e) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePolaroid) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdatePolaroid(id, { image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(251, 113, 133, 0.12)',
            border: '1px solid rgba(251, 113, 133, 0.3)',
            color: '#fda4af',
            fontSize: '0.88rem',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={15} />
          <span>Tap any card to flip & read secret notes</span>
        </div>

        <h2
          className="font-serif gradient-text"
          style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '16px' }}
        >
          Moments Frozen in Time
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Every photograph holds a heartbeat of a memory I keep coming back to.
        </p>
      </div>

      {/* Grid of Polaroid Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px 28px',
          justifyContent: 'center',
        }}
      >
        {polaroids.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          return (
            <div
              key={card.id}
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              style={{
                height: '430px',
                transform: `rotate(${card.rotation || 0}deg)`,
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(1.03) rotate(0deg) translateY(-6px)`;
                e.currentTarget.style.zIndex = '20';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${card.rotation || 0}deg)`;
                e.currentTarget.style.zIndex = '1';
              }}
            >
              <div className="flip-card-inner">
                {/* FRONT FACE (Polaroid Photo + Caption) */}
                <div
                  className="flip-card-front polaroid-frame"
                  onClick={(e) => toggleFlip(card.id, e)}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="polaroid-photo-wrapper">
                    <img src={card.image} alt={card.caption} loading="lazy" />

                    {/* Quick action overlay buttons */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        display: 'flex',
                        gap: '6px',
                        zIndex: 5,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomPhoto(card);
                        }}
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(4px)',
                        }}
                        title="View Fullscreen"
                      >
                        <Maximize2 size={15} />
                      </button>

                      <label
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(4px)',
                        }}
                        title="Replace this photo"
                      >
                        <ImageIcon size={15} />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(card.id, e)}
                        />
                      </label>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        background: 'rgba(0, 0, 0, 0.55)',
                        color: '#f8fafc',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <RotateCw size={11} color="#fda4af" />
                      <span>Click to flip</span>
                    </div>
                  </div>

                  {/* Polaroid handwritten caption */}
                  <div style={{ marginTop: '16px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p
                      className="font-handwriting"
                      style={{
                        fontSize: '1.45rem',
                        color: '#1e293b',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        marginBottom: '4px',
                      }}
                    >
                      {card.caption}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.04em' }}>
                      {card.date}
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Handwritten Love Note) */}
                <div
                  className="flip-card-back polaroid-frame"
                  onClick={(e) => toggleFlip(card.id, e)}
                  style={{
                    cursor: 'pointer',
                    background: '#fefcf8',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px 20px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                        Secret Note 💌
                      </span>
                      <Heart size={16} color="#fb7185" fill="#fb7185" />
                    </div>

                    <p
                      className="font-handwriting"
                      style={{
                        fontSize: '1.4rem',
                        lineHeight: 1.5,
                        color: '#1e293b',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      "{card.backNote}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      — Forever Yours
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#fb7185' }}>
                      <RotateCw size={12} /> Flip back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomPhoto && (
        <div
          onClick={() => setZoomPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              backgroundColor: '#0a0d24',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(251, 113, 133, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
            }}
          >
            <button
              onClick={() => setZoomPhoto(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.65)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            <img
              src={zoomPhoto.image}
              alt={zoomPhoto.caption}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', backgroundColor: '#000' }}
            />

            <div style={{ padding: '24px 28px', background: 'linear-gradient(to top, #090c20, #111538)' }}>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fda4af', marginBottom: '6px' }}>
                {zoomPhoto.caption}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '12px' }}>
                {zoomPhoto.date}
              </p>
              <p className="font-handwriting" style={{ fontSize: '1.35rem', color: '#f8fafc', lineHeight: 1.4 }}>
                "{zoomPhoto.backNote}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
