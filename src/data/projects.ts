import {
    fleuryInfrastructure, sibylInfrastructure, shortlistableInfrastructure,
    type ProjectInfrastructure,
} from "./infrastructure";

export interface Project {
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    longDescription: string;
    tech: string[];
    tags: string[];
    image: string | null;
    homepageImage?: string;
    homepageImageAlt?: string;
    projectUrl?: string;
    problem: string;
    solution: string;
    features: string[];
    capabilities?: { title: string; description: string }[];
    challenges?: string[];
    contributions?: string[];
    stackGroups?: { title: string; items: string[] }[];
    architecture: {
        description: string;
        diagramType: 'microservices' | 'monolith' | 'serverless' | 'mobile-backend' | 'bloden' | 'robot-racer' | 'shortlistable';
        infrastructure?: ProjectInfrastructure;
        decisions?: { title: string; description: string }[];
    };
    userFlow: {
        description: string;
        steps: { title: string; desc: string }[];
    };
}

export const projects: Project[] = [
    {
        slug: "fleury",
        title: "Fleury",
        subtitle: "Software Quality & AI Test Intelligence",
        description: "Explore web, API and mobile behavior, run tests and investigate release risks. Fleury connects execution evidence with an AI assistant, test recommendations and reviewable quality decisions.",
        longDescription: "Fleury helps engineering and QA teams understand what their software does, which behaviors have been tested and what needs attention before release. It brings application exploration, test discovery and execution, behavioral graphs, quality gates and evidence into one workbench. Its AI assistant helps investigate findings, propose links between behavior and tests, recommend and generate tests, and prepare quality briefs for different stakeholders. I conceived the product, its analysis algorithms and distributed architecture, from the interface to enterprise and self-hosted delivery.",
        tech: ["Next.js", "TypeScript", "Go", "Rust", "PostgreSQL", "Temporal", "Kafka", "gRPC", "AI integration", "Playwright", "Appium", "Docker"],
        tags: ["Developer Tools", "Quality", "AI"],
        image: null,
        problem: "Source code, tests and real application behavior often live in separate tools. A passing test suite does not explain which user journeys remain unexplored, and a failed run can leave teams without enough evidence to diagnose the problem or decide whether a release is ready.",
        solution: "Fleury turns tests and observed application behavior into a traceable basis for release decisions. Teams can navigate a behavioral graph, inspect a failure, review a quality gate and use AI to identify useful follow-up work. Correlations are tied to the source revision, proposals require review, and generated tests carry execution evidence before they count as completed work.",
        capabilities: [
            { title: "Explore application behavior", description: "Discover web screens, API endpoints and mobile journeys. Follow states and transitions in a graph, inspect captured evidence, and explore stateful or isolated branches." },
            { title: "Discover and run tests", description: "Connect a repository, discover supported test suites, build a selection and follow its execution. Inspect failures and compare results across runs." },
            { title: "Review release readiness", description: "Use quality scores and gates for tests, exploration or their combined evidence. Review risks, record a decision and share the result with a bounded viewer or CI webhook." },
            { title: "Investigate with an AI assistant", description: "Ask about a finding, run or selected graph element. Review proposed behavior-to-test links with supporting evidence, contradictions and confidence before accepting them." },
            { title: "Turn recommendations into tests", description: "Review AI recommendations and generated test diffs, then validate them against an exact source revision in an isolated workspace. Execution results remain attached to the recommendation." },
            { title: "Brief the right stakeholders", description: "Prepare AI-assisted quality briefs for QA, engineering, product, release and compliance. Review cited evidence, publish a version and export it in English or French." },
            { title: "Work across enterprise environments", description: "Manage teams, roles, SSO and provisioning. Use the workbench or CLI with cloud, self-hosted and air-gapped delivery options." }
        ],
        contributions: [
            "Conceived the product experience and the behavioral-analysis model for application states, transitions and isolated exploration branches.",
            "Designed the Go control plane, Rust analysis boundaries, durable workflows and runner execution contracts.",
            "Built the Next.js workbench, evidence inspection and shared graph components for web, API and mobile results.",
            "Designed evidence-grounded AI assistance, reviewed correlation proposals, test recommendation and synthesis workflows, and stakeholder quality briefs.",
            "Developed enterprise identity, access controls and a self-hosted distribution using the same product contracts as cloud delivery."
        ],
        features: [
            "Web, API and mobile application exploration",
            "Behavioral graphs with traceable states and transitions",
            "Test discovery, execution and failure investigation",
            "Source-revision correlation and evidence inspection",
            "Contextual AI assistant and reviewed behavior-to-test correlations",
            "AI test recommendations, generation and isolated validation",
            "Quality gates, CI webhooks and shareable decisions",
            "Evidence-grounded quality briefs in English and French",
            "Enterprise access and cloud/self-hosted delivery"
        ],
        challenges: [
            "Representing meaningful application states without multiplying equivalent screens or losing the provenance of a transition.",
            "Keeping exploration and test intelligence independent while correlating results from the same source revision.",
            "Recovering long-running execution after interruptions without duplicating commands, losing evidence or leaking isolated environments.",
            "Supporting different browser, API and mobile runners while exposing their actual capabilities and limitations.",
            "Grounding AI proposals in execution evidence and keeping human review, generated code, test results and release decisions as distinct steps.",
            "Delivering the same product in cloud and self-hosted environments with consistent identity, access and release contracts."
        ],
        stackGroups: [
            { title: "Frontend", items: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "next-intl", "Motion", "Shared UI package", "Storybook", "OpenAPI client generation"] },
            { title: "Backend & Analysis", items: ["Go", "Rust", "REST / OpenAPI", "Protobuf / gRPC", "pgx", "Source analysis", "Behavior analysis"] },
            { title: "AI & Test Synthesis", items: ["LLM gateway", "Durable AI jobs", "Evidence manifests", "Capability policies", "Provider provenance", "Human review", "Isolated synthesis worker", "Versioned quality briefs"] },
            { title: "Execution & Events", items: ["Temporal", "Kafka", "PostgreSQL outbox", "Go runners", "Playwright", "Chrome DevTools Protocol", "Appium", "UiAutomator2", "XCUITest"] },
            { title: "Data & Identity", items: ["PostgreSQL", "Row-level security", "Object storage", "OIDC", "Identity broker", "SCIM", "Secrets store"] },
            { title: "Infrastructure & Delivery", items: ["Docker Compose", "OpenTelemetry", "Prometheus", "Grafana", "Self-hosted CLI", "Air-gap release bundles", "Signed releases", "SBOM"] }
        ],
        architecture: {
            description: "Fleury separates product control, durable orchestration, runner execution and the event plane. The Go control plane owns PostgreSQL state and commands; Temporal coordinates long-running work, and separate runner hosts act on web, API and mobile targets. Rust analyzers run across process boundaries. Evidence is stored in object storage, secrets in a secrets store, and reviewed AI jobs use a provider adapter. The views below distinguish this runtime from the Kafka/CDC plane, the self-hosted package and container and Kubernetes deployment variants.",
            diagramType: "microservices",
            infrastructure: fleuryInfrastructure,
            decisions: [
                { title: "Explicit ownership", description: "The control plane and PostgreSQL remain authoritative; event transport and derived projections do not silently replace product state." },
                { title: "Independent evidence", description: "Tests and exploration can run separately. Correlation requires matching source revisions, so a missing second run does not become fabricated coverage." },
                { title: "Recoverable execution", description: "Durable commands, Temporal workflows and isolated runners preserve execution context across interruption and recovery." },
                { title: "AI with reviewable evidence", description: "AI proposes correlations, tests and briefs from bounded evidence. Review and actual execution determine what is accepted; the quality engine owns the release decision." }
            ]
        },
        userFlow: {
            description: "Connect a target or repository, investigate real results, review AI-assisted follow-up work and communicate a release decision.",
            steps: [
                { title: "Select a target", desc: "Choose a web application, API or mobile build and the relevant source revisions." },
                { title: "Explore or test", desc: "Launch an exploration or select supported test suites. Each workflow can run independently." },
                { title: "Follow execution", desc: "Track activity and inspect the states, transitions and evidence produced by the runners." },
                { title: "Investigate & improve", desc: "Inspect failures and evidence, ask the contextual assistant and review correlations or proposed tests." },
                { title: "Decide & communicate", desc: "Review the quality gate, validate follow-up tests and publish a stakeholder brief or shared decision." }
            ]
        }
    },
    {
        slug: "sibyl",
        title: "Sibyl",
        subtitle: "Continuous Market Intelligence",
        description: "Track the markets that matter to your business. Sibyl brings search, news and social attention into historical views, signals, opportunity watchlists and AI-assisted briefs for ongoing market decisions.",
        longDescription: "Sibyl helps founders, marketers and analysts follow their markets without rebuilding the same research each week. Teams track a portfolio of topics, compare attention and momentum, investigate signals and related opportunities, and review geographic interest, search results and source evidence. Watchlists, market theses, alerts and briefs turn those observations into a recurring decision workflow; Ask Sibyl answers questions from workspace evidence. I conceived the product, its scoring and signal algorithms, and the asynchronous architecture behind collection, shared computation and historical monitoring.",
        tech: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Drizzle", "Redis", "BullMQ", "AI integration", "Docker", "Payment integration"],
        tags: ["Market Intelligence", "AI"],
        image: null,
        homepageImage: "/projects/sibyl-home.png",
        homepageImageAlt: "Sibyl public homepage introducing market intelligence and monitoring",
        projectUrl: "https://www.sibylinsight.com",
        problem: "Market research becomes difficult to maintain when search demand, news, competitors and social activity are scattered across providers. One-off reports age quickly, while short-lived spikes and incomplete observations can distort the interpretation of a market.",
        solution: "Sibyl keeps a portfolio of markets under recurring observation, then turns available search, news, video and social evidence into comparable views and explainable signals. Teams can investigate what changed, follow an opportunity, assess a market thesis and share a brief. Deterministic algorithms compute market scores; AI helps explain persisted evidence through summaries and contextual answers.",
        capabilities: [
            { title: "Monitor a portfolio of markets", description: "Choose niches, brands or topics and follow their attention, momentum and historical movement in a shared workspace. Compare tracked markets without repeating every search manually." },
            { title: "Review changes that deserve attention", description: "Investigate signals and risk flags, work through a review queue, and configure monitoring rules and alerts to support a recurring review routine." },
            { title: "Follow related opportunities", description: "Explore source-backed subtopics and adjacent markets, review why they relate to your topic, and keep promising candidates in an opportunity watchlist." },
            { title: "Investigate the underlying evidence", description: "Inspect source coverage, geographic interest, search-result composition, actors and saturation indicators. Open the observations behind an interpretation." },
            { title: "Track a market thesis", description: "Turn a business hypothesis into a monitored thesis, inspect its evidence and timeline, and revisit it as new observations become available." },
            { title: "Ask questions and share findings", description: "Ask Sibyl about observed changes, comparisons or risks. Review AI-assisted answers with citations, prepare market and daily-review briefs, and share or export findings with your team." }
        ],
        contributions: [
            "Conceived the analytical model, scoring and signal-detection logic for market comparisons and ongoing monitoring.",
            "Designed asynchronous collection, historical snapshots, shared computation and persisted dashboard read models.",
            "Built topic exploration, signals, opportunity watchlists, market theses, cited AI answers and briefs, alongside collaboration and commercial access.",
            "Developed contextual data processing and recovery mechanisms to handle fragmented, delayed or incomplete provider observations."
        ],
        features: [
            "Portfolio monitoring, market scores and historical timelines",
            "Signals, review queue, monitoring rules and alerts",
            "Related opportunities and durable watchlists",
            "Geo interest, SERP composition, actors and saturation",
            "Source coverage, evidence inspection and risk flags",
            "Market thesis tracking and reports",
            "Ask Sibyl, cited AI answers and shareable briefs",
            "Collaborative workspaces, subscriptions and usage management"
        ],
        challenges: [
            "Combining provider data with different timestamps, formats, coverage and freshness without treating missing observations as zero.",
            "Separating short-lived spikes from structural market movement while preserving the direction and timing of real changes.",
            "Sharing collection and computation across users to control processing costs without mixing topic context or workspace access.",
            "Recovering delayed postbacks and partial collection cycles while keeping published analytical views consistent.",
            "Giving AI answers useful source citations while keeping scores, signals and market decisions tied to the deterministic analytical model.",
            "Keeping contextual analysis relevant and traceable as the available evidence changes."
        ],
        stackGroups: [
            { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "TanStack Query", "Recharts", "React Simple Maps", "Zod", "Managed hosting"] },
            { title: "Backend & Data", items: ["NestJS", "Node.js / Bun", "TypeScript", "Drizzle ORM", "PostgreSQL", "Managed authentication", "REST APIs"] },
            { title: "Workers & Reliability", items: ["BullMQ", "Redis / ioredis", "Provider I/O worker", "Materialization worker", "Reliability worker", "Database outbox", "Read-model invalidation"] },
            { title: "AI & Data Integration", items: ["LLM gateway", "External data sources", "Content ingestion", "Contextual analysis", "Source provenance"] },
            { title: "Infrastructure & Integrations", items: ["Docker Compose", "Nginx", "TLS certificate management", "Subscription billing", "Email delivery", "CRM integration", "Usage analytics", "Product analytics"] }
        ],
        architecture: {
            description: "Sibyl deploys Next.js on managed hosting and the NestJS backend on a separate Docker Compose host behind an edge gateway and Nginx. Redis/BullMQ transports work between dedicated provider I/O, materialization and reliability processes. Managed services supply identity and PostgreSQL; Drizzle persists observations, historical snapshots and read models. Provider postbacks return through the API origin. Redis update events and an SSE proxy refresh the UI without triggering provider collection on dashboard reads.",
            diagramType: "microservices",
            infrastructure: sibylInfrastructure,
            decisions: [
                { title: "Keep reads responsive", description: "Dashboard requests consume persisted projections; provider work and expensive recomputation run outside the HTTP request." },
                { title: "Preserve evidence", description: "Observations retain their source, context and timestamp. Algorithms compute scores from that evidence; AI explains it. Missing history remains unknown rather than becoming an invented growth value." },
                { title: "Separate worker ownership", description: "Provider collection, materialization and recovery have dedicated process roles so scaling one workload does not change the API's responsibilities." }
            ]
        },
        userFlow: {
            description: "Move from a research topic to an ongoing view of the market and its changes.",
            steps: [
                { title: "Define a topic", desc: "Add the market or opportunity to investigate, with context relevant to the research." },
                { title: "Collect evidence", desc: "Follow collection activity as Sibyl gathers observations from configured providers." },
                { title: "Investigate & compare", desc: "Review scores, geographic interest and sources; explore related opportunities and ask contextual questions." },
                { title: "Monitor & review", desc: "Follow signals, watchlists and market theses over time; review alerts and evidence as observations change." },
                { title: "Share & act", desc: "Prepare a cited market brief or report and share findings to support the team's next decision." }
            ]
        }
    },
    {
        slug: "shortlistable",
        title: "Shortlistable",
        subtitle: "AI Resume Studio & Job Matching",
        description: "Turn an existing CV into an editable application tailored to a role. Shortlistable combines layout reconstruction, evidence-based job matching, reviewable AI rewrites and a visual editor with PDF export.",
        longDescription: "Shortlistable helps candidates show how their actual experience fits a specific role. They can create a CV from a template or import an existing document, reconstruct its layout, edit content and presentation, and compare it with a job description. The analysis connects role requirements to evidence in the CV and proposes changes candidates can review before applying. I conceived the matching logic and document-reconstruction architecture, and built the resume studio, export pipeline and commercial access with dedicated background processing.",
        tech: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Managed data services", "Redis", "RQ", "Docker", "Nginx", "Payment integration", "AI integration", "Playwright"],
        tags: ["SaaS", "AI"],
        image: null,
        homepageImage: "/projects/shortlistable-home.png",
        homepageImageAlt: "Shortlistable homepage showing the AI-powered CV tailoring workflow",
        projectUrl: "https://www.shortlistable.com/en",
        problem: "Candidates face two kinds of rework: rebuilding an existing CV in a new editor and rewriting it for each role. A keyword checklist alone cannot explain whether their experience supports a requirement, and generated wording can distort facts or damage the document's presentation.",
        solution: "Shortlistable connects document reconstruction with an editable resume studio and role-specific analysis. It examines alignment, supporting evidence and CV quality, then offers concrete, reviewable changes to existing content. Candidates refine the wording and layout before exporting, while import, matching, AI enrichment and PDF rendering run in dedicated background queues.",
        capabilities: [
            { title: "Start from the CV you already have", description: "Import a PDF or DOCX and recover structured content. Reconstruct a document's columns, typography and visual elements, then review its editable preview." },
            { title: "Shape content and presentation", description: "Create a CV from a template or edit an imported one. Work with repeatable experience and education sections, rich text, colors, margins and a live document preview." },
            { title: "Understand your fit for a role", description: "Compare your CV with a job description. Review requirement-level matches, supporting experience, missing evidence and quality issues to identify what needs attention." },
            { title: "Apply AI suggestions with control", description: "Review concrete rewrites for existing CV content and choose which changes to apply. Fact-preservation checks help retain named skills and experience details." },
            { title: "Prepare the next application", description: "Manage CVs and versions, refine your document for another role, and preview the final result before downloading a PDF." },
            { title: "Follow processing from the studio", description: "Track import, analysis and export progress while working in the editor. Account settings bring subscription access and usage credits into the same product." }
        ],
        contributions: [
            "Conceived the matching logic connecting job requirements, semantic analysis and structured experience data.",
            "Designed the document reconstruction pipeline to recover layout, typography, images and editable content from imported CVs.",
            "Built the interactive editor and export workflow with explicit review of suggested content changes.",
            "Integrated subscriptions, credits and dedicated processing queues into the commercial product."
        ],
        features: [
            "PDF/DOCX resume import and structured CV builder",
            "Layout reconstruction and editable imported CVs",
            "Requirement-level job matching with supporting CV evidence",
            "Semantic alignment, evidence support and CV quality analysis",
            "AI-assisted tailoring with user validation before export",
            "Dedicated import, job-fit, AI and PDF worker queues",
            "Server-sent job status updates for long-running processing",
            "Export-ready CV workflow and subscription access"
        ],
        challenges: [
            "Parsing heterogeneous resumes while preserving enough structure for editing and export.",
            "Reconstructing typography, columns, geometry and visual assets while binding extracted content to editable CV sections.",
            "Keeping AI suggestions truthful: the system must improve wording and evidence without inventing skills or experience.",
            "Balancing ATS optimization with human readability so the final CV does not become keyword-stuffed.",
            "Isolating document import, AI analysis, section enrichment and Chromium rendering in separate queues to prevent one slow workload from delaying all users.",
            "Designing retries, TTLs, worker heartbeats, SSE job streams, and failure states for background work that depends on external AI and document services.",
            "Designing a workflow that feels fast for repeated applications while still giving users control over every generated change."
        ],
        stackGroups: [
            {
                title: "Frontend & Product",
                items: ["Next.js 16 App Router", "React 19", "TypeScript", "Tailwind CSS 4", "next-intl", "next-themes", "Radix UI", "Lucide React", "Framer Motion", "Tiptap editor", "React Hook Form", "Zod", "Sonner", "Usage analytics", "Responsive marketing pages", "SEO sitemap"]
            },
            {
                title: "Backend & API",
                items: ["Python 3.12", "FastAPI", "Uvicorn", "Pydantic v2", "Pydantic Settings", "SQLAlchemy 2", "psycopg2", "python-jose", "FastAPI middleware", "CORS", "Auth middleware", "Rate limit middleware", "Health routes", "REST API routers"]
            },
            {
                title: "AI & Documents",
                items: ["LLM API integration", "Document parsing", "Role matching", "CV quality analysis", "Section editing", "Layout reconstruction", "Image processing", "OCR", "PDF/DOCX processing", "Browser-based PDF rendering"]
            },
            {
                title: "Workers & Queue",
                items: ["Redis", "RQ", "ai queue", "cv_import queue", "job_fit queue", "pdf queue", "worker-ai", "worker-cv-import", "worker-job-fit", "worker-pdf", "Retries and timeouts", "Result / failure TTLs", "Worker heartbeats", "SSE job status", "RQ Dashboard", "RedisInsight"]
            },
            {
                title: "Data & Storage",
                items: ["PostgreSQL", "Managed authentication", "Managed data access", "Profile access", "Object storage", "Document storage", "Image storage", "Preview storage", "Template storage", "User profiles", "CV versions", "Job analyses", "Billing catalog", "Subscription state"]
            },
            {
                title: "Infrastructure & Ops",
                items: ["Managed web hosting", "Docker", "Docker Compose", "Nginx reverse proxy", "Basic auth for admin tools", "uv lockfile", "Playwright Chromium install", "Redis appendonly persistence", "Environment-based config", "Shell/PowerShell launchers", "Application operations"]
            },
            {
                title: "Integrations",
                items: ["Subscription management", "Hosted checkout", "Usage credits", "Billing webhooks", "AI inference API", "Managed authentication", "Next.js API proxy", "Product analytics", "Remotion marketing videos"]
            }
        ],
        architecture: {
            description: "Shortlistable deploys the Next.js studio on managed hosting and a separate FastAPI backend behind Nginx on a Docker Compose host. A private bridge network connects the API, Redis and four Python RQ consumers: cv_import, ai, job_fit and pdf. Managed identity, PostgreSQL and object storage sit outside that network. Workers call an inference service or render with Playwright/Chromium, then persist results and documents. The Next.js proxy relays API requests and SSE job status; a payment service delivers billing webhooks to the public API origin.",
            diagramType: "shortlistable",
            infrastructure: shortlistableInfrastructure,
            decisions: [
                { title: "Separate workloads", description: "Import, role matching, enrichment and rendering use dedicated queues so they can be processed independently." },
                { title: "Preserve document fidelity", description: "Document extraction and layout reconstruction are separate concerns, joined by semantic bindings and a reviewable preview." },
                { title: "Make progress visible", description: "The editor consumes job status through SSE and fetches the completed result rather than blocking on a long HTTP request." }
            ]
        },
        userFlow: {
            description: "From an existing resume to a tailored, export-ready application.",
            steps: [
                { title: "Import or create", desc: "Upload a PDF/DOCX, reconstruct its layout or start with a template." },
                { title: "Target Role", desc: "User pastes a job description; backend extracts requirements, keywords, and soft-skill signals." },
                { title: "Review the match", desc: "Compare the CV with the role and review missing evidence and suggested improvements." },
                { title: "Tailor & Validate", desc: "User reviews AI rewrite suggestions before applying them to headline, skills, and experience bullets." },
                { title: "Export", desc: "Preview the finished document and download the tailored CV as a PDF." }
            ]
        }
    },
    {
        slug: "mypug-social-network",
        title: "MyPug - Social Network",
        description: "Mobile social network for photo sharing with recommendation algorithms. Features real-time messaging, push notifications, and moderation tools.",
        longDescription: "MyPug is a comprehensive social platform designed to foster genuine connections through photo sharing. Unlike traditional feeds, it employs a unique recommendation engine that prioritizes content relevance over popularity, ensuring users discover communities that truly resonate with their interests. The platform supports robust real-time interactions, including instant messaging and live notifications.",
        tech: ["Flutter", "NodeJS", "Express", "MongoDB", "AWS", "Socket.io","Docker","Firebase"],
        tags: ["Mobile", "Social"],
        image: "/api/placeholder/800/600",
        problem: "Existing social networks often create echo chambers or prioritize viral content, making it difficult for niche communities to thrive and for users to find content that genuinely interests them without being overwhelmed by ads or irrelevant posts.",
        solution: "We built a custom recommendation algorithm based on user interaction vectors rather than just likes. This, combined with a high-performance real-time backend, keeps users engaged with fresh, relevant content while maintaining a smooth, responsive mobile experience.",
        features: [
            "Real-time Chat with Socket.io",
            "Smart Feed Recommendation Engine",
            "Push Notifications via Firebase",
            "Automated Content Moderation Tools",
            "User Profiles & Analytics"
        ],
        architecture: {
            description: "A scalable microservices-ready architecture on AWS. The Node.js/Express API handles business logic, while MongoDB stores unstructured user data. Socket.io is dedicated to a separate service cluster for handling persistent connections for chat, ensuring main API latency is unaffected by real-time traffic.",
            diagramType: "mobile-backend"
        },
        userFlow: {
            description: "From sign-up to social interaction.",
            steps: [
                { title: "Onboarding", desc: "User sign-up via Auth service, profile creation, and initial interest selection." },
                { title: "Discovery", desc: "Home feed loads personalized content cached in Redis." },
                { title: "Engagement", desc: "User likes/comments; events emitted to notification service." },
                { title: "Real-time Chat", desc: "Direct connection established via WebSocket for instant messaging." }
            ]
        }
    },
    {
        slug: "bloden-gaming-app",
        title: "Bloden - Gaming App",
        description: "Real-time mobile gaming app with betting and chat. Includes game engine synchronization and secure payment integration via Stripe.",
        longDescription: "Bloden allows users to compete in skill-based mini-games with a real-money betting component. The challenge was to ensure perfect synchronization between players to prevent cheating and ensure fairness, while strictly adhering to security standards for payment processing.",
        tech: ["Flutter", "NodeJS","Express", "Socket.io", "Firebase", "Stripe","Heroku"],
        tags: ["Game", "Real-time"],
        image: "/api/placeholder/800/600",
        problem: "Real-time multiplayer games on mobile networks often suffer from latency desynchronization (lag), which ruins the competitive integrity required for betting apps.",
        solution: "Implemented an authoritative server model where the Node.js backend runs the game state simulation. Client inputs are sent to the server, which validates and broadcasts the authoritative state back to clients, using optimistic UI updates to mask latency.",
        features: [
            "Real-time Multiplayer Sync",
            "Secure Stripe Payment Gateway",
            "In-game Betting Logic",
            "Live Chat Overlay",
            "Leaderboards & Tournaments"
        ],
        architecture: {
            description: "Event-driven architecture. The core game loop runs on high-performance Node.js instances. Payment transactions are processed via a secured, isolated service interacting with Stripe webhooks. Firebase handles non-critical data like user stats and matchmaking queues.",
            diagramType: "bloden"
        },
        userFlow: {
            description: "The competitive gaming loop.",
            steps: [
                { title: "Lobby", desc: "User joins matchmaking queue via WebSocket." },
                { title: "Match Found", desc: "Server pairs players and instantiates game room." },
                { title: "Betting", desc: "Secure token reservation via Payment Service." },
                { title: "Gameplay", desc: "Real-time state synchronization via Socket.io." },
                { title: "Payout", desc: "Winner determined by server; funds released to wallet." }
            ]
        }
    },
    {
        slug: "tootsweet-dashboard",
        title: "Tootsweet Dashboard",
        description: "Statistical analysis dashboard for B2C service optimization. Dynamic React Native UI with HapiJS data processing.",
        longDescription: "A powerful analytical tool for business owners to visualize customer engagement and service metrics. It aggregates data from various consumer touchpoints to provide actionable insights.",
        tech: ["React Native", "TypeScript", "HapiJS", "MongoDB","Jasmin"],
        tags: ["Analytics", "B2B"],
        image: null,
        problem: "Business owners had access to raw data but no way to visualize trends or make informed decisions about service optimization in real-time.",
        solution: "Developed a cross-platform mobile dashboard using React Native charts. The HapiJS backend aggregates and caches complex analytical queries, allowing for near-instant loading of daily/weekly/monthly reports.",
        features: [
            "Interactive Data Visualization",
            "Customizable Date Ranges",
            "PDF Report Export",
            "Push Alerts for KPIs",
            "Role-based Access Control"
        ],
        architecture: {
            description: "Monolithic modular API using HapiJS for stability. Data aggregation pipelines run on MongoDB replicas to avoid locking the main database during heavy read operations.",
            diagramType: "monolith"
        },
        userFlow: {
            description: "Data consumption flow.",
            steps: [
                { title: "Login", desc: "Secure authentication." },
                { title: "Dashboard", desc: "Overview of critical KPIs loaded from cache." },
                { title: "Drill-down", desc: "User selects specific date range; API executes aggregation pipeline." },
                { title: "Export", desc: "Report generation job scheduled." }
            ]
        }
    },
    {
        slug: "youtubescrapper",
        title: "YoutubeScrapper",
        description: "Mobile app analyzing YouTube content to generate recommendations based on similarities. J2EE server-side processing.",
        longDescription: "An R&D project to explore alternative content recommendation algorithms. It scrapes public YouTube metadata to build a graph of related videos based on semantic similarity of transcripts and tags, rather than view counts.",
        tech: ["Flutter", "J2EE", "MySQL", "GitLab"],
        tags: ["AI/ML", "Scraper"],
        image: null,
        problem: "YouTube's native algorithm often creates filter bubbles. We wanted to find a way to surface semantically related content that a user might otherwise miss.",
        solution: "A Java Enterprise backend that manages a fleet of scrapers. Data is processed to extract keywords and entities, which are then used to calculate cosine similarity scores between videos.",
        features: [
            "Metadata Scraping Engine",
            "Semantic Similarity Calculation",
            "Cross-platform Mobile UI",
            "Keyword Extraction",
            "History Tracking"
        ],
        architecture: {
            description: "Classic 3-tier Architecture. J2EE application server manages business logic and scraper scheduling. MySQL stores video metadata and relationship graphs. Flutter client consumes a REST API.",
            diagramType: "monolith"
        },
        userFlow: {
            description: "Search and discover flow.",
            steps: [
                { title: "Search", desc: "User inputs topic keyphrase." },
                { title: "Processing", desc: "Backend searches local index or triggers scraper." },
                { title: "Analysis", desc: "Similarity engine ranks related videos." },
                { title: "Display", desc: "List of highly relevant, often overlooked videos shown." }
            ]
        }
    },
    {
        slug: "robot-racer",
        title: "Robot Racer",
        description: "Autonomous Raspberry Pi robot using real-time image processing to follow paths and Machine Learning for trajectory adjustment.",
        longDescription: "An autonomous vehicle prototype capable of navigating a colored track using computer vision. It processes camera input in real-time to adjust steering and throttle.",
        tech: ["Python", "Raspberry Pi", "Computer Vision", "ML"],
        tags: ["Robotics", "IoT"],
        image: null,
        problem: "Navigating a physical track with varying lighting conditions using only a single low-cost camera.",
        solution: "Used OpenCV for lane detection (color thresholding + edge detection). A basic regression model predicts the steering angle based on lane curvature. The Python controller runs an optimized high-frequency loop on the Pi.",
        features: [
            "Real-time Lane Detection",
            "PWM Motor Control",
            "Computer Vision Pipeline",
            "Remote Data Telemetry",
            "Manual Override Mode"
        ],
        architecture: {
            description: "Embedded System Architecture. The Raspberry Pi runs a Python main loop that polls the Camera, processes the frame (OpenCV), calculates error (PID Controller), and adjusts PWM output to the Motor Driver HAT.",
            diagramType: "robot-racer"
        },
        userFlow: {
            description: "Autonomous operation loop.",
            steps: [
                { title: "Initialization", desc: "Calibrate camera and sensors." },
                { title: "Sense", desc: "Capture frame and preprocess." },
                { title: "Plan", desc: "Calculate deviation from center line." },
                { title: "Act", desc: "Adjust servo and DC motor duty cycle." }
            ]
        }
    }
];
