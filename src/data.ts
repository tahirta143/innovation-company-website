import { ServiceItem, ProjectItem, TimelineEvent, TechItem, TestimonialItem, ProcessStep } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Next-generation, responsive, and highly secure web applications tailored to scale your enterprise business model.',
    iconName: 'Globe',
    features: ['React & Next.js Frameworks', 'Headless CMS Integration', 'RESTful & GraphQL APIs', 'Serverless Architecture']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'High-performance cross-platform iOS and Android client applications with seamless native performance and elegant feel.',
    iconName: 'Smartphone',
    features: ['Flutter & React Native', 'Offline-First Architecture', 'Real-time Synchronization', 'Advanced Push Notifications']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Immersive user-centric interface systems and design languages crafted through heavy user research and custom interactive wireframing.',
    iconName: 'Paintbrush',
    features: ['Figma Design Systems', 'Interactive Prototyping', 'User Journey Mapping', 'Aesthetic Micro-interactions']
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Highly available server architectures, DevOps automation, cloud native security mechanisms, and global scaling structures.',
    iconName: 'Cloud',
    features: ['AWS & GCP Deployments', 'Docker & Kubernetes Containerization', 'CI/CD Automation Pipelines', 'Serverless Scaling Patterns']
  },
  {
    id: 'erp',
    title: 'ERP Systems',
    description: 'Custom, end-to-end Enterprise Resource Planning softwares built to centralize complex workflows and optimize corporate team coordination.',
    iconName: 'Layers',
    features: ['Accounting & Payroll Integration', 'Supply Chain Tracking', 'HR Management Portals', 'Automated Analytical Report Feeds']
  },
  {
    id: 'healthcare',
    title: 'Healthcare Solutions (HIMS)',
    description: 'HIPAA-compliant, highly secure clinical systems connecting doctors, clinical rooms, labs, pharmacy assets, and insurance APIs.',
    iconName: 'HeartPulse',
    features: ['EHR & EMR Implementations', 'Patient Care & Appointment Schedulers', 'Secure HIPAA Protocols', 'Advanced Medical Lab Syncing']
  },
  {
    id: 'pos',
    title: 'POS Systems',
    description: 'Streamlined Point-of-Sale systems featuring offline operation fallback, multi-outlet synchronization, and robust receipt mechanics.',
    iconName: 'CreditCard',
    features: ['Multi-Location Analytics', 'Offline Checkout Framework', 'Real-time Stock Audits', 'Secure Digital Payment Gateways']
  },
  {
    id: 'ai-auto',
    title: 'AI & Automation',
    description: 'Large Language Model integrations, custom AI agents, automated OCR documents extraction, and business intelligence pipelines.',
    iconName: 'Cpu',
    features: ['Smart Custom Conversational Bots', 'Automated Workflow Triggers', 'Predictive Analysis Algorithms', 'OCR & Intelligent Invoice Intake']
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'waseela',
    title: 'Waseela HIMS',
    category: 'Healthcare Solutions',
    description: 'An enterprise-grade Hospital Information Management System connecting clinicians, diagnostic laboratories, automated pharmacy channels, and client billing under an ultra-secure environment.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    stats: '40% reduction in patient intake latency',
    tags: ['React', 'Node.js', 'PostgreSQL', 'HIPAA compliant'],
    challenge: 'Unifying disparate clinical sectors (Reception, Lab, Pharmacy, ICU) with immediate response times while fulfilling strict HIPAA security parameters.',
    solution: 'Designed an event-driven secure API orchestration layer combined with real-time web-sockets, delivering synchronous patient charts tracking and secure multi-tenant portals.'
  },
  {
    id: 'pos-manage',
    title: 'POS Management System',
    category: 'Retail & POS Systems',
    description: 'A lightning-fast point-of-sale ecosystem managing multi-warehouse inventories, automated supplier triggers, barcode operations, and complex offline checkout operations.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    stats: '99.99% operational uptime maintained',
    tags: ['Flutter Web', 'ExpressJS', 'MongoDB', 'IndexedDB'],
    challenge: 'Traditional POS systems fail during broadband blackouts, causing critical sales drops in high-density retail locations.',
    solution: 'Built a proprietary local IndexedDB sync model with automatic background sync triggers that store transactions locally and update the cloud instances automatically upon connection re-establishment.'
  },
  {
    id: 'erp-platform',
    title: 'Enterprise ERP Platform',
    category: 'ERP Systems',
    description: 'Custom-to-the-bone centralized dashboard unifying purchase management, employee salaries, vendor ledgers, inventory depreciation, and direct client invoice pipelines.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    stats: '30% increase in operational staff output',
    tags: ['Next.js Client', 'Tailwind', 'PrestoDB', 'AWS S3'],
    challenge: 'Frustrated corporate users manually cross-referencing multi-tenant Excel documents and outdated desktop programs across multi-regional divisions.',
    solution: 'Engineered a highly aesthetic responsive web interface that parses high-volume transactions, providing intelligent search capabilities, CSV/PDF builder mechanics, and centralized telemetry.'
  },
  {
    id: 'ecom-suite',
    title: 'E-Commerce Solutions Suite',
    category: 'Digital Retail',
    description: 'Bespoke global retail system featuring dynamic translation engines, secure checkouts, elasticsearch indexing, and an intelligent recommendation engine powered by previous orders.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
    stats: '2.1x increase in check-out completions',
    tags: ['React Native', 'GraphQL', 'Docker', 'Redis Engine'],
    challenge: 'Extreme latency during commercial campaign triggers resulting in abandoned customer carts and degraded server response.',
    solution: 'Leveraged edge caching combined with dynamic GraphQL queries, decreasing total content paint times and shielding system resources under spike loads.'
  },
  {
    id: 'custom-business',
    title: 'Custom Business Application',
    category: 'Bespoke Solutions',
    description: 'Customized web portal specialized in automated client onboarding, cloud file storage, document review tracking, and electronic signature support.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    stats: '100% bespoke corporate workflow alignment',
    tags: ['React Client', 'TypeScript', 'Express', 'JWT Auth'],
    challenge: 'Third-party tools imposed strict constraints on proprietary business logic and client privacy demands.',
    solution: 'Crafted a scalable server structure accompanied by client-side document renders and audit track trails for military-grade operational tracking.'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2021',
    title: 'Corporate Incorporation',
    description: 'TSquare Innovations was incorporated by seasoned entrepreneurs to deliver elite digital solutions.'
  },
  {
    year: '2022',
    title: 'Healthcare Breakthrough',
    description: 'Crafted Waseela HIMS, a complete clinical management solution that is currently powering state hospitals.'
  },
  {
    year: '2023',
    title: 'ERP & Global Delivery',
    description: 'Launched custom modular ERP systems, scaling workflow efficiency across high-profile multinational corporate structures.'
  },
  {
    year: '2024',
    title: 'AI & Automation Hub',
    description: 'Establised a dedicated AI Research Division specializing in bespoke predictive analytics models and natural language helpers.'
  },
  {
    year: '2025-2026',
    title: 'Global Scale & Tech Excellence',
    description: 'Broadening reach with client networks in North America, GCC, and Southeast Asia, pushing modern boundaries of digital craftsmanship.'
  }
];

