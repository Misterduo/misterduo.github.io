(() => {
  const API_BASE = window.TAR_API_BASE || "https://tar-api.yourdomain.com"; // set in layout
  const SID = (() => {
    const k = "tar_sid";
    let v = localStorage.getItem(k);
    if (!v) {
      v = (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
      localStorage.setItem(k, v);
    }
    return v;
  })();

  function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") n.className = v;
      else if (k === "style") Object.assign(n.style, v);
      else n.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children])
      .filter(Boolean)
      .forEach(c => n.append(c.nodeType ? c : document.createTextNode(c)));
    return n;
  }

  function ensureUI() {
    if (document.getElementById("tar-chat-toggle")) return;

    // Toggle button
    const btn   = el("button", { id: "tar-chat-toggle", title: "Open PSA" }, "✳");

    // Panel (start hidden; when shown, we set display:flex inline)
    const panel = el("div", { id: "tar-chat-panel" });
    panel.style.display = "none"; // start hidden

    // Structure
    const header = el("div", { id: "tar-chat-header" }, "Profile Search Assistant");
    const body   = el("div", { id: "tar-chat-body" });
    const input  = el("div", { id: "tar-chat-input" });
    const ta     = el("textarea", { rows: "2", placeholder: "Type a message…" });
    const send   = el("button", {}, "Send");
    input.append(ta, send);
    panel.append(header, body, input);
    document.body.append(btn, panel);

    // Toggle show/hide using inline display (flex/none) to preserve layout
    const toggle = () => {
      const isHidden = panel.style.display === "none" || getComputedStyle(panel).display === "none";
      if (isHidden) {
        panel.style.display = "flex";      // show as flex (matches CSS layout)
        ta.focus();
        // scroll to bottom after render
        requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
      } else {
        panel.style.display = "none";      // hide
      }
    };
    btn.addEventListener("click", toggle);

    const Chat = {
      body,
      addBubble(text, who) {
        const row = el("div", { class: "tar-row " + (who === "user" ? "user" : "assist") });
        const bub = el("div", { class: "tar-bubble " + (who === "user" ? "user" : "assist") }, text);
        row.append(bub);
        body.append(row);
        body.scrollTop = body.scrollHeight;
      },
      addCard(node) {
        const row = el("div", { class: "tar-row" });
        const card = el("div", { class: "tar-card" });
        card.append(node);
        row.append(card);
        body.append(row);
        body.scrollTop = body.scrollHeight;
      },
      send(msg) {
        return fetch(API_BASE + "/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg, session_id: SID })
        }).then(r => r.json());
      },
    };

    async function handleReply(rep) {
      // 1) Ask flows (date/text)
      if (rep && rep.ask) {
        const wrap = el("div");
        wrap.append(el("div", {}, rep.text || "Provide value:"));
        if (rep.ask === "date") {
          const ctr = el("div", { class: "tar-date" });
          const input = el("input", { type: "date" });
          const ok = el("button", {}, "OK");
          ok.addEventListener("click", async () => {
            const iso = input.value; if (!iso) return;
            Chat.addBubble(`${rep.display || rep.name}: ${iso}`, "user");
            const next = await Chat.send(iso); handleReply(next);
          });
          ctr.append(input, ok); wrap.append(ctr);
        } else {
          const ctr = el("div", { style: { display: "flex", gap: "6px", marginTop: "6px" } });
          const t = el("input", {
            type: "text",
            placeholder: rep.display || rep.name,
            style: { flex: "1", padding: "8px", border: "1px solid #d1d5db", borderRadius: "10px" }
          });
          const ok = el("button", {}, "OK");
          ok.addEventListener("click", async () => {
            if (!t.value.trim()) return;
            Chat.addBubble(`${rep.display || rep.name}: ${t.value.trim()}`, "user");
            const next = await Chat.send(t.value.trim()); handleReply(next);
          });
          ctr.append(t, ok); wrap.append(ctr);
        }
        Chat.addCard(wrap);
        return;
      }

      // 2) Options menu
      if (rep && rep.options) {
        const wrap = el("div");
        if (rep.text) wrap.append(el("div", {}, rep.text));
        const grid = el("div", { class: "tar-options" });
        rep.options.forEach(([label, payload]) => {
          const pill = el("button", { class: "tar-pill" }, label);
          pill.addEventListener("click", async () => {
            Chat.addBubble(label, "user");
            const next = await Chat.send(payload); handleReply(next);
          });
          grid.append(pill);
        });
        wrap.append(grid);
        Chat.addCard(wrap);
        return;
      }

      // 3) Link list
      if (rep && rep.links) {
        const wrap = el("div");
        if (rep.text) wrap.append(el("div", {}, rep.text));
        const list = el("div", { class: "tar-list" });
        rep.links.forEach(([label, url]) => {
          list.append(el("a", { href: url, target: "_blank", rel: "noopener" }, label));
        });
        wrap.append(list);
        Chat.addCard(wrap);
        return;
      }

      // 4) File token (download)
      if (rep && rep.file) {
        const wrap = el("div");
        if (rep.text) wrap.append(el("div", {}, rep.text));
        const a = el("a", { class: "tar-download", href: API_BASE + "/download/" + rep.file.token }, "Download " + rep.file.name);
        wrap.append(a);
        Chat.addCard(wrap);
        return;
      }

      // 5) Plain text
      const txt = (typeof rep === "string") ? rep : (rep && rep.text) || JSON.stringify(rep);
      Chat.addBubble(txt, "assist");
    }

    async function sendCurrent() {
      const msg = ta.value.trim();
      if (!msg) return;
      Chat.addBubble(msg, "user");
      ta.value = "";
      const rep = await Chat.send(msg);
      handleReply(rep);
    }

    send.addEventListener("click", sendCurrent);
    ta.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendCurrent(); }
    });
  }

  // Inject CSS & UI
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = (window.TAR_CSS || "/assets/css/chat-overlay.css");
  document.head.append(css);

  window.addEventListener("load", ensureUI);
})();