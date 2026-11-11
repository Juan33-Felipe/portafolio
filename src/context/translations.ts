export const translations = {
  es: {
    // TopHeaderBar
    nav: {
      inicio: 'Inicio',
      sobreMi: 'Sobre Mí',
      testimonios: 'Testimonios',
      proyectos: 'Proyectos',
      experiencia: 'Experiencia',
      contacto: 'Contacto',
      downloadCv: 'Descargar CV (PDF)',
      github: 'GITHUB',
      cv: 'CV',
      location: 'PASTO, CO',
      menuAriaOpen: 'Abrir menú de navegación',
      menuAriaClose: 'Cerrar menú de navegación',
      themeToggleAria: 'Cambiar a modo claro/oscuro',
      langToggleAria: 'Cambiar idioma español/inglés',
    },
    // HeroSection
    hero: {
      name: ['JUAN', 'FELIPE', 'ZAMBRANO'],
      roles: [
        'Arquitecto de Soluciones',
        'Ingeniería de Software',
        'Interfaces & Sistemas',
        'Clean Architecture',
      ],
      rolePrefix: 'Desarrollador de Software',
      downloadCv: 'Descargar CV',
      contactMe: 'Contáctame',
      scrollPrompt: 'Desliza para explorar',
      cardRole: 'Ingeniero de Software',
      cardBio:
        'Estudiante de Ingeniería de Software enfocado en el diseño y construcción de aplicaciones modernas, interfaces fluidas y arquitecturas escalables mediante el uso de frameworks de alto rendimiento y patrones de diseño sólidos.',
    },
    // AboutSection
    about: {
      title: 'Sobre mí',
      bio: 'Vivo en San Juan de Pasto, Nariño, y curso Ingeniería de Software en la Universidad Cooperativa de Colombia. Mi enfoque va más allá de crear funcionalidades CRUD básicas; me concentro en estructurar sistemas robustos y escalables aplicando Clean Architecture y el patrón MVC para asegurar que cada proyecto sea mantenible a largo plazo.',
      statSemestre: 'Semestre UCC',
      statFrameworks: 'Frameworks',
      factLocation: 'San Juan de Pasto, Colombia',
      factDegree: '5° Semestre · Ing. de Software (UCC)',
      factFocus: 'Arquitectura de Software & UI/UX',
      downloadCv: 'Descargar CV',
      frameworksTitle: 'FRAMEWORKS',
      testimonialsTitle: 'TESTIMONIOS',
      testimonials: [
        {
          name: 'Kevin Andres Buitrago',
          role: 'Desarrollador full stack · Medellín',
          quote:
            'Juan Felipe estructura cada proyecto con una arquitectura clara y escalable. Trabajar con él en equipo garantiza código limpio, mantenible y entregas a tiempo.',
        },
        {
          name: 'Juan Arismendy',
          role: 'Desarrollador full stack · Medellín',
          quote:
            'Destaca por su visión técnica, buenas prácticas y capacidad para resolver problemas complejos con arquitecturas robustas tanto en backend como en frontend.',
        },
        {
          name: 'Juan Henao',
          role: 'Desarrollador full stack · Medellín',
          quote:
            'Gran compañero de desarrollo: excelente comunicación, dominio en integración de servicios e interfaces intuitivas que elevan la calidad global del producto.',
        },
      ],
    },
    // ProjectsSection
    projects: {
      title: 'Proyectos',
      subtitle:
        'Explora la arquitectura, tecnologías y características técnicas de cada solución desarrollada. Haz clic en cualquier tarjeta o explora la ficha técnica a continuación.',
      techStack: 'Stack Tecnológico',
      visitWeb: 'Visitar Web',
      viewCode: 'Ver Código',
      frontendRepo: 'Frontend Repo',
      backendRepo: 'Backend Repo',
      tryApp: 'Probar App',
      download: 'Descargar',
      downloadMac: 'Descargar para Mac (.zip portable)',
      downloadMacDmg: 'Descargar para Mac (.dmg)',
      downloadWindows: 'Descargar para Windows (.exe)',
      specSheet: 'Ficha técnica',
      of: 'de',
      modal: {
        liveApp: 'App en vivo',
        preview: 'Vista previa',
        specSheetTab: 'Ficha técnica',
        downloadExe: 'Descargar .exe',
        downloadMacZip: 'Descargar Mac (.zip portable)',
        downloadMacDmg: 'Descargar Mac (.dmg)',
        roleLabel: 'Rol:',
        techDescTitle: 'Descripción Técnica y Alcance',
        featuresTitle: 'Funcionalidades y Capacidades Principales',
        archTitle: 'Arquitectura del Sistema & Decisiones de Diseño',
        techTitle: 'Tecnologías y Frameworks',
        interactPrompt: 'Interactuar con la aplicación',
        reloadApp: 'Reiniciar aplicación',
        interactiveAppChrome: 'Aplicación Interactiva',
        footerHint: 'Haz clic fuera o presiona Esc para cerrar',
        seeFullSpec: 'Ver ficha técnica completa →',
        liveFunctionalApp: 'Aplicación funcional en vivo',
        navHint: 'Usa las teclas ← y → para navegar',
        zoomAria: 'Ampliar proyecto',
        touchToView: 'Toca para ver',
      },
      items: [
        {
          title: 'EquiWage Analytics',
          category: 'Analítica Salarial & Desktop',
          role: 'Desarrollador de Software & Arquitectura Frontend',
          status: 'v1.0.0 Estable',
          description:
            'Plataforma de escritorio y web para auditoría salarial, detección de brechas de compensación y visualización analítica avanzada con cumplimiento normativo.',
          longDescription:
            'Plataforma integral de analítica de compensación diseñada para departamentos de talento humano, auditoría y compensaciones. Permite ingerir nóminas complejas, normalizar variables categóricas y calcular discrepancias salariales tanto brutas como ajustadas mediante modelos estadísticos en memoria, facilitando la identificación proactiva de brechas de género o cargo y la generación de planes de nivelación con proyección presupuestaria.',
          features: [
            'Motor estadístico en tiempo real con cálculo de medianas, percentiles y dispersión salarial.',
            'Generador de informes de cumplimiento legal con sugerencias de ajuste presupuestal gradual.',
            'Simulador interactivo de costos organizacionales para cierre de brechas en múltiples fases.',
            'Arquitectura de procesamiento en cliente para estricta confidencialidad de datos salariales.',
          ],
          architecture:
            'Arquitectura desacoplada basada en Electron + React con TypeScript, aislamiento de procesos mediante IPC seguro y motor de cálculo estadístico optimizado para procesar nóminas de miles de registros sin latencia perceptible ni envío de datos sensibles a servidores remotos.',
        },
        {
          title: 'EchoStock',
          category: 'Wearable IoT & Logística por Voz',
          role: 'Desarrollador de Software & Backend',
          status: 'Prototipo Funcional',
          description:
            'Ecosistema vestible para SmartWatch (Wear OS) y backend reactivo que permite a operarios de almacén consultar inventario y registrar stock mediante comandos de voz.',
          longDescription:
            'Solución operativa diseñada para acelerar tareas de picking e inventario en centros logísticos. A través de un reloj inteligente con Wear OS y síntesis de voz, los operarios pueden interrogar existencias, ubicar estanterías y reportar ingresos o mermas con las manos completamente libres, reduciendo drásticamente los desplazamientos innecesarios y los errores de transcripción manual.',
          features: [
            'Motor de reconocimiento por voz tolerante a ruido ambiental y especializado en códigos SKU.',
            'Feedback háptico configurable en la muñeca para confirmar operaciones y alertar stock crítico.',
            'Canal de comunicación bidireccional en tiempo real con el servidor mediante WebSockets.',
            'Búfer local para almacenamiento temporal de operaciones en zonas de almacén sin cobertura Wi-Fi.',
          ],
          architecture:
            'Arquitectura orientada a eventos (Event-Driven) con WebSockets persistentes de baja sobrecarga entre los dispositivos Wear OS y la API en Node.js, implementando un control de concurrencia optimista para evitar conflictos en inventarios compartidos.',
        },
        {
          title: 'sudo-kill-9',
          category: 'Videojuego 3D & Simulación Cinemática',
          role: 'Desarrollador de Videojuegos / Gameplay & VFX',
          status: 'Proyecto Destacado',
          description:
            'Videojuego de acción espacial con estética cibernética, desarrollado en Unity con C#, físicas balísticas dinámicas, efectos procedurales y batallas contra jefes.',
          longDescription:
            'Experiencia interactiva 3D con ritmo vertiginoso ambientada en un entorno cibernético hostil. Destaca por su sistema balístico avanzado con proyectiles guiados predictivos, un pipeline visual enriquecido mediante shaders personalizados en Universal Render Pipeline (URP) y una dirección de cámara inmersiva construida con Cinemachine para transiciones cinematográficas fluidas.',
          features: [
            'Proyectiles autoguiados (homing missiles) calculados mediante curvas de interpolación vectorial.',
            'Efectos visuales de partículas procedurales con Shader Graph optimizados para alto rendimiento.',
            'Inteligencia artificial de jefes basada en máquinas de estados jerárquicas con patrones multifase.',
            'Transiciones dinámicas entre cinemáticas de cámara y secuencias jugables sin cortes de carga.',
          ],
          architecture:
            'Arquitectura de componentes modulares con Scriptable Objects para desacoplar datos de armas de la lógica de ejecución, reduciendo la dependencia entre módulos y facilitando el balance paramétrico en tiempo real dentro del ciclo de juego.',
        },
        {
          title: 'SpecAtlas',
          category: 'Ingeniería de Software & Grafos',
          role: 'Arquitecto de Soluciones',
          status: 'Fase de Investigación',
          description:
            'Sistema de análisis de calidad y consistencia de requisitos de software modelados como grafos de dependencias en Neo4j con evaluación semántica.',
          longDescription:
            'Herramienta de ingeniería formal orientada a mitigar la deuda técnica en etapas tempranas del ciclo de vida del software. Estructura especificaciones y requisitos funcionales/no funcionales como un grafo dirigido de interdependencias, permitiendo evaluar el impacto en cascada de modificaciones de alcance y detectar de manera algorítmica inconsistencias, solapamientos y ambigüedades.',
          features: [
            'Modelado topológico de dependencias funcionales, precondiciones y restricciones técnicas en Neo4j.',
            'Detección automática de dependencias circulares, requisitos huérfanos y solapamientos de alcance.',
            'Simulación de impacto para evaluar los módulos y casos de prueba afectados ante cambios en requisitos.',
            'Métricas semánticas de ambigüedad léxica y completitud basadas en directrices internacionales.',
          ],
          architecture:
            'Backend de microservicios con Spring Boot y motor de base de datos orientado a grafos nativo (Neo4j), permitiendo consultas complejas de impacto mediante Cypher en tiempo constante, complementado con visualización interactiva de grafos en frontend.',
        },
        {
          title: 'LurifyCase Mobile',
          category: 'Comercio Móvil & Personalización',
          role: 'Desarrollador Móvil',
          status: 'Prototipo Multiplataforma',
          description:
            'Ecosistema móvil para la gestión centralizada de expedientes jurídicos, seguimiento de casos activos y auditoría asistida.',
          longDescription:
            'Solución móvil de alta productividad orientada al ámbito legal y gestión de procesos. Permite a abogados y usuarios revisar expedientes activos, registrar acciones probatorias, recibir alertas de auditoría y organizar casos jurídicos en tiempo real con una interfaz moderna y fluida.',
          features: [
            'Visualización y seguimiento centralizado de expedientes activos y archivados.',
            'Registro probatorio y auditoría con notificaciones en tiempo real.',
            'Flujo de acciones pendientes y radicación de documentos simplificada.',
            'Diseño móvil intuitivo con navegación optimizada para iOS y Android.',
          ],
          architecture:
            'Clean Architecture implementada en React Native / Expo con TypeScript, persistencia local optimizada y comunicación con servicios API REST para sincronización de expedientes y estados.',
        },
      ],
    },
    // ExperienceSection
    experience: {
      title: 'Experiencia',
      workTitle: 'Experiencia laboral',
      academicTitle: 'Experiencia académica',
      featuredBadge: 'Proyecto destacado',
      academicItems: [
        {
          title: 'Ingeniería de Software',
          institution: 'Universidad Cooperativa de Colombia · Campus Pasto',
          period: '2022 — Actualidad',
          description:
            'Inicio de la carrera profesional en Ingeniería de Software. Actualmente en 5° semestre.',
        },
        {
          title: 'Seminario de Ingeniería de Software I',
          institution: 'Facultad de Ingeniería de Software · UCC',
          period: '2022',
        },
        {
          title: 'Seminario de Ingeniería de Software II',
          institution: 'Facultad de Ingeniería de Software · UCC',
          period: '2023',
        },
        {
          title: 'Seminario de Ingeniería de Software III',
          institution: 'Facultad de Ingeniería de Software · UCC',
          period: '2024',
        },
        {
          title: 'Seminario de Ingeniería de Software IV',
          institution: 'Facultad de Ingeniería de Software · UCC',
          period: '2025',
        },
      ],
    },
    // ContactSection
    contact: {
      title: 'Contáctame',
      prompt:
        '¿Tienes un proyecto, una propuesta o simplemente quieres saludar? Escríbeme por cualquiera de estos medios y te responderé lo antes posible.',
      downloadCv: 'Descargar CV',
      cvSubtitle: 'Currículum Vitae (PDF)',
      formTitle: 'Déjame un mensaje',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo',
      emailPlaceholder: 'tucorreo@ejemplo.com',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntame en qué puedo ayudarte...',
      sendMessage: 'Enviar mensaje',
      successMessage: 'Se abrió tu aplicación de correo para enviar el mensaje.',
      emailSubject: 'Contacto desde el portafolio — ',
    },
    // Footer
    footer: {
      quickLinks: 'Enlaces',
      followMe: 'Sígueme',
      copyright: '© 2026 Juan Felipe Zambrano. Todos los derechos reservados.',
    },
    // IntroLoader
    intro: {
      location: 'Portafolio · Pasto, CO',
    },
    // BackToTop
    backToTop: 'Volver arriba',
  },
  en: {
    // TopHeaderBar
    nav: {
      inicio: 'Home',
      sobreMi: 'About Me',
      testimonios: 'Testimonials',
      proyectos: 'Projects',
      experiencia: 'Experience',
      contacto: 'Contact',
      downloadCv: 'Download CV (PDF)',
      github: 'GITHUB',
      cv: 'CV',
      location: 'PASTO, CO',
      menuAriaOpen: 'Open navigation menu',
      menuAriaClose: 'Close navigation menu',
      themeToggleAria: 'Toggle dark/light mode',
      langToggleAria: 'Toggle Spanish/English language',
    },
    // HeroSection
    hero: {
      name: ['JUAN', 'FELIPE', 'ZAMBRANO'],
      roles: [
        'Solutions Architect',
        'Software Engineering',
        'Interfaces & Systems',
        'Clean Architecture',
      ],
      rolePrefix: 'Software Developer',
      downloadCv: 'Download CV',
      contactMe: 'Contact Me',
      scrollPrompt: 'Scroll to explore',
      cardRole: 'Software Engineer',
      cardBio:
        'Software Engineering student focused on designing and building modern applications, fluid interfaces, and scalable architectures using high-performance frameworks and solid design patterns.',
    },
    // AboutSection
    about: {
      title: 'About Me',
      bio: 'Living in San Juan de Pasto, Nariño, and studying Software Engineering at Universidad Cooperativa de Colombia. My focus extends beyond building basic CRUD apps; I focus on structuring robust, scalable systems using Clean Architecture and the MVC pattern to ensure every project remains maintainable long-term.',
      statSemestre: 'Semester UCC',
      statFrameworks: 'Frameworks',
      factLocation: 'San Juan de Pasto, Colombia',
      factDegree: '5th Semester · Software Eng. (UCC)',
      factFocus: 'Software Architecture & UI/UX',
      downloadCv: 'Download CV',
      frameworksTitle: 'FRAMEWORKS',
      testimonialsTitle: 'TESTIMONIALS',
      testimonials: [
        {
          name: 'Kevin Andres Buitrago',
          role: 'Full Stack Developer · Medellín',
          quote:
            'Juan Felipe structures every project with clear and scalable architecture. Teaming up with him guarantees clean, maintainable code and punctual deliveries.',
        },
        {
          name: 'Juan Arismendy',
          role: 'Full Stack Developer · Medellín',
          quote:
            'Stands out for his technical vision, best practices, and capability to resolve complex challenges with robust architectures on both backend and frontend.',
        },
        {
          name: 'Juan Henao',
          role: 'Full Stack Developer · Medellín',
          quote:
            'Great development partner: exceptional communication, mastery in service integration, and intuitive interfaces that elevate the product quality.',
        },
      ],
    },
    // ProjectsSection
    projects: {
      title: 'Projects',
      subtitle:
        'Explore the architecture, technologies, and technical specs of each developed solution. Click on any card or explore the technical sheet below.',
      techStack: 'Tech Stack',
      visitWeb: 'Visit Website',
      viewCode: 'View Code',
      frontendRepo: 'Frontend Repo',
      backendRepo: 'Backend Repo',
      tryApp: 'Try Live App',
      download: 'Download',
      downloadMac: 'Download for Mac (Portable .zip)',
      downloadMacDmg: 'Download for Mac (.dmg)',
      downloadWindows: 'Download for Windows (.exe)',
      specSheet: 'Technical Sheet',
      of: 'of',
      modal: {
        liveApp: 'Live App',
        preview: 'Preview',
        specSheetTab: 'Technical Sheet',
        downloadExe: 'Download .exe',
        downloadMacZip: 'Download Mac (Portable .zip)',
        downloadMacDmg: 'Download Mac (.dmg)',
        roleLabel: 'Role:',
        techDescTitle: 'Technical Overview & Scope',
        featuresTitle: 'Core Capabilities & Features',
        archTitle: 'System Architecture & Design Decisions',
        techTitle: 'Technologies & Frameworks',
        interactPrompt: 'Interact with application',
        reloadApp: 'Restart app',
        interactiveAppChrome: 'Interactive Application',
        footerHint: 'Click outside or press Esc to close',
        seeFullSpec: 'View full technical sheet →',
        liveFunctionalApp: 'Live functional application',
        navHint: 'Use ← and → keys to navigate',
        zoomAria: 'Enlarge project',
        touchToView: 'Tap to view',
      },
      items: [
        {
          title: 'EquiWage Analytics',
          category: 'Salary Analytics & Desktop',
          role: 'Software Developer & Frontend Architect',
          status: 'v1.0.0 Stable',
          description:
            'Desktop & web platform for salary auditing, compensation gap detection, and advanced analytical visualization with regulatory compliance.',
          longDescription:
            'Comprehensive compensation analytics platform designed for human resources, audit, and compensation teams. Ingests complex payrolls, normalizes categorical variables, and calculates raw and adjusted wage discrepancies using in-memory statistical models, facilitating proactive gender and role gap remediation with phased budget projections.',
          features: [
            'Real-time statistical engine calculating medians, percentiles, and pay dispersion metrics.',
            'Regulatory compliance report generator with gradual budget adjustment roadmaps.',
            'Interactive organizational cost simulator for multi-phase gap closure.',
            'Client-side processing architecture guaranteeing strict wage data confidentiality.',
          ],
          architecture:
            'Decoupled architecture based on Electron + React with TypeScript, process isolation via secure IPC, and an optimized statistical compute engine handling thousands of records with zero latency and zero data leakage to external servers.',
        },
        {
          title: 'EchoStock',
          category: 'Wearable IoT & Voice Logistics',
          role: 'Software Developer & Backend',
          status: 'Functional Prototype',
          description:
            'Wearable ecosystem for SmartWatch (Wear OS) and reactive backend enabling warehouse staff to inspect inventory and log stock hands-free via voice commands.',
          longDescription:
            'Operational solution designed to accelerate picking and inventory workflows in logistics centers. Through a Wear OS smartwatch and speech synthesis, operators query stock, locate aisles, and record receipts or shrinkages hands-free, eliminating unnecessary foot travel and manual entry mistakes.',
          features: [
            'Noise-tolerant voice recognition engine specialized in industrial SKU codes.',
            'Configurable wrist haptic feedback confirming operations and critical stock alerts.',
            'Real-time bidirectional communication channel with backend over WebSockets.',
            'Local write-ahead buffer for offline operation in warehouse dead zones without Wi-Fi.',
          ],
          architecture:
            'Event-Driven architecture with lightweight persistent WebSockets between Wear OS nodes and Node.js API, leveraging optimistic concurrency control to prevent race conditions on shared inventory pools.',
        },
        {
          title: 'sudo-kill-9',
          category: '3D Video Game & Cinematic Simulation',
          role: 'Game Developer / Gameplay & VFX',
          status: 'Featured Project',
          description:
            'Cyberpunk space action game built in Unity with C#, featuring dynamic homing ballistics, procedural visual shaders, and multi-phase boss fights.',
          longDescription:
            'Fast-paced 3D interactive experience set in a hostile cybernetic galaxy. Highlights include an advanced ballistics system with predictive guided missiles, a rich visual pipeline powered by custom Universal Render Pipeline (URP) shaders, and cinematic camera transitions orchestrated via Cinemachine.',
          features: [
            'Predictive homing projectiles calculated with vector bezier interpolation curves.',
            'Procedural GPU particle VFX authored in Shader Graph and tuned for high framerates.',
            'Hierarchical state-machine boss AI executing reactive multi-phase attack routines.',
            'Seamless dynamic transitions between in-engine cinematics and gameplay without load cuts.',
          ],
          architecture:
            'Modular component architecture with Scriptable Objects decoupling weapon stats from runtime logic, minimizing system coupling and facilitating real-time parametric balancing during playtests.',
        },
        {
          title: 'SpecAtlas',
          category: 'Software Engineering & Graphs',
          role: 'Solutions Architect',
          status: 'Research Phase',
          description:
            'Software requirement quality and consistency analysis system modeled as dependency knowledge graphs in Neo4j with semantic evaluation.',
          longDescription:
            'Formal engineering tool designed to mitigate technical debt during early software lifecycle phases. Structures specifications and functional/non-functional requirements as a directed dependency graph, enabling cascading impact evaluations and algorithmic detection of circular references, gaps, and ambiguities.',
          features: [
            'Topological modeling of functional constraints, preconditions, and technical specs in Neo4j.',
            'Automated detection of circular dependencies, orphan requirements, and scope overlaps.',
            'Impact simulation predicting affected modules and test suites across requirement changes.',
            'Lexical ambiguity and completeness metrics calibrated against international standards.',
          ],
          architecture:
            'Spring Boot microservices backend connected to a native graph database (Neo4j), running constant-time Cypher traversal queries, coupled with interactive force-directed graph visualizers on the frontend.',
        },
        {
          title: 'LurifyCase Mobile',
          category: 'Mobile Commerce & Customization',
          role: 'Mobile Developer',
          status: 'Cross-Platform Prototype',
          description:
            'Mobile ecosystem for centralized legal case tracking, active proceeding monitoring, and assisted auditing.',
          longDescription:
            'High-productivity mobile solution tailored for legal practice and procedural management. Enables attorneys and clients to inspect case files, register evidentiary filings, receive audit notifications, and organize legal portfolios in real time.',
          features: [
            'Centralized tracking and inspection of active and archived court dockets.',
            'Evidentiary logging and audit alerts backed by push notifications.',
            'Simplified document submission and pending task workflows.',
            'Intuitive mobile design with fluid ergonomics optimized for iOS and Android.',
          ],
          architecture:
            'Clean Architecture built on React Native / Expo with TypeScript, optimized offline-first local storage, and seamless REST API integration for real-time docket synchronization.',
        },
      ],
    },
    // ExperienceSection
    experience: {
      title: 'Experience',
      workTitle: 'Work Experience',
      academicTitle: 'Academic Experience',
      featuredBadge: 'Featured Project',
      academicItems: [
        {
          title: 'Software Engineering Degree',
          institution: 'Universidad Cooperativa de Colombia · Pasto Campus',
          period: '2022 — Present',
          description:
            'Commenced professional Software Engineering degree. Currently enrolled in 5th semester.',
        },
        {
          title: 'Software Engineering Seminar I',
          institution: 'Software Engineering Department · UCC',
          period: '2022',
        },
        {
          title: 'Software Engineering Seminar II',
          institution: 'Software Engineering Department · UCC',
          period: '2023',
        },
        {
          title: 'Software Engineering Seminar III',
          institution: 'Software Engineering Department · UCC',
          period: '2024',
        },
        {
          title: 'Software Engineering Seminar IV',
          institution: 'Software Engineering Department · UCC',
          period: '2025',
        },
      ],
    },
    // ContactSection
    contact: {
      title: 'Contact Me',
      prompt:
        'Have a project, a proposal, or just want to say hi? Reach out through any of these channels and I will get back to you as soon as possible.',
      downloadCv: 'Download CV',
      cvSubtitle: 'Curriculum Vitae (PDF)',
      formTitle: 'Send me a message',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'youremail@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me how I can help you...',
      sendMessage: 'Send message',
      successMessage: 'Your default email client opened to send the message.',
      emailSubject: 'Portfolio Inquiry — ',
    },
    // Footer
    footer: {
      quickLinks: 'Links',
      followMe: 'Follow Me',
      copyright: '© 2026 Juan Felipe Zambrano. All rights reserved.',
    },
    // IntroLoader
    intro: {
      location: 'Portfolio · Pasto, CO',
    },
    // BackToTop
    backToTop: 'Back to top',
  },
} as const;
