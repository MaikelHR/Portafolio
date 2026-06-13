// MaikelDOS — modo escritorio retro del portafolio.
// Secuencia de boot, ventanas arrastrables, terminal, buscaminas, paint,
// proyectos reales y apagado. Mismos tonos del sitio: oscuro + jade.

const OS_LANG = localStorage.getItem("pf_lang") || "es";
const ACC = "#00a86b";

const OS_T = {
  es: {
    boot: [
      "MAIKELDOS BIOS v1.0",
      "Copyright (C) 2026 Maikel Hernández",
      "",
      "Comprobando memoria ........ OK",
      "Detectando café ............ OK",
      "Cargando stack ............. OK",
      "Montando /proyectos ........ OK",
      "",
      "Iniciando MaikelDOS...",
    ],
    bootSkip: "clic para saltar",
    appPC: "mi-pc",
    appProj: "~/proyectos",
    appAbout: "readme.txt",
    appSnake: "snake",
    appTrash: "papelera",
    backToSite: "volver al sitio",
    start: "inicio",
    snakeHint: "flechas o WASD para moverte",
    snakeRestart: "espacio para reiniciar",
    snakePts: "pts",
    shutdown: "Apagar",
    offMsg: "MaikelDOS se ha apagado.",
    offHint: "volviendo al sitio…",
    trashEmpty: "La papelera está vacía.",
    pcSystem: "Sistema",
    pcUser: "Usuario",
    pcGuest: "invitado",
    pcWhere: "Ubicación",
    pcStack: "Stack instalado",
    projFeatured: "Proyecto destacado",
    projRepos: "Repos de GitHub",
    projLoading: "Cargando…",
    projError: "No se pudo conectar con GitHub.",
    projOpen: "abrir",
    paintClear: "Limpiar",
    about: [
      "Soy Maikel Hernández, desarrollador full stack",
      "de Costa Rica, egresado del TEC.",
      "",
      "Construyo productos web completos, desde la",
      "base de datos hasta la interfaz.",
      "",
      "Estado: open to work ✦",
      "",
      "Contacto:",
      "  maikelhernandezr4201@gmail.com",
      "  github.com/MaikelHR",
    ],
  },
  en: {
    boot: [
      "MAIKELDOS BIOS v1.0",
      "Copyright (C) 2026 Maikel Hernández",
      "",
      "Checking memory ............ OK",
      "Detecting coffee ........... OK",
      "Loading stack .............. OK",
      "Mounting /projects ......... OK",
      "",
      "Starting MaikelDOS...",
    ],
    bootSkip: "click to skip",
    appPC: "my-pc",
    appProj: "~/projects",
    appAbout: "readme.txt",
    appSnake: "snake",
    appTrash: "recycle bin",
    backToSite: "back to site",
    start: "start",
    snakeHint: "arrows or WASD to move",
    snakeRestart: "space to restart",
    snakePts: "pts",
    shutdown: "Shut down",
    offMsg: "MaikelDOS has shut down.",
    offHint: "going back to the site…",
    trashEmpty: "The recycle bin is empty.",
    pcSystem: "System",
    pcUser: "User",
    pcGuest: "guest",
    pcWhere: "Location",
    pcStack: "Installed stack",
    projFeatured: "Featured project",
    projRepos: "GitHub repos",
    projLoading: "Loading…",
    projError: "Couldn't reach GitHub.",
    projOpen: "open",
    paintClear: "Clear",
    about: [
      "I'm Maikel Hernández, a full stack developer",
      "from Costa Rica, TEC graduate.",
      "",
      "I build complete web products, from the",
      "database to the interface.",
      "",
      "Status: open to work ✦",
      "",
      "Contact:",
      "  maikelhernandezr4201@gmail.com",
      "  github.com/MaikelHR",
    ],
  },
}[OS_LANG];

