// Datos + i18n del portafolio de Maikel
const PF_LINKS = {
  github: "https://github.com/MaikelHR",
  githubLabel: "github.com/MaikelHR",
  linkedin: "https://www.linkedin.com/in/maikel-hernández-ruiz-539004165/",
  documind: "https://documind-lake.vercel.app",
  email: "maikelhernandezr4201@gmail.com",
};

const PF_SKILLS = [
  {
    group: { es: "Frontend", en: "Frontend" },
    items: [
      ["React", "react/react-original"],
      ["TypeScript", "typescript/typescript-original"],
      ["JavaScript", "javascript/javascript-original"],
      ["Vite", "vitejs/vitejs-original"],
      ["Tailwind CSS", "tailwindcss/tailwindcss-original"],
      ["HTML5", "html5/html5-original"],
      ["CSS3", "css3/css3-original"],
    ],
  },
  {
    group: { es: "Backend & Data", en: "Backend & Data" },
    items: [
      ["NestJS", "nestjs/nestjs-original"],
      ["Node.js", "nodejs/nodejs-original"],
      ["PostgreSQL", "postgresql/postgresql-original"],
      ["Supabase", "supabase/supabase-original"],
      ["Firebase", "firebase/firebase-plain"],
      ["Python", "python/python-original"],
      ["Java", "java/java-original"],
    ],
  },
  {
    group: { es: "DevOps & Cloud", en: "DevOps & Cloud" },
    items: [
      ["Docker", "docker/docker-original"],
      ["Kubernetes", "kubernetes/kubernetes-plain"],
      ["Azure", "azure/azure-original"],
      ["Vercel", "vercel/vercel-original"],
      ["Netlify", "netlify/netlify-original"],
      ["Git", "git/git-original"],
      ["GitHub", "github/github-original"],
    ],
  },
];

const PF_I18N = {
  es: {
    navSkills: "SKILLS",
    navProjects: "PROYECTOS",
    navContact: "CONTACTO",
    heroLine1: "Full",
    heroLine2: "Stack",
    heroLine3: "Developer",
    heroTag1: "Soy ",
    heroTagName: "Maikel Hernández",
    heroTag2:
      ". Construyo productos web completos, desde la base de datos hasta la interfaz. Vivo en Costa Rica, egresado del TEC.",
    badge: ["OPEN", "TO", "WORK ✦"],
    skillsLabel: "01 / STACK",
    projectLabel: "02 / PROYECTO DESTACADO",
    live: "LIVE IN PRODUCTION",
    projectSummary: "Asistente de documentos con IA y citas verificables.",
    projectDesc:
      "Sistema RAG completo desplegado serverless en Vercel: embeddings de Gemini con búsqueda por similitud de coseno sobre PostgreSQL/pgvector, reconstrucción de citas en el servidor e ingesta de PDFs del usuario (parseo, chunking, embeddings). Incluye rate limiting por IP.",
    seeProject: "VER PROYECTO",
    moreSoon: "Más proyectos en camino.",
    navGithub: "GITHUB",
    reposLabel: "03 / GITHUB EN VIVO",
    reposLoading: "Cargando repos…",
    reposError: "No se pudo cargar GitHub ahora mismo. Puedes verlo directo:",
    reposAll: "Ver todos los repos",
    cmdPlaceholder: "Buscar secciones, acciones, enlaces…",
    cmdEmpty: "Sin resultados.",
    paletteNav: "Navegar",
    paletteActions: "Acciones",
    paletteLinks: "Enlaces",
    actTop: "Inicio",
    actLang: "Switch to English",
    actTerminal: "Abrir terminal",
    actBoot: "Arrancar MaikelOS",
    actBootHint: "modo escritorio",
    pcCaption: "todavía enciende",
    talk: ["Hable", "mos"],
    footNote: "© 2026 MAIKEL HERNÁNDEZ · COSTA RICA · GMT-6",
    writeMe: "Escríbeme un correo →",
  },
  en: {
    navSkills: "SKILLS",
    navProjects: "PROJECTS",
    navContact: "CONTACT",
    heroLine1: "Full",
    heroLine2: "Stack",
    heroLine3: "Developer",
    heroTag1: "I'm ",
    heroTagName: "Maikel Hernández",
    heroTag2:
      ". I build complete web products, from the database to the interface. Based in Costa Rica, TEC graduate.",
    badge: ["OPEN", "TO", "WORK ✦"],
    skillsLabel: "01 / STACK",
    projectLabel: "02 / FEATURED PROJECT",
    live: "LIVE IN PRODUCTION",
    projectSummary: "AI document assistant with verifiable citations.",
    projectDesc:
      "Full RAG system deployed serverless on Vercel: Gemini embeddings with cosine similarity search over PostgreSQL/pgvector, server-side citation rebuilding, and user PDF ingestion (parse, chunk, embeddings). Includes per-IP rate limiting.",
    seeProject: "SEE PROJECT",
    moreSoon: "More projects coming soon.",
    navGithub: "GITHUB",
    reposLabel: "03 / LIVE FROM GITHUB",
    reposLoading: "Loading repos…",
    reposError: "Couldn't load GitHub right now. You can check it directly:",
    reposAll: "See all repos",
    cmdPlaceholder: "Search sections, actions, links…",
    cmdEmpty: "No results.",
    paletteNav: "Navigate",
    paletteActions: "Actions",
    paletteLinks: "Links",
    actTop: "Top",
    actLang: "Cambiar a Español",
    actTerminal: "Open terminal",
    actBoot: "Boot MaikelOS",
    actBootHint: "desktop mode",
    pcCaption: "it still boots",
    talk: ["Let's", " talk"],
    footNote: "© 2026 MAIKEL HERNÁNDEZ · COSTA RICA · GMT-6",
    writeMe: "Send me an email →",
  },
};

const PF_MARQUEE = [
  "REACT", "TYPESCRIPT", "NESTJS", "NODE.JS", "POSTGRESQL",
  "DOCKER", "KUBERNETES", "AZURE", "TAILWIND", "PYTHON",
];

const pfDevicon = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`;
const PF_ICON_INVERT = ["github/github-original", "vercel/vercel-original"];

function PfTechIcon({ name, slug, size = 20 }) {
  const [err, setErr] = React.useState(false);
  if (err) {
    return (
      <span
        style={{
          width: size, height: size, display: "inline-flex", alignItems: "center",
          justifyContent: "center", borderRadius: 5, flex: "none",
          background: "rgba(255,255,255,.08)", fontSize: size * 0.5,
          fontFamily: '"JetBrains Mono", monospace', color: "#9aa4b2",
        }}
      >{name[0]}</span>
    );
  }
  return (
    <img
      src={pfDevicon(slug)}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      style={{ display: "block", flex: "none", filter: PF_ICON_INVERT.includes(slug) ? "invert(1)" : "none" }}
      onError={() => setErr(true)}
    />
  );
}

Object.assign(window, { PF_LINKS, PF_SKILLS, PF_I18N, PF_MARQUEE, PfTechIcon });
