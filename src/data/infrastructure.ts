export const CONNECTION_KIND = {
    request: "request", async: "async", data: "data", event: "event", control: "control",
} as const;
export const NODE_KIND = {
    client: "client", service: "service", worker: "worker", store: "store", external: "external",
} as const;
export const PORT = { top: "top", right: "right", bottom: "bottom", left: "left" } as const;
export const INFRASTRUCTURE_NODE_SIZE = { width: 220, height: 96 };
export const DIAGRAM_CONTROLS = {
    minimumZoom: 0.15, maximumZoom: 1.5, zoomStep: 0.15, initialZoom: 1,
};

export type ConnectionKind = typeof CONNECTION_KIND[keyof typeof CONNECTION_KIND];
export type Port = typeof PORT[keyof typeof PORT];
export type Point = [number, number];
export interface InfrastructureNode {
    id: string; title: string; technology: string; detail: string;
    kind: typeof NODE_KIND[keyof typeof NODE_KIND]; x: number; y: number;
}
export interface InfrastructureZone {
    id: string; title: string; detail: string;
    x: number; y: number; width: number; height: number;
}
export interface InfrastructureConnection {
    from: string; to: string; label: string; kind: ConnectionKind;
    sourcePort: Port; targetPort: Port; via?: Point[]; labelAt: Point;
}
export interface InfrastructureView {
    id: string; title: string; description: string; width: number; height: number;
    zones: InfrastructureZone[]; nodes: InfrastructureNode[];
    connections: InfrastructureConnection[];
    notes: { title: string; text: string }[];
}
export interface ProjectInfrastructure { title: string; views: InfrastructureView[] }

const K = CONNECTION_KIND;
const N = NODE_KIND;
const P = PORT;

const S = {
    browser: "short-browser", web: "short-web", auth: "short-auth", ingress: "short-ingress",
    api: "short-api", redis: "short-redis", workers: "short-workers", database: "short-database",
    storage: "short-storage", inference: "short-inference", billing: "short-billing", tls: "short-tls",
    ai: "short-worker-ai", importer: "short-worker-import", fit: "short-worker-fit", pdf: "short-worker-pdf",
};