/* ---------- iconos ---------- */
const Ic = {
  pc: (
    <g>
      <rect x="4" y="6" width="22" height="16" rx="2" />
      <rect x="9" y="22" width="12" height="2.5" />
      <rect x="28" y="6" width="9" height="22" rx="1.5" />
      <line x1="30.5" y1="10" x2="34.5" y2="10" />
      <line x1="30.5" y1="13" x2="34.5" y2="13" />
    </g>
  ),
  folder: <path d="M4 10 q0 -3 3 -3 h8 l3 3 h16 q3 0 3 3 v14 q0 3 -3 3 h-27 q-3 0 -3 -3 z" />,
  doc: (
    <g>
      <path d="M9 4 h16 l8 8 v24 h-24 z" />
      <line x1="14" y1="18" x2="28" y2="18" />
      <line x1="14" y1="23" x2="28" y2="23" />
      <line x1="14" y1="28" x2="24" y2="28" />
    </g>
  ),
  term: (
    <g>
      <rect x="4" y="6" width="32" height="26" rx="3" />
      <path d="M10 14 l6 5 -6 5" />
      <line x1="20" y1="25" x2="28" y2="25" />
    </g>
  ),
  snake: (
    <g>
      <path d="M6 30 h10 v-10 h12 v-10 h6" />
      <circle cx="34" cy="10" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" />
    </g>
  ),
  paint: (
    <g>
      <path d="M28 4 l8 8 -18 18 q-5 2 -8 0 t0 -8 z" />
      <path d="M10 30 q-3 4 -6 6 q5 0 8 -3" />
    </g>
  ),
  trash: (
    <g>
      <path d="M8 12 h24 l-2.5 24 h-19 z" />
      <line x1="6" y1="12" x2="34" y2="12" />
      <path d="M15 12 v-4 h10 v4" />
      <line x1="16" y1="18" x2="16.8" y2="30" />
      <line x1="24" y1="18" x2="23.2" y2="30" />
    </g>
  ),
  back: (
    <g>
      <path d="M22 6 h-14 v28 h14" />
      <line x1="14" y1="20" x2="34" y2="20" />
      <path d="M28 14 l6 6 -6 6" />
    </g>
  ),
  bolt: <path d="M22 4 L8 23 h9 l-2 13 14 -19 h-9 z" />,
};

function OsIcon({ name, size = 38 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {Ic[name]}
    </svg>
  );
}

/* ---------- boot ---------- */
function BootScreen({ onDone }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (n < OS_T.boot.length) {
      const id = setTimeout(() => setN(n + 1), n === 0 ? 350 : 240);
      return () => clearTimeout(id);
    }
    const id = setTimeout(onDone, 750);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <div className="os-boot" onClick={onDone}>
      {OS_T.boot.slice(0, n).map((l, i) => <div key={i}>{l || " "}</div>)}
      <span className="cur" />
      <div className="skip">{OS_T.bootSkip}</div>
    </div>
  );
}

/* ---------- apps ---------- */
function AboutApp() {
  return <pre className="os-notepad">{OS_T.about.join("\n")}</pre>;
}

function TrashApp() {
  return (
    <div className="os-trashbody">
      <OsIcon name="trash" size={46} />
      <p>{OS_T.trashEmpty}</p>
    </div>
  );
}

