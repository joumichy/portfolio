export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    tags: string[];
    image: string | null;
    problem: string;
    solution: string;
    features: string[];
    architecture: {
        description: string;
        diagramType: 'microservices' | 'monolith' | 'serverless' | 'mobile-backend';
    };
    userFlow: {
        description: string;
        steps: { title: string; desc: string }[];
    };
}

export const projects: Project[] = [
    {
        slug: "mypug-social-network",
        title: "MyPug - Social Network",
        description: "Mobile social network for photo sharing with recommendation algorithms. Features real-time messaging, push notifications, and moderation tools.",
        longDescription: "MyPug is a comprehensive social platform designed to foster genuine connections through photo sharing. Unlike traditional feeds, it employs a unique recommendation engine that prioritizes content relevance over popularity, ensuring users discover communities that truly resonate with their interests. The platform supports robust real-time interactions, including instant messaging and live notifications.",
        tech: ["Flutter", "NodeJS", "Express", "MongoDB", "AWS", "Socket.io"],
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
        tech: ["Flutter", "NodeJS", "Socket.io", "Firebase", "Stripe"],
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
            diagramType: "serverless"
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
        tech: ["React Native", "TypeScript", "HapiJS", "MongoDB"],
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
            diagramType: "microservices"
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
