import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { contactEmail, faqs, navigation, process, serviceOptions, services, type ServiceOption } from './content';

type IconName = 'arrow' | 'check' | 'chevron' | 'detail' | 'chat' | 'folder' | 'heart' | 'ledger' | 'reconcile' | 'refresh' | 'menu' | 'close' | 'mail';

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    detail: <><path d="M8 3h8l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3Z" /><path d="M8 11h8M8 15h6" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.2-.7L4 20l1.7-5.3a8 8 0 0 1-.7-3.2A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11.5h8" /></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M7 13h10" /></>,
    heart: <path d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 0 1 8.8-1.7 4.6 4.6 0 0 1 8.8 1.7Z" />,
    ledger: <><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 3v18M12 8h4M12 12h4M12 16h3" /></>,
    reconcile: <><path d="M4 7h14m-3-3 3 3-3 3M20 17H6m3-3-3 3 3 3" /><path d="M5 3v4m14 10v4" /></>,
    refresh: <><path d="M20 8a8 8 0 0 0-14.7-2L3 8m0-5v5h5" /><path d="M4 16a8 8 0 0 0 14.7 2L21 16m0 5v-5h-5" /></>,
    menu: <><path d="M3 7h18M3 12h18M3 17h18" /></>,
    close: <><path d="M5 5 19 19M19 5 5 19" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  };
  return <svg {...shared}>{paths[name]}</svg>;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className={`brand ${footer ? 'brand--footer' : ''}`} aria-label="MT Elite Bookkeeping, back to home">
    <span className="brand__mark" aria-hidden="true">MT<span className="brand__mark-dot">.</span></span>
    <span className="brand__name"><strong>MT ELITE</strong><small>BOOKKEEPING</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    const desktop = window.matchMedia('(min-width: 901px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointer); desktop.removeEventListener('change', onResize); };
  }, [open]);

  return <header className="site-header" ref={menuRef}>
    <div className="container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.filter(item => item.href !== '#home' && item.href !== '#contact').map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        <a href="#contact" className="header-contact">Let’s talk <Icon name="arrow" size={16} /></a>
      </nav>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
        <Icon name={open ? 'close' : 'menu'} size={25} />
      </button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Mobile navigation" inert={!open}>
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Icon name="arrow" size={17} /></a>)}
    </nav>
  </header>;
}

function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="container hero__inner">
      <div className="hero__content">
        <p className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> A LITTLE ORDER. A LOT OF CLARITY.</p>
        <h1 id="hero-title">Clear books.<br /><span>Confident<br />business.</span></h1>
        <p className="hero__description">Thoughtful bookkeeping. A clearer picture of your business. More time for what you do best.</p>
        <div className="hero__actions">
          <a href="#contact" className="button button--dark">Let’s talk about your books <Icon name="arrow" size={18} /></a>
          <a href="#services" className="hero__secondary">Explore services <Icon name="arrow" size={17} /></a>
        </div>
        <p className="hero__promise"><span className="hero__promise-icon"><Icon name="check" size={14} /></span> Clear records. Personal attention. Peace of mind.</p>
      </div>
      <figure className="hero__image">
        <img src="/images/mt-elite-hero-1672.webp" srcSet="/images/mt-elite-hero-960.webp 960w, /images/mt-elite-hero-1440.webp 1440w, /images/mt-elite-hero-1672.webp 1672w" sizes="(max-width: 900px) 100vw, 50vw" width="1672" height="941" fetchPriority="high" alt="Professionals reviewing business records together around a laptop" />
        <figcaption><span>YOUR BUSINESS, IN FOCUS</span><p>Behind every good decision,<br /><em>there’s a clearer picture.</em></p></figcaption>
        <span className="hero__image-label" aria-hidden="true">MT / ELITE</span>
      </figure>
    </div>
    <div className="container hero__principles" aria-label="Our approach"><span><Icon name="detail" size={18} /> A considered approach</span><span><Icon name="folder" size={18} /> Order in the everyday</span><span><Icon name="chat" size={18} /> A real conversation</span></div>
  </section>;
}

const values: { title: string; icon: IconName }[] = [
  { title: 'Attention to Detail', icon: 'detail' },
  { title: 'Clear Communication', icon: 'chat' },
  { title: 'Organised Records', icon: 'folder' },
  { title: 'Personal Support', icon: 'heart' },
];

