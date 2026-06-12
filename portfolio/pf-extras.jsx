// Extras del portafolio: partículas del hero, paleta de comandos (Ctrl+K),
// terminal interactiva y repos en vivo desde la API de GitHub.

/* ---------- fondo de puntos interactivo del hero ---------- */
function PfHeroDots({ accent }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, dots = [], raf = 0;
    const mouse = { x: -99999, y: -99999 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = 140 * dpr;
      for (const d of dots) {
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const k = Math.max(0, 1 - dist / R);
        ctx.beginPath();
        ctx.arc(d.x, d.y, (1 + 1.7 * k) * dpr, 0, Math.PI * 2);
        if (k > 0.02) {
          ctx.fillStyle = accent;
          ctx.globalAlpha = 0.3 + 0.7 * k;
        } else {
          ctx.fillStyle = "rgba(255,255,255,.09)";
          ctx.globalAlpha = 1;
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = Math.floor(r.width * dpr);
      h = canvas.height = Math.floor(r.height * dpr);
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      dots = [];
      const gap = 32 * dpr;
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap)
          dots.push({ x, y });
      draw();
    };

    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); });
    };
    const leave = () => { mouse.x = -99999; mouse.y = -99999; draw(); };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [accent]);

  return <canvas className="pf-dots" ref={ref} aria-hidden="true" />;
}

