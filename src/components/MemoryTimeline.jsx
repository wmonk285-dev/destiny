import React, { useState } from 'react';
import { Sparkles, Moon, Heart, Compass, Stars, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Moon: Moon,
  Heart: Heart,
  Compass: Compass,
  Stars: Stars,
};

export default function MemoryTimeline({ timeline }) {
  const [activeStep, setActiveStep] = useState(0);

  const current = timeline[activeStep] || timeline[0];
  const IconComponent = iconMap[current.icon] || Sparkles;

  return (
    <section id="timeline" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(192, 132, 252, 0.12)',
            border: '1px solid rgba(192, 132, 252, 0.3)',
            color: '#d8b4fe',
            fontSize: '0.88rem',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          <Stars size={15} />
          <span>Our Constellation Storybook</span>
        </div>

        <h2 className="font-serif gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '16px' }}>
          Chapters of You & Me
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Step through the journey that brought us here, and the dreams waiting for us ahead.
        </p>
      </div>

      {/* Interactive Constellation Stepper Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '42px',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {timeline.map((item, idx) => {
          const isActive = idx === activeStep;
          const StepIcon = iconMap[item.icon] || Sparkles;
          return (
            <button
              key={item.id}
              onClick={() => setActiveStep(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '9999px',
                backgroundColor: isActive ? 'rgba(251, 113, 133, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1px solid #fb7185' : '1px solid rgba(255, 255, 255, 0.12)',
                color: isActive ? '#fda4af' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 20px rgba(251, 113, 133, 0.35)' : 'none',
              }}
            >
              <StepIcon size={16} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{item.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Active Story Card Display */}
      <div
        className="glass-panel"
        style={{
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(192, 132, 252, 0.35)',
          background: 'linear-gradient(135deg, rgba(17, 24, 60, 0.8), rgba(9, 13, 34, 0.95))',
        }}
      >
        {/* Glow ambient background spot */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251, 113, 133, 0.25) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', color: '#c084fc', fontWeight: 600 }}>
                {current.phase}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#94a3b8' }}>
                <Calendar size={13} /> {current.date}
              </span>
            </div>
            <h3 className="font-serif gradient-text" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 700 }}>
              {current.title}
            </h3>
          </div>

          <div
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'rgba(251, 113, 133, 0.1)',
              border: '1px solid rgba(251, 113, 133, 0.3)',
              color: '#fda4af',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
          >
            {current.highlight}
          </div>
        </div>

        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: '#e2e8f0',
            marginBottom: '36px',
            maxWidth: '900px',
          }}
        >
          {current.description}
        </p>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px' }}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="btn-secondary"
            style={{
              padding: '10px 20px',
              opacity: activeStep === 0 ? 0.4 : 1,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous Chapter</span>
          </button>

          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            {activeStep + 1} of {timeline.length}
          </span>

          <button
            onClick={() => setActiveStep((prev) => Math.min(timeline.length - 1, prev + 1))}
            disabled={activeStep === timeline.length - 1}
            className="btn-primary"
            style={{
              padding: '10px 22px',
              opacity: activeStep === timeline.length - 1 ? 0.4 : 1,
              cursor: activeStep === timeline.length - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            <span>Next Chapter</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