export const TECHNOLOGIES: TechItem[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS Cloud', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sarah-j',
    name: 'Sarah Jenkins',
    role: 'Chief Operations Officer',
    company: 'Apex Clinicals',
    content: 'TSquare Innovations completely revolutionized our patient-care pipeline with Waseela HIMS. Patient intake latency dropped by 40% and our clinical staff can focus entirely on diagnostics. Their ongoing maintenance is second to none.',
    rating: 5
  },
  {
    id: 'michael-c',
    name: 'Michael Chen',
    role: 'Founder & CEO',
    company: 'RetailFlow Global',
    content: 'The custom POS application handles high-octane checkout scenarios flawlessly. When we experienced a physical broadband failure, our POS transitioned offline natively, securing our daily sales seamlessly. They are elite.',
    rating: 5
  },
  {
    id: 'sophia-am',
    name: 'Sophia Al-Mansoor',
    role: 'VP of Operations',
    company: 'GlobalLogix Logistics',
    content: 'Our custom enterprise ERP solved a decade of cross-regional invoice tracking and HR coordination issues. TSquare is not a typical vendor—they are high-caliber architecture partners deeply committed to technical excellence.',
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    description: 'We diagnose your workflow bottlenecks, analyze security targets, and draft detailed software blueprints.',
    points: ['Enterprise consulting', 'Technical architecture draft', 'HIPAA/GDPR security review', 'Scope blueprint validation']
  },
  {
    step: '02',
    title: 'UI/UX Design Concept',
    description: 'We craft high-fidelity mockups, premium interactive prototypes, and unified design languages matching your brand.',
    points: ['User journey wireframes', 'Modular high-fidelity layout', 'Dynamic interactive clicks', 'Design review feedback sessions']
  },
  {
    step: '03',
    title: 'Engineering & QA Testing',
    description: 'Writing high-efficiency, fully modular source code with strict unit testing and parallel quality checks.',
    points: ['Full-stack modular code', 'CI/CD pipeline triggers', 'Extreme load tests', 'Type safety compliance check']
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description: 'Initiating safe zero-downtime cutover migrations, full team education, and proactive 24/7 technical help.',
    points: ['Cloud-native server release', 'Automated security auditing', 'Corporate team training', 'Continuous ongoing maintenance']
  }
];