/* ---------- paleta de comandos (Ctrl+K) ---------- */
function PfPalette({ open, onClose, t, items }) {
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const flat = items.filter((it) => norm(it.label + " " + (it.hint || "")).includes(norm(q)));
  const selIdx = Math.min(sel, Math.max(flat.length - 1, 0));

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(Math.min(selIdx + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel(Math.max(selIdx - 1, 0)); }
    else if (e.key === "Enter") { const it = flat[selIdx]; if (it) { onClose(); it.run(); } }
    else if (e.key === "Escape") { e.preventDefault(); onClose(); }
  };

  let lastGroup = null;
  return (
    <div className="pf-cmdk" onMouseDown={onClose} data-screen-label="Paleta de comandos">
      <div className="pf-cmdk-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pf-cmdk-top">
          <input
            ref={inputRef}
            value={q}
            placeholder={t.cmdPlaceholder}
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={onKey}
            spellCheck="false"
          />
          <span className="esc">ESC</span>
        </div>
        <div className="pf-cmdk-list">
          {flat.length === 0 && <div className="pf-cmdk-empty">{t.cmdEmpty}</div>}
          {flat.map((it, i) => {
            const head = it.group !== lastGroup ? <div className="pf-cmdk-group" key={"g" + i}>{it.group}</div> : null;
            lastGroup = it.group;
            return (
              <React.Fragment key={it.group + it.label}>
                {head}
                <button
                  className={"pf-cmdk-item" + (i === selIdx ? " sel" : "")}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => { onClose(); it.run(); }}
                >
                  <span>{it.label}</span>
                  {it.hint && <span className="hint">{it.hint}</span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- terminal interactiva ---------- */
const PF_TERM_TEXT = {
  es: {
    banner: ["maikel@portfolio · v1.0", "Escribe 'help' para ver los comandos."],
    help: [
      "help          comandos disponibles",
      "whoami        sobre mí",
      "skills        stack técnico",
      "projects      proyectos",
      "contact       contacto y redes",
      "open <x>      abre github | linkedin | documind",
      "lang <x>      cambia el idioma (es | en)",
      "boot          arranca MaikelDOS (modo escritorio)",
      "clear         limpia la pantalla",
      "exit          cierra la terminal",
    ],
    whoami: ["Maikel Hernández · Full Stack Developer", "Costa Rica · egresado del TEC"],
    projects: ["DocuMind · asistente de documentos con IA", "→ " + "https://documind-lake.vercel.app", "Más en https://github.com/MaikelHR"],
    openWhat: "uso: open github | linkedin | documind",
    langWhat: "uso: lang es | en",
    langSet: (l) => "idioma cambiado a " + l.toUpperCase(),
    opening: (x) => "abriendo " + x + "…",
    sudo: "sudo: permiso denegado",
    notFound: (c) => "comando no encontrado: " + c + ". Escribe 'help'.",
  },
  en: {
    banner: ["maikel@portfolio · v1.0", "Type 'help' to see the commands."],
    help: [
      "help          available commands",
      "whoami        about me",
      "skills        tech stack",
      "projects      projects",
      "contact       contact and links",
      "open <x>      opens github | linkedin | documind",
      "lang <x>      switches language (es | en)",
      "boot          boots MaikelDOS (desktop mode)",
      "clear         clears the screen",
      "exit          closes the terminal",
    ],
    whoami: ["Maikel Hernández · Full Stack Developer", "Costa Rica · TEC graduate"],
    projects: ["DocuMind · AI document assistant", "→ " + "https://documind-lake.vercel.app", "More at https://github.com/MaikelHR"],
    openWhat: "usage: open github | linkedin | documind",
    langWhat: "usage: lang es | en",
    langSet: (l) => "language switched to " + l.toUpperCase(),
    opening: (x) => "opening " + x + "…",
    sudo: "sudo: permission denied",
    notFound: (c) => "command not found: " + c + ". Type 'help'.",
  },
};

function PfTerminal({ open, onClose, lang, setLang }) {
  const [hist, setHist] = React.useState([]);
  const [val, setVal] = React.useState("");
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const tt = PF_TERM_TEXT[lang];

  React.useEffect(() => {
    if (open) {
      setHist((h) => (h.length ? h : tt.banner.map((text) => ({ type: "out", text }))));
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [hist]);

  if (!open) return null;

  const run = (raw) => {
    const line = raw.trim();
    const out = [];
    const [cmd, ...args] = line.split(/\s+/);
    switch ((cmd || "").toLowerCase()) {
      case "": break;
      case "help": out.push(...tt.help); break;
      case "whoami": out.push(...tt.whoami); break;
      case "skills":
        PF_SKILLS.forEach((g) => out.push(g.group[lang] + ": " + g.items.map(([n]) => n).join(", ")));
        break;
      case "projects": out.push(...tt.projects); break;
      case "contact":
        out.push(PF_LINKS.email, PF_LINKS.github, PF_LINKS.linkedin);
        break;
      case "open": {
        const target = (args[0] || "").toLowerCase();
        const urls = { github: PF_LINKS.github, linkedin: PF_LINKS.linkedin, documind: PF_LINKS.documind };
        if (urls[target]) { out.push(tt.opening(target)); window.open(urls[target], "_blank", "noopener"); }
        else out.push(tt.openWhat);
        break;
      }
      case "lang": {
        const next = (args[0] || "").toLowerCase();
        if (next === "es" || next === "en") { setLang(next); out.push(PF_TERM_TEXT[next].langSet(next)); }
        else out.push(tt.langWhat);
        break;
      }
      case "date": out.push(new Date().toLocaleString(lang === "es" ? "es-CR" : "en-US")); break;
      case "echo": out.push(args.join(" ")); break;
      case "sudo": out.push(tt.sudo); break;
      case "boot": window.location.href = "os"; return;
      case "clear": setHist([]); return;
      case "exit": onClose(); return;
      default: out.push(tt.notFound(cmd));
    }
    setHist((h) => [...h, { type: "in", text: line }, ...out.map((text) => ({ type: "out", text }))]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { run(val); setVal(""); }
    else if (e.key === "Escape") onClose();
  };

  return (
    <div className="pf-termwrap" onMouseDown={onClose} data-screen-label="Terminal">
      <div className="pf-term" onMouseDown={(e) => e.stopPropagation()} onClick={() => inputRef.current && inputRef.current.focus()}>
        <div className="pf-term-bar">
          <span className="dot r" onClick={onClose} />
          <span className="dot y" />
          <span className="dot g" />
          <span className="title">maikel@portfolio: ~</span>
        </div>
        <div className="pf-term-body" ref={bodyRef}>
          {hist.map((l, i) => (
            <div key={i} className={"line " + l.type}>
              {l.type === "in" && <span className="ps1">$ </span>}
              {l.text}
            </div>
          ))}
          <div className="line prompt">
            <span className="ps1">$ </span>
            <input
              ref={inputRef}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={onKey}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- computadora retro del footer (abre la terminal) ---------- */
function PfRetroPC({ caption, onClick }) {
  return (
    <button className="pf-pc" onClick={onClick} aria-label={caption}>
      <svg viewBox="0 0 230 150" aria-hidden="true">
        {/* monitor */}
        <rect x="22" y="6" width="118" height="88" rx="7" fill="#ddd8c6" />
        <rect x="32" y="15" width="98" height="64" rx="4" fill="#0a0c11" />
        <text className="crt-text" x="40" y="34">$ boot --pf</text>
        <rect className="crt-cursor" x="40" y="42" width="7" height="11" fill="var(--acc)" />
        <rect x="64" y="94" width="34" height="8" fill="#c9c4b0" />
        <rect x="50" y="102" width="62" height="6" rx="3" fill="#c9c4b0" />
        {/* torre */}
        <rect x="158" y="10" width="50" height="96" rx="5" fill="#ddd8c6" />
        <rect x="166" y="22" width="34" height="5" rx="2" fill="#b9b4a0" />
        <rect x="166" y="32" width="34" height="5" rx="2" fill="#b9b4a0" />
        <rect x="166" y="46" width="34" height="3" rx="1.5" fill="#cdc8b6" />
        <circle className="pwr" cx="171" cy="94" r="3.5" fill="var(--acc)" />
        {/* teclado */}
        <rect x="18" y="118" width="126" height="20" rx="5" fill="#ddd8c6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={"k1" + i} x={26 + i * 14} y="123" width="10" height="4" rx="1" fill="#b9b4a0" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={"k2" + i} x={26 + i * 14} y="130" width="10" height="4" rx="1" fill="#b9b4a0" />
        ))}
        {/* mouse */}
        <path d="M150 130 C 150 124, 146 122, 146 116" stroke="#b9b4a0" strokeWidth="1.5" fill="none" />
        <rect x="152" y="124" width="15" height="22" rx="7.5" fill="#ddd8c6" />
      </svg>
      <span className="cap">{caption}</span>
    </button>
  );
}

/* ---------- repos en vivo desde GitHub ---------- */
function PfRepos({ lang, t }) {
  const [state, setState] = React.useState({ loading: true, repos: [], error: false });

  React.useEffect(() => {
    try {
      const cached = sessionStorage.getItem("pf_repos");
      if (cached) { setState({ loading: false, repos: JSON.parse(cached), error: false }); return; }
    } catch (e) { /* sessionStorage bloqueado: seguimos al fetch */ }
    fetch("https://api.github.com/users/MaikelHR/repos?sort=pushed&per_page=100")
      .then((r) => { if (!r.ok) throw new Error("github " + r.status); return r.json(); })
      .then((all) => {
        const repos = all
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6)
          .map((r) => ({
            name: r.name, desc: r.description, lang: r.language,
            stars: r.stargazers_count, url: r.html_url,
          }));
        try { sessionStorage.setItem("pf_repos", JSON.stringify(repos)); } catch (e) {}
        setState({ loading: false, repos, error: false });
      })
      .catch(() => setState({ loading: false, repos: [], error: true }));
  }, []);

  return (
    <section className="pf-sec wrap" id="github" data-screen-label="GitHub">
      <div className="pf-seclab rv">{t.reposLabel}</div>
      {state.loading && <div className="pf-repos-note">{t.reposLoading}</div>}
      {state.error && (
        <div className="pf-repos-note">
          {t.reposError}{" "}
          <a href={PF_LINKS.github} target="_blank" rel="noopener">{PF_LINKS.githubLabel} ↗</a>
        </div>
      )}
      {!state.loading && !state.error && (
        <React.Fragment>
          <div className="pf-repos">
            {state.repos.map((r) => (
              <a className="pf-repo" key={r.name} href={r.url} target="_blank" rel="noopener">
                <div className="top">
                  <h4>{r.name}</h4>
                  <span className="arr">↗</span>
                </div>
                {r.desc && <p>{r.desc}</p>}
                <div className="meta">
                  {r.lang && <span><i className="ldot" />{r.lang}</span>}
                  {r.stars > 0 && <span>★ {r.stars}</span>}
                </div>
              </a>
            ))}
          </div>
          <a className="pf-repos-all" href={PF_LINKS.github + "?tab=repositories"} target="_blank" rel="noopener">
            {t.reposAll} <i>⟶</i>
          </a>
        </React.Fragment>
      )}
    </section>
  );
}

Object.assign(window, { PfHeroDots, PfPalette, PfTerminal, PfRepos, PfRetroPC });