function About() {
  return <section className="about section" id="about" aria-labelledby="about-title">
    <div className="container about__grid">
      <div className="about__image-wrap">
        <img src="/images/mt-elite-about-960.webp" srcSet="/images/mt-elite-about-560.webp 560w, /images/mt-elite-about-960.webp 960w, /images/mt-elite-about-1254.webp 1254w" sizes="(max-width: 768px) 90vw, 43vw" width="1254" height="1254" loading="lazy" decoding="async" alt="A professional discussing financial records with colleagues during a bright office meeting" />
        <p className="about__caption"><span>01 / THE PEOPLE BEHIND THE NUMBERS</span> Bookkeeping with a personal touch.</p>
      </div>
      <div className="about__content">
        <p className="eyebrow eyebrow--dark"><span className="eyebrow__line" /> ABOUT MT ELITE</p>
        <h2 id="about-title">Your numbers.<br /><em>A little more human.</em></h2>
        <p className="section-lead">Good bookkeeping makes the day-to-day easier to understand. MT Elite Bookkeeping helps business owners keep records organised and see their numbers with more confidence.</p>
        <p className="about__extra">Whether you need consistent support or help sorting through what has built up, the aim is simple: clear records and a practical way forward.</p>
        <div className="value-grid">
          {values.map(value => <div className="value" key={value.title}><span className="value__icon"><Icon name={value.icon} size={21} /></span><span>{value.title}</span></div>)}
        </div>
        <a href="#contact" className="button button--dark">Let’s Talk <Icon name="arrow" size={18} /></a>
      </div>
      <a href="#contact" className="button button--dark about__mobile-cta">Let’s Talk <Icon name="arrow" size={18} /></a>
    </div>
  </section>;
}

function Services({ onSelect }: { onSelect: (service: ServiceOption) => void }) {
  return <section className="services section" id="services" aria-labelledby="services-title">
    <div className="container">
      <div className="section-heading">
        <div><p className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> OUR SERVICES</p><h2 id="services-title">The support you need.<br /><em>The clarity you deserve.</em></h2></div>
        <p>From the everyday details to a fresh start, practical support for wherever your books stand.</p>
      </div>
      <div className="service-grid">
        {services.map((service, index) => <article className="service-card" key={service.title}>
          <span className="service-card__icon"><Icon name={service.icon} size={29} /></span>
          <span className="service-card__number">0{index + 1}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <a href="#contact" className="service-card__link" onClick={() => onSelect(service.title)} aria-label={`Let's discuss ${service.title}`}>Let’s discuss <Icon name="arrow" size={18} /></a>
        </article>)}
      </div>
    </div>
  </section>;
}

function Process() {
  return <section className="process section" id="process" aria-labelledby="process-title">
    <div className="container">
      <div className="process__intro">
        <div><p className="eyebrow eyebrow--dark"><span className="eyebrow__line" /> THE WAY FORWARD</p><h2 id="process-title">A simple path to <em>clearer books.</em></h2></div>
        <p>Start with a conversation. From there, we can work out what your books need and the right next step.</p>
      </div>
      <div className="process__steps">
        {process.map(step => <article className="process-step" key={step.number}>
          <span className="process-step__number">{step.number}</span>
          <span className="process-step__rule" aria-hidden="true" />
          <h3>{step.title}</h3><p>{step.description}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <section className="faq section" id="faqs" aria-labelledby="faq-title">
    <div className="container faq__grid">
      <div className="faq__intro">
        <p className="eyebrow eyebrow--dark"><span className="eyebrow__line" /> GOOD TO KNOW</p>
        <h2 id="faq-title">Questions, <em>answered.</em></h2>
        <p>Finding the right support should feel straightforward. Here are a few helpful starting points.</p>
        <a href="#contact" className="text-link">Still have a question? Get in touch <Icon name="arrow" size={18} /></a>
      </div>
      <div className="faq__list">
        {faqs.map((item, index) => <div className={`faq-item ${active === index ? 'faq-item--active' : ''}`} key={item.question}>
          <h3><button type="button" aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}>{item.question}<span className="faq-item__icon"><Icon name="chevron" size={20} /></span></button></h3>
          <div id={`faq-answer-${index}`} className="faq-item__answer" hidden={active !== index}><p>{item.answer}</p></div>
        </div>)}
      </div>
    </div>
  </section>;
}

type FormFields = { name: string; email: string; business: string; service: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!fields.message.trim()) errors.message = 'Please add a short message.';
  return errors;
}

