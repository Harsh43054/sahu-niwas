/* ==========================================================================
   Sahu Niwas - Premium Student Rental Rooms
   Main Application Script (Vanilla JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure config is loaded
  if (typeof SAHU_NIWAS_CONFIG === 'undefined') {
    console.error('Configuration file config.js is missing or could not be loaded.');
    return;
  }

  // === 1. DOM Elements Injection from Config ===
  injectConfigData();

  // === 2. Sticky Header Scroll Effect ===
  initStickyHeader();

  // === 3. Mobile Navigation Menu ===
  initMobileMenu();

  // === 4. Dynamic Gallery Rendering & Filtering ===
  initGallery();

  // === 5. Scroll Animation Reveal ===
  initScrollAnimations();
});

/**
 * Injects values defined in config.js directly into appropriate DOM elements,
 * link attributes, and iframes dynamically.
 */
function injectConfigData() {
  const cfg = SAHU_NIWAS_CONFIG;

  // Contact text updates
  const phoneDisplays = document.querySelectorAll('#phone-display-text');
  phoneDisplays.forEach(el => el.textContent = cfg.phone);

  const whatsappDisplays = document.querySelectorAll('#whatsapp-display-text');
  whatsappDisplays.forEach(el => el.textContent = cfg.whatsapp);

  const emailDisplays = document.querySelectorAll('#email-display-text');
  emailDisplays.forEach(el => el.textContent = cfg.email);

  const addressDisplays = document.querySelectorAll('#address-display-text');
  addressDisplays.forEach(el => el.textContent = cfg.address);

  // Footer label specific updates
  const footerPhone = document.getElementById('footer-phone-label');
  if (footerPhone) footerPhone.textContent = cfg.phone;
  
  const footerEmail = document.getElementById('footer-email-label');
  if (footerEmail) footerEmail.textContent = cfg.email;

  // Rent Ranges updates
  const singlePrice = document.getElementById('single-room-price');
  if (singlePrice && cfg.rooms.single) {
    singlePrice.innerHTML = `₹${cfg.rooms.single.minRent} - ₹${cfg.rooms.single.maxRent}<span>/month</span>`;
  }
  const attachedPrice = document.getElementById('attached-room-price');
  if (attachedPrice && cfg.rooms.attached) {
    attachedPrice.innerHTML = `₹${cfg.rooms.attached.minRent} - ₹${cfg.rooms.attached.maxRent}<span>/month</span>`;
  }

  // Interactive Links Mapping
  // Tel Links
  const callLinks = document.querySelectorAll('.call-now-btn-link, .contact-owner-btn');
  callLinks.forEach(link => {
    if (link.tagName === 'A') {
      link.href = `tel:${cfg.phoneRaw}`;
    }
  });

  // WhatsApp Links
  const whatsappUrl = `https://wa.me/${cfg.whatsappRaw}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
  const whatsappLinks = document.querySelectorAll('.whatsapp-chat-btn-link, .book-room-whatsapp-btn');
  whatsappLinks.forEach(link => {
    link.href = whatsappUrl;
  });

  // Email Links
  const emailLinks = document.querySelectorAll('.email-send-btn-link');
  emailLinks.forEach(link => {
    link.href = `mailto:${cfg.email}`;
  });

  // Google Maps Directions
  const directionsLinks = document.querySelectorAll('.get-directions-btn-link');
  directionsLinks.forEach(link => {
    link.href = cfg.googleMapsDirectionsUrl;
  });

  // Google Forms Enquiry Link
  const enquiryLinks = document.querySelectorAll('.direct-form-btn-link');
  enquiryLinks.forEach(link => {
    link.href = cfg.googleFormDirectUrl;
  });

  // Google Maps Embed iframe
  const mapsIframe = document.getElementById('google-maps-iframe');
  if (mapsIframe) {
    mapsIframe.src = cfg.googleMapsEmbedUrl;
  }

  // Google Form Embed iframe
  const formIframe = document.getElementById('google-form-iframe');
  if (formIframe) {
    formIframe.src = cfg.googleFormEmbedUrl;
  }
}

/**
 * Handles the background styling of the header when scrolling.
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Handles the responsive hamburger menu open/close toggle.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  // Toggle active class on click
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle menu icon state (bars / xmark)
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close menu when clicking navigation links (helps smooth scroll landing)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  // Close menu when clicking anywhere outside
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });
}

/**
 * Renders the gallery photos based on config and manages categories switching,
 * including lightbox zoom modal.
 */
function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid-element');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  
  if (!galleryGrid) return;

  const cfg = SAHU_NIWAS_CONFIG;
  
  // Re-build gallery items array from configuration list
  let galleryHTML = '';

  // 1. Single Rooms Items
  if (cfg.gallery.single) {
    cfg.gallery.single.forEach(item => {
      galleryHTML += renderGalleryItemHTML(item, 'single', 'Standard Room');
    });
  }

  // 2. Attached Rooms Items
  if (cfg.gallery.attached) {
    cfg.gallery.attached.forEach(item => {
      galleryHTML += renderGalleryItemHTML(item, 'attached', 'Premium Room');
    });
  }

  // 3. Garden Property Items
  if (cfg.gallery.garden) {
    cfg.gallery.garden.forEach(item => {
      galleryHTML += renderGalleryItemHTML(item, 'garden', 'Garden & Property');
    });
  }

  // Inject dynamic cards
  galleryGrid.innerHTML = galleryHTML;

  // Filter Buttons Click Handling
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all filters
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active to current
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const galleryItems = galleryGrid.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
        // Simple scaling animation transition
        item.style.transform = 'scale(0.8)';
        item.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        }, 200);
      });
    });
  });

  // Lightbox Modal trigger hooks
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  if (!lightboxModal) return;

  // Attach click event to all dynamically generated images
  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const img = item.querySelector('img');
    const overlayTitle = item.querySelector('.gallery-overlay h4');
    const overlayDesc = item.querySelector('.gallery-overlay p');

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxTitle.textContent = overlayTitle ? overlayTitle.textContent : '';
      lightboxDesc.textContent = overlayDesc ? overlayDesc.textContent : '';
      
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
  });

  // Close Lightbox Hooks
  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
  };

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Returns single gallery item structure template string.
 */
function renderGalleryItemHTML(item, category, defaultTitle) {
  return `
    <div class="gallery-item" data-category="${category}" style="cursor: pointer;">
      <img src="${item.url}" alt="${item.title || defaultTitle}" loading="lazy" width="360" height="280">
      <div class="gallery-overlay">
        <h4>${item.title || defaultTitle}</h4>
        <p>${item.description || 'View details'}</p>
      </div>
    </div>
  `;
}

/**
 * Detects elements with the reveal class and cascades slide-ins and fade-ins during scroll.
 */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const options = {
      root: null,
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Unobserve once animated
        }
      });
    }, options);

    reveals.forEach(reveal => {
      // Add visual styling base classes if not present
      if (!reveal.classList.contains('reveal-fade') && 
          !reveal.classList.contains('reveal-left') && 
          !reveal.classList.contains('reveal-right')) {
        reveal.classList.add('reveal-fade');
      }
      observer.observe(reveal);
    });
  } else {
    // Fallback: If browser does not support Intersection Observer, display immediately
    reveals.forEach(reveal => reveal.classList.add('active'));
  }
}
