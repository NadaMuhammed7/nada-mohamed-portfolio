// Nada Mohamed — Engineering & Analytics Portfolio Hub
// Interactive Engine v3 — Multi-Domain Dynamic Architecture
(function () {
  'use strict';

  // DOM Elements
  const domainNav   = document.getElementById('domainNav');
  const heroChip    = document.getElementById('heroChip');
  const heroTitle   = document.getElementById('heroTitle');
  const heroSub     = document.getElementById('heroSub');
  const kpiStrip    = document.getElementById('kpiStrip');
  const filterTabs  = document.getElementById('filterTabs');
  const searchInput = document.getElementById('searchInput');
  const grid        = document.getElementById('cardsGrid');
  const overlay     = document.getElementById('modalOverlay');
  const modalX      = document.getElementById('modalX');
  const mDomain     = document.getElementById('mDomain');
  const mTitle      = document.getElementById('mTitle');
  const modalBody   = document.getElementById('modalBody');

  // State
  let activeDomain = 'ai-ml'; // Default starting domain per user request
  let activeCat    = 'all';
  let searchTerm   = '';

  const domains = window.PORTFOLIO_DOMAINS || {};

  /* Helpers */
  function firstImage(p) {
    return Array.isArray(p.previewImages) && p.previewImages.length > 0
      ? p.previewImages[0]
      : (p.previewImage || '');
  }

  function placeholderHTML(label) {
    return `<div class="card-img-placeholder">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Visual preview available in case study</span>
    </div>`;
  }
  window.placeholderHTML = placeholderHTML;

  function cardImgTag(src, alt) {
    if (!src) return placeholderHTML(alt);
    return `<img src="${src}" alt="${alt}" loading="lazy"
              onerror="this.outerHTML=window.placeholderHTML('${alt.replace(/'/g, '')}')">`;
  }

  /* Build image gallery for modal */
  function buildGallery(p) {
    const images = Array.isArray(p.previewImages) && p.previewImages.length
      ? p.previewImages
      : (p.previewImage ? [p.previewImage] : []);

    if (images.length === 0) return '';

    if (images.length === 1) {
      return `
        <div class="modal-screenshot" style="flex-shrink:0;">
          <img src="${images[0]}" alt="${p.title} preview" loading="lazy"
               onerror="this.parentNode.innerHTML=window.placeholderHTML('${p.title.replace(/'/g, '')}')">
        </div>`;
    }

    const defLabels = ['Overview', 'Detail View', 'View 3', 'View 4'];
    const pLabels = p.previewLabels || defLabels;
    const tabs = images.map((src, i) => {
      const lbl = pLabels[i] || defLabels[i] || ('View ' + (i + 1));
      return `<button class="img-tab ${i === 0 ? 'active' : ''}"
                      data-idx="${i}" onclick="window._switchImg(this)">
                ${lbl}
              </button>`;
    }).join('');

    const slides = images.map((src, i) => `
      <div class="img-slide ${i === 0 ? 'active' : ''}" data-idx="${i}">
        <img src="${src}" alt="${p.title} — view ${i + 1}" loading="lazy"
             onerror="this.parentNode.innerHTML=window.placeholderHTML('${p.title.replace(/'/g, '')}')">
      </div>`).join('');

    return `
      <div class="modal-gallery">
        <div class="img-tabs">${tabs}</div>
        <div class="img-slides">${slides}</div>
      </div>`;
  }

  window._switchImg = function (btn) {
    const gallery = btn.closest('.modal-gallery');
    const idx = btn.dataset.idx;
    gallery.querySelectorAll('.img-tab').forEach(b => b.classList.toggle('active', b.dataset.idx === idx));
    gallery.querySelectorAll('.img-slide').forEach(s => s.classList.toggle('active', s.dataset.idx === idx));
  };

  /* Switch Domain */
  function switchDomain(domainId, updateHash = true) {
    if (!domains[domainId]) domainId = 'bi-analytics';
    activeDomain = domainId;
    activeCat    = 'all';
    searchTerm   = '';
    if (searchInput) searchInput.value = '';

    if (updateHash && window.location.hash !== '#' + domainId) {
      window.location.hash = '#' + domainId;
    }

    // Update Domain Nav Pills
    if (domainNav) {
      domainNav.querySelectorAll('.domain').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.domain === domainId);
      });
    }

    const domData = domains[domainId];
    if (!domData) return;

    // Update Hero Content
    if (heroChip) heroChip.textContent = domData.chip;
    if (heroTitle) heroTitle.innerHTML = domData.title;
    if (heroSub) heroSub.innerHTML     = domData.sub;

    // Update Search Placeholder per domain
    if (searchInput) {
      if (domainId === 'ai-ml') {
        searchInput.placeholder = 'Search AI models & vision systems...';
      } else if (domainId === 'data-engineering') {
        searchInput.placeholder = 'Search data pipelines & lakehouse architectures...';
      } else if (domainId === 'power-apps') {
        searchInput.placeholder = 'Search Power Apps & mobile solutions...';
      } else {
        searchInput.placeholder = 'Search BI dashboards...';
      }
    }

    // Update KPI Strip
    if (kpiStrip && Array.isArray(domData.kpis)) {
      kpiStrip.innerHTML = domData.kpis.map(k => `
        <div class="kpi"><span class="kpi-n">${k.n}</span><span class="kpi-l">${k.l}</span></div>
      `).join('');
    }

    // Update Category Filter Tabs
    if (filterTabs && Array.isArray(domData.categories)) {
      filterTabs.innerHTML = domData.categories.map((c, i) => `
        <button class="ftab ${i === 0 ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>
      `).join('');
    }

    // Render Grid
    renderGrid();
  }

  /* Render Grid */
  function renderGrid() {
    const domData = domains[activeDomain];
    if (!domData || !grid) return;

    const items = (domData.projects || []).filter(p => {
      const catOk    = activeCat === 'all' || p.category === activeCat;
      const q        = searchTerm.toLowerCase();
      const searchOk = !q || p.title.toLowerCase().includes(q)
                          || (p.summary && p.summary.toLowerCase().includes(q))
                          || (p.categoryName && p.categoryName.toLowerCase().includes(q))
                          || (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q)));
      return catOk && searchOk;
    });

    if (items.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:4rem;color:#64748b;font-weight:600;">No projects match your filter — try selecting 'All' or clearing your search.</p>`;
      return;
    }

    grid.innerHTML = items.map(p => {
      const imgSrc = firstImage(p);
      return `
        <article class="dash-card" data-id="${p.id}">
          <div class="card-img">
            ${cardImgTag(imgSrc, p.title)}
            <span class="card-badge">${p.badge}</span>
          </div>
          <div class="card-body">
            <p class="card-domain">${p.categoryName}</p>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-summary">${p.summary}</p>
            <div class="card-cta">
              <span>View Case Study</span>
              <span>&rarr;</span>
            </div>
          </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('.dash-card').forEach(card =>
      card.addEventListener('click', () => openModal(card.dataset.id))
    );
  }

  /* Find Project across domains */
  function findProject(id) {
    const currentList = (domains[activeDomain] && domains[activeDomain].projects) || [];
    let p = currentList.find(x => x.id === id);
    if (p) return p;

    // Fallback search across all domains
    for (const key in domains) {
      const match = (domains[key].projects || []).find(x => x.id === id);
      if (match) return match;
    }
    return null;
  }

  /* Open Modal */
  function openModal(id) {
    const p = findProject(id);
    if (!p) return;

    mDomain.textContent = p.categoryName || '';
    mTitle.textContent  = p.title || '';

    // 1. Video Section (if applicable)
    let videoHTML = '';
    if (p.videoUrl) {
      videoHTML = `
        <div class="modal-video-wrap">
          <video class="modal-video" controls playsinline poster="${p.videoPoster || ''}" preload="metadata">
            <source src="${p.videoUrl}" type="video/mp4">
            Your browser does not support inline video playback.
          </video>
        </div>`;
    }

    // 2. SQL Query Logic / Technical Architecture (for BI, Data Engineering, Power Apps)
    let queryHTML = '';
    if (Array.isArray(p.query_logic) && p.query_logic.length) {
      const sectionTitle = p.query_logic_title ? p.query_logic_title.replace(/&#\d+;|\p{Extended_Pictographic}/gu, '').trim() : 'Technical Architecture';
      const items = p.query_logic.map(q => `
        <div class="query-item">
          <span class="query-fn">${q.fn}</span>
          <p class="query-why">${q.why}</p>
        </div>`).join('');
      queryHTML = `
        <div class="m-section">
          <h3 class="m-section-title">${sectionTitle}</h3>
          <div class="query-grid">${items}</div>
        </div>`;
    }

    // 3. AI / Deep Learning Pipeline (for AI/ML)
    let aiPipelineHTML = '';
    if (Array.isArray(p.ai_pipeline) && p.ai_pipeline.length) {
      const items = p.ai_pipeline.map(step => `
        <div class="query-item">
          <span class="query-fn" style="color:var(--b700);">${step.component}</span>
          <p class="query-why">${step.detail}</p>
        </div>`).join('');
      aiPipelineHTML = `
        <div class="m-section">
          <h3 class="m-section-title">Deep Learning &amp; System Architecture</h3>
          <div class="query-grid">${items}</div>
        </div>`;
    }

    // 4. Hardware Bill of Materials (BOM)
    let bomHTML = '';
    if (Array.isArray(p.hardware_bom) && p.hardware_bom.length) {
      const bomCards = p.hardware_bom.map(b => `
        <div class="bom-card">
          <div class="bom-title">${b.item}</div>
          <div class="bom-desc">${b.desc}</div>
        </div>`).join('');
      bomHTML = `
        <div class="m-section">
          <h3 class="m-section-title">Hardware Specifications &amp; BOM</h3>
          <div class="bom-grid">${bomCards}</div>
        </div>`;
    }

    // 5. Benchmark Comparison Table (In-House vs OEM)
    let benchmarkHTML = '';
    if (p.benchmark && Array.isArray(p.benchmark.rows)) {
      const rows = p.benchmark.rows.map(r => `
        <tr>
          <td><strong>${r.dimension}</strong></td>
          <td class="benchmark-inhouse">${r.inhouse}</td>
          <td class="benchmark-oem">${r.oem}</td>
        </tr>`).join('');
      benchmarkHTML = `
        <div class="m-section">
          <h3 class="m-section-title">Comparative Benchmark</h3>
          <div class="benchmark-table-wrap">
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th style="width:28%;">Evaluation Dimension</th>
                  <th style="width:36%;color:var(--b700);">${(p.benchmark && p.benchmark.inhouseTitle) || 'In-House Custom Solution'}</th>
                  <th style="width:36%;color:var(--t400);">${(p.benchmark && p.benchmark.oemTitle) || 'Turnkey OEM / Legacy Process'}</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </div>`;
    }

    // 6. Financial ROI (if available)
    let roiHTML = '';
    if (Array.isArray(p.financial_roi) && p.financial_roi.length) {
      const cards = p.financial_roi.map(r => `
        <div class="roi-card">
          <div class="roi-val">${r.val}</div>
          <div class="roi-lbl">${r.lbl}</div>
        </div>`).join('');
      roiHTML = `
        <div class="m-section">
          <h3 class="m-section-title">Business Justification &amp; ROI</h3>
          <div class="roi-grid">${cards}</div>
        </div>`;
    }

    // 7. Tags
    const tagsHTML = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    modalBody.innerHTML = `
      ${videoHTML}
      ${buildGallery(p)}

      <div class="m-section">
        <h3 class="m-section-title">Business Objective</h3>
        <p class="m-para">${p.summary}</p>
      </div>

      ${aiPipelineHTML}
      ${queryHTML}
      ${bomHTML}
      ${benchmarkHTML}
      ${roiHTML}

      <div class="m-section">
        <h3 class="m-section-title">Quantified Impact</h3>
        <div class="m-outcome">${p.outcome}</div>
      </div>

      <div class="tag-row">${tagsHTML}</div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* Close Modal */
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // Pause any playing videos inside modal
    modalBody.querySelectorAll('video').forEach(v => v.pause());
  }

  if (modalX) modalX.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* Domain Navigation Listeners */
  if (domainNav) {
    domainNav.addEventListener('click', e => {
      const btn = e.target.closest('.domain');
      if (!btn) return;
      const targetDomain = btn.dataset.domain;
      if (targetDomain && targetDomain !== activeDomain) {
        switchDomain(targetDomain);
      }
    });
  }

  /* Category Filter Listener */
  if (filterTabs) {
    filterTabs.addEventListener('click', e => {
      const btn = e.target.closest('.ftab');
      if (!btn) return;
      filterTabs.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderGrid();
    });
  }

  /* Search Listener */
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchTerm = e.target.value.trim();
      renderGrid();
    });
  }

  /* Hash Routing */
  function handleHash() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && domains[hash]) {
      switchDomain(hash, false);
    } else if (hash === 'ai' || hash === 'machine-learning') {
      switchDomain('ai-ml', true);
    } else if (hash === 'bi' || hash === 'analytics') {
      switchDomain('bi-analytics', true);
    } else if (hash === 'powerapps') {
      switchDomain('power-apps', true);
    } else {
      switchDomain(activeDomain, false);
    }
  }

  window.addEventListener('hashchange', handleHash);

  // Initialize
  handleHash();

})();