function Contact({ selectedService }: { selectedService: { service: ServiceOption } | null }) {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', business: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const emailDraft = `mailto:${contactEmail}?subject=${encodeURIComponent(`Bookkeeping enquiry${fields.service ? ` — ${fields.service}` : ''}`)}&body=${encodeURIComponent([
    'Hello MT Elite Bookkeeping,', '', fields.message.trim(), '',
    `Name: ${fields.name.trim()}`, `Email: ${fields.email.trim()}`,
    ...(fields.business.trim() ? [`Business: ${fields.business.trim()}`] : []),
    ...(fields.service ? [`Service: ${fields.service}`] : []),
  ].join('\r\n'))}`;

  useEffect(() => { if (selectedService) { setFields(current => ({ ...current, service: selectedService.service })); setDraftReady(false); } }, [selectedService]);

  function update<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields(current => ({ ...current, [key]: value }));
    if (attempted) setErrors(validate({ ...fields, [key]: value }));
    setDraftReady(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setAttempted(true);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setDraftReady(false);
      window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setDraftReady(true);
  }

  return <section className="contact section" id="contact" aria-labelledby="contact-title">
    <div className="container contact__grid">
      <div className="contact__intro">
        <p className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> GET IN TOUCH</p>
        <h2 id="contact-title">Good things start<br />with <em>a conversation.</em></h2>
        <p>Tell us a little about your business and what you need. Let’s find a practical way forward, together.</p>
        <a className="contact__email" href={`mailto:${contactEmail}`}><span className="contact__email-icon"><Icon name="mail" size={22} /></span><span><small>EMAIL US DIRECTLY</small><span>{contactEmail}</span></span><Icon name="arrow" size={18} /></a>
        <div className="contact__note"><span><Icon name="chat" size={21} /></span><p>Every business has a different starting point. Share as much or as little context as you have.</p></div>
      </div>
      <div className="contact__form-wrap">
        <form ref={formRef} onSubmit={submit} noValidate aria-label="Bookkeeping enquiry">
          <div className="form-heading"><h3>Start a conversation</h3><p>Fields marked * are required.</p></div>
          <div className="form-row">
            <div className="field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" type="text" autoComplete="name" value={fields.name} onChange={event => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} required />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
            <div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={event => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} required />{errors.email && <p className="field-error" id="email-error">{errors.email}</p>}</div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="business">Business name <small>(optional)</small></label><input id="business" name="business" type="text" autoComplete="organization" value={fields.business} onChange={event => update('business', event.target.value)} /></div>
            <div className="field"><label htmlFor="service">Service interest <small>(optional)</small></label><select id="service" name="service" value={fields.service} onChange={event => update('service', event.target.value)}><option value="">Select a service</option>{serviceOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></div>
          </div>
          <div className="field"><label htmlFor="message">How can we help? <span>*</span></label><textarea id="message" name="message" rows={5} placeholder="Tell us a little about your bookkeeping needs..." value={fields.message} onChange={event => update('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} required />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
          <button type="submit" className="button button--gold form-submit">Prepare email enquiry <Icon name="arrow" size={18} /></button>
          <p className="form-footnote">Prepare your enquiry here, then send it from your email app.</p>
          {draftReady && <div className="form-draft" role="status"><strong>Your email draft is ready.</strong><p>Open it in your email app to review and send. Your details stay in this browser until you send the email.</p><a className="button button--gold" href={emailDraft}>Open email draft <Icon name="mail" size={18} /></a><small>No email app configured? Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> directly.</small></div>}
        </form>
      </div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer__top">
      <div className="footer__brand"><Brand footer /><p>Clear books. Confident business. Practical bookkeeping support with a personal touch.</p></div>
      <div className="footer__links"><h2>Explore</h2><nav aria-label="Footer navigation">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      <div className="footer__contact"><h2>Let’s connect</h2><a className="footer__email" href={`mailto:${contactEmail}`}>{contactEmail}</a><p>A little context. A real conversation.<br />A clearer way forward.</p><a href="#contact" className="text-link">Start a conversation <Icon name="arrow" size={18} /></a></div>
    </div>
    <div className="container footer__bottom"><span>© {new Date().getFullYear()} MT Elite Bookkeeping</span><a href="#home">Back to top ↑</a></div>
  </footer>;
}

export default function App() {
  const [selectedService, setSelectedService] = useState<{ service: ServiceOption } | null>(null);
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><Hero /><About /><Services onSelect={service => setSelectedService({ service })} /><Process /><FAQ /><Contact selectedService={selectedService} /></main><Footer /></>;
}
