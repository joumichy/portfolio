export interface Project {
    slug: string;
    title: string;
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
    challenges?: string[];
    stackGroups?: { title: string; items: string[] }[];
    architecture: {
        description: string;
        diagramType: 'microservices' | 'monolith' | 'serverless' | 'mobile-backend' | 'bloden' | 'robot-racer' | 'shortlistable';
    };
    userFlow: {
        description: string;
        steps: { title: string; desc: string }[];
    };
}

export const projects: Project[] = [
    {
        slug: "shortlistable",
        title: "Shortlistable - AI CV Tailoring Platform",
        description: "AI-powered SaaS that helps candidates create, analyze, tailor, and export recruiter-ready CVs matched to a specific job description.",
        longDescription: "Shortlistable is a full-stack web platform for job seekers who want to move from a generic resume to an application-ready CV faster. Users import a PDF or DOCX, create a structured base CV, paste a job description, receive an AI match analysis, trigger asynchronous parsing/rewrite/export jobs, and download a polished version for recruiters and ATS systems.",
        tech: ["Next.js 16", "React 19", "TypeScript", "FastAPI", "Python 3.12", "PostgreSQL", "Supabase", "Redis", "RQ", "Docker", "Nginx", "Stripe", "OpenAI/Ollama", "Playwright"],
        tags: ["SaaS", "AI"],
        image: null,
        homepageImage: "/projects/shortlistable-home.png",
        homepageImageAlt: "Shortlistable homepage showing the AI-powered CV tailoring workflow",
        projectUrl: "https://www.shortlistable.com/en",
        problem: "Job seekers often rewrite CVs manually for each application, but they do not know which keywords, experience bullets, or evidence gaps matter most. That creates slow application cycles and generic resumes that can be ignored by ATS filters or recruiters.",
        solution: "Shortlistable centralizes the flow: import or build a base CV, analyze the target role, surface missing keywords and weak evidence, enqueue long-running parsing/rewrite/export work through Redis/RQ, then guide the user toward a cleaner, role-specific CV without losing the original profile.",
        features: [
            "PDF/DOCX resume import and structured CV builder",
            "Job description analysis with match scoring",
            "ATS keyword gap detection and rewrite suggestions",
            "AI-assisted tailoring with user validation before export",
            "Redis/RQ queues with dedicated AI and PDF workers",
            "Server-sent job status updates for long-running processing",
            "Export-ready CV workflow and subscription access"
        ],
        challenges: [
            "Parsing heterogeneous resumes while preserving enough structure for editing and export.",
            "Keeping AI suggestions truthful: the system must improve wording and evidence without inventing skills or experience.",
            "Balancing ATS optimization with human readability so the final CV does not become keyword-stuffed.",
            "Moving expensive document parsing, OpenAI/Ollama calls, ATS scoring, section enrichment, and Playwright PDF rendering into queue-backed workers so the UI remains responsive.",
            "Designing retries, TTLs, worker heartbeats, SSE job streams, and failure states for background work that depends on external AI and document services.",
            "Designing a workflow that feels fast for repeated applications while still giving users control over every generated change."
        ],
        stackGroups: [
            {
                title: "Frontend & Product",
                items: ["Next.js 16 App Router", "React 19", "TypeScript", "Tailwind CSS 4", "next-intl", "next-themes", "Radix UI", "Lucide React", "Framer Motion", "Tiptap editor", "React Hook Form", "Zod", "Sonner", "Vercel Analytics", "Responsive marketing pages", "SEO sitemap"]
            },
            {
                title: "Backend & API",
                items: ["Python 3.12", "FastAPI", "Uvicorn", "Pydantic v2", "Pydantic Settings", "SQLAlchemy 2", "psycopg2", "python-jose", "FastAPI middleware", "CORS", "Auth middleware", "Rate limit middleware", "Health routes", "REST API routers"]
            },
            {
                title: "AI & Documents",
                items: ["OpenAI SDK", "Ollama fallback", "LLM factory", "CV parser", "Job-fit recommendation service", "ATS scoring", "ATS verification", "Section enrichment", "Prompt injection checks", "PII hashing", "pdfminer.six", "python-docx", "PyMuPDF", "ODF parsing", "Pandas", "OpenPyXL"]
            },
            {
                title: "Workers & Queue",
                items: ["Redis", "RQ", "Queue ai", "Queue pdf", "worker-ai", "worker-pdf", "SpawnWorker on macOS", "SimpleWorker on Windows", "Retry/backoff intervals", "Result TTL", "Failure TTL", "Worker heartbeat", "SSE job stream", "Job result endpoint", "RQ Dashboard", "RedisInsight"]
            },
            {
                title: "Data & Storage",
                items: ["PostgreSQL", "Supabase Auth", "Supabase client", "Supabase service role", "Supabase Storage", "CV_FILES bucket", "CV_PHOTOS bucket", "CV_PREVIEWS bucket", "CV_TEMPLATES bucket", "User profiles", "CV versions", "Job analyses", "Billing catalog", "Subscription state"]
            },
            {
                title: "Infrastructure & Ops",
                items: ["Vercel web hosting", "Docker", "Docker Compose", "Production Compose stack", "Nginx reverse proxy", "Basic auth for admin tools", "uv lockfile", "python:3.12-slim", "Playwright Chromium install", "Redis appendonly persistence", "Environment-based config", "Shell/PowerShell launchers", "Structured logging", "Rotating log files"]
            },
            {
                title: "Integrations",
                items: ["Stripe subscriptions", "Stripe checkout", "Stripe billing catalog", "Stripe webhooks", "OpenAI API", "Ollama local models", "Supabase password recovery", "Supabase signup confirmation", "Next.js API proxy", "Browser auth session", "Remotion SEO video generation"]
            }
        ],
        architecture: {
            description: "The production system is split between `matchcv_web` and `matchcv_backend`. The web app is a Next.js 16/React 19 client deployed on Vercel; it owns the product UI, localized SEO pages, Supabase browser session handling, API proxy routes, and SSE job-stream consumption. The backend is a Python 3.12 FastAPI service behind Nginx, with auth/rate-limit middleware, SQLAlchemy repositories, Supabase Auth/Storage integration, Stripe billing routes and webhook handlers, and AI/document services. Long-running work is handled by Redis + RQ: requests enqueue jobs into the `ai` or `pdf` queues, `worker-ai` processes CV parsing, ATS scoring, job-fit recommendations, and section enrichment, while `worker-pdf` runs Playwright/Chromium PDF rendering. Job status is exposed through `/api/jobs/{id}`, `/stream`, and `/result`, with retries, TTLs, worker heartbeat checks, rq-dashboard, and RedisInsight for queue operations.",
            diagramType: "shortlistable"
        },
        userFlow: {
            description: "From an existing resume to a tailored, export-ready application.",
            steps: [
                { title: "Import CV", desc: "User uploads a PDF/DOCX resume or starts from an empty structured CV." },
                { title: "Target Role", desc: "User pastes a job description; backend extracts requirements, keywords, and soft-skill signals." },
                { title: "Queue Processing", desc: "FastAPI enqueues AI or PDF jobs in Redis/RQ; the web app follows progress through SSE." },
                { title: "AI Match Analysis", desc: "worker-ai compares the CV against the role, computes a match score, and highlights missing evidence." },
                { title: "Tailor & Validate", desc: "User reviews AI rewrite suggestions before applying them to headline, skills, and experience bullets." },
                { title: "Export", desc: "worker-pdf renders the final CV with Playwright/Chromium and returns an export-ready PDF." }
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
