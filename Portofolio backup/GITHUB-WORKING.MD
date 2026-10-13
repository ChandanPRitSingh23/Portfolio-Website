 <!-- ========== MY GITHUB SECTION - ADD THIS BEFORE YOUR "LET'S CONNECT" SECTION ========== -->
<!-- ========== MY GITHUB SECTION - ADD THIS BEFORE YOUR "LET'S CONNECT" SECTION ========== -->
<!-- ========== MY GITHUB SECTION WITH CUSTOM BAR CHART ========== -->
<!-- ========== MY GITHUB SECTION ========== -->
<!-- ========== MY GITHUB SECTION - UPGRADED VERSION ========== -->
<!-- ========== MY GITHUB SECTION - FINAL WORKING VERSION ========== -->
<!-- ========== MY GITHUB SECTION - NO GRAPH, CLEAN & WORKING ========== -->
<!-- ========== MY GITHUB SECTION - WITH AUTO-FETCH ========== -->
<section id="github-section">
  <style>
    #github-section {
      max-width: 1150px;
      margin: 0 auto;
      width: 100%;
    }

    .github-stats-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .github-card {
      background: #ffffff;
      border-radius: 1.5rem;
      padding: 1.8rem;
      flex: 1;
      min-width: 180px;
      text-align: center;
      border: 1px solid rgba(59,130,246,0.2);
      transition: all 0.2s ease;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    }

    .github-card:hover {
      transform: translateY(-3px);
      border-color: #3b82f6;
      box-shadow: 0 15px 30px -10px rgba(59,130,246,0.15);
    }

    .github-card i {
      font-size: 2rem;
      color: #3b82f6;
      margin-bottom: 0.75rem;
    }

    .github-card h3 {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 0.5rem;
    }

    .github-card .stats-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
      line-height: 1.2;
    }

    .github-card .stats-label {
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 0.25rem;
    }

    .github-profile-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: #1e293b;
      padding: 0.8rem 2rem;
      border-radius: 40px;
      text-decoration: none;
      color: #e2e8f0;
      font-weight: 500;
      transition: all 0.2s ease;
      border: 1px solid #334155;
    }

    .github-profile-link:hover {
      background: #3b82f6;
      border-color: #3b82f6;
      transform: translateY(-2px);
    }

    .section-title {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1e293b, #3b82f6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
    }

    .github-note {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .refresh-indicator {
      text-align: center;
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #94a3b8;
    }

    @media (max-width: 768px) {
      .github-card .stats-number {
        font-size: 1.8rem;
      }
      .github-stats-grid {
        gap: 1rem;
      }
    }
  </style>

  <h2 class="section-title">
    <i class="fab fa-github"></i> My GitHub
  </h2>

  <!-- Stats Cards with Auto-Fetch IDs -->
  <div class="github-stats-grid">
    <div class="github-card">
      <i class="fas fa-code-branch"></i>
      <h3>Public Repositories</h3>
      <div class="stats-number" id="repoCount">—</div>
      <div class="stats-label">total repositories</div>
    </div>
    <div class="github-card">
      <i class="fas fa-chart-line"></i>
      <h3>Contributions</h3>
      <!--MANUALLY CAHNGE THE CONRTIBUTIONS HERE-->
      <div class="stats-number" id="contribCount">46</div>
      <div class="stats-label">in the last year</div>
    </div>
    <div class="github-card">
      <i class="fas fa-users"></i>
      <h3>GitHub Presence</h3>
      <div class="stats-number" id="followersCount">—</div>
      <div class="stats-label">followers</div>
    </div>
  </div>

  <!-- Link to GitHub Profile -->
  <div style="text-align: center;">
    <a href="https://github.com/ChandanPRitSingh23" target="_blank" class="github-profile-link">
      <i class="fab fa-github fa-lg"></i> Visit Full GitHub Profile
      <i class="fas fa-arrow-right"></i>
    </a>
  </div>

  <div class="github-note">
    <i class="fas fa-chart-simple"></i> 46 total contributions • Active on GitHub
  </div>
  <div class="refresh-indicator" id="refreshTime">
    <i class="fas fa-sync-alt"></i> Data refreshes automatically
  </div>
</section>

<script>
  // GitHub Username
  const GITHUB_USERNAME = "ChandanPRitSingh23";
  
  // Get elements
  const repoElement = document.getElementById('repoCount');
  const followersElement = document.getElementById('followersCount');
  const refreshTimeElement = document.getElementById('refreshTime');
  
  // Function to fetch live GitHub data
  async function fetchLiveGitHubData() {
    try {
      // Show loading state
      repoElement.innerText = "...";
      followersElement.innerText = "...";
      refreshTimeElement.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Fetching live data...';
      
      // Fetch from GitHub API
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Update with live data
        repoElement.innerText = data.public_repos || 0;
        followersElement.innerText = data.followers || 0;
        
        // Update timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        refreshTimeElement.innerHTML = `<i class="fas fa-check-circle"></i> Updated at ${timeString} • Live from GitHub`;
        
        console.log("✅ GitHub data fetched:", {
          repos: data.public_repos,
          followers: data.followers
        });
      } else {
        // If API fails, use fallback values
        repoElement.innerText = "3";
        followersElement.innerText = "1";
        refreshTimeElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Using cached data • GitHub API limit';
      }
      
    } catch (error) {
      console.error("GitHub API Error:", error);
      // Fallback values
      repoElement.innerText = "3";
      followersElement.innerText = "1";
      refreshTimeElement.innerHTML = '<i class="fas fa-wifi"></i> Offline mode • Using saved data';
    }
  }
  
  // Load data immediately when page loads
  fetchLiveGitHubData();
  
  // OPTIONAL: Refresh data every 5 minutes (300,000 milliseconds)
  setInterval(fetchLiveGitHubData, 300000);
</script>