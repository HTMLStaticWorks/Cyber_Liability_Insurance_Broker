// main.js - Cyber Liability Insurance Brokerage Shared JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  initTheme();
  initRTL();
  initMobileMenu();
  initBeforeAfterSliders();
  initCounters();
  initBackToTop();
  initPasswordToggle();
  initQuoteModal();
  initThreatSimulator();
});

// --- Theme Toggle ---
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Apply saved theme or system default
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  updateThemeIcons();
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
    });
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');
  
  if (isDark) {
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
    moonIcons.forEach(icon => icon.classList.add('hidden'));
  } else {
    sunIcons.forEach(icon => icon.classList.add('hidden'));
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
  }
}

// --- RTL (Right-to-Left) Toggle ---
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  // Apply saved direction or default to LTR
  const savedDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateRTLButtons(savedDir);
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      updateRTLButtons(newDir);
    });
  });
}

function updateRTLButtons(dir) {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    if (dir === 'rtl') {
      toggle.classList.add('bg-brand-primary', 'text-white', 'border-brand-primary', 'dark:border-brand-primary');
      toggle.classList.remove('text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-800');
    } else {
      toggle.classList.remove('bg-brand-primary', 'text-white', 'border-brand-primary', 'dark:border-brand-primary');
      toggle.classList.add('text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-800');
    }
  });

  if (dir === 'rtl') {
    document.title = document.title.includes(' (RTL)') ? document.title : document.title + ' (RTL)';
  } else {
    if (document.title.includes(' (RTL)')) {
      document.title = document.title.replace(' (RTL)', '');
    }
  }
}



// --- Mobile Hamburger Menu ---
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuContainer = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  
  if (menuBtn && menuContainer) {
    menuBtn.addEventListener('click', () => {
      menuContainer.classList.remove('hidden');
      menuContainer.classList.add('flex');
      setTimeout(() => {
        menuContainer.classList.remove('opacity-0', '-translate-y-4');
      }, 10);
    });
  }
  
  if (closeBtn && menuContainer) {
    closeBtn.addEventListener('click', () => {
      menuContainer.classList.add('opacity-0', '-translate-y-4');
      setTimeout(() => {
        menuContainer.classList.add('hidden');
        menuContainer.classList.remove('flex');
      }, 300);
    });
  }
  
  // Close menu when clicking links
  const mobileLinks = menuContainer ? menuContainer.querySelectorAll('a') : [];
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuContainer) {
        menuContainer.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
          menuContainer.classList.add('hidden');
          menuContainer.classList.remove('flex');
        }, 300);
      }
    });
  });
}

// --- Before & After Image Sliders ---
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const rangeInput = slider.querySelector('.slider-range');
    const resizeContainer = slider.querySelector('.resize-container');
    const handle = slider.querySelector('.slider-handle');
    
    if (rangeInput && resizeContainer && handle) {
      // Set initial state
      resizeContainer.style.width = rangeInput.value + '%';
      handle.style.left = rangeInput.value + '%';
      
      // Update on range input
      rangeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        resizeContainer.style.width = value + '%';
        handle.style.left = value + '%';
      });
    }
  });
}

// --- Animated Stats Counters ---
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  
  const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500; // 1.5 seconds animation
    const step = target / (duration / 16); // 60fps refresh rate
    let current = 0;
    
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    
    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// --- Back to Top Button ---
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'fixed bottom-6 right-6 rtl:right-auto rtl:left-6 w-12 h-12 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white flex items-center justify-center shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-none z-50';
  btn.setAttribute('aria-label', 'Back to Top');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(btn);




  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --- Password Visibility Toggle ---
function initPasswordToggle() {
  const toggles = document.querySelectorAll('.password-toggle');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const container = toggle.closest('.relative');
      if (!container) return;
      
      const input = container.querySelector('input');
      if (!input) return;
      
      const eyeIcon = toggle.querySelector('.toggle-icon-eye');
      const eyeOffIcon = toggle.querySelector('.toggle-icon-eye-off');
      
      if (input.type === 'password') {
        input.type = 'text';
        if (eyeIcon) eyeIcon.classList.add('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
      } else {
        input.type = 'password';
        if (eyeIcon) eyeIcon.classList.remove('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
      }
    });
  });
}

