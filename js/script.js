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

  // 4. Background Music Control (Dimasukkan ke dalam DOMContentLoaded)
  const audio = document.getElementById('bg-music');

  if (audio) {
    const unmuteAudio = () => {
      audio.muted = false;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Audio Persona 3 diputar!");
        }).catch(error => {
          console.log("Autoplay diblokir browser:", error);
        });
      }

      // Hapus event listener setelah interaksi pertama
      ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(event => {
        document.removeEventListener(event, unmuteAudio);
      });
    };

    // Picu pembukaan kunci audio saat pengguna berinteraksi
    ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(event => {
      document.addEventListener(event, unmuteAudio, { once: true });
    });
  }
});