(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const state = {
    currentPage: "home",
    theme: localStorage.getItem("ielts-theme") || "dark",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    magneticEnabled: true,
    threeReady: false,
    searchOpen: false,
    commandOpen: false
  };

  const pageTransition = $(".page-transition");
  const body = document.body;

  function applyTheme(theme) {
    state.theme = theme;
    body.classList.toggle("light", theme === "light");
    localStorage.setItem("ielts-theme", theme);
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  }

  function initTheme() {
    applyTheme(state.theme);
    $("#themeToggle")?.addEventListener("click", toggleTheme);
  }

  function initLoader() {
    const loader = $("#app-loader");
    if (!loader) return;

    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("loaded"), 550);
    });
  }

  function setNavActive(targetId) {
    $$(".nav-link").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.go === targetId);
    });
  }

  function pageTransitionIn() {
    pageTransition?.classList.add("active");
  }

  function pageTransitionOut() {
    setTimeout(() => pageTransition?.classList.remove("active"), 220);
  }

  function showPage(id) {
    if (!id || id === state.currentPage) return;

    pageTransitionIn();

    setTimeout(() => {
      $$(".page").forEach(page => page.classList.remove("page-active"));
      const target = document.getElementById(id);
      if (target) {
        target.classList.add("page-active");
        state.currentPage = id;
        setNavActive(id);
        window.scrollTo({ top: 0, behavior: state.reducedMotion ? "auto" : "smooth" });
      }
      pageTransitionOut();
    }, 180);
  }

  function initNavigation() {
    $$("[data-go]").forEach(btn => {
      btn.addEventListener("click", () => showPage(btn.dataset.go));
    });

    $$("button.footer-link").forEach(btn => {
      btn.addEventListener("click", () => showPage(btn.dataset.go));
    });
  }

  function initHeaderScrollState() {
    const header = $("#siteHeader .navbar");
    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initScrollProgress() {
    const bar = $("#scrollProgress");
    const update = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (bar) bar.style.width = `${progress}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initRevealAnimations() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (state.reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

    items.forEach(item => observer.observe(item));
  }

  function initSplitText() {
    $$(".split-text").forEach(el => {
      const text = el.textContent.trim();
      el.textContent = "";
      const words = text.split(" ");
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "split-word";
        span.style.animationDelay = `${i * 60}ms`;
        span.textContent = `${word} `;
        el.appendChild(span);
      });
    });
  }

  function initTypewriter() {
    const el = $("#typewriterText");
    if (!el) return;

    const lines = [
      "Elegant weekly IELTS practice.",
      "Structured writing and speaking flow.",
      "Beautifully readable in dark and light.",
      "Private study space with premium motion."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = lines[lineIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }
      setTimeout(tick, deleting ? 36 : 56);
    }

    tick();
  }

  function initCounters() {
    const counters = $$("[data-counter]");
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = Number(el.dataset.counter || 0);
      const duration = 1200;
      const start = performance.now();

      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      };

      requestAnimationFrame(step);
    };

    if (state.reducedMotion) {
      counters.forEach(el => el.textContent = el.dataset.counter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
  }

  function initCursor() {
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (!dot || !ring || state.reducedMotion || window.innerWidth < 821) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const hoverTargets = "button, a, .content-card, .feature-card, .floating-panel, .theme-toggle, .icon-btn";

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("cursor-hover");
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("cursor-hover");
    });

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    animate();
  }

  function initMagnetic() {
    if (state.reducedMotion) return;
    const items = $$(".magnetic");

    items.forEach(item => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0,0)";
      });
    });
  }

  function initTiltCards() {
    if (state.reducedMotion) return;

    const cards = $$(".tilt-card, .content-card");

    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function escapeHTML(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildWritingCards() {
    const grid = $("#writingGrid");
    const count = $("#writingCount");
    if (!grid || !Array.isArray(window.writingTopics)) return;

    grid.innerHTML = "";

    window.writingTopics.forEach((topic, index) => {
      const article = document.createElement("article");
      article.className = "content-card reveal";
      article.innerHTML = `
        <div class="card-topline">Writing Task ${index + 1}</div>
        <div class="card-body">
          <h3>${escapeHTML(topic.title || "Untitled Topic")}</h3>
          <p>${escapeHTML(topic.prompt || "")}</p>
          <div class="card-footer">
            <span class="tag">IELTS GT</span>
            <span class="tag">Letter Writing</span>
          </div>
          <div class="accordion">
            <button class="accordion-btn magnetic" type="button">
              <span>Open task details</span>
              <span>+</span>
            </button>
            <div class="accordion-panel">
              <div class="accordion-panel-inner">
                <p>This item comes from <code>data/writing.js</code>.</p>
                <p>You can replace this task by editing the corresponding object in that file.</p>
              </div>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(article);
    });

    if (count) count.textContent = `${window.writingTopics.length} tasks loaded`;
  }

  function buildSpeakingCards() {
    const grid = $("#speakingGrid");
    const count = $("#speakingCount");
    if (!grid || !Array.isArray(window.speakingCueCards)) return;

    grid.innerHTML = "";

    window.speakingCueCards.forEach((card, index) => {
      const points = Array.isArray(card.points)
        ? card.points
        : [card.point1, card.point2, card.point3, card.point4].filter(Boolean);

      const followUps = Array.isArray(card.followUpQuestions)
        ? card.followUpQuestions
        : [];

      const article = document.createElement("article");
      article.className = "content-card reveal";
      article.innerHTML = `
        <div class="card-topline">Cue Card ${index + 1}</div>
        <div class="card-body">
          <h3>${escapeHTML(card.title || "Untitled Cue Card")}</h3>
          <p><strong>You should say:</strong></p>
          <ul>
            ${points.map(point => `<li>${escapeHTML(point)}</li>`).join("")}
          </ul>

          <div class="card-footer">
            <span class="tag">IELTS Speaking</span>
            <span class="tag">B1 Level</span>
          </div>

          <div class="accordion">
            <button class="accordion-btn magnetic" type="button">
              <span>Follow-up questions</span>
              <span>+</span>
            </button>
            <div class="accordion-panel">
              <div class="accordion-panel-inner">
                <div class="follow-questions">
                  ${
                    followUps.length
                      ? followUps.map(q => `<p>${escapeHTML(q)}</p>`).join("")
                      : "<p>No follow-up questions added yet in <code>data/speaking.js</code>.</p>"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(article);
    });

    if (count) count.textContent = `${window.speakingCueCards.length} cards loaded`;
  }

  function initAccordions() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".accordion-btn");
      if (!btn) return;

      const card = btn.closest(".content-card");
      card?.classList.toggle("open");
      const icon = btn.lastElementChild;
      if (icon) icon.textContent = card?.classList.contains("open") ? "−" : "+";
    });

    $("#expandWritingBtn")?.addEventListener("click", () => {
      $$("#writingGrid .content-card").forEach(card => {
        card.classList.add("open");
        const icon = $(".accordion-btn span:last-child", card);
        if (icon) icon.textContent = "−";
      });
    });

    $("#collapseWritingBtn")?.addEventListener("click", () => {
      $$("#writingGrid .content-card").forEach(card => {
        card.classList.remove("open");
        const icon = $(".accordion-btn span:last-child", card);
        if (icon) icon.textContent = "+";
      });
    });

    $("#expandSpeakingBtn")?.addEventListener("click", () => {
      $$("#speakingGrid .content-card").forEach(card => {
        card.classList.add("open");
        const icon = $(".accordion-btn span:last-child", card);
        if (icon) icon.textContent = "−";
      });
    });

    $("#collapseSpeakingBtn")?.addEventListener("click", () => {
      $$("#speakingGrid .content-card").forEach(card => {
        card.classList.remove("open");
        const icon = $(".accordion-btn span:last-child", card);
        if (icon) icon.textContent = "+";
      });
    });
  }

  function openSearch() {
    const overlay = $("#searchOverlay");
    overlay?.classList.add("open");
    state.searchOpen = true;
    $("#searchInput")?.focus();
  }

  function closeSearch() {
    const overlay = $("#searchOverlay");
    overlay?.classList.remove("open");
    state.searchOpen = false;
  }

  function openCommandPalette() {
    $("#commandPalette")?.classList.add("open");
    state.commandOpen = true;
  }

  function closeCommandPalette() {
    $("#commandPalette")?.classList.remove("open");
    state.commandOpen = false;
  }

  function buildSearchResults(query) {
    const results = $("#searchResults");
    if (!results) return;

    const q = query.trim().toLowerCase();
    results.innerHTML = "";

    if (!q) {
      results.innerHTML = `<div class="search-item">Type to search writing topics or speaking cue cards.</div>`;
      return;
    }

    const writingMatches = Array.isArray(window.writingTopics)
      ? window.writingTopics
          .filter(item =>
            (item.title || "").toLowerCase().includes(q) ||
            (item.prompt || "").toLowerCase().includes(q)
          )
          .map(item => ({ type: "Writing", title: item.title, text: item.prompt, page: "writing" }))
      : [];

    const speakingMatches = Array.isArray(window.speakingCueCards)
      ? window.speakingCueCards
          .filter(item =>
            (item.title || "").toLowerCase().includes(q) ||
            (Array.isArray(item.points) ? item.points.join(" ") : "").toLowerCase().includes(q)
          )
          .map(item => ({ type: "Speaking", title: item.title, text: "Cue card match found", page: "speaking" }))
      : [];

    const combined = [...writingMatches, ...speakingMatches].slice(0, 10);

    if (!combined.length) {
      results.innerHTML = `<div class="search-item">No results found.</div>`;
      return;
    }

    combined.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "search-item magnetic";
      btn.innerHTML = `
        <strong>${escapeHTML(item.type)} — ${escapeHTML(item.title || "Untitled")}</strong>
        <div>${escapeHTML(item.text || "")}</div>
      `;
      btn.addEventListener("click", () => {
        closeSearch();
        showPage(item.page);
      });
      results.appendChild(btn);
    });
  }

  function initSearchAndCommands() {
    $("#openSearchBtn")?.addEventListener("click", openSearch);
    $("#closeSearchBtn")?.addEventListener("click", closeSearch);
    $("#searchOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "searchOverlay") closeSearch();
    });

    $("#searchInput")?.addEventListener("input", (e) => {
      buildSearchResults(e.target.value);
    });

    $$(".command-item").forEach(item => {
      item.addEventListener("click", () => {
        const go = item.dataset.go;
        const action = item.dataset.action;
        if (go) showPage(go);
        if (action === "theme") toggleTheme();
        if (action === "search") {
          closeCommandPalette();
          openSearch();
        } else {
          closeCommandPalette();
        }
      });
    });

    $("#commandPalette")?.addEventListener("click", (e) => {
      if (e.target.id === "commandPalette") closeCommandPalette();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        state.commandOpen ? closeCommandPalette() : openCommandPalette();
      }

      if (e.key === "/") {
        const tag = document.activeElement?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          openSearch();
        }
      }

      if (e.key === "Escape") {
        closeSearch();
        closeCommandPalette();
      }

      if (!state.searchOpen && !state.commandOpen) {
        if (e.key === "1") showPage("home");
        if (e.key === "2") showPage("writing");
        if (e.key === "3") showPage("speaking");
      }
    });

    buildSearchResults("");
  }

  function initParallax() {
    if (state.reducedMotion) return;

    const hero = $(".hero");
    const panels = $$(".floating-panel");

    window.addEventListener("mousemove", (e) => {
      if (!hero) return;
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);

      panels.forEach((panel, index) => {
        const depth = (index + 1) * 8;
        panel.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
  }

  function initThreeBackground() {
    if (state.reducedMotion || typeof THREE === "undefined") return;

    const canvas = document.getElementById("three-bg");
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 38;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const sprites = [];
    const pointer = { x: 0, y: 0 };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    renderer.setPixelRatio(dpr);

    const makeLetterSprite = (letter) => {
      const size = 128;
      const cvs = document.createElement("canvas");
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext("2d");

      ctx.clearRect(0, 0, size, size);
      ctx.font = "700 84px Sora, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,122,0,0.84)";
      ctx.fillText(letter, size / 2, size / 2);

      const texture = new THREE.CanvasTexture(cvs);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.58,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(material);
      return sprite;
    };

    for (let i = 0; i < 40; i++) {
      const letter = letters[i % letters.length];
      const sprite = makeLetterSprite(letter);
      sprite.position.set(
        (Math.random() - 0.5) * 52,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 24
      );
      const scale = 1.2 + Math.random() * 1.8;
      sprite.scale.set(scale, scale, 1);
      sprite.userData = {
        speed: 0.001 + Math.random() * 0.002,
        offset: Math.random() * Math.PI * 2,
        originX: sprite.position.x,
        originY: sprite.position.y,
        originZ: sprite.position.z
      };
      scene.add(sprite);
      sprites.push(sprite);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 120;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 70;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffa24d,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    let rafId;

    const animate = (time) => {
      const t = time * 0.001;

      sprites.forEach((sprite, i) => {
        sprite.position.x = sprite.userData.originX + Math.cos(t + sprite.userData.offset) * 0.35 + pointer.x * (0.3 + i * 0.003);
        sprite.position.y = sprite.userData.originY + Math.sin(t * 1.2 + sprite.userData.offset) * 0.28 - pointer.y * (0.28 + i * 0.002);
        sprite.material.opacity = 0.34 + Math.sin(t + i) * 0.12;
      });

      particles.rotation.y += 0.0007;
      scene.rotation.y += (pointer.x * 0.08 - scene.rotation.y) * 0.03;
      scene.rotation.x += (-pointer.y * 0.05 - scene.rotation.x) * 0.03;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(animate);
    });

    state.threeReady = true;
  }

  function initReducedMotionSupport() {
    if (state.reducedMotion) {
      body.classList.add("reduce-motion");
    }
  }

  function boot() {
    initReducedMotionSupport();
    initTheme();
    initLoader();
    initNavigation();
    initHeaderScrollState();
    initScrollProgress();
    initSplitText();
    buildWritingCards();
    buildSpeakingCards();
    initRevealAnimations();
    initTypewriter();
    initCounters();
    initCursor();
    initMagnetic();
    initTiltCards();
    initAccordions();
    initSearchAndCommands();
    initParallax();
    initThreeBackground();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
