// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash && hash.startsWith('#') && hash !== '#') {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Logo click to home
document.querySelector('.logo-container')?.addEventListener('click', () => {
  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
});

// ========================================
// ANIMATION ON SCROLL
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .edu-item, .exp-item, .certificate-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ========================================
// THEME TOGGLE - WORKING VERSION
// ========================================
(function() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  if (!toggleBtn) {
    console.error('Theme toggle button not found!');
    return;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
      themeIcon.style.color = '#fbbf24';
    } else {
      themeIcon.className = 'fas fa-moon';
      themeIcon.style.color = 'white';
    }
    
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      console.log('Could not save theme preference');
    }
    
    console.log('Theme set to:', theme);
  }

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (e) {}
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme');
    const next = (current === 'dark') ? 'light' : 'dark';
    setTheme(next);
    console.log('Toggled to:', next);
  });

  console.log('🌗 Theme toggle ready!');
})();

// ========================================
// RESUME DOWNLOAD
// ========================================
(function() {
  const RESUME_FILE_PATH = 'resume/Chandan_Prit_Singh_Resume.pdf';
  const resumeLink = document.getElementById('resumeDownloadLink');

  function downloadResume(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const link = document.createElement('a');
    link.href = RESUME_FILE_PATH;
    link.download = 'Chandan_Prit_Singh_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);

    showDownloadMessage('✅ Resume download started!');
  }

  function showDownloadMessage(message) {
    let toast = document.getElementById('resumeToastNav');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'resumeToastNav';
      toast.className = 'resume-toast-nav';
      toast.innerHTML = '<i class="fas fa-check-circle"></i><span id="toastMsgNav">Resume downloaded!</span>';
      document.body.appendChild(toast);
    }
    const toastMsg = document.getElementById('toastMsgNav');
    if (toastMsg) {
      toastMsg.textContent = message;
    }
    toast.className = 'resume-toast-nav show';
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.className = 'resume-toast-nav';
    }, 3000);
  }

  if (resumeLink) {
    resumeLink.addEventListener('click', downloadResume);
  }

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
      e.preventDefault();
      if (resumeLink) {
        resumeLink.click();
      }
    }
  });
})();

// ========================================
// GITHUB LIVE DATA FETCH
// ========================================
(function() {
  const GITHUB_USERNAME = "ChandanPRitSingh23";
  const repoElement = document.getElementById('repoCount');
  const refreshTimeElement = document.getElementById('refreshTime');

  if (!repoElement) return;

  async function fetchLiveGitHubData() {
    try {
      repoElement.innerText = "...";
      if (refreshTimeElement) {
        refreshTimeElement.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Fetching live data...';
      }

      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

      if (response.ok) {
        const data = await response.json();
        repoElement.innerText = data.public_repos || 0;

        const now = new Date();
        const timeString = now.toLocaleTimeString();
        if (refreshTimeElement) {
          refreshTimeElement.innerHTML = `<i class="fas fa-check-circle"></i> Updated at ${timeString} • Live from GitHub`;
        }
      } else {
        repoElement.innerText = "3";
        if (refreshTimeElement) {
          refreshTimeElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Using cached data • GitHub API limit';
        }
      }
    } catch (error) {
      console.error("GitHub API Error:", error);
      repoElement.innerText = "3";
      if (refreshTimeElement) {
        refreshTimeElement.innerHTML = '<i class="fas fa-wifi"></i> Offline mode • Using saved data';
      }
    }
  }

  fetchLiveGitHubData();
  setInterval(fetchLiveGitHubData, 300000);
})();





// JavaScript mein add karo
document.querySelector('.ai-btn')?.addEventListener('click', function(e) {
  e.preventDefault();
  alert('🤖 Ask Chandan AI coming soon!');
});




