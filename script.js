document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icon pack
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Sticky Navbar Compression on Scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('py-1', 'shadow-xl');
    } else {
      header.classList.remove('py-1', 'shadow-xl');
    }
  });

  // Mobile Drawer Navigation Toggle
  const mobileBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Itinerary Modal Controller
  const modal = document.getElementById('itinerary-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');

  const toggleModal = (show) => {
    if (!modal) return;
    if (show) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
  if (modalOkBtn) modalOkBtn.addEventListener('click', () => toggleModal(false));

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggleModal(false);
    });
  }

  // Contact Form Submission & Success State Feedback
 // Contact Form Submission via Formspree API (AJAX)
  const form = document.getElementById('inquiry-form');
  const successBox = document.getElementById('form-success');
  const resetBtn = document.getElementById('reset-form-btn');
  const submitBtn = document.getElementById('submit-btn');
  const errorMsg = document.getElementById('form-error');

  if (form && successBox && resetBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMsg.classList.add('hidden');
      
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          successBox.classList.remove('hidden');
        } else {
          errorMsg.classList.remove('hidden');
        }
      } catch (err) {
        errorMsg.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    resetBtn.addEventListener('click', () => {
      form.reset();
      successBox.classList.add('hidden');
      errorMsg.classList.add('hidden');
    });
  }