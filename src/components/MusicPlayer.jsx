import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Upload, Sparkles } from 'lucide-react';

export default function MusicPlayer({ isAutoPlayRequested, onFirstInteraction }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const [trackName, setTrackName] = useState('Ethereal Memories (Ambient Lofi)');
  const [isUsingCustomAudio, setIsUsingCustomAudio] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const webAudioCtxRef = useRef(null);
  const isPlayingSynthRef = useRef(false);
  const synthTimerRef = useRef(null);

  // Fallback romantic melody synthesizer using Web Audio API
  const initWebAudioSynth = () => {
    if (!webAudioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        webAudioCtxRef.current = new AudioCtx();
      }
    }
  };

  const playChimeNote = (freq, duration, delay = 0, gainLevel = 0.08) => {
    if (!webAudioCtxRef.current || !isPlayingSynthRef.current) return;
    const ctx = webAudioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm, bell-like sine + subtle triangle
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    const targetGain = isMuted ? 0 : volume * gainLevel;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(targetGain, ctx.currentTime + delay + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.1);
  };

  const runRomanticSequence = () => {
    if (!isPlayingSynthRef.current) return;
    // Romantic chords (C minor 9 / Ab major 7 / Eb major / Bb)
    const chords = [
      [261.63, 311.13, 392.00, 466.16, 587.33], // Cm9
      [207.65, 261.63, 311.13, 392.00, 523.25], // AbMaj7
      [155.56, 233.08, 311.13, 392.00, 466.16], // Eb
      [233.08, 293.66, 349.23, 440.00, 523.25], // Bb
    ];

    let step = 0;
    const loopInterval = () => {
      if (!isPlayingSynthRef.current) return;
      const currentChord = chords[step % chords.length];
      step++;

      currentChord.forEach((note, index) => {
        playChimeNote(note, 3.5, index * 0.35, 0.06);
      });

      // Occasional gentle sparkle melody note
      const melodyNotes = [523.25, 587.33, 622.25, 698.46, 783.99];
      const randomNote = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
      playChimeNote(randomNote, 2.2, 1.8, 0.07);

      synthTimerRef.current = setTimeout(loopInterval, 4200);
    };

    loopInterval();
  };

  const startSynth = () => {
    initWebAudioSynth();
    isPlayingSynthRef.current = true;
    runRomanticSequence();
  };

  const stopSynth = () => {
    isPlayingSynthRef.current = false;
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
    }
  };

  // Toggle playback
  const togglePlay = () => {
    if (onFirstInteraction) onFirstInteraction();

    if (isPlaying) {
      if (isUsingCustomAudio && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopSynth();
      }
      setIsPlaying(false);
    } else {
      if (isUsingCustomAudio && audioRef.current) {
        audioRef.current.play().catch(() => {});
      } else {
        startSynth();
      }
      setIsPlaying(true);
    }
  };

  // Trigger auto play after user enters
  useEffect(() => {
    if (isAutoPlayRequested && !isPlaying) {
      togglePlay();
    }
  }, [isAutoPlayRequested]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Custom audio upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      stopSynth();
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setTrackName(file.name.replace(/\.[^/.]+$/, ''));
      setIsUsingCustomAudio(true);
      setShowUploader(false);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 100);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
      {/* Hidden audio element for MP3 */}
      <audio
        ref={audioRef}
        loop
        onEnded={() => {}}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <div
        className="glass-panel"
        style={{
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          borderRadius: '9999px',
          border: '1px solid rgba(251, 113, 133, 0.3)',
          backdropFilter: 'blur(20px)',
          background: 'rgba(10, 14, 34, 0.85)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 113, 133, 0.25)',
        }}
      >
        {/* Animated Vinyl Icon */}
        <div
          onClick={togglePlay}
          className={isPlaying ? 'animate-spin-slow' : ''}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fda4af 15%, #1e1b4b 55%, #090a16 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid rgba(251, 113, 133, 0.5)',
            boxShadow: isPlaying ? '0 0 15px rgba(251, 113, 133, 0.6)' : 'none',
            transition: 'box-shadow 0.3s ease',
            flexShrink: 0,
          }}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause size={18} color="#fff" />
          ) : (
            <Play size={18} color="#fff" style={{ marginLeft: '2px' }} />
          )}
        </div>

        {/* Track Info & Visualizer */}
        <div style={{ maxWidth: '160px', overflow: 'hidden' }}>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: '#f8fafc',
            }}
          >
            {trackName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
            {/* Visualizer bars */}
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '10px' }}>
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  style={{
                    width: '3px',
                    height: isPlaying ? `${Math.floor(Math.random() * 8 + 3)}px` : '3px',
                    backgroundColor: '#fda4af',
                    borderRadius: '2px',
                    transition: 'height 0.2s ease',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
              {isPlaying ? 'Playing for you' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Volume & Custom Audio Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isMuted ? '#94a3b8' : '#fda4af',
              cursor: 'pointer',
              display: 'flex',
              padding: '4px',
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            style={{
              width: '50px',
              height: '4px',
              accentColor: '#fb7185',
              cursor: 'pointer',
            }}
            title="Volume"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e2e8f0',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            title="Upload custom song (.mp3 / audio)"
          >
            <Upload size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
