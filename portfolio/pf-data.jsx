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
      " — construyo productos web de extremo a extremo, del modelo de datos al píxel. Desde Costa Rica, egresado del TEC.",
    badge: ["OPEN", "TO", "WORK ✦"],
    skillsLabel: "01 / STACK",
    projectLabel: "02 / PROYECTO DESTACADO",
    live: "LIVE IN PRODUCTION",
    projectSummary: "Asistente de documentos con IA y citas verificables.",
    projectDesc:
      "Sistema RAG end-to-end desplegado serverless en Vercel (Node, $0): embeddings de Gemini ordenados por similitud de coseno sobre PostgreSQL/pgvector, reconstrucción de citas en el servidor e ingesta de PDFs del usuario (parseo, chunking, embeddings). Rate limiting por IP y degradación elegante en cada capa.",
    seeProject: "VER PROYECTO",
    moreSoon: "Más proyectos en camino — este espacio crece con cada idea que llega a producción.",
    talk: ["Hable", "mos"],
    footNote: "© 2026 MAIKEL HERNÁNDEZ — COSTA RICA · GMT-6",
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
      " — I build web products end-to-end, from the data model to the pixel. Based in Costa Rica, TEC graduate.",
    badge: ["OPEN", "TO", "WORK ✦"],
    skillsLabel: "01 / STACK",
    projectLabel: "02 / FEATURED PROJECT",
    live: "LIVE IN PRODUCTION",
    projectSummary: "AI document assistant with verifiable citations.",
    projectDesc:
      "End-to-end RAG system deployed serverless on Vercel (Node, $0): Gemini embeddings ranked by cosine similarity over PostgreSQL/pgvector, server-side citation rebuilding, and user PDF ingestion (parse, chunk, embeddings). Per-IP rate limiting and graceful degradation at every layer.",
    seeProject: "SEE PROJECT",
    moreSoon: "More projects on the way — this space grows with every idea that ships to production.",
    talk: ["Let's", " talk"],
    footNote: "© 2026 MAIKEL HERNÁNDEZ — COSTA RICA · GMT-6",
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
