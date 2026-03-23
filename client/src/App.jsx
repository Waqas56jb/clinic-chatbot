import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const imageFallback =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

const stats = [
  { value: "24/7", label: "Patient conversations without delay" },
  { value: "68%", label: "Faster first response time" },
  { value: "41%", label: "Increase in qualified bookings" },
  { value: "3.2x", label: "Higher team productivity" }
];

const featureCards = [
  {
    icon: "fa-solid fa-stethoscope",
    title: "Clinical FAQ Intelligence",
    text: "Answers common patient questions in clear language while keeping your tone consistent across all channels."
  },
  {
    icon: "fa-solid fa-calendar-check",
    title: "Booking and Rescheduling",
    text: "Collects intent, date, department, and contact details to speed up appointment conversion."
  },
  {
    icon: "fa-solid fa-language",
    title: "Multilingual Patient Support",
    text: "Engages users in multiple languages and maintains context for a smoother journey."
  },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Human Handover Workflow",
    text: "Routes urgent or complex requests to your team with all relevant conversation context."
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Performance Analytics",
    text: "Tracks top intent themes, treatment demand, and booking conversion trends for smart decisions."
  },
  {
    icon: "fa-solid fa-shield-heart",
    title: "Healthcare-Ready Safeguards",
    text: "Prompts with privacy-first behavior and safe escalation patterns for sensitive conversations."
  }
];

const serviceFlow = [
  {
    title: "Discovery",
    text: "We map service lines, patient personas, and conversion goals so every chatbot answer supports business outcomes."
  },
  {
    title: "Conversation Architecture",
    text: "We build structured flows, branching logic, and fallback paths that reduce confusion and improve trust."
  },
  {
    title: "Integration and QA",
    text: "We connect forms, CRM, calendars, and support channels, then test real scenarios before launch."
  },
  {
    title: "Optimization Loop",
    text: "We monitor drop-offs, low-performing intents, and handover quality to continuously improve conversion."
  }
];

const imagePresentations = [
  {
    title: "Front Desk Efficiency",
    text: "Automates repetitive patient queries and reduces call pressure.",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Appointment Flow",
    text: "Captures booking intent and routes requests to the right team.",
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Patient Guidance",
    text: "Answers common questions instantly with consistent messaging.",
    url: "https://images.unsplash.com/photo-1579165466949-3180a3d056d2?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Care Team Handover",
    text: "Transfers complex conversations with full context attached.",
    url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80"
  }
];

const gallery = [
  {
    url: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=1400&q=80",
    label: "First Response",
    detail: "Reception and triage support"
  },
  {
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    label: "Consultation Support",
    detail: "Follow-up and care coordination"
  },
  {
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    label: "Digital Front Desk",
    detail: "Instant patient communication"
  },
  {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    label: "Patient Onboarding",
    detail: "Clear next-step guidance"
  },
  {
    url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",
    label: "Care Team Coordination",
    detail: "Better internal handover"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    label: "Operations Speed",
    detail: "Faster response across channels"
  }
];

const testimonials = [
  {
    quote:
      "We reduced repetitive front desk calls dramatically and improved booking quality in just two weeks.",
    name: "Dr. Helena Park",
    role: "Operations Director, NovaCare Clinics"
  },
  {
    quote:
      "The patient journey is clear now. Users get instant clarity and our team handles only high-value conversations.",
    name: "Miguel Santos",
    role: "Growth Lead, VitaSmile Dental Group"
  },
  {
    quote:
      "The chatbot became our 24/7 digital receptionist. It delivers consistent care messaging and better lead routing.",
    name: "Amara Ibrahim",
    role: "Head of Digital, CurePoint Diagnostics"
  }
];

const faqs = [
  {
    q: "Can this support both clinics and wellness brands?",
    a: "Yes. It supports clinics, diagnostics, dental centers, aesthetics, and wellness services."
  },
  {
    q: "Do we need technical staff to run it daily?",
    a: "No. The dashboard and flows are built for non-technical teams, with optional managed support."
  },
  {
    q: "Can the chatbot hand over to a real person instantly?",
    a: "Yes. Escalation rules and priority routing are built in for urgent or sensitive requests."
  },
  {
    q: "What if external images fail to load?",
    a: "Each image has a fallback source to keep the page stable."
  }
];