// --- Interactive Get Quote Modal ---
function initQuoteModal() {
  if (!document.getElementById('quote-modal')) {
    const modalHTML = `
    <div id="quote-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-955/80 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
      <div class="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/20 text-white overflow-hidden transform scale-95 transition-all duration-300">
        
        <!-- Glowing Top Accent Bar -->
        <div class="h-1.5 bg-gradient-to-r from-brand-primary via-sky-400 to-emerald-400"></div>

        <!-- Modal Header -->
        <div class="p-6 sm:p-8 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div class="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span>Instant Cyber Quote Engine</span>
            </div>
            <h3 class="text-2xl font-extrabold font-outfit text-white">Get Your Cyber Coverage Quote</h3>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Configure policy limits and receive an instant premium estimate</p>
          </div>
          <button id="close-quote-modal" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Close Modal">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <!-- Progress Stepper -->
        <div class="px-6 sm:px-8 py-4 bg-slate-950/60 border-b border-slate-800/80">
          <div class="flex items-center justify-between relative max-w-md mx-auto">
            <!-- Line background container -->
            <div class="absolute left-4 right-4 top-4 -translate-y-1/2 h-0.5 -z-0">
              <div class="w-full h-full bg-slate-800"></div>
              <div id="modal-step-line" class="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-cyan-400 transition-all duration-300 w-0"></div>
            </div>

            <!-- Step 1 Indicator -->
            <div class="step-indicator flex flex-col items-center relative z-10" data-step="1">
              <div class="step-circle w-8 h-8 rounded-full bg-brand-primary text-slate-955 font-bold text-xs flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-300">1</div>
              <span class="text-[11px] font-semibold text-cyan-400 mt-1">Profile</span>
            </div>
            <!-- Step 2 Indicator -->
            <div class="step-indicator flex flex-col items-center relative z-10" data-step="2">
              <div class="step-circle w-8 h-8 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700 transition-all duration-300">2</div>
              <span class="text-[11px] font-medium text-slate-400 mt-1">Coverage</span>
            </div>
            <!-- Step 3 Indicator -->
            <div class="step-indicator flex flex-col items-center relative z-10" data-step="3">
              <div class="step-circle w-8 h-8 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700 transition-all duration-300">3</div>
              <span class="text-[11px] font-medium text-slate-400 mt-1">Proposal</span>
            </div>
          </div>
        </div>

        <!-- Modal Body Form Steps -->
        <div class="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          
          <!-- STEP 1: Business Profile -->
          <div id="modal-step-1" class="modal-step-content space-y-5">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Company / Organization Name *</label>
              <div class="relative">
                <i data-lucide="building" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" id="quote-company-name" placeholder="e.g. Acme Health Technologies" class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Industry Sector</label>
                <select id="quote-industry" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm">
                  <option value="tech">Healthcare & Fintech</option>
                  <option value="saas">SaaS & Cloud Services</option>
                  <option value="ecommerce">E-Commerce & Retail</option>
                  <option value="legal">Legal & Professional</option>
                  <option value="manufacturing">Manufacturing & Supply</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Annual Revenue</label>
                <select id="quote-revenue" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm">
                  <option value="1m">$1M – $5M</option>
                  <option value="5m">$5M – $20M</option>
                  <option value="20m">$20M – $50M</option>
                  <option value="50m">$50M+</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Stored Sensitive Records Volume</label>
              <select id="quote-records" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm">
                <option value="10k">Under 10,000 Records</option>
                <option value="50k">10,000 – 100,000 Records</option>
                <option value="500k">100,000 – 1,000,000 Records</option>
                <option value="1m+">1,000,000+ Records</option>
              </select>
            </div>
          </div>

          <!-- STEP 2: Coverage & Risk Engine -->
          <div id="modal-step-2" class="modal-step-content space-y-5 hidden">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Desired Policy Limit ($ Coverage)</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="limit-options">
                <button type="button" class="limit-btn active px-3 py-2.5 rounded-xl border border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold text-xs text-center transition-all" data-limit="1000000">$1,000,000</button>
                <button type="button" class="limit-btn px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-955 text-slate-300 font-bold text-xs text-center hover:border-slate-700 transition-all" data-limit="5000000">$5,000,000</button>
                <button type="button" class="limit-btn px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-955 text-slate-300 font-bold text-xs text-center hover:border-slate-700 transition-all" data-limit="10000000">$10,000,000</button>
                <button type="button" class="limit-btn px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-955 text-slate-300 font-bold text-xs text-center hover:border-slate-700 transition-all" data-limit="25000000">$25,000,000</button>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider">Coverage Add-ons</label>
              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-955 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                  <i data-lucide="shield-alert" class="w-4 h-4 text-cyan-400"></i>
                  <div>
                    <div class="text-xs font-bold text-white">Ransomware & Extortion Payments</div>
                    <div class="text-[11px] text-slate-400">Covers bitcoin ransom demands & negotiation specialists</div>
                  </div>
                </div>
                <input type="checkbox" id="addon-extortion" checked class="quote-addon rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4">
              </label>

              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-955 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                  <i data-lucide="zap" class="w-4 h-4 text-cyan-400"></i>
                  <div>
                    <div class="text-xs font-bold text-white">Business Interruption & Revenue Loss</div>
                    <div class="text-[11px] text-slate-400">Income replacement during network downtime</div>
                  </div>
                </div>
                <input type="checkbox" id="addon-downtime" checked class="quote-addon rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4">
              </label>
            </div>

            <!-- Live Estimated Premium Box -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-955/40 to-slate-955 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-400">ESTIMATED ANNUAL PREMIUM</span>
                <div id="modal-premium-estimate" class="text-2xl font-extrabold font-outfit text-white mt-0.5">$1,250 – $1,850 <span class="text-xs font-normal text-slate-400">/ yr</span></div>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold"><i data-lucide="check" class="w-3.5 h-3.5"></i> A+ Rated Underwriters</span>
              </div>
            </div>
          </div>

          <!-- STEP 3: Contact & Delivery -->
          <div id="modal-step-3" class="modal-step-content space-y-4 hidden">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input type="text" id="quote-contact-name" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Work Email Address *</label>
                <input type="email" id="quote-contact-email" placeholder="john@company.com" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input type="tel" id="quote-contact-phone" placeholder="+1 (555) 019-2834" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Broker Assignment</label>
              <select id="quote-broker-type" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-sm">
                <option value="standard">Assign Senior Cyber Risk Specialist</option>
                <option value="urgent">Express Binder Request (Within 1 Hour)</option>
              </select>
            </div>
          </div>

          <!-- SUCCESS STEP (Step 4) -->
          <div id="modal-step-success" class="modal-step-content space-y-6 hidden text-center py-4">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-pulse">
              <i data-lucide="check-circle-2" class="w-10 h-10"></i>
            </div>
            <div>
              <h4 class="text-2xl font-bold font-outfit text-white">Quote Proposal Generated!</h4>
              <p class="text-xs sm:text-sm text-slate-300 mt-1">Reference ID: <span id="success-ref-id" class="font-mono text-cyan-400 font-bold">#CG-2026-8942</span></p>
            </div>

            <div class="p-5 rounded-2xl bg-slate-955 border border-slate-800 text-left space-y-2.5 text-xs sm:text-sm">
              <div class="flex justify-between text-slate-400"><span>Company:</span> <strong id="summary-company" class="text-white">Acme Corp</strong></div>
              <div class="flex justify-between text-slate-400"><span>Policy Limit:</span> <strong id="summary-limit" class="text-white">$1,000,000</strong></div>
              <div class="flex justify-between text-slate-400"><span>Est. Premium:</span> <strong id="summary-premium" class="text-cyan-400 font-bold">$1,250 – $1,850 / yr</strong></div>
              <div class="flex justify-between text-slate-400"><span>Assigned Specialist:</span> <strong class="text-white">Senior Cyber Underwriter</strong></div>
            </div>
            <p class="text-xs text-slate-400">A detailed proposal has been dispatched to your work email address.</p>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="p-6 border-t border-slate-800 bg-slate-955 flex items-center justify-between">
          <button id="quote-prev-btn" class="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 font-semibold text-xs hover:bg-slate-900 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none" disabled>
            Back
          </button>

          <button id="quote-next-btn" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-slate-955 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center space-x-2 rtl:space-x-reverse">
            <span>Continue</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>

      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const modal = document.getElementById('quote-modal');
  const closeBtn = document.getElementById('close-quote-modal');
  const prevBtn = document.getElementById('quote-prev-btn');
  const nextBtn = document.getElementById('quote-next-btn');

  let currentStep = 1;
  let selectedLimit = 1000000;

  const attachTriggers = () => {
    const allCandidateBtns = document.querySelectorAll('a[href="contact.html"], .open-quote-modal, [data-quote-modal]');
    allCandidateBtns.forEach(btn => {
      const text = btn.textContent.trim().toLowerCase();
      // Only intercept click if button text specifically contains "quote" or has quote modal classes/attributes
      if (text.includes('quote') || btn.classList.contains('open-quote-modal') || btn.hasAttribute('data-quote-modal')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      }
    });
  };

  attachTriggers();

  const openModal = () => {
    currentStep = 1;
    updateStepUI();
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.children[0].classList.remove('scale-95');
    modal.children[0].classList.add('scale-100');
  };

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.children[0].classList.remove('scale-100');
    modal.children[0].classList.add('scale-95');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
      closeModal();
    }
  });

  const limitBtns = document.querySelectorAll('.limit-btn');
  limitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      limitBtns.forEach(b => {
        b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        b.classList.add('border-slate-800', 'bg-slate-955', 'text-slate-300');
      });
      btn.classList.add('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
      btn.classList.remove('border-slate-800', 'bg-slate-955', 'text-slate-300');
      selectedLimit = parseInt(btn.getAttribute('data-limit'));
      calculateLiveEstimate();
    });
  });

  ['quote-revenue', 'quote-records', 'addon-extortion', 'addon-downtime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculateLiveEstimate);
  });

  function calculateLiveEstimate() {
    const rev = document.getElementById('quote-revenue')?.value || '1m';
    const rec = document.getElementById('quote-records')?.value || '10k';
    const ext = document.getElementById('addon-extortion')?.checked;
    const down = document.getElementById('addon-downtime')?.checked;

    let base = selectedLimit * 0.0009;

    if (rev === '5m') base *= 1.4;
    else if (rev === '20m') base *= 2.1;
    else if (rev === '50m') base *= 3.2;

    if (rec === '50k') base += 200;
    else if (rec === '500k') base += 550;
    else if (rec === '1m+') base += 1200;

    if (ext) base += 350;
    if (down) base += 450;

    const minEst = Math.round(base);
    const maxEst = Math.round(base * 1.35);

    const estEl = document.getElementById('modal-premium-estimate');
    if (estEl) {
      estEl.innerHTML = `$${minEst.toLocaleString()} – $${maxEst.toLocaleString()} <span class="text-xs font-normal text-slate-400">/ yr</span>`;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep === 1) {
        const companyName = document.getElementById('quote-company-name').value.trim();
        if (!companyName) {
          document.getElementById('quote-company-name').classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
          document.getElementById('quote-company-name').focus();
          return;
        } else {
          document.getElementById('quote-company-name').classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
        }
        currentStep = 2;
        calculateLiveEstimate();
      } else if (currentStep === 2) {
        currentStep = 3;
      } else if (currentStep === 3) {
        const name = document.getElementById('quote-contact-name').value.trim();
        const email = document.getElementById('quote-contact-email').value.trim();
        const phone = document.getElementById('quote-contact-phone').value.trim();

        if (!name || !email || !phone) {
          if (!name) document.getElementById('quote-contact-name').classList.add('border-rose-500');
          if (!email) document.getElementById('quote-contact-email').classList.add('border-rose-500');
          if (!phone) document.getElementById('quote-contact-phone').classList.add('border-rose-500');
          return;
        }

        currentStep = 4;
        const refId = '#CG-2026-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('success-ref-id').textContent = refId;
        document.getElementById('summary-company').textContent = document.getElementById('quote-company-name').value;
        document.getElementById('summary-limit').textContent = '$' + selectedLimit.toLocaleString();
        document.getElementById('summary-premium').textContent = document.getElementById('modal-premium-estimate').innerText;
      } else if (currentStep === 4) {
        closeModal();
      }
      updateStepUI();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1 && currentStep < 4) {
        currentStep--;
        updateStepUI();
      }
    });
  }

  function updateStepUI() {
    document.querySelectorAll('.modal-step-content').forEach(el => el.classList.add('hidden'));

    if (currentStep <= 3) {
      document.getElementById(`modal-step-${currentStep}`).classList.remove('hidden');
      prevBtn.disabled = currentStep === 1;

      document.querySelectorAll('.step-indicator').forEach(ind => {
        const stepNum = parseInt(ind.getAttribute('data-step'));
        const circle = ind.querySelector('.step-circle');
        const text = ind.querySelector('span');

        if (stepNum < currentStep) {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-emerald-500/20';
          circle.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
          text.className = 'text-[11px] font-semibold text-emerald-400 mt-1';
        } else if (stepNum === currentStep) {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-brand-primary text-slate-955 font-bold text-xs flex items-center justify-center shadow-lg shadow-cyan-500/30';
          circle.textContent = stepNum;
          text.className = 'text-[11px] font-semibold text-cyan-400 mt-1';
        } else {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700';
          circle.textContent = stepNum;
          text.className = 'text-[11px] font-medium text-slate-400 mt-1';
        }
      });

      const stepLine = document.getElementById('modal-step-line');
      if (stepLine) {
        if (currentStep === 1) stepLine.style.width = '0%';
        else if (currentStep === 2) stepLine.style.width = '50%';
        else if (currentStep === 3) stepLine.style.width = '100%';
      }

      nextBtn.innerHTML = currentStep === 3 
        ? '<span>Submit & Generate Proposal</span><i data-lucide="send" class="w-4 h-4"></i>' 
        : '<span>Continue</span><i data-lucide="arrow-right" class="w-4 h-4"></i>';
    } else {
      document.getElementById('modal-step-success').classList.remove('hidden');
      prevBtn.disabled = true;
      nextBtn.innerHTML = '<span>Done</span><i data-lucide="check" class="w-4 h-4"></i>';
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// --- Interactive Cyber Threat & Risk Coverage Simulator ---
function initThreatSimulator() {
  const container = document.getElementById('cyber-threat-simulator');
  if (!container) return;

  const tabs = container.querySelectorAll('.sim-tab');
  const revenueSlider = document.getElementById('sim-revenue-slider');
  const recordsSlider = document.getElementById('sim-records-slider');
  const revenueVal = document.getElementById('sim-revenue-val');
  const recordsVal = document.getElementById('sim-records-val');

  const titleEl = document.getElementById('sim-scenario-title');
  const uninsuredEl = document.getElementById('sim-uninsured-cost');
  const coveredEl = document.getElementById('sim-covered-cost');

  const bar1Val = document.getElementById('sim-bar1-val');
  const bar2Val = document.getElementById('sim-bar2-val');
  const bar3Val = document.getElementById('sim-bar3-val');
  const bar4Val = document.getElementById('sim-bar4-val');

  const bar1Fill = document.getElementById('sim-bar1-fill');
  const bar2Fill = document.getElementById('sim-bar2-fill');
  const bar3Fill = document.getElementById('sim-bar3-fill');
  const bar4Fill = document.getElementById('sim-bar4-fill');

  const limitRecEl = document.getElementById('sim-limit-recommendation');
  const runBtn = document.getElementById('sim-run-btn');

  let activeScenario = 'ransomware';

  const scenarioData = {
    ransomware: {
      title: 'Ransomware Extortion Attack',
      multForensic: 0.038,
      multExtortion: 0.060,
      multDowntime: 0.035,
      multLegal: 0.015,
      recLimit: '$3M - $5M Enterprise Cyber Coverage'
    },
    wirefraud: {
      title: 'Wire Fraud & BEC Exploitation',
      multForensic: 0.012,
      multExtortion: 0.075,
      multDowntime: 0.010,
      multLegal: 0.018,
      recLimit: '$1M - $3M Financial Crime & Spoofing Policy'
    },
    databreach: {
      title: 'Data Leak & Regulatory Class Action',
      multForensic: 0.045,
      multExtortion: 0.020,
      multDowntime: 0.025,
      multLegal: 0.055,
      recLimit: '$5M - $10M PII / HIPAA Liability Sub-Limit'
    },
    cloudoutage: {
      title: 'Cloud Vendor Supply Chain Outage',
      multForensic: 0.015,
      multExtortion: 0.010,
      multDowntime: 0.080,
      multLegal: 0.025,
      recLimit: '$2M - $5M Dependent Interruption Coverage'
    }
  };

  function formatMoney(num) {
    return '$' + Math.round(num).toLocaleString('en-US');
  }

  function updateSimulator() {
    const rev = parseFloat(revenueSlider.value) || 10000000;
    const rec = parseFloat(recordsSlider.value) || 15000;

    revenueVal.textContent = formatMoney(rev);
    recordsVal.textContent = rec.toLocaleString('en-US') + ' Records';

    const s = scenarioData[activeScenario];
    titleEl.textContent = s.title;

    // Scale calculations based on Revenue and Record count
    const recordFactor = 1 + (rec / 100000);
    const b1 = rev * s.multForensic * recordFactor;
    const b2 = rev * s.multExtortion * recordFactor;
    const b3 = rev * s.multDowntime * recordFactor;
    const b4 = rev * s.multLegal * recordFactor;

    const totalLoss = b1 + b2 + b3 + b4;

    uninsuredEl.textContent = formatMoney(totalLoss);
    coveredEl.textContent = formatMoney(totalLoss);

    bar1Val.textContent = formatMoney(b1);
    bar2Val.textContent = formatMoney(b2);
    bar3Val.textContent = formatMoney(b3);
    bar4Val.textContent = formatMoney(b4);

    const maxBar = Math.max(b1, b2, b3, b4, 1);
    bar1Fill.style.width = Math.min(100, Math.max(15, (b1 / maxBar) * 100)) + '%';
    bar2Fill.style.width = Math.min(100, Math.max(15, (b2 / maxBar) * 100)) + '%';
    bar3Fill.style.width = Math.min(100, Math.max(15, (b3 / maxBar) * 100)) + '%';
    bar4Fill.style.width = Math.min(100, Math.max(15, (b4 / maxBar) * 100)) + '%';

    if (totalLoss > 8000000) {
      limitRecEl.textContent = '$10M+ Custom Enterprise Umbrella Coverage';
    } else if (totalLoss > 4000000) {
      limitRecEl.textContent = '$5M - $10M Mid-Market Cyber Risk Policy';
    } else {
      limitRecEl.textContent = s.recLimit;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'bg-cyan-500/20', 'border-cyan-500', 'dark:border-cyan-400', 'text-slate-900', 'dark:text-white', 'shadow-lg', 'shadow-cyan-500/10');
        t.classList.add('bg-white/60', 'dark:bg-slate-800/60', 'border-slate-200', 'dark:border-slate-700', 'text-slate-700', 'dark:text-slate-300');
        const desc = t.querySelector('span:last-child');
        if (desc) desc.className = 'text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1';
      });

      tab.classList.add('active', 'bg-cyan-500/20', 'border-cyan-500', 'dark:border-cyan-400', 'text-slate-900', 'dark:text-white', 'shadow-lg', 'shadow-cyan-500/10');
      tab.classList.remove('bg-white/60', 'dark:bg-slate-800/60', 'border-slate-200', 'dark:border-slate-700', 'text-slate-700', 'dark:text-slate-300');
      const desc = tab.querySelector('span:last-child');
      if (desc) desc.className = 'text-[11px] text-slate-600 dark:text-slate-300 font-normal line-clamp-1';

      activeScenario = tab.getAttribute('data-scenario');
      updateSimulator();
    });
  });

  revenueSlider.addEventListener('input', updateSimulator);
  recordsSlider.addEventListener('input', updateSimulator);

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const originalContent = runBtn.innerHTML;
      runBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Analyzing Cyber Attack Vector...</span>';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      setTimeout(() => {
        updateSimulator();
        runBtn.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5 text-slate-955"></i><span>Defense Scan Complete! Coverage Validated</span>';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
          runBtn.disabled = false;
          runBtn.innerHTML = originalContent;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 2000);
      }, 700);
    });
  }

  updateSimulator();
}



