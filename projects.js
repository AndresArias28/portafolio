(function () {
  const asset = (path) => path || null;
  const demoAudio = {
    file: asset("assets/audio/calm-portfolio.mp3"),
    track: "Relaxation 05",
    artist: "Lily J",
    license: "Mixkit Stock Music Free License",
    licenseUrl: "https://mixkit.co/license/",
  };

  window.PORTFOLIO_DEMO_AUDIO = demoAudio;

  window.PORTFOLIO_PROJECTS = [
    {
      slug: "punto-rojo",
      route: "work/punto-rojo/",
      name: "Punto Rojo",
      eyebrow: "01 / FLAGSHIP PRODUCT",
      category: "Mobile App",
      status: "Production",
      featured: true,
      shortDescription:
        "A multi-tenant mobile business management platform for customers, products, sales, invoices, expenses and daily operations.",
      description:
        "Punto Rojo brings the daily commercial operation of small businesses into one mobile product, connecting point-of-sale workflows with a tenant-aware REST API.",
      image: asset("assets/projects/puntorojo/dash.jpeg"),
      screenshots: [
        ["assets/projects/puntorojo/factura.jpeg", "Punto Rojo dashboard"],

      ],
      technologies: ["Flutter", "Node.js", "AdonisJS", "MySQL", "AWS"],
      role: "Product development across mobile, backend, data, deployment and support",
      period: "Operational product",
      stackSummary: "Flutter · REST API · AdonisJS · MySQL",
      problem:
        "Small businesses needed a faster way to manage customers, products, invoices, sales and expenses without splitting everyday operations across disconnected tools.",
      solution:
        "A mobile client consumes a REST API that centralizes business rules and resolves each operation inside the authenticated business context.",
      features: [
        "Customers, products, sales, invoices and expenses",
        "Employees, suppliers and business summaries",
        "Sales metrics and rankings",
        "Bluetooth ESC/POS invoice printing",
      ],
      technicalDecisions: [
        [
          "Tenant-aware data boundaries",
          "Business operations resolve within the correct tenant context so several businesses can use one platform without mixing information.",
        ],
        [
          "REST boundary for mobile",
          "Business rules remain centralized in the API while the Flutter experience evolves independently.",
        ],
        [
          "Direct thermal printing",
          "Bluetooth printing stays inside the point-of-sale flow instead of depending on a desktop intermediary.",
        ],
        [
          "AWS/Linux operations",
          "AWS, Linux and Nginx provide the documented deployment context for the operational product.",
        ],
      ],
      results: [
        ["Production", "200+ invoices per month"],
        ["Workflow", "Invoice printing in under 30 seconds"],
        ["Integration", "More than 10 REST endpoints consumed by the mobile app"],
      ],
      privacyNote:
        "The available Punto Rojo captures contain identifiable customer or business information and are withheld until sanitized.",
      videoUrl: asset("assets/projects/puntorojo/video_demo_calm.mp4"),
      audio: demoAudio,
      githubUrl: null,
      demoUrl: null,
    },
    {
      slug: "legatia",
      route: "work/legalflow/",
      name: "Legatia",
      eyebrow: "02 / SAAS PRODUCT",
      category: "SaaS",
      status: "Product build",
      featured: false,
      shortDescription:
        "A legal operations workspace for firms managing clients, cases, documents, tasks, hearings and deadlines.",
      description:
        "Legatia is a legal operations product that centralizes the context a firm needs to manage clients, cases and day-to-day work.",
      image: asset("assets/projects/legatia/dash.png"),
      screenshots: [
        ["assets/projects/legatia/dash.png", "Legatia dashboard"],
        ["assets/projects/legatia/dashUser.png", "Legatia user dashboard"],
        ["assets/projects/legatia/login.png", "Legatia login screen"],
        ["assets/projects/legatia/programador.png", "Legatia developer view"],
      ],
      technologies: ["React", "TypeScript", "Vite", "Express", "MySQL"],
      role: "Full Stack product development",
      period: "MVP / beta preparation",
      stackSummary: "React · Node.js / Express · Sequelize · MySQL",
      problem:
        "Legal information can fragment across documents, chats, calendars and spreadsheets. The product centralizes operational context for each client and case.",
      solution:
        "A role-aware SaaS workspace connects a React frontend with an Express API and relational data model for legal firm operations.",
      features: [
        "Client and case management",
        "Documents, tasks, hearings and deadlines",
        "Firm, user and role-aware workflows",
        "Onboarding and beta requests",
      ],
      technicalDecisions: [
        [
          "Role-aware access",
          "Permissions belong to the product model and are not reduced to visual hiding in the client.",
        ],
        [
          "Remote-state queries",
          "Client interfaces stay predictable while server data changes across the product workflow.",
        ],
        [
          "Structured validation",
          "Zod clarifies the contracts where user input and API payloads meet.",
        ],
      ],
      results: [],
      privacyNote: null,
      videoUrl: asset("assets/projects/legatia/legatiaDemo_calm.mp4"),
      audio: demoAudio,
      githubUrl: null,
      demoUrl: null,
    },
    {
      slug: "healthu",
      route: "work/healthu/",
      name: "HealthU",
      eyebrow: "03 / JAVA + ANGULAR",
      category: "Full Stack",
      status: "Completed project",
      featured: false,
      shortDescription:
        "A full-stack gym management platform for users, routines and challenges with authenticated workflows.",
      description:
        "HealthU demonstrates full-stack work in the Java ecosystem, from authenticated APIs and relational data to Angular workflows and testing.",
      image: asset("assets/projects/healthU/dashboarda-admin.png"),
      screenshots: [
        ["assets/projects/healthU/login.png", "HealthU login screen"],
        ["assets/projects/healthU/dashboarda-admin.png", "HealthU administrator dashboard"],
        ["assets/projects/healthU/gestion-rutinas.png", "HealthU routine management"],
        ["assets/projects/healthU/crearQR.png", "HealthU QR creation flow"],
        ["assets/projects/healthU/econtrarnos.png", "HealthU user experience"],
      ],
      technologies: ["Angular", "Java", "Spring Boot", "Spring Security", "PostgreSQL", "JUnit"],
      role: "Full Stack development, Scrum collaboration and testing",
      period: "Academic / team project",
      stackSummary: "Angular · Spring Boot · REST API · PostgreSQL",
      problem:
        "A gym needed a platform for user management, routines and challenges with authenticated access and validated workflows.",
      solution:
        "Angular reactive forms consume a REST API secured with Spring Security and JWT, backed by a relational PostgreSQL model.",
      features: [
        "User management",
        "Routine and challenge management",
        "Authentication and JWT sessions",
        "Gym administration workflows",
      ],
      technicalDecisions: [
        [
          "JWT sessions",
          "Authenticated API requests remain stateless and explicit across the application.",
        ],
        [
          "JPA relational model",
          "The data layer represents relationships between users, routines and challenges in a maintainable way.",
        ],
        [
          "Reactive forms",
          "User input is validated close to the interface while preserving a clear backend contract.",
        ],
      ],
      results: [["Testing", "JUnit work documented across approximately 40% of project modules"]],
      privacyNote: null,
      videoUrl: null,
      audio: null,
      githubUrl: "https://github.com/AndresArias28/front-senaHealthU",
      demoUrl: null,
    },
    {
      slug: "sigeva",
      route: "work/sigeva/",
      name: "SIGEVA",
      eyebrow: "04 / SOFTWARE FACTORY",
      category: "Academic / Software Factory",
      status: "Institutional context",
      featured: false,
      shortDescription:
        "An institutional electoral management system with role-specific workflows for learners, staff and administrators.",
      description:
        "SIGEVA supports electoral administration and voting flows in a SENA Software Factory context, including candidate management and reporting.",
      image: asset("assets/projects/sigeva/dashboard.png"),
      screenshots: [
        ["assets/projects/sigeva/dashboard.png", "SIGEVA administrative dashboard"],
      ],
      technologies: ["React 19", "TypeScript", "Vite 7", "Bootstrap", "Zod"],
      role: "Full Stack developer and candidate module owner; Scrum Master in a documented version",
      period: "2024",
      stackSummary: "React · TypeScript · AdonisJS · PostgreSQL",
      problem:
        "The system needed to support electoral administration and voting flows with different capabilities for learners, staff and administrators.",
      solution:
        "Role-specific interfaces connect to an API for candidate, learner, staff, election and reporting workflows.",
      features: [
        "Candidate CRUD and photograph management",
        "Learner, staff and administrator workflows",
        "Election and voting management",
        "Charts, PDF reports and spreadsheet exports",
      ],
      technicalDecisions: [
        [
          "Role-specific workflows",
          "Each institutional role receives the operational surface it needs: learner, staff or administrator.",
        ],
        [
          "Validated candidate forms",
          "Candidate creation and editing remain consistent across UI and API boundaries.",
        ],
        [
          "Reusable reporting surface",
          "Charts and exports make electoral administration information actionable.",
        ],
      ],
      results: [["Recognition", "Selected to represent SENA at the national Software Factory competition"]],
      privacyNote: "Only the review-approved dashboard preview is included in the public gallery.",
      videoUrl: asset("assets/projects/sigeva/VideoProject_calm.mp4"),
      audio: demoAudio,
      githubUrl: "https://github.com/AndresArias28/sigevaFront",
      demoUrl: null,
    },
    {
      slug: "circus-cinema",
      route: "work/circus-cinema/",
      name: "Circus Cinema",
      eyebrow: "05 / FULL-STACK APPLICATION",
      category: "Full Stack",
      status: "Demo system",
      featured: false,
      shortDescription:
        "A cinema booking system connecting a React frontend with Spring Boot services and PostgreSQL persistence.",
      description:
        "Circus Cinema demonstrates a complete booking flow: browse the catalogue, choose a function and seats, and persist the reservation through a REST API.",
      image: asset("assets/projects/CircusCinema/cartelera.png"),
      screenshots: [
        ["assets/projects/CircusCinema/cartelera.png", "Circus Cinema catalogue"],
        ["assets/projects/CircusCinema/movie1.png", "Circus Cinema movie detail"],
        ["assets/projects/CircusCinema/funciones.png", "Circus Cinema showtimes"],
        ["assets/projects/CircusCinema/reservar_asiento.png", "Circus Cinema seat selection"],
        ["assets/projects/CircusCinema/confirmar_reserva.png", "Circus Cinema booking confirmation"],
        ["assets/projects/CircusCinema/confirmar_reserva2.png", "Circus Cinema reservation summary"],
        ["assets/projects/CircusCinema/reservas.png", "Circus Cinema reservations"],
        ["assets/projects/CircusCinema/dash.png", "Circus Cinema administration dashboard"],
      ],
      technologies: ["React 19", "TypeScript", "Spring Boot", "Java 25", "PostgreSQL"],
      role: "Full Stack development",
      period: "Demo system",
      stackSummary: "React · Spring Boot · REST API · PostgreSQL",
      problem:
        "A cinema booking flow needs to keep catalogue, showtimes, seat availability and reservations aligned across the frontend and backend.",
      solution:
        "A React and TypeScript SPA consumes Spring Boot REST services that validate booking rules, calculate totals and persist reservations in PostgreSQL.",
      features: [
        "Movie catalogue and showtimes",
        "Seat selection and reservation confirmation",
        "Reservation management",
        "Demo data seeded through the full-stack environment",
      ],
      technicalDecisions: [
        [
          "Backend-owned booking rules",
          "The API validates availability, calculates totals and persists the reservation.",
        ],
        [
          "Clean backend boundaries",
          "Spring Boot, Java and PostgreSQL separate domain, application and infrastructure concerns.",
        ],
        [
          "Relative API configuration",
          "The frontend uses a configurable API base and Vite proxy during local development.",
        ],
      ],
      results: [],
      privacyNote: null,
      videoUrl: asset("assets/projects/CircusCinema/videodemo_calm.mp4"),
      audio: demoAudio,
      githubUrl: "https://github.com/AndresArias28/cinema-frontend",
      demoUrl: null,
    },
  ];

  window.getPortfolioProject = (slug) =>
    window.PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
})();