export const shortlistableInfrastructure: ProjectInfrastructure = {
    title: "Shortlistable infrastructure",
    views: [
        {
            id: "deployment", title: "Deployment topology", width: 1180, height: 1130,
            description: "Managed web hosting serves the web application. A separate Docker Compose host runs the API and RQ workers; authentication, PostgreSQL and files use managed data services.",
            zones: [
                { id: "short-web-hosting", title: "WEB HOSTING", detail: "Managed web runtime", x: 355, y: 20, width: 270, height: 175 },
                { id: "short-host", title: "BACKEND HOST · DOCKER COMPOSE", detail: "Private bridge network · only Nginx publishes HTTP / HTTPS", x: 20, y: 245, width: 700, height: 845 },
                { id: "short-managed", title: "MANAGED DATA SERVICES", detail: "Managed services · outside the Docker network", x: 835, y: 20, width: 325, height: 605 },
            ],
            nodes: [
                { id: S.browser, title: "Candidate browser", technology: "CV studio", detail: "Authenticated session", kind: N.client, x: 50, y: 85 },
                { id: S.web, title: "Next.js application", technology: "React · Managed hosting", detail: "API proxy + job SSE proxy", kind: N.service, x: 380, y: 85 },
                { id: S.auth, title: "Identity service", technology: "Session / JWT", detail: "Sign-in and token verification", kind: N.external, x: 875, y: 85 },
                { id: S.ingress, title: "Nginx", technology: "TLS reverse proxy · 80 / 443", detail: "Private upstream: api:8000", kind: N.service, x: 380, y: 320 },
                { id: S.tls, title: "Certificate services", technology: "TLS renewal + proxy reloader", detail: "Persistent ACME / TLS files", kind: N.service, x: 50, y: 320 },
                { id: S.api, title: "FastAPI / Uvicorn", technology: "Python · SQLAlchemy", detail: "CV, jobs, credits and billing", kind: N.service, x: 380, y: 545 },
                { id: S.redis, title: "Redis / RQ", technology: "Job queues + job state", detail: "AOF volume: redis_data", kind: N.store, x: 50, y: 545 },
                { id: S.workers, title: "Python RQ workers", technology: "Four separate processes", detail: "Import · AI · job fit · PDF", kind: N.worker, x: 50, y: 825 },
                { id: S.database, title: "PostgreSQL", technology: "Managed PostgreSQL", detail: "CVs, versions, billing, credits", kind: N.store, x: 875, y: 320 },
                { id: S.storage, title: "Object storage", technology: "Document / image buckets", detail: "CV files, previews, templates", kind: N.store, x: 875, y: 520 },
                { id: S.inference, title: "AI inference service", technology: "External inference API", detail: "Matching and document AI", kind: N.external, x: 875, y: 825 },
                { id: S.billing, title: "Payment service", technology: "Checkout + subscriptions", detail: "Webhook delivery to the API", kind: N.external, x: 875, y: 1000 },
            ],
            connections: [
                { from: S.browser, to: S.web, label: "HTTPS", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [325, 118] },
                { from: S.web, to: S.auth, label: "Auth / JWT", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [738, 118] },
                { from: S.web, to: S.ingress, label: "HTTPS · API + SSE", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [490, 228] },
                { from: S.tls, to: S.ingress, label: "TLS files / reload", kind: K.control, sourcePort: P.right, targetPort: P.left, labelAt: [325, 350] },
                { from: S.ingress, to: S.api, label: "HTTP · private upstream", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [490, 475] },
                { from: S.api, to: S.redis, label: "Enqueue / job status", kind: K.async, sourcePort: P.left, targetPort: P.right, labelAt: [325, 575] },
                { from: S.redis, to: S.workers, label: "RQ dispatch", kind: K.async, sourcePort: P.bottom, targetPort: P.top, labelAt: [160, 730] },
                { from: S.api, to: S.database, label: "SQL / TLS", kind: K.data, sourcePort: P.right, targetPort: P.left, via: [[780, 593], [780, 368]], labelAt: [780, 450] },
                { from: S.api, to: S.storage, label: "Storage API", kind: K.data, sourcePort: P.right, targetPort: P.left, via: [[740, 593], [740, 568]], labelAt: [790, 548] },
                { from: S.workers, to: S.storage, label: "Read inputs / store artifacts", kind: K.data, sourcePort: P.right, targetPort: P.bottom, via: [[680, 873], [680, 680], [985, 680]], labelAt: [845, 665] },
                { from: S.workers, to: S.database, label: "Persist CV / analysis results", kind: K.data, sourcePort: P.bottom, targetPort: P.right, via: [[160, 950], [1135, 950], [1135, 368]], labelAt: [1080, 735] },
                { from: S.workers, to: S.inference, label: "HTTPS · inference", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [585, 850] },
                { from: S.api, to: S.billing, label: "Billing API", kind: K.request, sourcePort: P.bottom, targetPort: P.left, via: [[490, 1048]], labelAt: [650, 1030] },
                { from: S.billing, to: S.ingress, label: "Signed webhooks", kind: K.event, sourcePort: P.top, targetPort: P.right, via: [[985, 970], [800, 970], [800, 368]], labelAt: [800, 760] },
            ],
            notes: [
                { title: "Web and API are separate deployments", text: "Next.js proxy routes forward authenticated requests and job streams to FastAPI. PostgreSQL is hosted outside the application container network." },
                { title: "Persistence and operations", text: "Redis uses append-only persistence; CVs and commercial state live in PostgreSQL, and documents in object storage. Certificate renewal and a reloader maintain the origin TLS certificates." },
                { title: "Runtime boundaries", text: "The web application, backend containers and managed services are separate deployment boundaries. Operational dashboards are kept outside the public application surface." },
            ],
        },
        {
            id: "jobs", title: "Queues & document processing", width: 1180, height: 1050,
            description: "Four RQ queues isolate document import, AI enrichment, role matching and Chromium rendering. Status returns through the API and the Next.js SSE proxy.",
            zones: [
                { id: "short-processing", title: "PYTHON BACKEND · INDEPENDENT RQ CONSUMERS", detail: "The API produces jobs; each worker consumes its own queue", x: 20, y: 245, width: 1140, height: 540 },
            ],
            nodes: [
                { id: S.web, title: "Next.js studio", technology: "API proxy + SSE", detail: "Job status and result retrieval", kind: N.service, x: 50, y: 75 },
                { id: S.api, title: "FastAPI jobs API", technology: "Admission + status endpoints", detail: "Returns a job identity", kind: N.service, x: 460, y: 75 },
                { id: S.redis, title: "Redis / RQ", technology: "Queue + result registries", detail: "Retries, timeouts and TTLs", kind: N.store, x: 460, y: 310 },
                { id: S.importer, title: "worker-cv-import", technology: "Queue: cv_import", detail: "Parsing and document import", kind: N.worker, x: 50, y: 620 },
                { id: S.ai, title: "worker-ai", technology: "Queue: ai", detail: "Enrichment / reconstruction", kind: N.worker, x: 335, y: 620 },
                { id: S.fit, title: "worker-job-fit", technology: "Queue: job_fit", detail: "Role evidence + suggestions", kind: N.worker, x: 620, y: 620 },
                { id: S.pdf, title: "worker-pdf", technology: "Queue: pdf", detail: "Playwright / Chromium render", kind: N.worker, x: 905, y: 620 },
                { id: S.database, title: "PostgreSQL + Storage", technology: "Persistent results / files", detail: "Shared by API and workers", kind: N.store, x: 50, y: 900 },
                { id: S.inference, title: "AI inference service", technology: "HTTPS inference", detail: "AI workloads only", kind: N.external, x: 620, y: 900 },
            ],
            connections: [
                { from: S.web, to: S.api, label: "Authenticated request", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [365, 105] },
                { from: S.api, to: S.web, label: "SSE status / result", kind: K.event, sourcePort: P.top, targetPort: P.top, via: [[570, 30], [160, 30]], labelAt: [365, 20] },
                { from: S.api, to: S.redis, label: "Enqueue + read status", kind: K.async, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 230] },
                { from: S.redis, to: S.importer, label: "cv_import", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 485], [160, 485]], labelAt: [220, 470] },
                { from: S.redis, to: S.ai, label: "ai", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 520], [445, 520]], labelAt: [450, 505] },
                { from: S.redis, to: S.fit, label: "job_fit", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 520], [730, 520]], labelAt: [735, 505] },
                { from: S.redis, to: S.pdf, label: "pdf", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 485], [1015, 485]], labelAt: [1015, 470] },
                { from: "short-processing", to: S.database, label: "Persist results and artifacts", kind: K.data, sourcePort: P.bottom, targetPort: P.top, via: [[590, 840], [160, 840]], labelAt: [310, 825] },
                { from: S.ai, to: S.inference, label: "Inference", kind: K.request, sourcePort: P.bottom, targetPort: P.top, via: [[445, 805], [730, 805]], labelAt: [650, 790] },
                { from: S.fit, to: S.inference, label: "Semantic analysis", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [815, 860] },
            ],
            notes: [
                { title: "Independent process roles", text: "The four worker processes start the same Python application with a distinct queue name. Import, matching and rendering can be provisioned independently." },
                { title: "Progress is a separate read path", text: "A long-running task does not hold an editing request open. The browser follows job status over SSE and retrieves the result after completion." },
                { title: "Document and job persistence differ", text: "Redis owns queue execution state. PostgreSQL and object storage retain CV versions, analysis results and exported documents beyond the job's result TTL." },
            ],
        },
    ],
};