function ComputerApp() {
  return (
    <div className="os-pcbody">
      <div className="row"><b>{OS_T.pcSystem}</b><span>MaikelDOS 1.0 · React 18 + Babel</span></div>
      <div className="row"><b>{OS_T.pcUser}</b><span>{OS_T.pcGuest}</span></div>
      <div className="row"><b>{OS_T.pcWhere}</b><span>Costa Rica · GMT-6</span></div>
      <div className="disk">
        <span>C:\</span>
        <div className="bar"><i style={{ width: "73%" }} /></div>
        <span className="mono">73%</span>
      </div>
      <h4>{OS_T.pcStack}</h4>
      {PF_SKILLS.map((g) => (
        <div className="grp" key={g.group.en}>
          <b>{g.group[OS_LANG]}</b>
          <span>{g.items.map(([n]) => n).join(" · ")}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectsApp() {
  const [state, setState] = React.useState({ loading: true, repos: [], error: false });
  React.useEffect(() => {
    try {
      const cached = sessionStorage.getItem("pf_repos");
      if (cached) { setState({ loading: false, repos: JSON.parse(cached), error: false }); return; }
    } catch (e) {}
    fetch("https://api.github.com/users/MaikelHR/repos?sort=pushed&per_page=100")
      .then((r) => { if (!r.ok) throw new Error("github"); return r.json(); })
      .then((all) => {
        const repos = all.filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 8)
          .map((r) => ({ name: r.name, desc: r.description, lang: r.language, stars: r.stargazers_count, url: r.html_url }));
        try { sessionStorage.setItem("pf_repos", JSON.stringify(repos)); } catch (e) {}
        setState({ loading: false, repos, error: false });
      })
      .catch(() => setState({ loading: false, repos: [], error: true }));
  }, []);
  return (
    <div className="os-projbody">
      <div className="lbl">{OS_T.projFeatured}</div>
      <a className="feat" href={PF_LINKS.documind} target="_blank" rel="noopener">
        <OsIcon name="doc" size={30} />
        <div>
          <b>DocuMind</b>
          <span>RAG · Gemini · pgvector · Vercel</span>
        </div>
        <i>↗</i>
      </a>
      <a className="feat" href={PF_LINKS.hookwire} target="_blank" rel="noopener">
        <OsIcon name="bolt" size={30} />
        <div>
          <b>Hookwire</b>
          <span>Webhooks · HMAC · Neon Postgres · Vercel</span>
        </div>
        <i>↗</i>
      </a>
      <div className="lbl">{OS_T.projRepos}</div>
      {state.loading && <div className="note">{OS_T.projLoading}</div>}
      {state.error && (
        <div className="note">{OS_T.projError} <a href={PF_LINKS.github} target="_blank" rel="noopener">github.com/MaikelHR ↗</a></div>
      )}
      <div className="grid">
        {state.repos.map((r) => (
          <a className="fold" key={r.name} href={r.url} target="_blank" rel="noopener" title={r.desc || r.name}>
            <OsIcon name="folder" size={34} />
            <span>{r.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* terminal dentro del OS */
const OS_TERM = {
  es: {
    banner: ["maikel@maikeldos · v1.0", "Escribe 'help' para ver los comandos."],
    help: [
      "help        comandos disponibles",
      "whoami      sobre mí",
      "skills      stack técnico",
      "projects    proyectos",
      "contact     contacto y redes",
      "open <x>    abre github | linkedin | documind | hookwire",
      "back        vuelve al portafolio",
      "shutdown    apaga MaikelDOS",
      "clear       limpia la pantalla",
      "exit        cierra la ventana",
    ],
    whoami: ["Maikel Hernández · Full Stack Developer", "Costa Rica · egresado del TEC"],
    notFound: (c) => "comando no encontrado: " + c + ". Escribe 'help'.",
    sudo: "sudo: permiso denegado",
    openWhat: "uso: open github | linkedin | documind | hookwire",
    opening: (x) => "abriendo " + x + "…",
  },
  en: {
    banner: ["maikel@maikeldos · v1.0", "Type 'help' to see the commands."],
    help: [
      "help        available commands",
      "whoami      about me",
      "skills      tech stack",
      "projects    projects",
      "contact     contact and links",
      "open <x>    opens github | linkedin | documind | hookwire",
      "back        returns to the portfolio",
      "shutdown    shuts down MaikelDOS",
      "clear       clears the screen",
      "exit        closes the window",
    ],
    whoami: ["Maikel Hernández · Full Stack Developer", "Costa Rica · TEC graduate"],
    notFound: (c) => "command not found: " + c + ". Type 'help'.",
    sudo: "sudo: permission denied",
    openWhat: "usage: open github | linkedin | documind | hookwire",
    opening: (x) => "opening " + x + "…",
  },
}[OS_LANG];

function TerminalApp({ onExit, onShutdown }) {
  const [hist, setHist] = React.useState(OS_TERM.banner.map((text) => ({ type: "out", text })));
  const [val, setVal] = React.useState("");
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [hist]);

  const run = (raw) => {
    const line = raw.trim();
    const out = [];
    const [cmd, ...args] = line.split(/\s+/);
    switch ((cmd || "").toLowerCase()) {
      case "": break;
      case "help": out.push(...OS_TERM.help); break;
      case "whoami": out.push(...OS_TERM.whoami); break;
      case "skills":
        PF_SKILLS.forEach((g) => out.push(g.group[OS_LANG] + ": " + g.items.map(([n]) => n).join(", ")));
        break;
      case "projects":
        out.push("DocuMind · " + PF_LINKS.documind, "Hookwire · " + PF_LINKS.hookwire, PF_LINKS.github);
        break;
      case "contact":
        out.push(PF_LINKS.email, PF_LINKS.github, PF_LINKS.linkedin);
        break;
      case "open": {
        const target = (args[0] || "").toLowerCase();
        const urls = { github: PF_LINKS.github, linkedin: PF_LINKS.linkedin, documind: PF_LINKS.documind, hookwire: PF_LINKS.hookwire };
        if (urls[target]) { out.push(OS_TERM.opening(target)); window.open(urls[target], "_blank", "noopener"); }
        else out.push(OS_TERM.openWhat);
        break;
      }
      case "date": out.push(new Date().toLocaleString(OS_LANG === "es" ? "es-CR" : "en-US")); break;
      case "echo": out.push(args.join(" ")); break;
      case "sudo": out.push(OS_TERM.sudo); break;
      case "back": window.location.href = "/"; return;
      case "shutdown": onShutdown(); return;
      case "clear": setHist([]); return;
      case "exit": onExit(); return;
      default: out.push(OS_TERM.notFound(cmd));
    }
    setHist((h) => [...h, { type: "in", text: line }, ...out.map((text) => ({ type: "out", text }))]);
  };

  return (
    <div className="os-termbody" ref={bodyRef} onClick={() => inputRef.current && inputRef.current.focus()}>
      {hist.map((l, i) => (
        <div key={i} className={"line " + l.type}>
          {l.type === "in" && <span className="ps1">$ </span>}
          {l.text}
        </div>
      ))}
      <div className="line prompt">
        <span className="ps1">$ </span>
        <input
          ref={inputRef} value={val} autoFocus spellCheck="false" autoCapitalize="off" autoComplete="off"
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { run(val); setVal(""); } }}
        />
      </div>
    </div>
  );
}

/* snake */
function SnakeApp() {
  const ref = React.useRef(null);
  const [score, setScore] = React.useState(0);
  const [over, setOver] = React.useState(false);

  React.useEffect(() => {
    const COLS = 24, ROWS = 15, CELL = 20;
    const cv = ref.current;
    cv.width = COLS * CELL;
    cv.height = ROWS * CELL;
    const ctx = cv.getContext("2d");
    const rand = (n) => Math.floor(Math.random() * n);
    const g = { snake: [], dir: null, next: null, food: null, over: false, score: 0 };

    const placeFood = () => {
      do { g.food = { x: rand(COLS), y: rand(ROWS) }; }
      while (g.snake.some((s) => s.x === g.food.x && s.y === g.food.y));
    };
    const reset = () => {
      g.snake = [{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }];
      g.dir = { x: 1, y: 0 };
      g.next = { x: 1, y: 0 };
      g.over = false;
      g.score = 0;
      setScore(0);
      setOver(false);
      placeFood();
    };

    const draw = () => {
      ctx.fillStyle = "#0a0c11";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "rgba(255,255,255,.05)";
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++)
          ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
      ctx.fillStyle = "#ddd8c6";
      ctx.fillRect(g.food.x * CELL + 4, g.food.y * CELL + 4, CELL - 8, CELL - 8);
      g.snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#2fd699" : ACC;
        ctx.fillRect(s.x * CELL + 1.5, s.y * CELL + 1.5, CELL - 3, CELL - 3);
      });
    };

    const tick = () => {
      if (g.over) return;
      g.dir = g.next;
      const h = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
      if (h.x < 0 || h.x >= COLS || h.y < 0 || h.y >= ROWS ||
          g.snake.some((s) => s.x === h.x && s.y === h.y)) {
        g.over = true;
        setOver(true);
        return;
      }
      g.snake.unshift(h);
      if (h.x === g.food.x && h.y === g.food.y) { g.score++; setScore(g.score); placeFood(); }
      else g.snake.pop();
      draw();
    };

    const KEYMAP = {
      ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
      w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
    };
    const onKey = (e) => {
      if (e.target.tagName === "INPUT") return;
      const dir = KEYMAP[e.key] || KEYMAP[(e.key || "").toLowerCase()];
      if (dir) {
        e.preventDefault();
        if (dir[0] !== -g.dir.x || dir[1] !== -g.dir.y) g.next = { x: dir[0], y: dir[1] };
      } else if (e.key === " ") {
        e.preventDefault();
        if (g.over) { reset(); draw(); }
      }
    };

    reset();
    draw();
    document.addEventListener("keydown", onKey);
    const id = setInterval(tick, 110);
    return () => { document.removeEventListener("keydown", onKey); clearInterval(id); };
  }, []);

  return (
    <div className="os-snake">
      <div className="bar mono">
        <span>SNAKE</span>
        <span className="pts">{score} {OS_T.snakePts}</span>
      </div>
      <div className="stage">
        <canvas ref={ref} />
        {over && (
          <div className="overlay mono">
            <b>GAME OVER</b>
            <span>{OS_T.snakeRestart}</span>
          </div>
        )}
      </div>
      <div className="hint mono">{OS_T.snakeHint}</div>
    </div>
  );
}

/* paint */
function PaintApp() {
  const ref = React.useRef(null);
  const [color, setColor] = React.useState(ACC);
  const [size, setSize] = React.useState(4);
  const drawing = React.useRef(false);
  const last = React.useRef([0, 0]);
  const colors = [ACC, "#17150f", "#ffffff", "#e05252", "#4f83ff", "#e8c33e"];

  const fill = () => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#f4f1e6";
    ctx.fillRect(0, 0, cv.width, cv.height);
  };
  React.useEffect(fill, []);

  const pos = (e) => {
    const cv = ref.current, r = cv.getBoundingClientRect();
    return [(e.clientX - r.left) * (cv.width / r.width), (e.clientY - r.top) * (cv.height / r.height)];
  };
  const down = (e) => { drawing.current = true; last.current = pos(e); ref.current.setPointerCapture(e.pointerId); };
  const move = (e) => {
    if (!drawing.current) return;
    const ctx = ref.current.getContext("2d");
    const p = pos(e);
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(last.current[0], last.current[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
    last.current = p;
  };

  return (
    <div className="os-paint">
      <div className="tools">
        {colors.map((c) => (
          <button key={c} className={"sw" + (c === color ? " on" : "")} style={{ background: c }} onClick={() => setColor(c)} />
        ))}
        <span className="sep" />
        {[2, 4, 9].map((s) => (
          <button key={s} className={"sz" + (s === size ? " on" : "")} onClick={() => setSize(s)}>
            <i style={{ width: s + 2, height: s + 2 }} />
          </button>
        ))}
        <span className="sep" />
        <button className="clr" onClick={fill}>{OS_T.paintClear}</button>
      </div>
      <canvas ref={ref} width="640" height="380"
        onPointerDown={down} onPointerMove={move}
        onPointerUp={() => { drawing.current = false; }} />
    </div>
  );
}

/* ---------- ventana ---------- */
function OsWindow({ win, app, deskRef, onFocus, onClose, onMin, onMax, onMove, children }) {
  const drag = (e) => {
    if (e.target.closest(".tbtn") || win.max) return;
    onFocus(win.appId);
    const sx = e.clientX, sy = e.clientY, ox = win.x, oy = win.y;
    const desk = deskRef.current.getBoundingClientRect();
    const move = (ev) => {
      const x = Math.min(Math.max(ox + ev.clientX - sx, -win.w + 90), desk.width - 90);
      const y = Math.min(Math.max(oy + ev.clientY - sy, 0), desk.height - 60);
      onMove(win.appId, x, y);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const style = win.max
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 46px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div className={"os-win" + (win.min ? " hidden" : "")} style={style} onPointerDown={() => onFocus(win.appId)}>
      <div className="tbar" onPointerDown={drag} onDoubleClick={() => onMax(win.appId)}>
        <span className="dots tbtn-wrap">
          <button className="tbtn dot r" onClick={() => onClose(win.appId)} aria-label="cerrar" />
          <button className="tbtn dot y" onClick={() => onMin(win.appId)} aria-label="minimizar" />
          <button className="tbtn dot g" onClick={() => onMax(win.appId)} aria-label="maximizar" />
        </span>
        <span className="ttl">{app.title}</span>
        <span className="ticon"><OsIcon name={app.icon} size={14} /></span>
      </div>
      <div className={"wbody " + app.id}>{children}</div>
    </div>
  );
}

/* ---------- escritorio ---------- */
function OsApp() {
  const [phase, setPhase] = React.useState("boot");
  const [wins, setWins] = React.useState([]);
  const [startOpen, setStartOpen] = React.useState(false);
  const [now, setNow] = React.useState(new Date());
  const zRef = React.useRef(10);
  const deskRef = React.useRef(null);

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const shutdown = () => {
    setPhase("off");
    setTimeout(() => { window.location.href = "/"; }, 2600);
  };

  const APPS = [
    { id: "pc", title: OS_T.appPC, icon: "pc", w: 560, h: 460 },
    { id: "proj", title: OS_T.appProj, icon: "folder", w: 620, h: 470 },
    { id: "about", title: OS_T.appAbout, icon: "doc", w: 520, h: 400 },
    { id: "term", title: "terminal", icon: "term", w: 640, h: 420 },
    { id: "snake", title: OS_T.appSnake, icon: "snake", w: 524, h: 452 },
    { id: "paint", title: "paint", icon: "paint", w: 660, h: 480 },
    { id: "trash", title: OS_T.appTrash, icon: "trash", w: 420, h: 300 },
  ];
  const appById = (id) => APPS.find((a) => a.id === id);

  const focusWin = (id) => {
    zRef.current += 1;
    setWins((ws) => ws.map((w) => (w.appId === id ? { ...w, z: zRef.current, min: false } : w)));
  };
  const openApp = (id) => {
    setStartOpen(false);
    if (wins.some((w) => w.appId === id)) { focusWin(id); return; }
    const app = appById(id);
    const desk = deskRef.current ? deskRef.current.getBoundingClientRect() : { width: 1200, height: 700 };
    const n = wins.length;
    zRef.current += 1;
    const w = Math.min(app.w, desk.width - 24);
    const h = Math.min(app.h, desk.height - 24);
    setWins((ws) => [...ws, {
      appId: id, w, h,
      x: Math.max(12, Math.min(120 + n * 34, desk.width - w - 12)),
      y: Math.max(8, Math.min(40 + n * 30, desk.height - h - 8)),
      z: zRef.current, min: false, max: false,
    }]);
  };
  const closeWin = (id) => setWins((ws) => ws.filter((w) => w.appId !== id));
  const minWin = (id) => setWins((ws) => ws.map((w) => (w.appId === id ? { ...w, min: true } : w)));
  const maxWin = (id) => setWins((ws) => ws.map((w) => (w.appId === id ? { ...w, max: !w.max } : w)));
  const moveWin = (id, x, y) => setWins((ws) => ws.map((w) => (w.appId === id ? { ...w, x, y } : w)));

  const content = (id) => {
    switch (id) {
      case "pc": return <ComputerApp />;
      case "proj": return <ProjectsApp />;
      case "about": return <AboutApp />;
      case "term": return <TerminalApp onExit={() => closeWin("term")} onShutdown={shutdown} />;
      case "snake": return <SnakeApp />;
      case "paint": return <PaintApp />;
      case "trash": return <TrashApp />;
      default: return null;
    }
  };

  const clock = now.toLocaleTimeString(OS_LANG === "es" ? "es-CR" : "en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="os-bezel">
      <div className="os-screen">
        {phase === "boot" && <BootScreen onDone={() => setPhase("desktop")} />}
        {phase === "off" && (
          <div className="os-off" onClick={() => { window.location.href = "/"; }}>
            <div>{OS_T.offMsg}</div>
            <div className="hint">{OS_T.offHint}</div>
          </div>
        )}
        {phase === "desktop" && (
          <div className="os-desktop-root">
            <div className="os-desk" ref={deskRef} onPointerDown={() => setStartOpen(false)}>
              <div className="os-wall" aria-hidden="true">
                <div className="ghost">MAIKEL</div>
                <div className="ghost acc">DOS<span>.</span></div>
                <div className="ver mono">v1.0 · {OS_LANG.toUpperCase()} · GMT-6</div>
              </div>
              <div className="os-icons">
                {APPS.map((a) => (
                  <button className="os-ico" key={a.id} onClick={() => openApp(a.id)}>
                    <OsIcon name={a.icon} />
                    <span>{a.title}</span>
                  </button>
                ))}
                <button className="os-ico" onClick={() => { window.location.href = "/"; }}>
                  <OsIcon name="back" />
                  <span>{OS_T.backToSite}</span>
                </button>
              </div>
              {wins.map((w) => {
                const app = appById(w.appId);
                return (
                  <OsWindow key={w.appId} win={w} app={app} deskRef={deskRef}
                    onFocus={focusWin} onClose={closeWin} onMin={minWin} onMax={maxWin} onMove={moveWin}>
                    {content(w.appId)}
                  </OsWindow>
                );
              })}
            </div>

            {startOpen && (
              <div className="os-startmenu">
                <div className="head mono"><span className="logo">mh</span> MaikelDOS <i>v1.0</i></div>
                {APPS.map((a) => (
                  <button key={a.id} onClick={() => openApp(a.id)}>
                    <OsIcon name={a.icon} size={18} /> {a.title}
                  </button>
                ))}
                <div className="div" />
                <button onClick={() => { window.location.href = "/"; }}>
                  <OsIcon name="back" size={18} /> {OS_T.backToSite}
                </button>
                <button onClick={shutdown}>
                  <span className="pwr">⏻</span> {OS_T.shutdown}
                </button>
              </div>
            )}

            <div className="os-taskbar mono">
              <button className={"os-start" + (startOpen ? " on" : "")} onClick={() => setStartOpen((o) => !o)}>
                <span className="logo">mh</span> {OS_T.start}
              </button>
              <div className="tasks">
                {wins.map((w, i) => {
                  const app = appById(w.appId);
                  return (
                    <button key={w.appId} className={"task" + (w.min ? "" : " on")}
                      onClick={() => (w.min ? focusWin(w.appId) : minWin(w.appId))}>
                      {i + 1}:{app.title}{w.min ? "" : "*"}
                    </button>
                  );
                })}
              </div>
              <div className="tray">
                <span className="seg">{clock}</span>
                <button className="pwrbtn" onClick={shutdown} aria-label="apagar">⏻</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<OsApp />);
