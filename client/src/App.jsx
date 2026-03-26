import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const imageFallback =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

const stats = [
  { value: "24/7", label: "Conversaciones con pacientes sin demoras" },
  { value: "68%", label: "Primera respuesta más rápida" },
  { value: "41%", label: "Aumento en reservas calificadas" },
  { value: "3.2x", label: "Mayor productividad del equipo" }
];

const featureCards = [
  {
    icon: "fa-solid fa-stethoscope",
    title: "Inteligencia para Preguntas Frecuentes Clinicas",
    text: "Responde preguntas comunes de pacientes con lenguaje claro y mantiene un tono consistente en todos los canales."
  },
  {
    icon: "fa-solid fa-calendar-check",
    title: "Reserva y Reprogramacion",
    text: "Recopila intencion, fecha, departamento y datos de contacto para acelerar la conversion a citas."
  },
  {
    icon: "fa-solid fa-language",
    title: "Soporte Multilingue para Pacientes",
    text: "Atiende usuarios en varios idiomas y mantiene el contexto para una experiencia mas fluida."
  },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Flujo de Escalacion a Personal Humano",
    text: "Deriva solicitudes urgentes o complejas a tu equipo con todo el contexto relevante de la conversacion."
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Analitica de Rendimiento",
    text: "Monitorea intenciones principales, demanda de tratamientos y tendencias de conversion para decisiones inteligentes."
  },
  {
    icon: "fa-solid fa-shield-heart",
    title: "Protecciones Listas para Salud",
    text: "Incluye comportamiento orientado a la privacidad y patrones de escalacion seguros para conversaciones sensibles."
  }
];

const serviceFlow = [
  {
    title: "Descubrimiento",
    text: "Mapeamos lineas de servicio, perfiles de pacientes y objetivos de conversion para que cada respuesta apoye resultados de negocio."
  },
  {
    title: "Arquitectura Conversacional",
    text: "Construimos flujos estructurados, logica de ramificacion y rutas de respaldo que reducen confusion y mejoran la confianza."
  },
  {
    title: "Integracion y Control de Calidad",
    text: "Conectamos formularios, CRM, calendarios y canales de soporte, y luego probamos escenarios reales antes del lanzamiento."
  },
  {
    title: "Ciclo de Optimizacion",
    text: "Monitoreamos abandonos, intenciones con bajo rendimiento y calidad de escalacion para mejorar conversion continuamente."
  }
];

const imagePresentations = [
  {
    title: "Eficiencia en Recepcion",
    text: "Automatiza consultas repetitivas de pacientes y reduce la presion de llamadas.",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Flujo de Citas",
    text: "Captura la intencion de reserva y deriva solicitudes al equipo correcto.",
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Orientacion al Paciente",
    text: "Responde preguntas frecuentes al instante con mensajes consistentes.",
    url: "https://images.unsplash.com/photo-1579165466949-3180a3d056d2?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Escalacion al Equipo de Atencion",
    text: "Transfiere conversaciones complejas con el contexto completo.",
    url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80"
  }
];

const gallery = [
  {
    url: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=1400&q=80",
    label: "Primera Respuesta",
    detail: "Soporte de recepcion y triaje"
  },
  {
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    label: "Soporte de Consulta",
    detail: "Seguimiento y coordinacion asistencial"
  },
  {
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    label: "Recepcion Digital",
    detail: "Comunicacion instantanea con pacientes"
  },
  {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    label: "Incorporacion de Pacientes",
    detail: "Orientacion clara de siguientes pasos"
  },
  {
    url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",
    label: "Coordinacion del Equipo de Atencion",
    detail: "Mejor escalacion interna"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    label: "Velocidad Operativa",
    detail: "Respuesta mas rapida en todos los canales"
  }
];