const B = {
    browser: "sibyl-browser", web: "sibyl-web", edge: "sibyl-edge", nginx: "sibyl-nginx",
    api: "sibyl-api", redis: "sibyl-redis", workers: "sibyl-workers", pg: "sibyl-pg",
    auth: "sibyl-auth", providers: "sibyl-providers", llm: "sibyl-llm", commerce: "sibyl-commerce",
    tls: "sibyl-tls", io: "sibyl-io", materialize: "sibyl-materialize", reliability: "sibyl-reliability",
};

export const sibylInfrastructure: ProjectInfrastructure = {
    title: "Sibyl infrastructure",
    views: [
        {
            id: "deployment", title: "Deployment topology", width: 1180, height: 1140,
            description: "A managed web runtime connects to the API origin through an edge gateway. Nginx fronts a private Docker network containing the NestJS API, Redis and three dedicated worker roles.",
            zones: [
                { id: "sibyl-web-hosting", title: "WEB HOSTING", detail: "Web deployment", x: 355, y: 20, width: 270, height: 175 },
                { id: "sibyl-host", title: "BACKEND HOST · DOCKER COMPOSE", detail: "Private service network · only the proxy exposes host ports", x: 20, y: 405, width: 700, height: 695 },
                { id: "sibyl-managed-data", title: "MANAGED DATA SERVICES", detail: "Managed identity and PostgreSQL", x: 835, y: 20, width: 325, height: 410 },
            ],
            nodes: [
                { id: B.browser, title: "Analyst browser", technology: "Workspace dashboard", detail: "Queries + event stream", kind: N.client, x: 50, y: 85 },
                { id: B.web, title: "Next.js application", technology: "React · Managed hosting", detail: "Backend proxy + SSE proxy", kind: N.service, x: 380, y: 85 },
                { id: B.auth, title: "Identity service", technology: "Session / JWT", detail: "Workspace authentication", kind: N.external, x: 875, y: 85 },
                { id: B.edge, title: "Edge gateway", technology: "Proxied API DNS", detail: "Encrypted origin connection", kind: N.external, x: 380, y: 285 },
                { id: B.nginx, title: "Nginx", technology: "Origin TLS · 80 / 443", detail: "Private upstream: api:4000", kind: N.service, x: 380, y: 470 },
                { id: B.tls, title: "Certificate services", technology: "TLS renewal + proxy reloader", detail: "ACME + persistent TLS files", kind: N.service, x: 50, y: 470 },
                { id: B.api, title: "NestJS API", technology: "Node.js · role: api", detail: "Read models / job producers", kind: N.service, x: 380, y: 665 },
                { id: B.redis, title: "Redis / BullMQ", technology: "Queues + cache + pub/sub", detail: "AOF volume: redis_data", kind: N.store, x: 50, y: 665 },
                { id: B.workers, title: "NestJS workers", technology: "Three dedicated processes", detail: "Collect · materialize · recover", kind: N.worker, x: 50, y: 960 },
                { id: B.pg, title: "PostgreSQL", technology: "Managed database · ORM", detail: "Evidence, history, projections", kind: N.store, x: 875, y: 300 },
                { id: B.providers, title: "Market data providers", technology: "External source connectors", detail: "Search / news / social / video", kind: N.external, x: 875, y: 530 },
                { id: B.llm, title: "AI inference service", technology: "Bounded LLM gateway", detail: "Ask Sibyl + cited briefs", kind: N.external, x: 875, y: 755 },
                { id: B.commerce, title: "Commercial services", technology: "External service integrations", detail: "Billing, delivery and CRM", kind: N.external, x: 875, y: 980 },
            ],
            connections: [
                { from: B.browser, to: B.web, label: "HTTPS", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [325, 118] },
                { from: B.web, to: B.auth, label: "Auth / JWT", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [735, 118] },
                { from: B.web, to: B.edge, label: "HTTPS · API + SSE", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [490, 232] },
                { from: B.edge, to: B.nginx, label: "HTTPS · origin TLS", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [490, 430] },
                { from: B.tls, to: B.nginx, label: "TLS files / reload", kind: K.control, sourcePort: P.right, targetPort: P.left, labelAt: [325, 500] },
                { from: B.nginx, to: B.api, label: "HTTP · private upstream", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [490, 625] },
                { from: B.api, to: B.redis, label: "Jobs / cache / events", kind: K.async, sourcePort: P.left, targetPort: P.right, labelAt: [325, 695] },
                { from: B.redis, to: B.workers, label: "BullMQ dispatch", kind: K.async, sourcePort: P.bottom, targetPort: P.top, labelAt: [160, 865] },
                { from: B.api, to: B.pg, label: "SQL / TLS · read projections", kind: K.data, sourcePort: P.right, targetPort: P.left, via: [[775, 713], [775, 348]], labelAt: [775, 460] },
                { from: B.workers, to: B.pg, label: "Persist observations / projections", kind: K.data, sourcePort: P.bottom, targetPort: P.right, via: [[160, 1080], [1130, 1080], [1130, 348]], labelAt: [1080, 680] },
                { from: B.workers, to: B.providers, label: "Provider tasks / collection", kind: K.request, sourcePort: P.right, targetPort: P.left, via: [[680, 1008], [680, 578]], labelAt: [680, 875] },
                { from: B.providers, to: B.nginx, label: "Provider callbacks", kind: K.event, sourcePort: P.left, targetPort: P.right, via: [[815, 578], [815, 518]], labelAt: [800, 555] },
                { from: B.api, to: B.llm, label: "Evidence-grounded inference", kind: K.request, sourcePort: P.right, targetPort: P.left, via: [[735, 713], [735, 803]], labelAt: [800, 785] },
                { from: B.workers, to: B.commerce, label: "Durable outbound effects", kind: K.request, sourcePort: P.right, targetPort: P.left, via: [[640, 1008], [640, 1028]], labelAt: [690, 1047] },
                { from: B.commerce, to: B.edge, label: "Billing webhooks", kind: K.event, sourcePort: P.right, targetPort: P.right, via: [[1150, 1028], [1150, 225], [650, 225], [650, 333]], labelAt: [990, 210] },
            ],
            notes: [
                { title: "API and workers have different ownership", text: "The api process does not consume queues or run schedulers. Collection, projection building and recovery run in separately provisioned containers built from the same NestJS image." },
                { title: "Persisted read models", text: "Dashboard reads use PostgreSQL projections and Redis caching. Workers publish update events through Redis; API instances invalidate cached views and relay updates over SSE." },
                { title: "Service boundaries", text: "The browser reaches the application through web and API gateways. Data collection, analysis and publication remain backend responsibilities, separate from dashboard reads." },
            ],
        },
        {
            id: "jobs", title: "Collection & publication flow", width: 1180, height: 1100,
            description: "Provider task submission, provider callbacks and materialization are separate flows. PostgreSQL records cycles and observations; dedicated consumers publish the analytical read models.",
            zones: [
                { id: "sibyl-worker-zone", title: "DEDICATED BACKEND ROLES", detail: "BullMQ transport · durable database outboxes", x: 20, y: 400, width: 1140, height: 320 },
            ],
            nodes: [
                { id: B.api, title: "NestJS API", technology: "Refresh / reads / webhooks", detail: "Producers, no queue consumer", kind: N.service, x: 50, y: 70 },
                { id: B.redis, title: "Redis / BullMQ", technology: "Dedicated queue consumers", detail: "Throttle + event propagation", kind: N.store, x: 460, y: 70 },
                { id: B.providers, title: "External providers", technology: "External source connectors", detail: "Tasks, collection and postbacks", kind: N.external, x: 900, y: 70 },
                { id: B.io, title: "provider-io-worker", technology: "market-intelligence", detail: "refresh-cycle-preparation", kind: N.worker, x: 50, y: 490 },
                { id: B.materialize, title: "materialization-worker", technology: "Postbacks / late aggregation", detail: "Materialization recovery", kind: N.worker, x: 460, y: 490 },
                { id: B.reliability, title: "reliability-worker", technology: "watchdog-provider-tasks", detail: "Scheduler + recovery detection", kind: N.worker, x: 900, y: 490 },
                { id: B.pg, title: "PostgreSQL / Drizzle", technology: "Observations → read models", detail: "Cycles, scores, signals, outboxes", kind: N.store, x: 460, y: 860 },
                { id: B.web, title: "Next.js dashboard", technology: "Persisted reads + SSE", detail: "No provider call on read", kind: N.service, x: 50, y: 860 },
            ],
            connections: [
                { from: B.api, to: B.redis, label: "Enqueue", kind: K.async, sourcePort: P.right, targetPort: P.left, labelAt: [365, 100] },
                { from: B.providers, to: B.api, label: "Postback → Nginx → API", kind: K.event, sourcePort: P.top, targetPort: P.top, via: [[1010, 25], [160, 25]], labelAt: [570, 16] },
                { from: B.redis, to: B.io, label: "Collection queues", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 280], [160, 280]], labelAt: [225, 265] },
                { from: B.redis, to: B.materialize, label: "Postback / recovery queues", kind: K.async, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 345] },
                { from: B.redis, to: B.reliability, label: "Watchdog queue", kind: K.async, sourcePort: P.bottom, targetPort: P.top, via: [[570, 280], [1010, 280]], labelAt: [995, 265] },
                { from: B.io, to: B.providers, label: "Submit provider tasks", kind: K.request, sourcePort: P.right, targetPort: P.bottom, via: [[340, 538], [340, 215], [1010, 215]], labelAt: [790, 200] },
                { from: B.materialize, to: B.pg, label: "Aggregate / score / publish", kind: K.data, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 770] },
                { from: B.io, to: B.pg, label: "Observations + outboxes", kind: K.data, sourcePort: P.bottom, targetPort: P.left, via: [[160, 770], [365, 770], [365, 908]], labelAt: [270, 750] },
                { from: B.reliability, to: B.redis, label: "Enqueue recovery", kind: K.control, sourcePort: P.left, targetPort: P.right, via: [[805, 538], [805, 118]], labelAt: [805, 360] },
                { from: B.pg, to: B.api, label: "Read published projections", kind: K.data, sourcePort: P.bottom, targetPort: P.left, via: [[570, 1010], [30, 1010], [30, 118]], labelAt: [195, 995] },
                { from: B.materialize, to: B.redis, label: "Read-model update events", kind: K.event, sourcePort: P.right, targetPort: P.bottom, via: [[745, 538], [745, 360], [620, 360], [620, 210], [570, 210]], labelAt: [745, 415] },
                { from: B.api, to: B.web, label: "Persisted reads + SSE", kind: K.request, sourcePort: P.left, targetPort: P.left, via: [[10, 118], [10, 908]], labelAt: [115, 820] },
            ],
            notes: [
                { title: "Asynchronous provider lifecycle", text: "Provider callbacks enter through the public API origin and enqueue processing. The materialization role handles callback processing, late-reaggregation and materialization-recovery." },
                { title: "Durability before presentation", text: "PostgreSQL stores cycle/task correlation, observations and publication state. Redis is transport and cache; it does not replace the persisted analytical history." },
                { title: "Controlled recovery", text: "Reliability detects overdue work and enqueues recovery. The materialization owner reloads persisted state, rejects stale recovery commands and repairs the relevant read models." },
            ],
        },
    ],
};

