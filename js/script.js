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

  // 4. Background Music Control (Chrome-Friendly)
  const audio = document.getElementById('bg-music');

  if (audio) {
    const startAudio = () => {
      audio.muted = false;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Audio Persona 3 berhasil diputar di Chrome!");
        }).catch(error => {
          console.log("Chrome memblokir autoplay:", error);
        });
      }

      // Hapus listener hanya jika audio benar-benar berhasil jalan
      ['click', 'touchstart', 'keydown'].forEach(event => {
        document.removeEventListener(event, startAudio);
      });
    };

    // Chrome MENGHARUSKAN klik, sentuhan layar, atau tekan tombol keyboard
    ['click', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, startAudio, { once: true });
    });
  }
});