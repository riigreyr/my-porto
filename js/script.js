document.addEventListener('DOMContentLoaded', () => {
  // 1. Animasi Status Progress Bar saat di-scroll
  const statBars = document.querySelectorAll('.stat-bar-fill');
  
  const animateStats = () => {
    statBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.15;
      
      if (barPosition < screenPosition) {
        bar.style.width = bar.getAttribute('data-width');
      }
    });
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Trigger awal jika elemen sudah terlihat

  // 2. Parallax 3D Tilt Effect pada Hero Avatar Makoto Yuki
  const heroAvatar = document.getElementById('heroAvatar');
  const avatarFrame = heroAvatar ? heroAvatar.querySelector('.avatar-frame') : null;

  if (heroAvatar && avatarFrame) {
    heroAvatar.addEventListener('mousemove', (e) => {
      const rect = heroAvatar.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = (y / rect.height) * -20;
      const tiltY = (x / rect.width) * 20;

      avatarFrame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    });

    heroAvatar.addEventListener('mouseleave', () => {
      avatarFrame.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }

  // 3. Dynamic Hover Transitions
  const interactiveElements = document.querySelectorAll('.btn-p3, .project-card, .skill-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'all 0.15s ease-out';
    });
  });

  // 4. Background Music Control (Chrome Full Fix)
  const bgMusic = new Audio('./media/color-of-your-night.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.5; // Atur volume (0.0 - 1.0)

  let isPlaying = false;

  const playPersonaMusic = () => {
    if (!isPlaying) {
      bgMusic.play().then(() => {
        isPlaying = true;
        console.log("Audio Persona 3 diputar di Chrome!");
        
        // Hapus listener jika audio sudah berhasil jalan
        ['click', 'touchstart', 'keydown'].forEach(event => {
          document.removeEventListener(event, playPersonaMusic);
        });
      }).catch(err => {
        console.log("Chrome memblokir autoplay, menunggu klik:", err);
      });
    }
  };

  // Dengarkan interaksi nyata (Klik / Sentuh / Tekan Tombol)
  ['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, playPersonaMusic);
  });
});