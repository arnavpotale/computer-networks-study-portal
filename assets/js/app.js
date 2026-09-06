// Master Computer Networks Study Portal (Modules 1, 2 & 3) - Logic

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const tabSections = document.querySelectorAll('.tab-section');
  const modPillBtns = document.querySelectorAll('.mod-pill-btn');
  const sidebarGroups = document.querySelectorAll('.sidebar-module-group');
  const mobileToggle = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');
  const backToTopBtn = document.getElementById('back-to-top');
  const globalSearchInput = document.getElementById('global-search');

  // Determine which module a target section belongs to
  function getModuleFromTarget(targetId) {
    if (!targetId) return 'm1';
    if (targetId === 'last-year-paper-solution') return 'lastyear';
    if (targetId === 'exam-paper-qa') return 'exam';
    if (targetId.startsWith('m1-')) return 'm1';
    if (targetId.startsWith('m2-')) return 'm2';
    if (targetId.startsWith('m3-')) return 'm3';
    if (targetId.startsWith('master-')) return 'cram';
    return 'all';
  }

  // Filter sidebar groups based on active module
  function filterSidebar(modId) {
    if (!modId || modId === 'all') {
      sidebarGroups.forEach(g => g.style.display = 'block');
    } else if (modId === 'lastyear') {
      sidebarGroups.forEach(g => {
        const gm = g.getAttribute('data-mod');
        g.style.display = (gm === 'lastyear' || gm === 'exam' || gm === 'cram') ? 'block' : 'none';
      });
    } else if (modId === 'exam') {
      sidebarGroups.forEach(g => {
        const gm = g.getAttribute('data-mod');
        g.style.display = (gm === 'exam' || gm === 'lastyear' || gm === 'cram') ? 'block' : 'none';
      });
    } else if (modId === 'cram') {
      sidebarGroups.forEach(g => {
        const gm = g.getAttribute('data-mod');
        g.style.display = (gm === 'cram' || gm === 'lastyear' || gm === 'exam') ? 'block' : 'none';
      });
    } else {
      sidebarGroups.forEach(g => {
        const gMod = g.getAttribute('data-mod');
        g.style.display = (gMod === modId || gMod === 'cram' || gMod === 'exam' || gMod === 'lastyear') ? 'block' : 'none';
      });
    }
  }

  // Update active module pill in header
  function setActiveModPill(modId) {
    modPillBtns.forEach(btn => {
      const bMod = btn.getAttribute('data-mod');
      if (bMod === modId) {
        btn.classList.add('active');
        if (bMod === 'cram' || bMod === 'lastyear') btn.classList.add('active-cram');
      } else {
        btn.classList.remove('active', 'active-cram');
      }
    });
    filterSidebar(modId);
  }

  // Switch Tab Function
  function switchTab(targetId, updatePill = true) {
    if (!targetId) return;
    const targetTab = document.getElementById(targetId);
    if (!targetTab) return;

    // Hide all tabs
    tabSections.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    // Show target tab
    targetTab.classList.add('active');

    // Activate nav item
    const targetNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if (targetNav) {
      targetNav.classList.add('active');
    }

    // Update parent module pill
    if (updatePill) {
      const mod = getModuleFromTarget(targetId);
      setActiveModPill(mod);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile/tablet sidebar if open
    if (window.innerWidth <= 1024) {
      closeSidebar();
    }
  }

  // Mobile Drawer Open / Close Helpers
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  // Hash Navigation Handler
  function handleHash() {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && document.getElementById(hash)) {
      switchTab(hash);
    } else {
      // Default to Module 1 Intro
      switchTab('m1-ppt1');
    }
  }

  // Module Pill Buttons Click
  modPillBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mod = btn.getAttribute('data-mod');
      setActiveModPill(mod);

      let defaultTarget = 'm1-ppt1';
      if (mod === 'm1') defaultTarget = 'm1-ppt1';
      else if (mod === 'm2') defaultTarget = 'm2-ppt1';
      else if (mod === 'm3') defaultTarget = 'm3-ppt1';
      else if (mod === 'cram') defaultTarget = 'master-cram';
      else if (mod === 'lastyear') defaultTarget = 'last-year-paper-solution';
      else if (mod === 'exam') defaultTarget = 'exam-paper-qa';
      else if (mod === 'all') defaultTarget = 'master-syllabus';

      window.location.hash = defaultTarget;
    });
  });

  // Sidebar Nav Items Click
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      if (target) {
        if (window.location.hash === `#${target}`) {
          switchTab(target);
        } else {
          window.location.hash = target;
        }
      }
    });
  });

  // In-page Nav Buttons (data-nav-to)
  document.querySelectorAll('[data-nav-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-nav-to');
      if (target) {
        window.location.hash = target;
      }
    });
  });

  // Listen for browser Back / Forward
  window.addEventListener('hashchange', handleHash);

  // Initial load
  handleHash();

  // Mobile Drawer Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      closeSidebar();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Back to Top Button
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Global Search Filter
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        document.querySelectorAll('.card, .step-box').forEach(el => el.style.display = '');
        return;
      }

      // If typing in search, make sure all sidebar groups are visible
      sidebarGroups.forEach(g => g.style.display = 'block');

      // Search in active tab cards
      const activeTab = document.querySelector('.tab-section.active');
      if (activeTab) {
        const cards = activeTab.querySelectorAll('.card, .step-box');
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      }
    });
  }

  // Interactive Practice Accordions Toggle All
  document.querySelectorAll('.toggle-all-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.tab-section');
      if (!container) return;
      const detailsList = container.querySelectorAll('details');
      const isAnyClosed = Array.from(detailsList).some(d => !d.open);

      detailsList.forEach(d => d.open = isAnyClosed);
      btn.textContent = isAnyClosed ? 'Collapse All Practice Solutions' : 'Expand All Practice Solutions';
    });
  });
});