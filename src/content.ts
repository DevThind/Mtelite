export const contactEmail = 'Mtelitebookkeeping@gmail.com';

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Process', href: '#process' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
];

export const serviceOptions = [
  'Monthly Bookkeeping',
  'Bank & Credit Card Reconciliation',
  'Catch-Up & Clean-Up',
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const services: { title: ServiceOption; description: string; icon: 'ledger' | 'reconcile' | 'refresh' }[] = [
  {
    title: 'Monthly Bookkeeping',
    description: 'Keep day-to-day transactions organised with steady, regular bookkeeping support.',
    icon: 'ledger',
  },
  {
    title: 'Bank & Credit Card Reconciliation',
    description: 'Match records with statements and bring discrepancies into focus.',
    icon: 'reconcile',
  },
  {
    title: 'Catch-Up & Clean-Up',
    description: 'Make progress on overdue records and bring disorganised books back into order.',
    icon: 'refresh',
  },
];

export const process = [
  {
    number: '01',
    title: 'Tell Us About Your Business.',
    description: 'Share where your bookkeeping stands and what you would like to feel clearer about.',
  },
  {
    number: '02',
    title: 'Agree on the Support You Need.',
    description: 'We discuss the records involved and shape a practical scope of work together.',
  },
  {
    number: '03',
    title: 'Get Your Books Organised.',
    description: 'With an agreed approach in place, your records can become easier to follow and maintain.',
  },
];

export const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Email us directly or use the enquiry form to prepare an email with a little context about your business. We will start by discussing your records, priorities, and the support you need.',
  },
  {
    question: 'What if I already have bookkeeping records?',
    answer: 'Existing records are a useful starting point. We can discuss how they are currently kept and what you would like help organising or reviewing.',
  },
  {
    question: 'Can you help if I am behind on my bookkeeping?',
    answer: 'Yes. Catch-up and clean-up support helps bring overdue or disorganised records back into order. We will discuss how much needs attention and agree on the scope before getting started.',
  },
  {
    question: 'How is the scope of work decided?',
    answer: 'We start with your current records and goals, then agree on the tasks and level of ongoing support before work begins.',
  },
];
