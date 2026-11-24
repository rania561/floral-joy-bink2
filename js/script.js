/* FLORAL JOY — Multipage Soft Pink Luxury Controller */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const DATA = window.FJ_DATA;
  if (!DATA || !Array.isArray(DATA.occasions) || !DATA.images) return;

  const state = { filter: 'all', search: '', toastTimer: null };
  const whatsappUrl = `https://wa.me/${String(DATA.whatsapp || '966501707487').replace(/\D/g, '')}`;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function imageUrl(key) {
    return DATA.images[key] || DATA.images.hero || '';
  }

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 4500);
  }

  function setImageFallback(img) {
    if (!img || img.dataset.fallbackBound === '1') return;
    img.dataset.fallbackBound = '1';
    img.addEventListener('error', () => {
      const fallback = imageUrl('hero');
      if (fallback && !img.dataset.fallbackUsed) {
        img.dataset.fallbackUsed = '1';
        img.src = fallback;
      }
    });
  }

  function observeReveals(root = document) {
    const targets = $$('.reveal:not(.is-visible)', root);
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    targets.forEach(el => observer.observe(el));
  }

  function openSalla(key) {
    const url = DATA.sallaLinks && DATA.sallaLinks[key];
    if (typeof url === 'string' && /^https:\/\//i.test(url.trim())) {
      window.open(url.trim(), '_blank', 'noopener,noreferrer');
      return;
    }
    showToast('رابط تصنيف هذه المناسبة في سلة جاهز للربط داخل sallaLinks في js/data.js.');
  }

  function renderEvents(filter = state.filter) {
    state.filter = filter;
    const grid = $('#eventsGrid');
    if (!grid) return;

    const q = state.search.trim().toLowerCase();
    const items = DATA.occasions.filter(item => {
      const matchesGroup = filter === 'all' || item.group === filter;
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });

    const counter = $('#eventCount');
    if (counter) counter.textContent = String(items.length);

    grid.innerHTML = items.map((item, index) => `
      <article class="event-card reveal" style="--card-delay:${Math.min(index, 8) * 50}ms">
        <button class="event-card-open" type="button" data-occasion="${escapeHtml(item.id)}" aria-label="معاينة ${escapeHtml(item.name)}">
          <span class="event-image-wrap">
            <img src="${escapeHtml(imageUrl(item.image))}" alt="تنسيق ${escapeHtml(item.name)} — زهور وديكورات دون أشخاص" loading="lazy">
            <span class="image-shade" aria-hidden="true"></span>
            <span class="discount-tag">خصم ${Number(DATA.discount) || 30}%</span>
            <span class="image-open" aria-hidden="true"><i class="fa-solid fa-eye"></i></span>
          </span>
          <span class="event-card-content">
            <span class="event-overline">FLORAL JOY COLLECTION</span>
            <strong>${escapeHtml(item.name)}</strong>
            <span class="event-desc">${escapeHtml(item.desc)}</span>
            <span class="event-link">معاينة الطاولات وركن الضيافة <i class="fa-solid fa-arrow-left"></i></span>
          </span>
        </button>
      </article>`).join('');

    $$('.event-card img', grid).forEach(setImageFallback);
    $$('.event-card-open', grid).forEach(btn => {
      btn.addEventListener('click', () => openOccasion(btn.dataset.occasion));
    });
    $$('.filter-btn').forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    observeReveals(grid);
  }

  function openOccasion(id) {
    const item = DATA.occasions.find(entry => entry.id === id);
    const modal = $('#fjOccasionModal');
    if (!item || !modal) return;

    $('#fjModalTitle').textContent = item.name;
    $('#fjModalDesc').textContent = item.desc;

    const zones = [
      { zone: 'main', badge: 'إلهام وتنسيق', title: `${item.name} · التنسيق الرئيسي`, desc: 'صورة إلهامية للتنسيق العام والزهور والألوان.', imgKey: item.image },
      { zone: 'tables', badge: 'إلهام وتنسيق', title: `${item.name} · تفاصيل الطاولات`, desc: 'أفكار لطاولات الضيافة والشموع وتوزيع الزهور.', imgKey: item.tableImg || 'table' },
      { zone: 'hospitality', badge: 'إلهام وتنسيق', title: `${item.name} · ركن الضيافة`, desc: 'إلهام لتنسيق ركن الاستقبال والحلوى والتفاصيل.', imgKey: item.hospitalityImg || 'dessert' }
    ];

    const renderZones = (filterZone = 'all') => {
      const list = filterZone === 'all' ? zones : zones.filter(z => z.zone === filterZone);
      const grid = $('#fjModalGrid');
      grid.innerHTML = list.map(z => `
        <article class="fj-zone-card">
          <div class="fj-zone-img-wrap">
            <img src="${escapeHtml(imageUrl(z.imgKey))}" alt="${escapeHtml(z.title)} — صورة إلهامية دون أشخاص" loading="lazy">
            <span class="fj-zone-tag">${escapeHtml(z.badge)}</span>
          </div>
          <div class="fj-zone-body">
            <span class="fj-zone-kicker">FLORAL JOY · INSPIRATION</span>
            <h3>${escapeHtml(z.title)}</h3>
            <p>${escapeHtml(z.desc)}</p>
            <button type="button" class="btn btn-outline modal-salla-btn" data-salla-key="${escapeHtml(item.sallaKey)}">
              زيارة تصنيف المناسبة في سلة <i class="fa-solid fa-arrow-left"></i>
            </button>
          </div>
        </article>
      `).join('');

      $$('img', grid).forEach(setImageFallback);
      $$('.modal-salla-btn', grid).forEach(btn => {
        btn.addEventListener('click', () => openSalla(btn.dataset.sallaKey));
      });
    };

    $$('.fj-tab-btn', modal).forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.zone === 'all');
      btn.onclick = () => {
        $$('.fj-tab-btn', modal).forEach(b => b.classList.toggle('is-active', b === btn));
        renderZones(btn.dataset.zone);
      };
    });

    const detailsBtn = $('#fjModalDetailsBtn');
    if (detailsBtn) detailsBtn.href = `event-details.html?id=${encodeURIComponent(item.id)}`;

    const sallaBtn = $('#fjModalSallaBtn');
    if (sallaBtn) {
      sallaBtn.onclick = (e) => {
        e.preventDefault();
        openSalla(item.sallaKey);
      };
    }

    renderZones('all');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    $('#fjModalClose').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
  }

  function renderDetailsPage() {
    const titleEl = $('#detailTitle');
    if (!titleEl) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || DATA.occasions[0].id;
    const item = DATA.occasions.find(o => o.id === id) || DATA.occasions[0];

    titleEl.textContent = item.name;
    $('#detailCrumb').textContent = item.name;
    $('#detailDesc').textContent = item.desc;
    const mainImg = $('#detailMainImg');
    if (mainImg) {
      mainImg.src = imageUrl(item.image);
      setImageFallback(mainImg);
    }

    const sallaLink = $('#detailSallaLink');
    if (sallaLink) {
      sallaLink.onclick = (e) => {
        e.preventDefault();
        openSalla(item.sallaKey);
      };
    }
    const waLink = $('#detailWaLink');
    if (waLink) {
      waLink.href = `${whatsappUrl}?text=${encodeURIComponent(`مرحباً FLORAL JOY، أرغب بحجز وتنسيق (${item.name}).`)}`;
    }

    const zonesGrid = $('#detailZonesGrid');
    if (zonesGrid) {
      const zList = [
        { title: 'التنسيق الرئيسي', desc: 'تنسيق الزهور والمدخل بألوان ناعمة.', img: item.image },
        { title: 'تفاصيل الطاولات', desc: 'ترتيب الطاولات والشموع والزهور.', img: item.tableImg || 'table' },
        { title: 'ركن الضيافة', desc: 'ركن ضيافة واستقبال أنيق للضيوف.', img: item.hospitalityImg || 'dessert' }
      ];
      zonesGrid.innerHTML = zList.map(z => `
        <div class="zone-box">
          <img src="${escapeHtml(imageUrl(z.img))}" alt="${escapeHtml(z.title)}" loading="lazy">
          <div class="zone-box-body">
            <h3>${escapeHtml(z.title)}</h3>
            <p>${escapeHtml(z.desc)}</p>
          </div>
        </div>
      `).join('');
      $$('img', zonesGrid).forEach(setImageFallback);
    }
  }

  function populateAISelect() {
    const select = $('#aiEventType');
    if (!select) return;
    select.innerHTML = DATA.occasions.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join('');
  }

  function generatePlan() {
    const occasionId = $('#aiEventType')?.value;
    const item = DATA.occasions.find(entry => entry.id === occasionId) || DATA.occasions[0];
    if (!item) return;

    const style = $('#aiStyle')?.value || 'soft';
    const guests = Math.max(1, Number($('#aiGuests')?.value || 60));
    const level = $('#aiBudget')?.value || 'balanced';

    const styleMap = {
      soft: { name: 'ناعم وهادئ', desc: 'عاجي دافئ مع وردي غباري وخوخي ولمسات شامبين خفيفة.', colors: ['#fff8f4', '#efd4d4', '#f2d8c7', '#e6d7bd'] },
      romantic: { name: 'رومانسي', desc: 'درجات وردية رقيقة مع زهور كريمية وتفاصيل أنثوية ناعمة.', colors: ['#fff7f3', '#e9bdc7', '#f1d4c9', '#d8c8d0'] },
      classic: { name: 'كلاسيكي', desc: 'عاجي وشامبين وذهبي فاتح مع تنسيقات زهور بيضاء.', colors: ['#fffaf0', '#eee4d2', '#d9c5a4', '#f6eee2'] },
      garden: { name: 'حدائقي طبيعي', desc: 'أخضر مريمي خفيف مع أبيض وكريمي وورود طبيعية.', colors: ['#f9f8f1', '#dbe4d6', '#f2e8dc', '#e8d5d2'] }
    };
    const palette = styleMap[style] || styleMap.soft;

    $('#resTitle').textContent = `${item.name} · ${palette.name}`;
    $('#resDesc').textContent = `تصور مبدئي لـ ${guests} ضيفًا: ${palette.desc}`;
    $('#resSwatches').innerHTML = palette.colors.map(c => `<span style="background:${c}"></span>`).join('');
    $('#resFeatures').innerHTML = [
      'تنسيق زهور رئيسي بدرجات متناسقة مع الثيم.',
      'طاولات ضيافة مرتبة مع شموع وإضاءة ناعمة.',
      'ركن استقبال وحلوى متناغم مع هوية المناسبة.'
    ].map(t => `<li><i class="fa-solid fa-check"></i> ${t}</li>`).join('');

    const goCat = $('#aiGoCategory');
    if (goCat) goCat.href = `event-details.html?id=${encodeURIComponent(item.id)}`;

    const waMsg = encodeURIComponent(`مرحباً FLORAL JOY، صممت خطة مناسبة:\n- المناسبة: ${item.name}\n- الستايل: ${palette.name}\n- الضيوف: ${guests}\n- المستوى: ${level}`);
    $('#aiSendWhatsapp').href = `${whatsappUrl}?text=${waMsg}`;

    const result = $('#aiResult');
    result.hidden = false;
  }

  function renderPortfolio() {
    const grid = $('#portfolioGrid');
    if (!grid) return;
    grid.innerHTML = (DATA.inspirations || []).map((item, idx) => `
      <figure class="portfolio-item reveal">
        <img src="${escapeHtml(imageUrl(item.image))}" alt="${escapeHtml(item.alt)}" loading="lazy">
        <figcaption><span>${String(idx + 1).padStart(2, '0')}</span><strong>${escapeHtml(item.title)}</strong></figcaption>
      </figure>`).join('');
    $$('img', grid).forEach(setImageFallback);
    observeReveals(grid);
  }

  function setupChatbot() {
    const toggle = $('#fjChatToggle');
    const box = $('#fjChatBox');
    const close = $('#fjChatClose');
    const msgs = $('#fjChatMsgs');
    const form = $('#fjChatForm');
    const input = $('#fjChatInput');
    if (!toggle || !box) return;

    const addMsg = (text, who) => {
      const div = document.createElement('div');
      div.className = `fj-msg ${who}`;
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    };

    const replyTo = (q) => {
      if (q.includes('سلة') || q.includes('دفع') || q.includes('حجز')) {
        addMsg('اختاري مناسبتكِ من القائمة، ثم اضغطي على "زيارة تصنيف المناسبة في سلة" لإتمام الطلب والدفع الآمن.', 'bot');
      } else if (q.includes('خصم')) {
        addMsg('يتوفر حالياً خصم حصري 30% لفترة محدودة على باقات تنسيق المناسبات.', 'bot');
      } else if (q.includes('واتساب')) {
        addMsg('يسعدنا تواصلكِ المباشر عبر واتساب على الرقم +966 50 170 7487.', 'bot');
      } else {
        addMsg('يمكنكِ الانتقال بين صفحات المناسبات ومصمم الذكاء الاصطناعي ومعرض الأعمال من القائمة العلوية.', 'bot');
      }
    };

    toggle.addEventListener('click', () => box.classList.toggle('is-open'));
    close?.addEventListener('click', () => box.classList.remove('is-open'));

    $$('.fj-chat-quick button').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.q || btn.textContent;
        addMsg(q, 'user');
        replyTo(q);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      addMsg(val, 'user');
      input.value = '';
      replyTo(val);
    });
  }

  function init() {
    renderEvents('all');
    renderDetailsPage();
    renderPortfolio();
    populateAISelect();
    setupChatbot();

    const year = $('#yearNow');
    if (year) year.textContent = String(new Date().getFullYear());

    $$('.filter-btn').forEach(btn => btn.addEventListener('click', () => renderEvents(btn.dataset.filter || 'all')));
    $('#eventSearchInput')?.addEventListener('input', e => {
      state.search = e.target.value || '';
      renderEvents(state.filter);
    });

    $$('#categoryQuickLinks [data-category]').forEach(btn => btn.addEventListener('click', () => {
      renderEvents(btn.dataset.category || 'all');
      $('#events-catalog')?.scrollIntoView({ behavior: 'smooth' });
    }));

    $('#aiGuests')?.addEventListener('input', e => {
      $('#guestCountVal').textContent = e.target.value;
    });
    $('#generatePlan')?.addEventListener('click', generatePlan);

    $('#contactPageForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#contactName')?.value || '';
      const phone = $('#contactPhone')?.value || '';
      const msg = $('#contactMsg')?.value || '';
      const txt = encodeURIComponent(`مرحباً FLORAL JOY،
الاسم: ${name}
الجوال: ${phone}
التفاصيل: ${msg}`);
      window.open(`${whatsappUrl}?text=${txt}`, '_blank', 'noopener,noreferrer');
    });

    const menuToggle = $('#menuToggle');
    const navLinks = $('#navLinks');
    menuToggle?.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    $('#backTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      $('#backTop')?.classList.toggle('visible', window.scrollY > 550);
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $('#fjOccasionModal')?.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    observeReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
