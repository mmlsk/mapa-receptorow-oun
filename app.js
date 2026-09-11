/* ============================================================
   MAPA RECEPTORÓW OUN — app.js
   Logika renderowania, filtrowania, wyszukiwania i nawigacji.
   Stan trzymany wyłącznie w zmiennych JS (bez localStorage —
   podgląd działa w piaskownicy blokującej Web Storage).
   ============================================================ */

(function () {
  "use strict";

  // ---------- Stan aplikacji ----------
  const state = {
    theme: "dark",
    view: "atlas",
    query: "",
    activeClasses: new Set(),   // pusty = wszystkie
    activeFamilies: new Set(),  // pusty = wszystkie
    activePathway: PATHWAYS[0] ? PATHWAYS[0].id : null,
    sortKey: "name",
    sortDir: 1,
  };

  const NODE_LABELS = {
    ligand: "Ligand", receptor: "Receptor", effector: "Efektor",
    junction: "Rozwidlenie", "outcome-pos": "Skutek: wzmocnienie", "outcome-neg": "Skutek: osłabienie",
  };

  const byId = (id) => RECEPTORS.find((r) => r.id === id);
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function classColorVars(classKey) {
    const c = CLASS_META[classKey] ? CLASS_META[classKey].color : "sky";
    return { color: `var(--cat-${c})`, bg: `var(--cat-${c}-bg)` };
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[m]));
  }

  // ============================================================
  // FILTROWANIE
  // ============================================================
  function matchesFilters(r) {
    if (state.activeClasses.size && !state.activeClasses.has(r.class)) return false;
    if (state.activeFamilies.size && !state.activeFamilies.has(r.family)) return false;
    if (state.query) {
      const q = state.query.toLowerCase();
      const haystack = [
        r.name, r.genes, FAMILY_META[r.family], CLASS_META[r.class].label,
        r.localization, r.structure, r.crosstalk, r.clinical,
        (r.pharm || []).map((p) => p.drug + " " + p.note).join(" "),
      ].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function filteredReceptors() {
    return RECEPTORS.filter(matchesFilters);
  }

  // ============================================================
  // ATLAS: LEGENDA + FILTRY
  // ============================================================
  function renderLegend() {
    const wrap = $("#legendChips");
    wrap.innerHTML = Object.entries(CLASS_META).map(([key, meta]) => {
      const { color, bg } = classColorVars(key);
      return `<span class="legend-chip" style="background:${bg};color:${color}">
        <span class="legend-dot" style="background:${color}"></span>${escapeHtml(meta.label)}
      </span>`;
    }).join("");
  }

  function renderFilterPanel() {
    const classCounts = {};
    const familyCounts = {};
    RECEPTORS.forEach((r) => {
      classCounts[r.class] = (classCounts[r.class] || 0) + 1;
      familyCounts[r.family] = (familyCounts[r.family] || 0) + 1;
    });

    $("#classFilters").innerHTML = Object.entries(CLASS_META).map(([key, meta]) => `
      <label class="filter-option">
        <input type="checkbox" data-filter="class" value="${key}" ${state.activeClasses.has(key) ? "checked" : ""}>
        ${escapeHtml(meta.short)}
        <span class="count">${classCounts[key] || 0}</span>
      </label>`).join("");

    $("#familyFilters").innerHTML = Object.entries(FAMILY_META).map(([key, label]) => `
      <label class="filter-option">
        <input type="checkbox" data-filter="family" value="${key}" ${state.activeFamilies.has(key) ? "checked" : ""}>
        ${escapeHtml(label)}
        <span class="count">${familyCounts[key] || 0}</span>
      </label>`).join("");

    $$('input[data-filter]').forEach((input) => {
      input.addEventListener("change", () => {
        const set = input.dataset.filter === "class" ? state.activeClasses : state.activeFamilies;
        if (input.checked) set.add(input.value); else set.delete(input.value);
        renderAtlas();
      });
    });
  }

  // ============================================================
  // ATLAS: SIATKA KART
  // ============================================================
  function receptorCardHtml(r) {
    const { color, bg } = classColorVars(r.class);
    return `
      <button class="r-card" style="--cat-color:${color};--cat-bg:${bg}" data-open="${r.id}">
        <div class="r-card-top">
          <div>
            <h4>${escapeHtml(r.name)}</h4>
            <div class="genes mono">${escapeHtml(r.genes)}</div>
          </div>
          <span class="badge" style="--cat-color:${color};--cat-bg:${bg}">${escapeHtml(CLASS_META[r.class].short)}</span>
        </div>
        <p class="teaser">${escapeHtml(r.structure)}</p>
        <div class="loc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.6 7-13a7 7 0 1 0-14 0c0 5.4 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>
          <span>${escapeHtml(r.localization)}</span>
        </div>
      </button>`;
  }

  function renderAtlas() {
    renderFilterPanel();
    const results = filteredReceptors();
    $("#resultCount").textContent = results.length;
    $("#visibleCount").textContent = results.length;
    $("#totalCount").textContent = RECEPTORS.length;

    const grid = $("#receptorGrid");
    if (!results.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
        <p>Brak receptorów spełniających kryteria. Spróbuj zmienić filtry lub wyszukiwane hasło.</p>
      </div>`;
      return;
    }
    grid.innerHTML = results.map(receptorCardHtml).join("");
    $$('[data-open]', grid).forEach((el) => el.addEventListener("click", () => openInspector(el.dataset.open)));
  }

  // ============================================================
  // INSPEKTOR (DRAWER)
  // ============================================================
  function openInspector(id) {
    const r = byId(id);
    if (!r) return;
    const { color, bg } = classColorVars(r.class);

    $("#drawer").style.setProperty("--cat-color", color);
    $("#drawer").style.setProperty("--cat-bg", bg);

    const cascadeHtml = (r.pathway || []).map((step, i) => `
      <div class="cascade-item">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div class="cascade-num" style="--cat-color:${color};--cat-bg:${bg}">${i + 1}</div>
          ${i < r.pathway.length - 1 ? '<div class="cascade-line" style="flex:1;min-height:12px;"></div>' : ""}
        </div>
        <p>${escapeHtml(step)}</p>
      </div>`).join("");

    const pharmHtml = (r.pharm || []).length
      ? `<table class="pharm-table">${r.pharm.map((p) => `<tr><td>${escapeHtml(p.drug)}</td><td>${escapeHtml(p.note)}</td></tr>`).join("")}</table>`
      : `<p>Brak danych farmakologicznych w bazie.</p>`;

    const relatedPathways = PATHWAYS.filter((p) => p.receptors.includes(r.id));
    const relatedHtml = relatedPathways.length
      ? `<div class="drawer-section">
          <h5>🔀 Powiązane szlaki</h5>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${relatedPathways.map((p) => `<button class="pathway-list-link" data-goto-pathway="${p.id}" style="text-align:left;font-size:var(--text-sm);color:var(--color-primary);font-weight:600;">→ ${escapeHtml(p.title)}</button>`).join("")}
          </div>
        </div>` : "";

    const refsHtml = (r.refs || []).length
      ? `<div class="ref-links">${r.refs.map((u) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(u)}</a>`).join("")}</div>`
      : `<p>Brak dedykowanego odnośnika źródłowego.</p>`;

    $("#drawer").innerHTML = `
      <div class="drawer-head" style="--cat-color:${color}">
        <div>
          <h3>${escapeHtml(r.name)}</h3>
          <div class="genes mono">${escapeHtml(r.genes)}</div>
          <span class="badge" style="--cat-color:${color};--cat-bg:${bg};margin-top:8px;display:inline-block;">${escapeHtml(CLASS_META[r.class].label)} · ${escapeHtml(FAMILY_META[r.family])}</span>
        </div>
        <button class="icon-btn" id="drawerClose" aria-label="Zamknij panel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="drawer-body">
        <div class="drawer-section">
          <h5>🧬 Struktura</h5>
          <p>${escapeHtml(r.structure)}</p>
        </div>
        <div class="drawer-section">
          <dl>
            <div class="kv-row"><dt>Przewodnictwo / efektor</dt><dd>${escapeHtml(r.conductance)}</dd></div>
            <div class="kv-row"><dt>Lokalizacja w OUN</dt><dd style="font-family:inherit;font-size:var(--text-sm);color:var(--color-text-muted);">${escapeHtml(r.localization)}</dd></div>
          </dl>
        </div>
        <div class="drawer-section">
          <h5>⚡ Kaskada transdukcji sygnału</h5>
          <div class="cascade-list">${cascadeHtml}</div>
        </div>
        <div class="drawer-section">
          <h5>🔗 Cross-talk / regulacja</h5>
          <p>${escapeHtml(r.crosstalk)}</p>
        </div>
        <div class="drawer-section">
          <h5>💊 Farmakologia</h5>
          ${pharmHtml}
        </div>
        <div class="drawer-section">
          <h5>⚕️ Znaczenie kliniczne</h5>
          <div class="clinical-callout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9 2 18a1.5 1.5 0 0 0 1.3 2.3h17.4A1.5 1.5 0 0 0 22 18L13.7 3.9a1.5 1.5 0 0 0-2.6 0Z" stroke-linejoin="round"/></svg>
            <span>${escapeHtml(r.clinical)}</span>
          </div>
        </div>
        ${relatedHtml}
        <div class="drawer-section">
          <h5>📚 Źródła</h5>
          ${refsHtml}
        </div>
      </div>`;

    $("#drawerClose").addEventListener("click", closeInspector);
    $$('[data-goto-pathway]', $("#drawer")).forEach((btn) =>
      btn.addEventListener("click", () => {
        closeInspector();
        switchView("pathways");
        selectPathway(btn.dataset.gotoPathway);
      })
    );

    $("#drawer").classList.add("open");
    $("#overlay").classList.add("open");
  }

  function closeInspector() {
    $("#drawer").classList.remove("open");
    $("#overlay").classList.remove("open");
  }

  // ============================================================
  // EKSPLORATOR SZLAKÓW
  // ============================================================
  function renderPathwayList() {
    $("#pathwayList").innerHTML = PATHWAYS.map((p) => `
      <button data-pathway="${p.id}" class="${p.id === state.activePathway ? "active" : ""}">
        ${escapeHtml(p.title)}
        <span class="sub">${escapeHtml(p.subtitle)}</span>
      </button>`).join("");
    $$('[data-pathway]', $("#pathwayList")).forEach((btn) =>
      btn.addEventListener("click", () => selectPathway(btn.dataset.pathway))
    );
  }

  function selectPathway(id) {
    state.activePathway = id;
    renderPathwayList();
    renderPathwayPanel();
  }

  function renderPathwayPanel() {
    const p = PATHWAYS.find((x) => x.id === state.activePathway);
    const panel = $("#pathwayPanel");
    if (!p) { panel.innerHTML = ""; return; }

    const chipsHtml = p.receptors.map((rid) => {
      const r = byId(rid);
      if (!r) return "";
      const { color, bg } = classColorVars(r.class);
      return `<button class="pathway-chip" data-open="${rid}" style="background:${bg};color:${color}">${escapeHtml(r.name)}</button>`;
    }).join("");

    const stepsHtml = p.steps.map((step, i) => `
      <div class="flow-step">
        <div class="flow-node-col">
          <div class="flow-node node-${step.node}" title="${escapeHtml(NODE_LABELS[step.node] || step.node)}">${i + 1}</div>
          <div class="flow-connector"></div>
        </div>
        <div class="flow-content">
          <h4>${escapeHtml(step.title)}</h4>
          <p>${escapeHtml(step.desc)}</p>
        </div>
      </div>`).join("");

    panel.innerHTML = `
      <h3>${escapeHtml(p.title)}</h3>
      <div class="sub">${escapeHtml(p.subtitle)}</div>
      <div class="pathway-chips">${chipsHtml}</div>
      <div class="flow">${stepsHtml}</div>`;

    $$('[data-open]', panel).forEach((el) => el.addEventListener("click", () => openInspector(el.dataset.open)));
  }

  // ============================================================
  // MATRYCA PORÓWNAWCZA
  // ============================================================
  const MATRIX_COLS = [
    { key: "name", label: "Receptor" },
    { key: "class", label: "Klasa", render: (r) => CLASS_META[r.class].short },
    { key: "family", label: "Rodzina", render: (r) => FAMILY_META[r.family] },
    { key: "conductance", label: "Przewodnictwo / efektor" },
    { key: "localization", label: "Lokalizacja" },
    { key: "clinical", label: "Znaczenie kliniczne" },
  ];

  function renderMatrixHead() {
    const thead = $("#matrixTable thead");
    thead.innerHTML = `<tr>${MATRIX_COLS.map((c) => `
      <th data-sort="${c.key}">${escapeHtml(c.label)}${state.sortKey === c.key ? `<span class="arrow">${state.sortDir === 1 ? "↑" : "↓"}</span>` : ""}</th>`).join("")}</tr>`;
    $$('th[data-sort]', thead).forEach((th) =>
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (state.sortKey === key) state.sortDir *= -1;
        else { state.sortKey = key; state.sortDir = 1; }
        renderMatrix();
      })
    );
  }

  function renderMatrix() {
    renderMatrixHead();
    const rows = filteredReceptors().slice().sort((a, b) => {
      const col = MATRIX_COLS.find((c) => c.key === state.sortKey);
      const va = col && col.render ? col.render(a) : a[state.sortKey] || "";
      const vb = col && col.render ? col.render(b) : b[state.sortKey] || "";
      return va.localeCompare(vb, "pl") * state.sortDir;
    });

    $("#matrixTable tbody").innerHTML = rows.map((r) => {
      const { color, bg } = classColorVars(r.class);
      return `<tr data-open="${r.id}">
        <td class="name-cell">${escapeHtml(r.name)}<span class="genes">${escapeHtml(r.genes)}</span></td>
        <td><span class="badge" style="--cat-color:${color};--cat-bg:${bg}">${escapeHtml(CLASS_META[r.class].short)}</span></td>
        <td>${escapeHtml(FAMILY_META[r.family])}</td>
        <td>${escapeHtml(r.conductance)}</td>
        <td>${escapeHtml(r.localization)}</td>
        <td>${escapeHtml(r.clinical)}</td>
      </tr>`;
    }).join("");

    $$('tr[data-open]', $("#matrixTable tbody")).forEach((tr) =>
      tr.addEventListener("click", () => openInspector(tr.dataset.open))
    );
  }

  // ============================================================
  // NAWIGACJA / WIDOKI
  // ============================================================
  function switchView(view) {
    state.view = view;
    $$(".view").forEach((v) => v.classList.remove("active"));
    $(`#view-${view}`).classList.add("active");
    $$('.tabbar [role="tab"]').forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
    if (view === "pathways") renderPathwayPanelIfNeeded();
    if (view === "matrix") renderMatrix();
  }

  function renderPathwayPanelIfNeeded() {
    if (!$("#pathwayList").innerHTML) renderPathwayList();
    renderPathwayPanel();
  }

  // ============================================================
  // MOTYW
  // ============================================================
  function applyTheme() {
    document.body.setAttribute("data-theme", state.theme);
    $("#iconSun").style.display = state.theme === "dark" ? "block" : "none";
    $("#iconMoon").style.display = state.theme === "dark" ? "none" : "block";
  }

  // ============================================================
  // INICJALIZACJA
  // ============================================================
  function init() {
    renderLegend();
    renderAtlas();
    renderPathwayList();
    renderPathwayPanel();
    renderMatrix();
    applyTheme();

    $$('.tabbar [role="tab"]').forEach((btn) =>
      btn.addEventListener("click", () => switchView(btn.dataset.view))
    );

    $("#themeToggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });

    const searchInput = $("#searchInput");
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value.trim();
      $("#searchWrap").classList.toggle("has-value", !!state.query);
      renderAtlas();
      if (state.view === "matrix") renderMatrix();
    });
    $("#searchClear").addEventListener("click", () => {
      searchInput.value = "";
      state.query = "";
      $("#searchWrap").classList.remove("has-value");
      renderAtlas();
      if (state.view === "matrix") renderMatrix();
    });

    $("#filterReset").addEventListener("click", () => {
      state.activeClasses.clear();
      state.activeFamilies.clear();
      renderAtlas();
    });

    $("#overlay").addEventListener("click", closeInspector);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeInspector();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