const F = {
    browser: "fleury-browser", web: "fleury-web", api: "fleury-api", identity: "fleury-identity",
    pg: "fleury-pg", relay: "fleury-relay", temporal: "fleury-telemetry-storageral", worker: "fleury-worker",
    runner: "fleury-runner", targets: "fleury-targets", objects: "fleury-objects", secrets: "fleury-secrets",
    synthesis: "fleury-synthesis", rust: "fleury-rust", ai: "fleury-ai", cdc: "fleury-cdc",
    kafka: "fleury-kafka", consumers: "fleury-consumers", observability: "fleury-observability",
};

export const fleuryInfrastructure: ProjectInfrastructure = {
    title: "Fleury infrastructure",
    views: [
        {
            id: "execution", title: "Control & execution plane", width: 1180, height: 1470,
            description: "The Go control plane owns product state in PostgreSQL. Temporal coordinates long-running work, while separate runner hosts execute application actions and return evidence.",
            zones: [
                { id: "fleury-control-zone", title: "FLEURY RUNTIME · CONTROL PLANE & FOUNDATIONS", detail: "Containerized services · public REST / OpenAPI boundary", x: 20, y: 245, width: 1140, height: 740 },
                { id: "fleury-runner-zone", title: "RUNNER HOSTS", detail: "Separately provisioned worker environments", x: 355, y: 1050, width: 805, height: 195 },
                { id: "fleury-synthesis-zone", title: "ISOLATED WORKSPACE", detail: "No network · shared Unix socket", x: 20, y: 1050, width: 300, height: 195 },
            ],
            nodes: [
                { id: F.browser, title: "Browser / Fleury CLI", technology: "User and automation clients", detail: "Authenticated product access", kind: N.client, x: 50, y: 85 },
                { id: F.web, title: "Next.js dashboard", technology: "App Router + BFF", detail: "Generated OpenAPI client", kind: N.service, x: 460, y: 85 },
                { id: F.identity, title: "Identity service", technology: "OIDC authentication / broker", detail: "SSO · SAML / LDAP via broker", kind: N.external, x: 900, y: 85 },
                { id: F.api, title: "Go control plane", technology: "REST / JSON · tenant / RBAC", detail: "Product + command authority", kind: N.service, x: 460, y: 330 },
                { id: F.pg, title: "PostgreSQL", technology: "RLS + canonical outbox", detail: "Product state / command journal", kind: N.store, x: 50, y: 330 },
                { id: F.secrets, title: "Secrets store", technology: "Secret references", detail: "Runner / integration credentials", kind: N.store, x: 900, y: 330 },
                { id: F.relay, title: "Command relay", technology: "Durable dispatch + fencing", detail: "Leases, replay and recovery", kind: N.worker, x: 50, y: 600 },
                { id: F.temporal, title: "Temporal server", technology: "Self-hosted workflows", detail: "Durable state / task queues", kind: N.service, x: 460, y: 600 },
                { id: F.objects, title: "Object storage", technology: "Artifact storage", detail: "Evidence + checksums", kind: N.store, x: 900, y: 600 },
                { id: F.rust, title: "Rust analyzers", technology: "Behavior / source analysis", detail: "Explicit process boundaries", kind: N.service, x: 50, y: 850 },
                { id: F.worker, title: "Go execution workers", technology: "Temporal tasks + activities", detail: "Runner dispatch / recovery", kind: N.worker, x: 460, y: 850 },
                { id: F.ai, title: "Governed AI jobs", technology: "External inference adapter", detail: "Evidence manifests + review", kind: N.worker, x: 900, y: 850 },
                { id: F.synthesis, title: "Test synthesis worker", technology: "Isolated source workspace", detail: "Network disabled · test proof", kind: N.worker, x: 60, y: 1120 },
                { id: F.runner, title: "Runner control / agents", technology: "Go · mTLS / internal gRPC", detail: "Leases, commands and receipts", kind: N.worker, x: 460, y: 1120 },
                { id: F.targets, title: "Web / API / Mobile", technology: "Playwright + CDP · Appium", detail: "Application under inspection", kind: N.external, x: 900, y: 1120 },
            ],
            connections: [
                { from: F.browser, to: F.web, label: "HTTPS", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [365, 118] },
                { from: F.web, to: F.identity, label: "OIDC", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [790, 118] },
                { from: F.web, to: F.api, label: "REST / OpenAPI", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 235] },
                { from: F.browser, to: F.api, label: "CLI: direct API access", kind: K.request, sourcePort: P.bottom, targetPort: P.top, via: [[160, 225], [530, 225]], labelAt: [315, 210] },
                { from: F.api, to: F.pg, label: "SQL · product authority", kind: K.data, sourcePort: P.left, targetPort: P.right, labelAt: [365, 360] },
                { from: F.api, to: F.secrets, label: "Secret resolution", kind: K.control, sourcePort: P.right, targetPort: P.left, labelAt: [790, 360] },
                { from: F.pg, to: F.relay, label: "Durable commands", kind: K.data, sourcePort: P.bottom, targetPort: P.top, labelAt: [160, 515] },
                { from: F.relay, to: F.temporal, label: "Workflow dispatch", kind: K.async, sourcePort: P.right, targetPort: P.left, labelAt: [365, 630] },
                { from: F.temporal, to: F.worker, label: "Temporal task queues", kind: K.async, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 770] },
                { from: F.worker, to: F.rust, label: "Bounded analysis", kind: K.request, sourcePort: P.left, targetPort: P.right, labelAt: [365, 880] },
                { from: F.api, to: F.objects, label: "Evidence API", kind: K.data, sourcePort: P.right, targetPort: P.left, via: [[765, 378], [765, 648]], labelAt: [765, 540] },
                { from: F.api, to: F.ai, label: "Policy-checked AI work", kind: K.async, sourcePort: P.right, targetPort: P.right, via: [[805, 378], [805, 740], [1140, 740], [1140, 898]], labelAt: [1080, 755] },
                { from: F.worker, to: F.runner, label: "mTLS · commands / receipts", kind: K.request, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 1030] },
                { from: F.runner, to: F.targets, label: "Browser / API / device actions", kind: K.request, sourcePort: P.right, targetPort: P.left, labelAt: [790, 1150] },
                { from: F.api, to: F.synthesis, label: "Unix socket + shared workspace", kind: K.control, sourcePort: P.top, targetPort: P.left, via: [[570, 305], [35, 305], [35, 1168]], labelAt: [185, 1020] },
                { from: F.runner, to: F.api, label: "Evidence receipts → control plane", kind: K.data, sourcePort: P.bottom, targetPort: P.right, via: [[570, 1360], [1170, 1360], [1170, 480], [710, 480], [710, 378]], labelAt: [885, 1345] },
            ],
            notes: [
                { title: "Authority and transport are different", text: "The Go control plane and PostgreSQL own product state. Event transport and derived read models have separate responsibilities, shown in the second view." },
                { title: "Runner and analysis boundaries", text: "Temporal coordinates durable work. Runner agents act on applications; Playwright performs browser actions and CDP observes. Rust analyzers are process boundaries, not an invented public microservice." },
                { title: "Self-hosted is a distinct deployment profile", text: "The mono-host package dispatches the PostgreSQL command journal directly to Temporal without requiring Kafka. Its runner pools live on dedicated hosts; synthesis uses a shared workspace/socket with network disabled." },
            ],
        },
        {
            id: "events", title: "Event plane & deployment profiles", width: 1180, height: 1070,
            description: "The event infrastructure transports durable facts into consumers and projections. Event transport, read models and observability are separate responsibilities from the control and execution plane.",
            zones: [
                { id: "fleury-events-zone", title: "EVENT / PROJECTION PLANE", detail: "Asynchronous events · independent consumers", x: 20, y: 270, width: 1140, height: 470 },
                { id: "fleury-ops-zone", title: "OBSERVABILITY NETWORK", detail: "OTel collection, traces, metrics and dashboards", x: 20, y: 820, width: 1140, height: 200 },
            ],
            nodes: [
                { id: F.api, title: "Control-plane writers", technology: "Go API + domain workers", detail: "Canonical state / outbox facts", kind: N.service, x: 50, y: 70 },
                { id: F.pg, title: "PostgreSQL", technology: "Canonical state + WAL", detail: "Logical replication / outbox", kind: N.store, x: 460, y: 70 },
                { id: F.cdc, title: "Change data capture", technology: "PostgreSQL CDC connectors", detail: "WAL → versioned event topics", kind: N.service, x: 460, y: 350 },
                { id: F.kafka, title: "Event broker + schemas", technology: "Durable event transport", detail: "Schema-controlled contracts", kind: N.store, x: 460, y: 585 },
                { id: F.consumers, title: "Go consumers / relays", technology: "Domain-specific processing", detail: "Derived stores / read models", kind: N.worker, x: 900, y: 585 },
                { id: F.temporal, title: "Temporal dispatch", technology: "Event-driven command relay", detail: "Durable workflows / recovery", kind: N.worker, x: 50, y: 585 },
                { id: F.observability, title: "Telemetry collector", technology: "OTLP service instrumentation", detail: "Trace / metric pipelines", kind: N.service, x: 50, y: 895 },
                { id: "fleury-telemetry-storage", title: "Trace + metric storage", technology: "Trace and metric storage", detail: "Persistent observability data", kind: N.store, x: 460, y: 895 },
                { id: "fleury-observability-ui", title: "Observability dashboard", technology: "Dashboards / investigation", detail: "Reads trace and metric stores", kind: N.service, x: 900, y: 895 },
            ],
            connections: [
                { from: F.api, to: F.pg, label: "SQL / transaction", kind: K.data, sourcePort: P.right, targetPort: P.left, labelAt: [365, 100] },
                { from: F.pg, to: F.cdc, label: "WAL / logical replication", kind: K.event, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 245] },
                { from: F.cdc, to: F.kafka, label: "CDC facts / schemas", kind: K.event, sourcePort: P.bottom, targetPort: P.top, labelAt: [570, 520] },
                { from: F.kafka, to: F.consumers, label: "Consume / project", kind: K.event, sourcePort: P.right, targetPort: P.left, labelAt: [790, 615] },
                { from: F.kafka, to: F.temporal, label: "Command events", kind: K.event, sourcePort: P.left, targetPort: P.right, labelAt: [365, 615] },
                { from: F.api, to: F.observability, label: "Services → OTLP", kind: K.control, sourcePort: P.left, targetPort: P.left, via: [[30, 118], [30, 943]], labelAt: [125, 805] },
                { from: F.observability, to: "fleury-telemetry-storage", label: "Traces / metrics", kind: K.control, sourcePort: P.right, targetPort: P.left, labelAt: [365, 925] },
                { from: "fleury-observability-ui", to: "fleury-telemetry-storage", label: "Query", kind: K.request, sourcePort: P.left, targetPort: P.right, labelAt: [790, 925] },
            ],
            notes: [
                { title: "Container and cluster deployment", text: "Container and Kubernetes packaging define service roles, network boundaries, persistent storage, resource limits and scaling policies." },
                { title: "Self-hosted / air-gap package", text: "Docker Compose packages the dashboard, control plane, migrations, Temporal, relay, outbox/maintenance workers, PostgreSQL, object storage, identity and secrets services. Signed image bundles and volumes support offline installation and backup/restore." },
                { title: "Independent event services", text: "The event plane connects change capture, an event broker, domain consumers and derived stores. Telemetry, trace storage, metrics and dashboards support diagnosis; product state remains owned by the control plane." },
            ],
        },
    ],
};
