import React, { useState, useEffect, useRef } from 'react';
import StarryBackground from './components/StarryBackground';
import { ChevronDown, Heart, Volume2, VolumeX, RotateCw, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

// All her media items from public/photos (photos + may.mp4 snap)
const mediaItems = [
  {
    type: 'image',
    src: encodeURI('/photos/WhatsApp Image 2026-07-27 at 22.13.30.jpeg'),
  },
  {
    type: 'video',
    src: encodeURI('/photos/may.mp4'),
  },
  {
    type: 'image',
    src: encodeURI('/photos/WhatsApp Image 2026-07-27 at 22.13.30 (1).jpeg'),
  },
  {
    type: 'image',
    src: encodeURI('/photos/WhatsApp Image 2026-07-27 at 22.13.30 (2).jpeg'),
  },
  {
    type: 'image',
    src: encodeURI('/photos/WhatsApp Image 2026-07-27 at 22.13.31.jpeg'),
  },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [promptAnswered, setPromptAnswered] = useState(false);
  const [videoRotation, setVideoRotation] = useState(-90); // Default -90deg makes it horizontal
  const [wished, setWished] = useState(false);

  const audioRef = useRef(null);

  // Parallax scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When she says HAAN ❤️
  const handleHaan = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#fda4af', '#fde047', '#ffffff', '#c084fc'],
    });

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((e) => {
          console.log('Audio error:', e);
        });
    }

    setPromptAnswered(true);
    setTimeout(() => {
      setShowPrompt(false);
    }, 600);
  };

  // When she says NAHI 🙈
  const handleNahi = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsMusicPlaying(false);
    setPromptAnswered(true);
    setShowPrompt(false);
  };

  // Toggle music manually if needed
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {});
    }
  };

  // Trigger confetti when she clicks final wish button
  const handleSendLove = () => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#fb7185', '#fde047', '#c084fc', '#ffffff'],
    });
    setWished(true);
    setTimeout(() => setWished(false), 4000);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#03050e',
        overflow: 'hidden',
      }}
    >
      {/* Background Music: yaad.mp3 */}
      <audio ref={audioRef} src="/music/yaad.mp3" loop preload="auto" />

      {/* Subtle Starry Particle Overlay */}
      <StarryBackground />

      {/* Discreet Audio Indicator button if she wants to pause/resume */}
      {promptAnswered && (
        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 90,
            background: 'rgba(10, 14, 34, 0.8)',
            border: '1px solid rgba(251, 113, 133, 0.4)',
            backdropFilter: 'blur(12px)',
            color: isMusicPlaying ? '#fda4af' : '#94a3b8',
            borderRadius: '9999px',
            padding: '9px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.25s ease',
          }}
          title={isMusicPlaying ? 'Pause yaad.mp3' : 'Play yaad.mp3'}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 size={15} />
              <span style={{ fontWeight: 500 }}>Yaad 🎵</span>
            </>
          ) : (
            <>
              <VolumeX size={15} />
              <span>Music Off</span>
            </>
          )}
        </button>
      )}

      {/* Romantic "Hmaari Shaadi Hogi Ya Nhi?" Modal Prompt */}
      {showPrompt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(2, 4, 12, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '440px',
              width: '100%',
              backgroundColor: 'rgba(12, 16, 40, 0.95)',
              borderRadius: '24px',
              border: '1px solid rgba(251, 113, 133, 0.45)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(251, 113, 133, 0.25)',
              padding: '38px 28px',
              textAlign: 'center',
            }}
          >
            {/* Pulsing Ring Icon */}
            <div
              className="animate-heartbeat"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(251, 113, 133, 0.15)',
                border: '1px solid rgba(251, 113, 133, 0.4)',
                boxShadow: '0 0 30px rgba(251, 113, 133, 0.4)',
                marginBottom: '20px',
                fontSize: '30px',
              }}
            >
              💍
            </div>

            <p
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#fda4af',
                marginBottom: '10px',
                fontWeight: 600,
              }}
            >
              Ek Sach Sach Jawaab Do... ✨
            </p>

            <h2
              className="font-serif gradient-text"
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '12px',
                textShadow: '0 0 25px rgba(251, 113, 133, 0.35)',
              }}
            >
              Hmaari shaadi hogi ya nhi? ❤️
            </h2>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#cbd5e1',
                marginBottom: '28px',
                lineHeight: 1.5,
                fontWeight: 300,
              }}
            >
              (Sach bolna, tabhi humara gaana chalega... 🎶)
            </p>

            {/* Answer Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                onClick={handleHaan}
                className="btn-primary"
                style={{
                  padding: '13px 32px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 30px rgba(251, 113, 133, 0.6)',
                  cursor: 'pointer',
                }}
              >
                <Heart size={16} fill="#fff" />
                <span>Haan ❤️</span>
              </button>

              <button
                onClick={handleNahi}
                className="btn-secondary"
                style={{
                  padding: '13px 26px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>Naah 🙈</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Parallax Sections (Photos & Video) */}
      {mediaItems.map((item, index) => {
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        const sectionOffset = index * windowHeight;
        const relativeScroll = scrollY - sectionOffset;

        // Smooth subtle parallax offset
        const parallaxTranslateY = relativeScroll * 0.22;

        return (
          <section
            key={index}
            className="parallax-section"
            id={`section-${index}`}
          >
            {item.type === 'video' ? (
              // Horizontal Video Container for may.mp4
              <div className="horizontal-video-container">
                {/* Ambient Blurred Video Background so there is zero empty black space */}
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="video-ambient-bg"
                />

                {/* Rotated Horizontal Video (Upright orientation) */}
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rotated-horizontal-video"
                  style={{
                    transform: `rotate(${videoRotation}deg)`,
                  }}
                />

                {/* Subtle orientation toggle button */}
                <button
                  onClick={() => setVideoRotation((r) => (r === -90 ? 90 : r === 90 ? 0 : -90))}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 20,
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Rotate video orientation"
                >
                  <RotateCw size={14} />
                </button>
              </div>
            ) : (
              // Full-Bleed Photo - Fills entire mobile screen with 0 black borders!
              <img
                src={item.src}
                alt={`Photo ${index + 1}`}
                className="fullscreen-photo"
                style={{
                  transform: `translate3d(0, ${parallaxTranslateY}px, 0)`,
                }}
                loading="eager"
              />
            )}

            {/* Subtle Cinematic Vignette */}
            <div className="cinematic-vignette" />

            {/* Scroll Hint on First Image */}
            {index === 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                }}
              >
                <span>Scroll</span>
                <ChevronDown size={18} className="animate-float" />
              </div>
            )}
          </section>
        );
      })}

      {/* FINAL PAGE SCROLL: Beautiful Journey & Success Message */}
      <section
        className="parallax-section"
        id="final-message"
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at center, rgba(30, 20, 60, 0.6) 0%, #03050e 80%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div className="final-card">
          {/* Beating Heart Icon */}
          <div
            className="animate-heartbeat"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.25), rgba(192, 132, 252, 0.25))',
              border: '1px solid rgba(251, 113, 133, 0.5)',
              boxShadow: '0 0 30px rgba(251, 113, 133, 0.35)',
              marginBottom: '22px',
            }}
          >
            <Heart size={32} color="#fb7185" fill="#fb7185" />
          </div>

          <p
            style={{
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#fda4af',
              marginBottom: '10px',
              fontWeight: 600,
            }}
          >
            To The Most Special Person ✨
          </p>

          <h2
            className="font-serif gradient-text"
            style={{
              fontSize: 'clamp(1.9rem, 5.5vw, 2.7rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: '18px',
              textShadow: '0 0 35px rgba(251, 113, 133, 0.35)',
            }}
          >
            Wish You a Great Journey & All The Success Ahead!
          </h2>

          <p
            className="font-handwriting"
            style={{
              fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
              lineHeight: 1.6,
              color: '#f8fafc',
              marginBottom: '20px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            "No matter how far life takes you, I will always be right here cheering for you, believing in you, and missing you every second."
          </p>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#cbd5e1',
              lineHeight: 1.7,
              marginBottom: '32px',
              fontWeight: 300,
            }}
          >
            May your path be filled with endless opportunities, bright smiles, and the highest achievements. You deserve every ounce of happiness in this world.
          </p>

          <button
            onClick={handleSendLove}
            className="btn-primary"
            style={{
              padding: '13px 32px',
              fontSize: '0.95rem',
            }}
          >
            <Sparkles size={16} />
            <span>{wished ? 'Sent with all my heart ❤️' : 'Always By Your Side ✨'}</span>
          </button>

          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Forever & Always • Under The Same Stars 🌌
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
