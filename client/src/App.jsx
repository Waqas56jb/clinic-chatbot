const imageFallback =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80";

const stats = [
  { value: "24/7", label: "Instant response coverage" },
  { value: "89%", label: "Faster first reply in pilot deployments" },
  { value: "47%", label: "Higher inquiry-to-booking conversion rate" },
  { value: "3.4x", label: "Concurrent conversation handling capacity" }
];

const capabilities = [
  {
    icon: "fa-solid fa-calendar-check",
    title: "Booking Automation",
    text: "Manage appointment requests, reminders, and schedule updates in one clear conversational flow."
  },
  {
    icon: "fa-solid fa-route",
    title: "Smart Routing",
    text: "Direct each inquiry to the right team, specialty, or urgency pathway with consistent decision logic."
  },
  {
    icon: "fa-solid fa-comments-dollar",
    title: "Lead Qualification",
    text: "Capture business intent and qualify prospects before handoff to sales or front desk operations."
  },
  {
    icon: "fa-solid fa-chart-pie",
    title: "Performance Analytics",
    text: "Track drop-offs, conversion milestones, and channel quality to improve outcomes every month."
  }
];

const gallery = [
  "https://images.pexels.com/photos/7089629/pexels-photo-7089629.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/6129178/pexels-photo-6129178.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1400"
];

const steps = [
  "Business discovery and strategic scoping session",
  "Conversation architecture and brand voice blueprint",
  "Channel integration and operational launch setup",
  "Live optimization cycle with conversion monitoring"
];

const faqs = [
  {
    q: "Can this solution be adapted for any clinic size?",
    a: "Yes. It works for independent practices, multi-location clinics, and healthcare service groups with modular deployment."
  },
  {
    q: "Will we get a custom conversation structure?",
    a: "Absolutely. Flows are designed around your services, acquisition goals, and operational reality."
  },
  {
    q: "What if an image source fails?",
    a: "The landing now includes automatic image fallback handling, so broken external images are replaced immediately."
  }
];

function handleImageError(event) {
  const target = event.currentTarget;
  if (target.src !== imageFallback) {
    target.src = imageFallback;
  }
}

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="container nav">
          <a className="brand" href="#">
            <img
              src="https://img.icons8.com/color/96/medical-doctor.png"
              alt="BluePeak brand logo"
              className="brand-logo"
              onError={handleImageError}
            />
            <div>
              <strong>BluePeak Clinic AI</strong>
              <span>Conversational Growth Systems</span>
            </div>
          </a>
          <div className="nav-links">
            <a href="#solution">Solution</a>
            <a href="#gallery">Gallery</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="btn btn-primary" href="#contact">
            Book Strategy Call
          </a>
        </div>
      </header>

      <main>
        <section className="hero-modern">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="kicker">Modern clinical chatbot sales landing page</p>
              <h1>A completely redesigned, modern pattern with premium structure</h1>
              <p>
                Hello, I am Michel. I help clinics and healthcare businesses sell,
                position, and deploy AI chatbot services through a long-form,
                enterprise-style landing page that communicates authority, clarity,
                and measurable value.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#solution">
                  View Full Solution
                </a>
                <a className="btn btn-ghost" href="#gallery">
                  Open Visual Gallery
                </a>
              </div>
            </div>
            <div className="hero-media">
              <img
                src="https://images.pexels.com/photos/6823562/pexels-photo-6823562.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Healthcare and chatbot strategy presentation"
                onError={handleImageError}
              />
            </div>
          </div>
        </section>

        <section className="metrics container">
          {stats.map((item) => (
            <article key={item.label} className="metric-card">
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section id="solution" className="section container">
          <div className="section-head">
            <p className="kicker">Professional capabilities</p>
            <h2>New structure, new style, and modern conversion-first design</h2>
          </div>
          <div className="cap-grid">
            {capabilities.map((item) => (
              <article key={item.title} className="cap-card">
                <i className={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section section-soft">
          <div className="container">
            <div className="section-head">
              <p className="kicker">Visual assets from internet</p>
              <h2>Reliable image grid with automatic fallback</h2>
            </div>
            <div className="gallery-grid">
              {gallery.map((url, index) => (
                <figure key={url} className="gallery-card">
                  <img
                    src={url}
                    alt={`Healthcare conversational automation visual ${index + 1}`}
                    onError={handleImageError}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section container">
          <div className="process-layout">
            <div className="process-image">
              <img
                src="https://images.pexels.com/photos/6129166/pexels-photo-6129166.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Clinical operations workflow planning"
                onError={handleImageError}
              />
            </div>
            <div className="process-copy">
              <p className="kicker">Deployment framework</p>
              <h2>Industry-standard rollout process for clinical businesses</h2>
              <ul>
                {steps.map((step) => (
                  <li key={step}>
                    <i className="fa-solid fa-circle-check" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="faq-grid">
              {faqs.map((item) => (
                <article key={item.q} className="faq-card">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section container">
          <div className="contact-box">
            <p className="kicker">Strategic contact</p>
            <h2>Let us discuss your clinic chatbot sales plan</h2>
            <p>
              Ask your business questions and get a structured roadmap focused on
              conversions, quality communication, and scalable deployment.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:contacto@solucionclinica.com">
                Start Conversation
              </a>
              <a className="btn btn-ghost" href="tel:+34000000000">
                Request Call
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="#">
              <img
                src="https://img.icons8.com/color/96/medical-doctor.png"
                alt="BluePeak brand logo"
                className="brand-logo"
                onError={handleImageError}
              />
              <div>
                <strong>BluePeak Clinic AI</strong>
                <span>Professional Healthcare Chat Systems</span>
              </div>
            </a>
          </div>
          <div className="footer-links">
            <a href="#solution">Solution</a>
            <a href="#gallery">Gallery</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-links">
            <a href="mailto:contacto@solucionclinica.com">contacto@solucionclinica.com</a>
            <a href="tel:+34000000000">+34 000 000 000</a>
            <span>2026 BluePeak Clinic AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
