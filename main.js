document.addEventListener("DOMContentLoaded", () => {

  /* =================================================================
     1. THEME TOGGLE (Dark / Light Mode)
     ================================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
  }


  /* =================================================================
     2. DYNAMIC FOOTER YEAR
     ================================================================ */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* =================================================================
     3. BACK TO TOP BUTTON
     ================================================================ */
  const backToTopBtn = document.getElementById('backToTop');

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
     4. TYPING EFFECT (Code Window Animation)
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
     5. CUSTOM MOUSE CURSOR EFFECT
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

});



/* =================================================================
  6 SPLASH SCREEN HANDLER
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
  7 CONTACT FORM HANDLER (Formspree Integration)
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
    statusParagraph.style.color = "var(--text-muted)";
    statusParagraph.textContent = "Sending your message...";

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'json'
        }
      });

      if (response.ok) {
        statusParagraph.style.color = "#27c93f";   
        statusParagraph.textContent = "Thanks! Your message has been sent successfully.";
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        throw new Error('Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      statusParagraph.style.color = "#ff5f56";
      statusParagraph.textContent = "Sorry, something went wrong. Please try again later.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }
  });
}