function handleImageError(event) {
  const target = event.currentTarget;
  if (target.src !== imageFallback) {
    target.src = imageFallback;
  }
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: [
        "## Clinic Chatbot Assistant",
        "",
        "**Welcome:** Ask me about clinic services, patient communication, and appointment flow.",
        "",
        "- Clinic lead generation chatbot setup",
        "- Patient FAQ and booking automation",
        "- Handover flow to clinic staff"
      ].join("\n")
    }
  ]);

  async function handleSendMessage(event) {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsSending(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.reply ||
            "## Clinic Chatbot Assistant\n\n**Notice:** I could not generate a response right now."
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [
            "## Clinic Chatbot Assistant",
            "",
            `**Server Error:** ${error.message}`,
            "",
            "Please verify the backend server is running and `OPENAI_API_KEY` is configured."
          ].join("\n")
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="container nav">
          <a className="brand" href="#">
            <img
              src="https://img.icons8.com/color/96/medical-doctor.png"
              alt="BluePeak Clinic AI logo"
              className="brand-logo"
              onError={handleImageError}
            />
            <div>
              <strong>BluePeak Clinic AI</strong>
              <span>Enterprise conversational system for healthcare growth</span>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#showcase">How It Works</a>
            <a href="#workflow">Workflow</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn-primary" href="#contact">
            Book Strategy Call
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <img
            className="hero-bg"
            src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=2000&q=80"
            alt="Premium clinic environment"
            onError={handleImageError}
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <h1>Turn every visitor into a confident patient with AI-first communication.</h1>
            <p>
              A conversion-focused landing page that explains your service clearly, builds
              trust fast, and turns more visitors into qualified patient leads.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#features">
                Explore Platform
              </a>
              <a className="btn btn-ghost" href="#showcase">
                See How It Works
              </a>
            </div>
            <div className="hero-badges">
              <span>HIPAA-aware conversation flows</span>
              <span>Omnichannel engagement</span>
              <span>Fast deployment in days</span>
            </div>
          </div>
        </section>

        <section className="container stat-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section id="features" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Built to perform fast and convert better.</h2>
              <p>
                The platform combines healthcare-focused messaging and practical automation
                flows that improve patient satisfaction and clinic efficiency.
              </p>
            </div>
            <div className="feature-grid">
              {featureCards.map((card) => (
                <article key={card.title} className="feature-card">
                  <i className={card.icon} />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="showcase" className="section section-soft">
          <div className="container showcase-shell">
            <div className="showcase-main">
              <h2>Clinic chatbot advantages for real patient communication.</h2>
              <p>
                A minimal, clear presentation helps visitors understand value quickly. This
                section focuses on outcomes: faster response, better booking quality, and
                smoother patient support operations.
              </p>
              <ul className="showcase-points">
                <li>Instant answers for common patient questions.</li>
                <li>Structured booking and rescheduling support.</li>
                <li>Clean handover to clinic staff when needed.</li>
                <li>Consistent communication across channels.</li>
              </ul>
              <div className="showcase-image">
                <img
                  src="https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=1600&q=80"
                  alt="Clinic team using chatbot-enabled communication"
                  onError={handleImageError}
                />
              </div>
            </div>
            <div className="presentation-grid">
              {imagePresentations.map((item) => (
                <article key={item.title} className="presentation-card">
                  <img src={item.url} alt={item.title} onError={handleImageError} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Real clinic scenarios your chatbot can handle.</h2>
            </div>
            <div className="gallery-pattern">
              {gallery.map((item, idx) => (
                <figure key={item.url} className={`gallery-card tile-${idx + 1}`}>
                  <img src={item.url} alt={item.label} onError={handleImageError} />
                  <figcaption>
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2>End-to-end implementation from strategy to scaling.</h2>
            </div>
            <div className="flow-grid">
              {serviceFlow.map((item, idx) => (
                <article key={item.title} className="flow-card">
                  <span>Phase {idx + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Proof that chatbot automation drives measurable growth.</h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article key={item.name} className="testimonial-card">
                  <p>"{item.quote}"</p>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <h2>Everything important, explained clearly.</h2>
            </div>
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
          <div className="contact-card">
            <h2>Build your full clinic landing system now.</h2>
            <p>
              We can customize this page with your clinic services, departments, and lead
              capture flow so it works as a practical patient acquisition channel.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:contacto@solucionclinica.com">
                Start Conversation
              </a>
              <a className="btn btn-ghost" href="tel:+34000000000">
                Call +34 000 000 000
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
                alt="BluePeak Clinic AI logo"
                className="brand-logo"
                onError={handleImageError}
              />
              <div>
                <strong>BluePeak Clinic AI</strong>
                <span>Modern conversational growth platform for clinics</span>
              </div>
            </a>
            <p className="footer-text">
              Built for healthcare teams that want a clear, high-converting lead generation
              experience.
            </p>
          </div>
          <div className="footer-links">
            <h4>Navigation</h4>
            <a href="#features">Features</a>
            <a href="#showcase">How It Works</a>
            <a href="#workflow">Workflow</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <a href="mailto:contacto@solucionclinica.com">contacto@solucionclinica.com</a>
            <a href="tel:+34000000000">+34 000 000 000</a>
            <span>Copyright 2026 BluePeak Clinic AI</span>
          </div>
        </div>
      </footer>

      <button
        className="chatbot-fab"
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label="Open clinic chatbot"
      >
        <img
          src="https://img.icons8.com/color/96/chat--v1.png"
          alt="Chatbot icon"
          onError={handleImageError}
        />
      </button>

      {isChatOpen && (
        <aside className="chatbot-panel" aria-label="Clinic chatbot panel">
          <header className="chatbot-header">
            <div className="chatbot-title">
              <img
                src="https://img.icons8.com/color/96/chat--v1.png"
                alt="Clinic chatbot logo"
                onError={handleImageError}
              />
              <div>
                <strong>Clinic Chatbot</strong>
                <span>Real-time clinic communication assistant</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chatbot"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`chat-msg ${message.role}`}>
                {message.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
              </article>
            ))}
            {isSending && <p className="chatbot-loading">Thinking...</p>}
          </div>

          <form className="chatbot-input-wrap" onSubmit={handleSendMessage}>
            <textarea
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask clinic-related questions only..."
              rows={2}
            />
            <button className="btn btn-primary" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}

export default App;
