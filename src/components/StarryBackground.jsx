import React, { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive stardust
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Stars collection
    let stars = [];
    const starColors = [
      '#ffffff',
      '#e0e7ff',
      '#fecdd3',
      '#fef08a',
      '#ddd6fe'
    ];

    function initStars() {
      stars = [];
      const numStars = Math.floor((width * height) / 3800);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    initStars();

    // Shooting stars (meteors)
    const shootingStars = [];
    function maybeSpawnShootingStar() {
      if (Math.random() < 0.02 && shootingStars.length < 3) {
        const startX = Math.random() * width * 0.9;
        const startY = Math.random() * (height * 0.45);
        const length = Math.random() * 90 + 60;
        const speed = Math.random() * 9 + 7;
        const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 degrees diagonal

        shootingStars.push({
          x: startX,
          y: startY,
          length,
          speed,
          angle,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          opacity: 1,
          decay: Math.random() * 0.015 + 0.015,
        });
      }
    }

    // Floating heart stardust
    const stardust = [];
    const numStardust = 35;
    for (let i = 0; i < numStardust; i++) {
      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.5,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#fda4af' : '#c084fc',
        pulse: Math.random() * Math.PI,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Dark celestial background with subtle nebula glow
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, width, height);

      // Deep atmospheric nebula gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.25,
        height * 0.35,
        100,
        width * 0.25,
        height * 0.35,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(88, 28, 135, 0.18)');
      grad1.addColorStop(0.5, 'rgba(15, 23, 42, 0.05)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75,
        height * 0.65,
        100,
        width * 0.75,
        height * 0.65,
        width * 0.55
      );
      grad2.addColorStop(0, 'rgba(225, 29, 72, 0.12)');
      grad2.addColorStop(0.6, 'rgba(67, 24, 255, 0.04)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Cursor aura glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        );
        mouseGrad.addColorStop(0, 'rgba(251, 113, 133, 0.15)');
        mouseGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.08)');
        mouseGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw twinkle stars
      for (let star of stars) {
        star.phase += star.twinkleSpeed;
        const currentAlpha = Math.max(
          0.1,
          star.baseAlpha + Math.sin(star.phase) * 0.35
        );

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Extra twinkle cross on larger stars
        if (star.radius > 1.3 && currentAlpha > 0.8) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2.2, star.y);
          ctx.lineTo(star.x + star.radius * 2.2, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2.2);
          ctx.lineTo(star.x, star.y + star.radius * 2.2);
          ctx.stroke();
        }
      }

      // Draw and update shooting stars
      maybeSpawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.opacity -= ss.decay;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const ssGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        ssGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        ssGrad.addColorStop(0.2, `rgba(253, 224, 71, ${ss.opacity * 0.8})`);
        ssGrad.addColorStop(0.7, `rgba(251, 113, 133, ${ss.opacity * 0.3})`);
        ssGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Glow head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.fill();
      }

      // Draw floating stardust / embers
      for (let p of stardust) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        ctx.globalAlpha = Math.max(0.1, currentAlpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
