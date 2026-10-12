(() => {
  const TRANSLATIONS = [
    { code: "ESV", label: "ESV – English Standard" },
    { code: "NIV", label: "NIV – New International" },
    { code: "NLT", label: "NLT – New Living" },
    { code: "NKJV", label: "NKJV – New King James" },
    { code: "NASB", label: "NASB – New American Standard" },
    { code: "KJV", label: "KJV – King James" },
    { code: "LSB", label: "LSB – Legacy Standard" },
    { code: "BSB", label: "BSB – Berean Standard" },
    { code: "NET", label: "NET – New English" },
    { code: "AMP", label: "AMP – Amplified" },
    { code: "WEB", label: "WEB – World English" },
    { code: "YLT", label: "YLT – Young's Literal" },
    { code: "ORIG", label: "ORIG – Hebrew OT / Greek NT" },
    { code: "WLC", label: "WLC – Hebrew OT (Masoretic)" },
    { code: "LXX", label: "LXX – Greek OT (Septuagint)" },
    { code: "LXXE", label: "LXXE – Brenton English LXX" },
    { code: "TISCH", label: "TISCH – Greek NT (Tischendorf)" },
    { code: "TR", label: "TR – Greek NT (Textus Receptus)" }
  ];

  function isExtensionContextValid() {
    try {
      return Boolean(
        typeof chrome !== "undefined" &&
          chrome.runtime &&
          chrome.runtime.id &&
          typeof chrome.runtime.sendMessage === "function"
      );
    } catch (_) {
      return false;
    }
  }

  function safeSendMessage(payload, onSuccess, onError) {
    if (!isExtensionContextValid()) {
      onError("Extension was just updated — please refresh this tab (F5).");
      return;
    }
    try {
      chrome.runtime.sendMessage(payload, (response) => {
        try {
          if (chrome.runtime.lastError) {
            onError("Please refresh this tab (F5) to reconnect the extension.");
            return;
          }
          onSuccess(response);
        } catch (_) {
          onError("Please refresh this tab (F5) to reconnect the extension.");
        }
      });
    } catch (_) {
      onError("Extension was just updated — please refresh this tab (F5).");
    }
  }

  const existingHost = document.getElementById("bible-verse-lookup-host");
  if (existingHost) {
    existingHost.remove();
  }

  const host = document.createElement("div");
  host.id = "bible-verse-lookup-host";
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    .bv-container {
      position: fixed;
      z-index: 2147483647;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: none;
    }
    .bv-trigger {
      background: #1e1f22;
      color: #8ab4f8;
      border: 2px solid #8ab4f8;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
    }
    .bv-trigger:hover {
      background: #2b2d31;
      color: #ffffff;
    }
    .bv-card {
      background: #1e1f22;
      color: #e3e3e3;
      border: 1px solid #8ab4f8;
      border-radius: 12px;
      padding: 12px 14px;
      width: 430px;
      max-width: 95vw;
      max-height: 440px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.7);
      line-height: 1.55;
      box-sizing: border-box;
    }
    .bv-card.bv-compare-mode {
      width: 680px;
    }
    .bv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333538;
      flex-wrap: wrap;
    }
    .bv-ref {
      font-weight: 700;
      font-size: 14px;
      color: #8ab4f8;
      white-space: nowrap;
    }
    .bv-controls {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    .bv-btn {
      background: #2b2d31;
      color: #e3e3e3;
      border: 1px solid #444746;
      border-radius: 6px;
      padding: 3px 7px;
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      user-select: none;
    }
    .bv-btn:hover {
      background: #383a40;
      border-color: #8ab4f8;
    }
    .bv-btn.active {
      background: #1e3a5f;
      color: #8ab4f8;
      border-color: #8ab4f8;
    }
    .bv-btn.copied {
      background: #1e3a2f;
      color: #81c995;
      border-color: #81c995;
    }
    .bv-select {
      background: #2b2d31;
      color: #e3e3e3;
      border: 1px solid #444746;
      border-radius: 6px;
      padding: 3px 5px;
      font-size: 11.5px;
      cursor: pointer;
      max-width: 150px;
    }
    .bv-scroll-area {
      overflow-y: auto;
      padding: 8px 2px;
      flex: 1;
      min-height: 60px;
    }
    .bv-ctx-bar {
      display: flex;
      justify-content: center;
      margin: 2px 0;
    }
    .bv-ctx-btn {
      background: #25272b;
      color: #9aa0a6;
      border: 1px dashed #444746;
      border-radius: 6px;
      padding: 2px 10px;
      font-size: 11px;
      cursor: pointer;
      width: 100%;
      text-align: center;
    }
    .bv-ctx-btn:hover {
      color: #8ab4f8;
      border-color: #8ab4f8;
      background: #2b2d31;
    }
    .bv-columns {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .bv-columns.two-col {
      grid-template-columns: 1fr 1fr;
    }
    .bv-col {
      min-width: 0;
    }
    .bv-col-Second {
      border-left: 1px solid #333538;
      padding-left: 12px;
    }
    .bv-text {
      font-size: 14px;
      color: #f1f3f4;
      white-space: pre-line;
      word-wrap: break-word;
      line-height: 1.65;
    }
    .bv-text.bv-hebrew {
      direction: rtl;
      text-align: right;
      font-size: 17px;
      line-height: 1.8;
      font-family: "SBL Hebrew", "Ezra SIL", "Times New Roman", serif;
    }
    .bv-verse-num {
      font-size: 11px;
      color: #8ab4f8;
      vertical-align: super;
      margin: 0 3px;
      font-weight: 600;
    }
    .bv-clickable-word {
      cursor: pointer;
      border-bottom: 1px dotted rgba(138, 180, 248, 0.4);
      transition: background 0.12s ease, color 0.12s ease;
    }
    .bv-clickable-word:hover {
      color: #8ab4f8;
      background: rgba(138, 180, 248, 0.15);
      border-radius: 3px;
    }
    .bv-lexicon-drawer {
      background: #16171a;
      border-top: 1px solid #8ab4f8;
      border-radius: 8px;
      padding: 8px 10px;
      margin-top: 6px;
      max-height: 135px;
      overflow-y: auto;
      font-size: 12px;
    }
    .bv-lex-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #8ab4f8;
      margin-bottom: 4px;
    }
    .bv-lex-close {
      cursor: pointer;
      color: #9aa0a6;
      font-size: 13px;
      padding: 0 4px;
    }
    .bv-lex-close:hover {
      color: #ffffff;
    }
    .bv-lex-meta {
      color: #bdc1c6;
      font-size: 11.5px;
      margin-bottom: 4px;
    }
    .bv-lex-def {
      color: #e3e3e3;
      white-space: pre-line;
      font-size: 11.5px;
      line-height: 1.45;
    }
    .bv-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 7px;
      margin-top: 4px;
      border-top: 1px solid #333538;
      font-size: 11px;
      color: #9aa0a6;
    }
    .bv-links {
      display: flex;
      gap: 10px;
    }
    .bv-link {
      color: #8ab4f8;
      text-decoration: none;
      font-weight: 500;
    }
    .bv-link:hover {
      text-decoration: underline;
    }
    .bv-error {
      color: #f28b82;
      font-size: 13px;
    }
  `;
  shadow.appendChild(style);

  const container = document.createElement("div");
  container.className = "bv-container";
  shadow.appendChild(container);

  let currentReference = "";
  let currentTranslation = "ESV";
  let compareTranslation = "ORIG";
  let isCompareMode = false;
  let isStrongsMode = false;
  let activeOverrideVerses = null;
  let lastSelectionRect = null;

  if (isExtensionContextValid()) {
    try {
      chrome.storage?.local?.get(
        ["preferredTranslation", "compareTranslation", "isCompareMode", "isStrongsMode"],
        (res) => {
          if (chrome.runtime?.lastError) return;
          if (res?.preferredTranslation) {
            currentTranslation = res.preferredTranslation === "NTGT" ? "TISCH" : res.preferredTranslation;
          }
          if (res?.compareTranslation) {
            compareTranslation = res.compareTranslation === "NTGT" ? "TISCH" : res.compareTranslation;
          }
          if (typeof res?.isCompareMode === "boolean") isCompareMode = res.isCompareMode;
          if (typeof res?.isStrongsMode === "boolean") isStrongsMode = res.isStrongsMode;
        }
      );
    } catch (_) {}
  }

  function saveState(updates) {
    if (!isExtensionContextValid()) return;
    try {
      chrome.storage?.local?.set(updates);
    } catch (_) {}
  }

  function extractBibleRef(text) {
    if (!text || text.length > 80) return null;
    const match = text
      .trim()
      .match(/(?:[1-3]\s*)?(?:Song of Solomon|Song of Songs|[A-Za-z]+\.?)\s+\d+(?::\d+(?:[-\u2013\u2014]\d+)?(?:,\s*\d+(?:[-\u2013\u2014]\d+)?)*)?/i);
    return match ? match[0].trim() : null;
  }

  function positionPopup() {
    if (!lastSelectionRect || container.style.display === "none") return;

    const popupRect = container.getBoundingClientRect();
    const margin = 12;
    const gap = 8;

    const left = Math.min(
      Math.max(margin, lastSelectionRect.left),
      window.innerWidth - popupRect.width - margin
    );

    const spaceBelow = window.innerHeight - lastSelectionRect.bottom;
    const spaceAbove = lastSelectionRect.top;

    let top;
    if (spaceBelow >= popupRect.height + gap + margin) {
      top = lastSelectionRect.bottom + gap;
    } else if (spaceAbove >= popupRect.height + gap + margin) {
      top = lastSelectionRect.top - popupRect.height - gap;
    } else {
      top = Math.max(margin, window.innerHeight - popupRect.height - margin);
    }

    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
  }

  function showTrigger(rect, refText) {
    currentReference = refText;
    activeOverrideVerses = null;
    lastSelectionRect = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left
    };

    const triggerBtn = document.createElement("div");
    triggerBtn.className = "bv-trigger";
    triggerBtn.title = "Click to read verse";
    triggerBtn.textContent = `📖 ${currentReference}`;

    triggerBtn.addEventListener("mousedown", (e) => e.stopPropagation());
    triggerBtn.addEventListener("mouseup", (e) => e.stopPropagation());
    triggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      loadVerse();
    });

    container.replaceChildren(triggerBtn);
    container.style.display = "block";
    positionPopup();
  }

  function buildTranslationSelect(selectedCode, onChangeCallback) {
    const select = document.createElement("select");
    select.className = "bv-select";
    TRANSLATIONS.forEach((tr) => {
      const opt = document.createElement("option");
      opt.value = tr.code;
      opt.textContent = tr.label;
      if (tr.code === selectedCode) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", (e) => onChangeCallback(e.target.value));
    return select;
  }

  function renderMessageCard(text, isError = false) {
    const card = document.createElement("div");
    card.className = isCompareMode ? "bv-card bv-compare-mode" : "bv-card";
    card.addEventListener("mousedown", (e) => e.stopPropagation());
    card.addEventListener("mouseup", (e) => e.stopPropagation());

    const msg = document.createElement("div");
    msg.className = isError ? "bv-error" : "bv-text";
    msg.textContent = text;

    card.appendChild(msg);
    container.replaceChildren(card);
    positionPopup();
  }

  function renderVerseColumn(payload, lexiconHost, passageMeta) {
    const col = document.createElement("div");
    col.className = "bv-col";

    if (payload.error) {
      const err = document.createElement("div");
      err.className = "bv-error";
      err.textContent = payload.error;
      col.appendChild(err);
      return col;
    }

    const body = document.createElement("div");
    body.className = payload.isHebrew ? "bv-text bv-hebrew" : "bv-text";

    payload.verses.forEach((v, idx) => {
      const num = document.createElement("span");
      num.className = "bv-verse-num";
      num.textContent = v.verse;
      body.appendChild(num);

      if (isStrongsMode && Array.isArray(v.tokens)) {
        v.tokens.forEach((tok) => {
          // Only render the text tokens (skip inline Strong's badges so Greek/Hebrew stays clean)
          if (tok.type === "text") {
            const parts = tok.text.split(/([^\s,.;:?!'"()[\]—–-]+)/g);
            parts.forEach((part) => {
              if (part && /[^\s,.;:?!'"()[\]—–-]/.test(part) && part.length >= 1) {
                const wordSpan = document.createElement("span");
                wordSpan.className = "bv-clickable-word";
                wordSpan.textContent = part;
                const targetQuery = tok.strongCode || part;
                wordSpan.title = tok.strongCode
                  ? `${part} (${tok.strongCode}) — Click for lexicon`
                  : `Click to look up "${part}"`;
                wordSpan.addEventListener("click", (e) => {
                  e.stopPropagation();
                  openLexicon(targetQuery, lexiconHost, {
                    displayWord: part,
                    bookId: passageMeta.bookId,
                    chapter: passageMeta.chapter,
                    verse: v.verse
                  });
                });
                body.appendChild(wordSpan);
              } else {
                body.appendChild(document.createTextNode(part));
              }
            });
          }
        });
      } else {
        body.appendChild(document.createTextNode(v.text.trim()));
      }

      if (idx < payload.verses.length - 1) {
        body.appendChild(document.createTextNode(" "));
      }
    });

    col.appendChild(body);
    return col;
  }

  function openLexicon(query, lexiconHost, context = {}) {
    const drawer = document.createElement("div");
    drawer.className = "bv-lexicon-drawer";

    const labelText =
      context.displayWord && context.displayWord !== query
        ? `${context.displayWord} (${query})`
        : query;

    const header = document.createElement("div");
    header.className = "bv-lex-header";
    const title = document.createElement("span");
    title.textContent = `Lexicon Lookup: ${labelText}...`;
    const closeBtn = document.createElement("span");
    closeBtn.className = "bv-lex-close";
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", () => {
      lexiconHost.replaceChildren();
      positionPopup();
    });
    header.appendChild(title);
    header.appendChild(closeBtn);
    drawer.appendChild(header);

    lexiconHost.replaceChildren(drawer);
    positionPopup();

    safeSendMessage(
      {
        action: "fetchStrong",
        query,
        bookId: context.bookId,
        chapter: context.chapter,
        verse: context.verse
      },
      (res) => {
        if (!res || !res.success || !Array.isArray(res.entries)) {
          title.textContent = `Lexicon: ${labelText}`;
          const err = document.createElement("div");
          err.className = "bv-error";
          err.textContent = res?.error || "No entry found.";
          drawer.appendChild(err);
          positionPopup();
          return;
        }

        const entry = res.entries[0];
        const clickedPrefix = context.displayWord ? `${context.displayWord} → ` : "";
        title.textContent = `${clickedPrefix}${entry.topic} — ${entry.lexeme || ""}`;

        const meta = document.createElement("div");
        meta.className = "bv-lex-meta";
        const metaParts = [];
        if (entry.transliteration) metaParts.push(`Translit: ${entry.transliteration}`);
        if (entry.pronunciation) metaParts.push(`Pronounced: ${entry.pronunciation}`);
        if (entry.shortDef) metaParts.push(`Gloss: ${entry.shortDef}`);
        meta.textContent = metaParts.join("  •  ");
        drawer.appendChild(meta);

        const def = document.createElement("div");
        def.className = "bv-lex-def";
        def.textContent = entry.fullDef || entry.shortDef || "";
        drawer.appendChild(def);

        positionPopup();
      },
      (errMsg) => {
        title.textContent = `Lexicon: ${labelText}`;
        const err = document.createElement("div");
        err.className = "bv-error";
        err.textContent = errMsg;
        drawer.appendChild(err);
        positionPopup();
      }
    );
  }

  function buildStudyLinksFooter(data) {
    const footer = document.createElement("div");
    footer.className = "bv-footer";

    const label = document.createElement("span");
    label.textContent = isStrongsMode
      ? "💡 Click any word for BDB/Thayer's Lexicon"
      : "Study tools:";

    const links = document.createElement("div");
    links.className = "bv-links";

    const firstVerse = data.activeVerses?.[0] || 1;
    const stepUrl = `https://www.stepbible.org/?q=version=ESV|reference=${encodeURIComponent(data.reference)}`;
    const bhUrl = `https://biblehub.com/interlinear/${data.bhSlug}/${data.chapter}-${firstVerse}.htm`;
    const blbUrl = `https://www.blueletterbible.org/search/preSearch.cfm?Criteria=${encodeURIComponent(data.reference)}&t=ESV`;

    [
      { name: "STEP Bible ↗", url: stepUrl },
      { name: "BibleHub Interlinear ↗", url: bhUrl },
      { name: "BlueLetter ↗", url: blbUrl }
    ].forEach((item) => {
      const a = document.createElement("a");
      a.className = "bv-link";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = item.name;
      links.appendChild(a);
    });

    footer.appendChild(label);
    footer.appendChild(links);
    return footer;
  }

  function loadVerse() {
    renderMessageCard(`Loading ${currentReference}...`);

    safeSendMessage(
      {
        action: "fetchVerse",
        reference: currentReference,
        translation: currentTranslation,
        compareTranslation: isCompareMode ? compareTranslation : null,
        overrideVerses: activeOverrideVerses
      },
      (response) => {
        if (!response || !response.success) {
          renderMessageCard(response?.error || "Could not load verse.", true);
          return;
        }

        const { data } = response;
        activeOverrideVerses = data.activeVerses;
        const passageMeta = { bookId: data.bookId, chapter: data.chapter };

        const card = document.createElement("div");
        card.className = isCompareMode ? "bv-card bv-compare-mode" : "bv-card";
        card.addEventListener("mousedown", (e) => e.stopPropagation());
        card.addEventListener("mouseup", (e) => e.stopPropagation());

        const header = document.createElement("div");
        header.className = "bv-header";

        const refSpan = document.createElement("span");
        refSpan.className = "bv-ref";
        refSpan.textContent = data.reference;

        const controls = document.createElement("div");
        controls.className = "bv-controls";

        const strongsBtn = document.createElement("button");
        strongsBtn.className = isStrongsMode ? "bv-btn active" : "bv-btn";
        strongsBtn.type = "button";
        strongsBtn.title = "Toggle clickable words for BDB/Thayer's Lexicon";
        strongsBtn.textContent = "📖 Lexicon";
        strongsBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          isStrongsMode = !isStrongsMode;
          saveState({ isStrongsMode });
          loadVerse();
        });

        const compareBtn = document.createElement("button");
        compareBtn.className = isCompareMode ? "bv-btn active" : "bv-btn";
        compareBtn.type = "button";
        compareBtn.title = "Toggle side-by-side parallel translation view";
        compareBtn.textContent = "⚖️ Compare";
        compareBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          isCompareMode = !isCompareMode;
          saveState({ isCompareMode });
          loadVerse();
        });

        const copyBtn = document.createElement("button");
        copyBtn.className = "bv-btn";
        copyBtn.type = "button";
        copyBtn.title = "Copy verse to clipboard";
        copyBtn.textContent = "📋 Copy";

        const plainVerseText = data.primary.verses
          .map((v) => `[${v.verse}] ${v.text.trim()}`)
          .join(" ");
        const clipboardString = `"${plainVerseText}" — ${data.reference} (${data.primary.resolvedTranslation})`;

        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(clipboardString).then(() => {
            copyBtn.textContent = "✓ Copied!";
            copyBtn.classList.add("copied");
            setTimeout(() => {
              copyBtn.textContent = "📋 Copy";
              copyBtn.classList.remove("copied");
            }, 1500);
          });
        });

        const primarySelect = buildTranslationSelect(currentTranslation, (newCode) => {
          currentTranslation = newCode;
          saveState({ preferredTranslation: newCode });
          loadVerse();
        });

        controls.appendChild(strongsBtn);
        controls.appendChild(compareBtn);
        controls.appendChild(copyBtn);
        controls.appendChild(primarySelect);

        if (isCompareMode) {
          const secondarySelect = buildTranslationSelect(compareTranslation, (newCode) => {
            compareTranslation = newCode;
            saveState({ compareTranslation: newCode });
            loadVerse();
          });
          controls.appendChild(secondarySelect);
        }

        header.appendChild(refSpan);
        header.appendChild(controls);
        card.appendChild(header);

        const scrollArea = document.createElement("div");
        scrollArea.className = "bv-scroll-area";

        if (data.canExpandPrev) {
          const prevBar = document.createElement("div");
          prevBar.className = "bv-ctx-bar";
          const prevBtn = document.createElement("button");
          prevBtn.className = "bv-ctx-btn";
          prevBtn.textContent = `▲ + Show Verse ${data.prevVerseNum}`;
          prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            activeOverrideVerses = [data.prevVerseNum, ...activeOverrideVerses];
            loadVerse();
          });
          prevBar.appendChild(prevBtn);
          scrollArea.appendChild(prevBar);
        }

        const lexiconHost = document.createElement("div");

        const columns = document.createElement("div");
        columns.className = isCompareMode ? "bv-columns two-col" : "bv-columns";

        const leftCol = renderVerseColumn(data.primary, lexiconHost, passageMeta);
        columns.appendChild(leftCol);

        if (isCompareMode && data.secondary) {
          const rightCol = renderVerseColumn(data.secondary, lexiconHost, passageMeta);
          rightCol.classList.add("bv-col-Second");
          columns.appendChild(rightCol);
        }

        scrollArea.appendChild(columns);

        if (data.canExpandNext) {
          const nextBar = document.createElement("div");
          nextBar.className = "bv-ctx-bar";
          const nextBtn = document.createElement("button");
          nextBtn.className = "bv-ctx-btn";
          nextBtn.textContent = `▼ + Show Verse ${data.nextVerseNum}`;
          nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            activeOverrideVerses = [...activeOverrideVerses, data.nextVerseNum];
            loadVerse();
          });
          nextBar.appendChild(nextBtn);
          scrollArea.appendChild(nextBar);
        }

        card.appendChild(scrollArea);
        card.appendChild(lexiconHost);
        card.appendChild(buildStudyLinksFooter(data));

        container.replaceChildren(card);
        positionPopup();
      },
      (errMsg) => {
        renderMessageCard(errMsg, true);
      }
    );
  }

  function onMouseUp(e) {
    if (!isExtensionContextValid()) {
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("mousedown", onMouseDown, true);
      host.remove();
      return;
    }
    if (e.composedPath().includes(host)) return;

    setTimeout(() => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString().trim() : "";
      const ref = extractBibleRef(selectedText);

      if (ref && selection.rangeCount > 0) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        showTrigger(rect, ref);
      } else {
        container.style.display = "none";
      }
    }, 20);
  }

  function onMouseDown(e) {
    if (!isExtensionContextValid()) {
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("mousedown", onMouseDown, true);
      host.remove();
      return;
    }
    if (!e.composedPath().includes(host)) {
      container.style.display = "none";
    }
  }

  document.addEventListener("mouseup", onMouseUp, true);
  document.addEventListener("mousedown", onMouseDown, true);
})();