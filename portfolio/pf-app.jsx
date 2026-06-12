// Portafolio Maikel — app principal (Bold creativo)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#00a86b",
  "marquee": true,
  "badge": true
}/*EDITMODE-END*/;

// hook: scroll reveal — IO + polling por timer (robusto en iframes throttled donde
// no corren frames: ni IO, ni scroll events, ni transiciones CSS)
function useReveal(deps) {
  React.useEffect(() => {
    const els = [...document.querySelectorAll(".rv")];
    // tras la animación, "settled" elimina la transition → la opacidad final
    // aplica de inmediato aunque el iframe no renderice frames
    const settle = (el) => setTimeout(() => el.classList.add("settled"), 1300);
    const reveal = (el) => {
      if (!el.classList.contains("in")) { el.classList.add("in"); settle(el); }
    };
    const inView = (el) => el.getBoundingClientRect().top < window.innerHeight * 0.96;

    els.forEach((el) => { if (inView(el)) reveal(el); });

    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
        { threshold: 0.12 }
      );
      els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    }

    // fallback universal: timers corren incluso sin frames de render
    const poll = setInterval(() => {
      els.forEach((el) => { if (!el.classList.contains("in") && inView(el)) reveal(el); });
    }, 350);

    return () => { if (io) io.disconnect(); clearInterval(poll); };
  }, deps);
}

function PfApp() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(() => localStorage.getItem("pf_lang") || "es");
  const t = PF_I18N[lang];
  useReveal([lang]);

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    localStorage.setItem("pf_lang", next);
  };

  return (
    <div className="pf" style={{ "--acc": tw.accent }}>
      <nav className="pf-nav" data-screen-label="Nav">
        <div className="wrap">
          <span className="l">MAIKEL HERNÁNDEZ © 2026</span>
          <span className="r">
            <a href="#skills">{t.navSkills}</a>
            <a href="#proyectos">{t.navProjects}</a>
            <a href="#contacto">{t.navContact}</a>
            <button className="pf-lang" onClick={toggleLang} aria-label="Cambiar idioma / switch language">
              <span className={lang === "es" ? "on" : ""}>ES</span>
              <span className={lang === "en" ? "on" : ""}>EN</span>
            </button>
          </span>
        </div>
      </nav>

      <header className="pf-hero" data-screen-label="Hero">
        <h1 className="pf-h1 rv">
          {t.heroLine1} <span className="ghost">{t.heroLine2}</span><br />
          {t.heroLine3}<span className="acc">.</span>
        </h1>
        <div className="wrap">
          <div className="pf-herorow">
            <p className="pf-tagline rv d1">
              {t.heroTag1}<b>{t.heroTagName}</b>{t.heroTag2}
            </p>
            {tw.badge && (
              <div className="pf-badge rv d2">
                {t.badge[0]}<br />{t.badge[1]}<br />{t.badge[2]}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pf-marq" data-screen-label="Marquee">
        <div className={"pf-marq-inner" + (tw.marquee ? " animate" : "")}>
          {PF_MARQUEE.concat(PF_MARQUEE).map((x, i) => (
            <span key={i}>{x} ✦</span>
          ))}
        </div>
      </div>

      <section className="pf-sec wrap" id="skills" data-screen-label="Skills">
        <div className="pf-seclab rv">{t.skillsLabel}</div>
        {PF_SKILLS.map((g, i) => (
          <div className={"pf-srow rv d" + (i + 1)} key={g.group.en}>
            <div className="pf-snum">0{i + 1}</div>
            <div className="pf-sname">{g.group[lang]}</div>
            <div className="pf-chips">
              {g.items.map(([n, slug]) => (
                <span className="pf-chip" key={n}>
                  <PfTechIcon name={n} slug={slug} size={20} />{n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pf-sec wrap" id="proyectos" data-screen-label="Proyectos">
        <div className="pf-seclab rv">{t.projectLabel}</div>
        <article className="pf-poster rv d1">
          <div className="pf-poster-top">
            <h3 className="pf-pname">Docu<br />Mind<sup>®</sup></h3>
            <span className="pf-live">{t.live}</span>
          </div>
          <div className="pf-poster-body">
            <div>
              <p className="pf-pdesc"><b>{t.projectSummary}</b> {t.projectDesc}</p>
              <div className="pf-ptags">
                <span className="pf-ptag">RAG</span>
                <span className="pf-ptag">Node.js</span>
                <span className="pf-ptag">Gemini</span>
                <span className="pf-ptag">PostgreSQL · pgvector</span>
                <span className="pf-ptag">Vercel</span>
                <span className="pf-ptag">Serverless</span>
              </div>
              <a className="pf-parrow" href={PF_LINKS.documind} target="_blank" rel="noopener">
                {t.seeProject} <i>⟶</i>
              </a>
            </div>
            <div className="pf-shotframe">
              <img src="portfolio/documind.png" alt="DocuMind — asistente de documentos con IA" />
            </div>
          </div>
        </article>
        <div className="pf-moresoon rv d2">
          <span>{t.moreSoon}</span>
          <span className="mono">// WIP</span>
        </div>
      </section>

      <footer className="pf-foot" id="contacto" data-screen-label="Contacto">
        <div className="wrap">
          <a className="pf-fbig rv" href={"mailto:" + PF_LINKS.email} title={t.writeMe}>
            {t.talk[0]}<span>{t.talk[1]}</span> <i>⟶</i>
          </a>
          <div className="pf-fmail">
            <a href={"mailto:" + PF_LINKS.email}>{PF_LINKS.email}</a>
          </div>
          <div className="pf-frow">
            <span>{t.footNote}</span>
            <span className="links">
              <a href={PF_LINKS.github} target="_blank" rel="noopener">GITHUB</a>
              <a href={PF_LINKS.linkedin} target="_blank" rel="noopener">LINKEDIN</a>
            </span>
          </div>
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Estilo" />
        <TweakColor
          label="Color de acento"
          value={tw.accent}
          options={["#5b8cff", "#3ecf8e", "#ff7a59", "#c77bff"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakToggle label="Marquee animado" value={tw.marquee} onChange={(v) => setTweak("marquee", v)} />
        <TweakToggle label="Badge 'Open to work'" value={tw.badge} onChange={(v) => setTweak("badge", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PfApp />);