const testimonials = [
  {
    quote:
      "Reducimos de forma drastica las llamadas repetitivas en recepcion y mejoramos la calidad de reservas en solo dos semanas.",
    name: "Dr. Helena Park",
    role: "Directora de Operaciones, Clinicas NovaCare"
  },
  {
    quote:
      "Ahora el recorrido del paciente es claro. Los usuarios reciben respuestas inmediatas y nuestro equipo atiende solo conversaciones de alto valor.",
    name: "Miguel Santos",
    role: "Lider de Crecimiento, Grupo Dental VitaSmile"
  },
  {
    quote:
      "El chatbot se convirtio en nuestra recepcionista digital 24/7. Ofrece mensajes consistentes de atencion y una mejor derivacion de prospectos.",
    name: "Amara Ibrahim",
    role: "Directora Digital, CurePoint Diagnostics"
  }
];

const faqs = [
  {
    q: "Puede funcionar para clinicas y marcas de bienestar?",
    a: "Si. Soporta clinicas, diagnostico, centros dentales, estetica y servicios de bienestar."
  },
  {
    q: "Necesitamos personal tecnico para operarlo a diario?",
    a: "No. El panel y los flujos estan diseniados para equipos no tecnicos, con soporte gestionado opcional."
  },
  {
    q: "El chatbot puede escalar a una persona real al instante?",
    a: "Si. Incluye reglas de escalacion y enrutamiento prioritario para solicitudes urgentes o sensibles."
  },
  {
    q: "Que pasa si las imagenes externas no cargan?",
    a: "Cada imagen tiene una fuente de respaldo para mantener la pagina estable."
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
        "## Asistente de Chatbot Clinico",
        "",
        "**Bienvenida:** Preguntame sobre servicios clinicos, comunicacion con pacientes y flujo de citas.",
        "",
        "- Configuracion de chatbot para generacion de prospectos clinicos",
        "- Automatizacion de preguntas frecuentes y reservas",
        "- Flujo de escalacion al personal de la clinica"
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
      const configuredBase = import.meta.env.VITE_API_BASE_URL;
      const defaultBase =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
          ? "http://localhost:3001"
          : "https://clinic-chatbot-wups.vercel.app";
      const apiBase = configuredBase || defaultBase;
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details ? `${data?.error} ${data?.details}` : data?.error || "No se pudo obtener respuesta.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.reply ||
            "## Asistente de Chatbot Clinico\n\n**Aviso:** No pude generar una respuesta en este momento."
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [
            "## Asistente de Chatbot Clinico",
            "",
            `**Error del Servidor:** ${error.message}`,
            "",
            "Verifica que el servidor backend este en ejecucion y que `OPENAI_API_KEY` este configurada."
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
              alt="Logotipo de BluePeak Clinic AI"
              className="brand-logo"
              onError={handleImageError}
            />
            <div>
              <strong>BluePeak Clinic AI</strong>
              <span>Sistema conversacional empresarial para crecimiento en salud</span>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#features">Funciones</a>
            <a href="#showcase">Como Funciona</a>
            <a href="#workflow">Proceso</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#contact">Contacto</a>
          </nav>
          <a className="btn btn-primary" href="#contact">
            Reservar Llamada Estrategica
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <img
            className="hero-bg"
            src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=2000&q=80"
            alt="Entorno clinico premium"
            onError={handleImageError}
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <h1>Convierte cada visitante en un paciente confiado con comunicacion impulsada por IA.</h1>
            <p>
              Una landing enfocada en conversion que explica tus servicios con claridad, genera
              confianza rapido y convierte mas visitantes en prospectos calificados.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#features">
                Explorar Plataforma
              </a>
              <a className="btn btn-ghost" href="#showcase">
                Ver Como Funciona
              </a>
            </div>
            <div className="hero-badges">
              <span>Flujos conversacionales adaptados a HIPAA</span>
              <span>Atencion omnicanal</span>
              <span>Implementacion rapida en dias</span>
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
              <h2>Creado para rendir rapido y convertir mejor.</h2>
              <p>
                La plataforma combina mensajes enfocados en salud y automatizaciones practicas
                que mejoran la satisfaccion del paciente y la eficiencia de la clinica.
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
              <h2>Ventajas del chatbot clinico para la comunicacion real con pacientes.</h2>
              <p>
                Una presentacion minima y clara ayuda a entender el valor rapidamente. Esta
                seccion se centra en resultados: respuesta mas rapida, mejor calidad de reservas
                y operaciones de soporte mas fluidas.
              </p>
              <ul className="showcase-points">
                <li>Respuestas instantaneas para preguntas frecuentes.</li>
                <li>Soporte estructurado para reservas y reprogramaciones.</li>
                <li>Escalacion clara al personal clinico cuando se necesita.</li>
                <li>Comunicacion consistente en todos los canales.</li>
              </ul>
              <div className="showcase-image">
                <img
                  src="https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=1600&q=80"
                  alt="Equipo clinico usando comunicacion asistida por chatbot"
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
              <h2>Escenarios clinicos reales que tu chatbot puede gestionar.</h2>
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
              <h2>Implementacion de punta a punta, de la estrategia al escalado.</h2>
            </div>
            <div className="flow-grid">
              {serviceFlow.map((item, idx) => (
                <article key={item.title} className="flow-card">
                  <span>Fase {idx + 1}</span>
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
              <h2>Prueba de que la automatizacion con chatbot impulsa crecimiento medible.</h2>
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
              <h2>Todo lo importante, explicado con claridad.</h2>
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
            <h2>Construye ahora tu sistema completo de landing clinica.</h2>
            <p>
              Podemos personalizar esta pagina con tus servicios, departamentos y flujo de
              captacion de leads para que funcione como un canal practico de adquisicion.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:contacto@solucionclinica.com">
                Iniciar Conversacion
              </a>
              <a className="btn btn-ghost" href="tel:+34000000000">
                Llamar al +34 000 000 000
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
              alt="Logotipo de BluePeak Clinic AI"
                className="brand-logo"
                onError={handleImageError}
              />
              <div>
                <strong>BluePeak Clinic AI</strong>
                <span>Plataforma moderna de crecimiento conversacional para clinicas</span>
              </div>
            </a>
            <p className="footer-text">
              Creado para equipos de salud que buscan una experiencia clara y de alta conversion
              para generacion de leads.
            </p>
          </div>
          <div className="footer-links">
            <h4>Navegacion</h4>
            <a href="#features">Funciones</a>
            <a href="#showcase">Como Funciona</a>
            <a href="#workflow">Proceso</a>
            <a href="#testimonials">Testimonios</a>
          </div>
          <div className="footer-links">
            <h4>Contacto</h4>
            <a href="mailto:contacto@solucionclinica.com">contacto@solucionclinica.com</a>
            <a href="tel:+34000000000">+34 000 000 000</a>
            <span>Derechos reservados 2026 BluePeak Clinic AI</span>
          </div>
        </div>
      </footer>

      <button
        className="chatbot-fab"
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label="Abrir chatbot clinico"
      >
        <img
          src="https://img.icons8.com/color/96/chat--v1.png"
          alt="Icono de chatbot"
          onError={handleImageError}
        />
      </button>

      {isChatOpen && (
        <aside className="chatbot-panel" aria-label="Panel de chatbot clinico">
          <header className="chatbot-header">
            <div className="chatbot-title">
              <img
                src="https://img.icons8.com/color/96/chat--v1.png"
                alt="Logotipo de chatbot clinico"
                onError={handleImageError}
              />
              <div>
                <strong>Chatbot Clinico</strong>
                <span>Asistente de comunicacion clinica en tiempo real</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Cerrar chatbot"
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
            {isSending && <p className="chatbot-loading">Pensando...</p>}
          </div>

          <form className="chatbot-input-wrap" onSubmit={handleSendMessage}>
            <textarea
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Haz solo preguntas relacionadas con clinicas..."
              rows={2}
            />
            <button className="btn btn-primary" type="submit" disabled={isSending}>
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}

export default App;
