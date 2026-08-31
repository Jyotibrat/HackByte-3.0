const services = [
  {
    category: "Core Services",
    items: [
      { name: "Web Application", status: "operational", description: "Main Flanora AI web interface" },
      { name: "Authentication Service", status: "operational", description: "User accounts, login, OAuth" },
      { name: "Generation Service", status: "operational", description: "Floor-plan generation orchestration" },
      { name: "AI Inference", status: "operational", description: "Flanora-v1 & Flanora-v2 model execution" },
    ],
  },
  {
    category: "Data & Storage",
    items: [
      { name: "Primary Database", status: "operational", description: "PostgreSQL (Neon) — users, profiles, chats" },
      { name: "Metadata Database", status: "operational", description: "Cassandra (Astra DB) — generation records" },
      { name: "Image Storage", status: "operational", description: "Google Drive — generated floor plans" },
      { name: "Cache & Queues", status: "operational", description: "Redis (Upstash) — BullMQ job queues" },
    ],
  },
  {
    category: "AI & Processing",
    items: [
      { name: "Flanora-v1 Model", status: "operational", description: "Stable Diffusion 1.5 + Canny ControlNet" },
      { name: "Flanora-v2 Workflow", status: "operational", description: "Multi-model generation (4 images)" },
      { name: "Image Processing", status: "operational", description: "Resize, compression, thumbnails" },
      { name: "Prompt Validation", status: "operational", description: "Residential floor-plan relevance filter" },
    ],
  },
  {
    category: "Notifications & Observability",
    items: [
      { name: "Push Notifications", status: "operational", description: "FCM — Web, Android, iOS" },
      { name: "WebSocket Status", status: "operational", description: "Real-time generation updates" },
      { name: "Metrics & Logs", status: "operational", description: "Prometheus, Loki, Grafana" },
      { name: "Analytics", status: "operational", description: "Google Analytics" },
    ],
  },
];

const statusConfig = {
  operational: { label: "Operational", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", dot: "bg-emerald-400" },
  degraded: { label: "Degraded Performance", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", dot: "bg-amber-400" },
  partial: { label: "Partial Outage", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", dot: "bg-orange-400" },
  major: { label: "Major Outage", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", dot: "bg-red-400" },
  maintenance: { label: "Maintenance", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", dot: "bg-cyan-400" },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.operational;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.color} ${config.bg} border ${config.border}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}

function ServiceCard({ service }) {
  const config = statusConfig[service.status] || statusConfig.operational;
  return (
    <article className={`group flanora-status-card p-5 rounded-xl border transition-all duration-300 ${config.border} bg-white/5 backdrop-blur-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
            {service.name}
          </h3>
          <p className="text-sm text-white/60 mt-1" style={{ fontFamily: "Martel Sans, sans-serif" }}>
            {service.description}
          </p>
        </div>
        <StatusBadge status={service.status} />
      </div>
    </article>
  );
}

function StatusCategory({ category, items }) {
  return (
    <section className="flanora-status-category" aria-labelledby={category.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex items-center justify-between mb-6">
        <h2 id={category.toLowerCase().replace(/\s+/g, "-")} className="text-xl font-bold text-white" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
          {category}
        </h2>
        <span className="text-sm text-white/50 uppercase tracking-wider" style={{ fontFamily: "Martel Sans, sans-serif" }}>
          {items.length} services
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
}

function StatusPage() {
  const lastUpdated = new Date().toISOString();
  const allOperational = services.every((cat) => cat.items.every((s) => s.status === "operational"));
  const overallStatus = allOperational ? "operational" : "degraded";

  return (
    <div className="bg-gradient-animated min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4" style={{ fontFamily: "Martel Sans, sans-serif" }}>
              System Status
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
              All Systems <span className="text-cyan-400">Operational</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto" style={{ fontFamily: "Martel Sans, sans-serif" }}>
              Real-time operational status of Flanora AI services. This page reflects the health of all major components powering the platform.
            </p>
          </div>

          <div className="flanora-status-overview mb-12 md:mb-16">
            <div className={`flanora-overall-status p-6 md:p-8 rounded-2xl border ${statusConfig[overallStatus].border} ${statusConfig[overallStatus].bg} backdrop-blur-md`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusConfig[overallStatus].bg.replace("10", "20")}`}>
                    <span className={`w-4 h-4 rounded-full ${statusConfig[overallStatus].dot}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                      Overall Status
                    </p>
                    <p className={`text-2xl md:text-3xl font-bold ${statusConfig[overallStatus].color}`} style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                      {statusConfig[overallStatus].label}
                    </p>
                  </div>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-sm text-white/50" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                    Last updated
                  </p>
                  <p className="font-mono text-white/80" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                    {new Date(lastUpdated).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZoneName: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {services.map((category) => (
              <StatusCategory key={category.category} category={category.category} items={category.items} />
            ))}
          </div>

          <section className="flanora-status-footer mt-16 md:mt-24 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                  Incident History
                </h3>
                <p className="text-sm text-white/60 mb-4" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                  View past incidents and maintenance windows.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "Martel Sans, sans-serif" }}
                >
                  View history <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                  Subscribe to Updates
                </h3>
                <p className="text-sm text-white/60 mb-4" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                  Get notified via email for status changes.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "Martel Sans, sans-serif" }}
                >
                  Subscribe <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                  API Status
                </h3>
                <p className="text-sm text-white/60 mb-4" style={{ fontFamily: "Martel Sans, sans-serif" }}>
                  Programmatic access to status data.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "Martel Sans, sans-serif" }}
                >
                  API docs <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default StatusPage;