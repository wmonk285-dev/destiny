import React, { useState } from 'react';
import { Settings, X, Plus, Trash2, Save, RotateCcw, Upload, Heart } from 'lucide-react';

export default function CustomizeModal({
  isOpen,
  onClose,
  data,
  onSave,
  onReset
}) {
  const [partnerName, setPartnerName] = useState(data.partnerName);
  const [headline, setHeadline] = useState(data.headline);
  const [subheadline, setSubheadline] = useState(data.subheadline);
  const [letterContent, setLetterContent] = useState(data.loveLetter.content);
  const [polaroids, setPolaroids] = useState(data.polaroids);

  if (!isOpen) return null;

  const handlePolaroidChange = (index, field, value) => {
    const updated = [...polaroids];
    updated[index] = { ...updated[index], [field]: value };
    setPolaroids(updated);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handlePolaroidChange(index, 'image', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPolaroid = () => {
    const newId = Date.now();
    setPolaroids([
      ...polaroids,
      {
        id: newId,
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
        caption: 'A Special Memory ✨',
        date: 'Unforgettable Day',
        backNote: 'I love you so much and I cherish every second with you.',
        rotation: (Math.random() * 6 - 3).toFixed(1),
      },
    ]);
  };

  const handleRemovePolaroid = (index) => {
    if (polaroids.length <= 1) return;
    setPolaroids(polaroids.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    onSave({
      partnerName,
      headline,
      subheadline,
      loveLetter: {
        ...data.loveLetter,
        content: letterContent,
      },
      polaroids,
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(5, 7, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0c102a',
          color: '#f8fafc',
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid rgba(251, 113, 133, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(251, 113, 133, 0.2)', color: '#fb7185' }}>
              <Heart size={20} fill="#fb7185" />
            </div>
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff' }}>
                Personalize Her Website
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Edit names, messages, and upload personal photos anytime.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#cbd5e1',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fda4af', marginBottom: '6px', fontWeight: 600 }}>
              Her Name or Nickname
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.95rem',
              }}
              placeholder="e.g. My Princess, Sarah, Love of my life..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fda4af', marginBottom: '6px', fontWeight: 600 }}>
              Hero Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fda4af', marginBottom: '6px', fontWeight: 600 }}>
              Subheadline / Message
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.92rem',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Photo manager section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.9rem', color: '#fda4af', fontWeight: 600 }}>
                Polaroid Photos & Notes ({polaroids.length})
              </label>
              <button
                type="button"
                onClick={handleAddPolaroid}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Plus size={14} /> Add Card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '280px', overflowY: 'auto', paddingRight: '6px' }}>
              {polaroids.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img src={item.image} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <label
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Replace photo"
                    >
                      <Upload size={14} color="#fff" />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageUpload(idx, e)}
                      />
                    </label>
                  </div>

                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => handlePolaroidChange(idx, 'caption', e.target.value)}
                      placeholder="Front caption..."
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '0.82rem',
                      }}
                    />
                    <input
                      type="text"
                      value={item.backNote}
                      onChange={(e) => handlePolaroidChange(idx, 'backNote', e.target.value)}
                      placeholder="Secret back note..."
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fda4af',
                        fontSize: '0.82rem',
                      }}
                    />
                  </div>

                  <button
                    onClick={() => handleRemovePolaroid(idx)}
                    disabled={polaroids.length <= 1}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: polaroids.length <= 1 ? '#475569' : '#f43f5e',
                      cursor: polaroids.length <= 1 ? 'not-allowed' : 'pointer',
                      padding: '6px',
                    }}
                    title="Delete card"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Letter editor */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fda4af', marginBottom: '6px', fontWeight: 600 }}>
              The Sealed Love Letter
            </label>
            <textarea
              rows={4}
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.92rem',
                lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        {/* Actions footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
          <button
            type="button"
            onClick={onReset}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.85rem', color: '#94a3b8' }}
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '10px 18px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="btn-primary"
              style={{ padding: '10px 24px' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
