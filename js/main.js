// js/main.js
// =====================================
// Main JavaScript for Website
// Organized with clear flow & comments
// =====================================

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------
  // 1) Mobile Menu Toggle
  // -------------------------------
  const toggle = document.querySelector('.nav__toggle') || document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links') || document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      toggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('show');
        toggle.classList.remove('active');
      });
    });
  }

  // -------------------------------
  // 2) Reveal-on-scroll (general)
  // -------------------------------
  const revealables = document.querySelectorAll('.reveal');
  if (revealables.length > 0) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible'); // re-trigger
          }
        });
      }, { threshold: 0.14 });

      revealables.forEach(el => io.observe(el));
    } else {
      revealables.forEach(el => el.classList.add('is-visible'));
    }
  }

  // -------------------------------
  // 3) About Page Tabs
  // -------------------------------
  const tabs = document.querySelectorAll('.about-tabs .tab');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabs.length && tabContents.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        if (!target) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(c => c.classList.remove('active'));
        const activeContent = document.getElementById(target);
        if (activeContent) activeContent.classList.add('active');
      });

      tab.setAttribute('tabindex', '0');
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tab.click();
        }
      });
    });
  }

  // -------------------------------
  // 4) Contact & Booking Forms
  // -------------------------------
  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPhone = (phone) => !phone || /^[0-9+\-\s]{7,20}$/.test(phone);

  // Contact form validation
  const contactForm = document.querySelector('#contact-form') || document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const fname = formData.get('fname')?.trim() || '';
      const lname = formData.get('lname')?.trim() || '';
      const name = formData.get('name')?.trim() || `${fname} ${lname}`.trim();
      const email = (formData.get('email') || '').trim();
      const phone = (formData.get('phone') || '').trim();
      const message = (formData.get('comments') || formData.get('message') || '').trim();

      if (!name || !email || !message) {
        alert('Please fill in name, email and message before submitting.');
        return;
      }
      if (!validEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!validPhone(phone)) {
        alert('Please enter a valid phone number (optional).');
        return;
      }

      alert(`✅ Thanks ${name.split(' ')[0] || 'there'}! Your message has been received.`);
      contactForm.reset();
    });
  }

  // Booking form validation
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const fullname = (data.get('fullname') || '').trim();
      const email = (data.get('email') || '').trim();
      const phone = (data.get('phone') || '').trim();
      const tickets = data.get('tickets') || '';
      const payment = data.get('payment') || '';

      if (!fullname || !email || !phone || !tickets || !payment) {
        alert('Please complete all booking fields.');
        return;
      }
      if (!validEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!validPhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }

      alert(`✅ Booking confirmed for ${fullname} (${tickets} ticket(s)). We'll email you at ${email}.`);
      bookingForm.reset();
    });
  }

  // -------------------------------
  // 5) Hero, Footer & About Particles
  // -------------------------------
  if (window.particlesJS) {
    if (document.getElementById("particles-hero")) {
      particlesJS("particles-hero", {
        particles: {
          number: { value: 90 },
          size: { value: 3 },
          move: { speed: 2 },
          color: { value: "#ff2b06" },
          line_linked: { enable: true, distance: 150, color: "#ff2b06" }
        }
      });
    }

    if (document.getElementById("particles-footer")) {
      particlesJS("particles-footer", {
        particles: {
          number: { value: 40 },
          size: { value: 15, random: true },
          color: { value: ["#ffffff", "#ff2b06", "#ff6600", "#ffcc00"] },
          opacity: {
            value: 0.25,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false }
          },
          move: {
            enable: true,
            speed: 0.8,
            random: true,
            out_mode: "out",
            straight: false,
            attract: { enable: true, rotateX: 300, rotateY: 600 }
          },
          shape: { type: "circle" },
          line_linked: { enable: false }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "bubble" }, resize: true },
          modes: { bubble: { distance: 150, size: 20, duration: 2, opacity: 0.6 } }
        }
      });
    }

    if (document.getElementById("particles-about")) {
      particlesJS("particles-about", {
        particles: {
          number: { value: 70 },
          size: { value: 2 },
          move: { speed: 1.2 },
          color: { value: "#ff2b06" },
          line_linked: { enable: true, distance: 120, color: "#ff2b06" }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "repulse" }, resize: true },
          modes: { repulse: { distance: 120, duration: 0.4 } }
        }
      });
    }
  }

  // -------------------------------
  // 6) Footer Split Animation
  // -------------------------------
  const footerSection = document.querySelector(".footer-section");
  if (footerSection && "IntersectionObserver" in window) {
    const fObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerSection.classList.add("is-visible");
          fObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    fObs.observe(footerSection);
  }

  // -------------------------------
  // 7) Speakers Page (Modal + Year Filter)
  // -------------------------------
  const speakerCards = document.querySelectorAll(".speaker-card");
  const modal = document.getElementById("speakerModal");

  if (speakerCards.length && modal) {
    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalRole = document.getElementById("modalRole");
    const modalBio = document.getElementById("modalBio");
    const modalTalk = document.getElementById("modalTalk");
    const modalLink = document.getElementById("modalLink");
    const closeBtn = document.querySelector(".modal-close");

    speakerCards.forEach(card => {
      const btn = card.querySelector(".know-more");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          modal.style.display = "flex";
          modalImg.src = card.dataset.img;
          modalName.textContent = card.dataset.name;
          modalRole.textContent = card.dataset.role;
          modalBio.textContent = card.dataset.bio;
          modalTalk.textContent = card.dataset.talk;
          modalLink.href = card.dataset.link;
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => modal.style.display = "none");
    }
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // Year Tabs filter
  const yearTabs = document.querySelectorAll(".year-tabs .tab");
  if (yearTabs.length) {
    yearTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        yearTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const year = tab.dataset.year;

        document.querySelectorAll(".speaker-card").forEach(card => {
          card.style.display = (card.dataset.year === year) ? "block" : "none";
        });
      });
    });

    const firstTab = document.querySelector(".year-tabs .tab");
    if (firstTab) {
      const defaultYear = firstTab.dataset.year;
      yearTabs.forEach(t => t.classList.remove("active"));
      firstTab.classList.add("active");

      document.querySelectorAll(".speaker-card").forEach(card => {
        card.style.display = (card.dataset.year === defaultYear) ? "block" : "none";
      });
    }
  }

  // -------------------------------
  // 8) Back to Top Button
  // -------------------------------
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -------------------------------
  // 9) Team Page Scroll Animations
  // -------------------------------
  const teamEls = document.querySelectorAll(
    ".team-title, .sub-title, .team-member, .member-name, .member-role"
  );

  if (teamEls.length && "IntersectionObserver" in window) {
    const teamObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    }, { threshold: 0.2 });

    teamEls.forEach(el => teamObserver.observe(el));
  }

  // -------------------------------
  // 10) Events Timeline Animations
  // -------------------------------
  const timeline = document.querySelector(".timeline");
  const items = document.querySelectorAll(".timeline-item");

  if (timeline && "IntersectionObserver" in window) {
    // Red line progressive animation
    window.addEventListener("scroll", () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(1, (windowHeight - rect.top) / rect.height);
        timeline.style.setProperty("--line-progress", progress);
      }
    });

    // Animate items one by one
    const itemObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          itemObs.unobserve(entry.target); // trigger only once
        }
      });
    }, { threshold: 0.3 });

    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.2}s`; // stagger
      itemObs.observe(item);
    });
  }

  // -------------------------------
  // 11) Global Scroll Animations (NEW)
  // -------------------------------
  const scrollEls = document.querySelectorAll(".scroll-animate");
  if (scrollEls.length && "IntersectionObserver" in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    }, { threshold: 0.2 });

    scrollEls.forEach(el => scrollObserver.observe(el));
  }

  // -------------------------------
  // 12) Continuous Event Images Strip
  // -------------------------------
  const eventStrip = document.querySelector(".event-strip");
  if (eventStrip) {
    const clone = eventStrip.innerHTML;
    eventStrip.innerHTML += clone; // duplicate for infinite loop
  }

  // -------------------------------
  // 13) Contact Page Snowfall Effect
  // -------------------------------
  if (window.particlesJS && document.getElementById("particles-contact")) {
    particlesJS("particles-contact", {
      particles: {
        number: { value: 150, density: { enable: true, value_area: 1000 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.8, random: true },
        size: { value: 3, random: true },
        move: {
          enable: true,
          speed: 1.2,
          direction: "bottom",
          random: true,
          straight: false,
          out_mode: "out"
        },
        line_linked: { enable: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: false }, onclick: { enable: false } }
      },
      retina_detect: true
    });
  }

}); // End DOMContentLoaded
