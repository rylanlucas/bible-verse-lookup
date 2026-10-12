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
    { code: "YLT", label: "YLT – Young's Literal" }
  ];

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
      padding: 14px 16px;
      width: 360px;
      max-width: 92vw;
      max-height: 300px;
      overflow-y: auto;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65);
      line-height: 1.55;
      box-sizing: border-box;
    }
    .bv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #333538;
    }
    .bv-ref {
      font-weight: 600;
      font-size: 14px;
      color: #8ab4f8;
      white-space: nowrap;
    }
    .bv-select {
      background: #2b2d31;
      color: #e3e3e3;
      border: 1px solid #444746;
      border-radius: 6px;
      padding: 3px 6px;
      font-size: 12px;
      cursor: pointer;
      max-width: 190px;
    }
    .bv-text {
      font-size: 13.5px;
      color: #f1f3f4;
      white-space: pre-line;
    }
    .bv-verse-num {
      font-size: 11px;
      color: #8ab4f8;
      vertical-align: super;
      margin-right: 3px;
      font-weight: 600;
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
  let lastSelectionRect = null;

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

    // Keep popup inside left and right screen edges
    const left = Math.min(
      Math.max(margin, lastSelectionRect.left),
      window.innerWidth - popupRect.width - margin
    );

    // Place below if there is room; otherwise flip above the highlighted text
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
      loadVerse(currentReference, currentTranslation);
    });

    container.replaceChildren(triggerBtn);
    container.style.display = "block";
    positionPopup();
  }

  function renderMessageCard(text, isError = false) {
    const card = document.createElement("div");
    card.className = "bv-card";
    card.addEventListener("mousedown", (e) => e.stopPropagation());
    card.addEventListener("mouseup", (e) => e.stopPropagation());

    const msg = document.createElement("div");
    msg.className = isError ? "bv-error" : "bv-text";
    msg.textContent = text;

    card.appendChild(msg);
    container.replaceChildren(card);
    positionPopup();
  }

  function loadVerse(reference, translation) {
    if (!chrome.runtime?.id) {
      renderMessageCard("Extension was just updated — please refresh this page (F5).", true);
      return;
    }

    renderMessageCard(`Loading ${reference} (${translation})...`);

    try {
      chrome.runtime.sendMessage(
        { action: "fetchVerse", reference, translation },
        (response) => {
          if (chrome.runtime.lastError) {
            renderMessageCard("Please refresh this page (F5) to finish loading the extension.", true);
            return;
          }
          if (!response || !response.success) {
            renderMessageCard(response?.error || "Could not load verse.", true);
            return;
          }

          const { data } = response;
          const card = document.createElement("div");
          card.className = "bv-card";
          card.addEventListener("mousedown", (e) => e.stopPropagation());
          card.addEventListener("mouseup", (e) => e.stopPropagation());

          const header = document.createElement("div");
          header.className = "bv-header";

          const refSpan = document.createElement("span");
          refSpan.className = "bv-ref";
          refSpan.textContent = data.reference;

          const select = document.createElement("select");
          select.className = "bv-select";
          TRANSLATIONS.forEach((tr) => {
            const opt = document.createElement("option");
            opt.value = tr.code;
            opt.textContent = tr.label;
            if (tr.code === translation) opt.selected = true;
            select.appendChild(opt);
          });

          select.addEventListener("change", (e) => {
            currentTranslation = e.target.value;
            loadVerse(currentReference, currentTranslation);
          });

          header.appendChild(refSpan);
          header.appendChild(select);

          const body = document.createElement("div");
          body.className = "bv-text";

          if (Array.isArray(data.verses)) {
            data.verses.forEach((v, idx) => {
              const num = document.createElement("span");
              num.className = "bv-verse-num";
              num.textContent = v.verse;
              body.appendChild(num);
              body.appendChild(
                document.createTextNode(v.text.trim() + (idx < data.verses.length - 1 ? " " : ""))
              );
            });
          }

          card.appendChild(header);
          card.appendChild(body);
          container.replaceChildren(card);
          positionPopup();
        }
      );
    } catch (err) {
      renderMessageCard("Extension was just reloaded — please refresh this page (F5).", true);
    }
  }

  document.addEventListener(
    "mouseup",
    (e) => {
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
    },
    true
  );

  document.addEventListener(
    "mousedown",
    (e) => {
      if (!e.composedPath().includes(host)) {
        container.style.display = "none";
      }
    },
    true
  );
})();
