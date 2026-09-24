/* =================================================================
        GLOBAL ACCENT COLOR SETTER
   ================================================================ */


function setThemeColor(color) {
  document.documentElement.style.setProperty('--bs-primary', color);
  document.documentElement.style.setProperty('--accent-color', color);
  document.documentElement.style.setProperty('--accent-hover', color);
  localStorage.setItem('portfolio_accent_color', color);
  localStorage.setItem('portfolio_accent', color);
}

document.addEventListener("DOMContentLoaded", () => {

  /* =================================================================
     1. THEME TOGGLE (Dark / Light Mode)
     ================================================================ */
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
  }


  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }


  /* =================================================================
     2. DYNAMIC ACCENT COLOR INITIALIZER
     ================================================================ */
  const savedColor = localStorage.getItem('portfolio_accent_color') || localStorage.getItem('portfolio_accent');
  if (savedColor) {
    setThemeColor(savedColor);
  }


  /* =================================================================
     3. DYNAMIC FOOTER YEAR
     ================================================================ */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* =================================================================
     4. BACK TO TOP BUTTON
     ================================================================ */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* =================================================================
     5. TYPING EFFECT (Code Window Animation)
     ================================================================ */
  const codeElement = document.getElementById("typedCode");
  const codeText = `{
  "name": "Abdelrahman Mohamed",
  "title": "Frontend Developer / Fullstack Developer",
  "email": "bodaelaraby333@gmail.com",
  "phone": "+201288312230",
  "skills": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Bootstrap",
    "Data Structures & Algorithms",
    "Database Management (SQL)",
    "Python (OOP)"
  ],
  "status": "Available for opportunities"
}`;

  let i = 0;
  const speed = 35;

  function typeWriter() {
    if (i < codeText.length && codeElement) {
      codeElement.textContent += codeText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  if (codeElement) {
    codeElement.textContent = ""; 
    typeWriter();
  }


  /* =================================================================
     6. CUSTOM MOUSE CURSOR EFFECT
     ================================================================ */
  const cursor = document.getElementById('cursor');

  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, input, .btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovered-link');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovered-link');
      });
    });
  }


  /* =================================================================
     7. COPY EMAIL WITH SOUND EFFECT
     ================================================================ */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const targetEmail = document.getElementById('targetEmail');
  const copyTooltip = document.getElementById('copyTooltip');

  function playClickSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.log("Audio not supported or blocked");
    }
  }

  if (copyEmailBtn && targetEmail) {
    copyEmailBtn.addEventListener('click', () => {
      const emailText = targetEmail.innerText;    
      playClickSound();
      navigator.clipboard.writeText(emailText).then(() => {
        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
      });
    });
  }


  /* =================================================================
     8. SHARE PORTFOLIO FEATURE
     ================================================================ */
  const shareBtn = document.getElementById('sharePortfolioBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: "Check out my CV and professional work!",
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          const originalHTML = shareBtn.innerHTML;
          shareBtn.innerHTML = `<i class="bi bi-check2"></i> Copied Link!`;
          shareBtn.classList.add('btn-success', 'text-white');
          shareBtn.classList.remove('btn-outline-accent');
          
          setTimeout(() => {
            shareBtn.innerHTML = originalHTML;
            shareBtn.classList.remove('btn-success', 'text-white');
            shareBtn.classList.add('btn-outline-accent');
          }, 2000);
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    });
  }


  /* =================================================================
     9. ANIMATED STATS COUNTER
     ================================================================ */
  const statsSection = document.querySelector('.stats-section');
  let statsAnimated = false;

  if (statsSection) {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const runCounters = () => {
      statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        let count = 0;
        const speedVal = target / 40; 
        
        const updateCount = () => {
          count += speedVal;
          if (count < target) {
            num.innerText = Math.ceil(count);
            setTimeout(updateCount, 40);
          } else {
            num.innerText = target + (num.parentElement.innerText.includes('%') ? '%' : '+');
          }
        };
        updateCount();
      });
    };

    window.addEventListener('scroll', () => {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && !statsAnimated) {
        runCounters();
        statsAnimated = true;
      }
    });
  }

});


/* =================================================================
   10. SPLASH SCREEN HANDLER
   ================================================================ */
window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splashScreen');
  
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add('splash-hidden');
      setTimeout(() => {
        splashScreen.remove();
      }, 500);
    }, 600);
  }
});


/* =================================================================
   11. CONTACT FORM HANDLER (Formspree Integration)
   ================================================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const statusParagraph = document.getElementById('contactStatus');
    const submitButton = document.getElementById('submitBtn');
    
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    const formData = new FormData(contactForm);
    
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    if (statusParagraph) {
      statusParagraph.style.color = "var(--text-muted)";
      statusParagraph.textContent = "Sending your message...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (statusParagraph) {
          statusParagraph.style.color = "#27c93f";   
          statusParagraph.textContent = "Thanks! Your message has been sent successfully.";
        }
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        throw new Error('Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      if (statusParagraph) {
        statusParagraph.style.color = "#ff5f56";
        statusParagraph.textContent = "Sorry, something went wrong. Please try again later.";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }
  });
}



  (function () {
      const root = document.documentElement;
      const toggleButton = document.querySelector('.theme-toggle');

      function applyTheme(theme) {
        root.setAttribute('data-theme', theme);

        if (!toggleButton) return;

        const icon = toggleButton.querySelector('i');
        const isDark = theme === 'dark';

        if (icon) {
          icon.className = isDark ? 'bi bi-sun' : 'bi bi-moon-stars';
        }

        toggleButton.setAttribute(
          'aria-label',
          isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
        toggleButton.title = isDark ? 'Light Mode' : 'Dark Mode';
      }

      const savedTheme = localStorage.getItem('portfolio-theme');
      applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

      window.toggleTheme = function (event) {
        if (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }

        const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', nextTheme);
        applyTheme(nextTheme);
      };
    })();