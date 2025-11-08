document.addEventListener('DOMContentLoaded', () => {

  // --- Demo card alerts ---
  document.getElementById('track-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Feature "Track Application Status" is coming soon!');
  });
  document.getElementById('download-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Feature "E-ID Download" is coming soon!');
  });
  document.getElementById('search-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Feature "Search in Electoral Roll" is coming soon!');
  });

  // --- FAQ Toggle Logic ---
  document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
      const p = item.nextElementSibling;
      const icon = item.querySelector('i');
      const isVisible = p.style.display === 'block';
      p.style.display = isVisible ? 'none' : 'block';
      if (icon) {
        icon.classList.toggle('fa-angle-down', isVisible);
        icon.classList.toggle('fa-angle-up', !isVisible);
      }
    });
  });
  
  // --- Header Shadow on Scroll Logic ---
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.style.boxShadow = window.scrollY > 10 
        ? "0 4px 8px rgba(0,0,0,0.2)" 
        : "0 2px 5px rgba(0,0,0,0.1)";
    }
  });

  // --- NEW: Scroll Animation Observer (Stats Counter included) ---
  
  const statsContainer = document.getElementById('stats-container');
  let animationStarted = false;

  // Function to animate stats (same as before)
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current).toLocaleString();
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(updateCount);
    });
  }

  // Generic Observer for all hidden elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'show' class to make it visible
        entry.target.classList.add('show');
        
        // Check if this is the stats container
        if (entry.target.id === 'stats-container' && !animationStarted) {
          animationStarted = true;
          animateStats();
        }
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // Start when 20% visible
  });

  // Observe all elements with hidden classes
  const hiddenElements = document.querySelectorAll('.hidden-fade, .hidden-slide-left, .hidden-slide-right, .hidden-slide-up');
  hiddenElements.forEach(el => observer.observe(el));

});