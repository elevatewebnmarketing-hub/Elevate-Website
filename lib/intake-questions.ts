/**
 * Client onboarding questions (sent after the deposit). Wording follows
 * Claude-Motion-Graphics/business/operations/forms.md section B; keep the two in step.
 * The same list renders the public form (/onboarding) and the admin view (/admin/intakes).
 */

export type IntakeFieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'choice';

export interface IntakeField {
  id: string;
  label: string;
  type: IntakeFieldType;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: string[];
}

export interface IntakeSection {
  id: string;
  title: string;
  intro?: string;
  fields: IntakeField[];
}

export const INTAKE_SECTIONS: IntakeSection[] = [
  {
    id: 'basics',
    title: 'Your business',
    fields: [
      { id: 'contactName', label: 'Your name', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp or phone', type: 'tel', required: true, placeholder: '+234 ...' },
      { id: 'businessName', label: 'Business name (as customers know it)', type: 'text', required: true },
      { id: 'legalName', label: 'Registered company name, if different', type: 'text' },
      { id: 'address', label: 'Address, or the areas you serve if you have no premises', type: 'textarea', required: true },
      { id: 'hours', label: 'Opening hours', type: 'text', placeholder: 'Mon–Sat 8am–6pm' },
      { id: 'leadContact', label: 'Who should receive enquiries? (name, email, WhatsApp)', type: 'textarea' },
      { id: 'socials', label: 'Social media links', type: 'textarea', hint: 'Instagram, Facebook, TikTok, LinkedIn: one per line' },
    ],
  },
  {
    id: 'services',
    title: 'What you sell',
    intro: 'Each main service usually becomes its own page, so this is the most important section.',
    fields: [
      {
        id: 'services',
        label: 'Your services, most important first',
        type: 'textarea',
        required: true,
        hint: 'One per line. For each: who it is for, what is included, starting price (optional).',
      },
      { id: 'areas', label: 'Towns, cities or areas you serve', type: 'textarea', required: true, hint: 'One per line' },
    ],
  },
  {
    id: 'proof',
    title: 'Proof',
    intro: 'Real jobs and real reviews are what make visitors call. Only share what you have permission to show.',
    fields: [
      { id: 'jobs', label: '3–5 previous jobs', type: 'textarea', hint: 'What you did, where, and the result. Photos go in the link below.' },
      { id: 'reviews', label: 'Existing reviews or testimonials you have permission to show', type: 'textarea' },
      { id: 'credentials', label: 'Certifications, memberships, years in business, guarantees', type: 'textarea' },
    ],
  },
  {
    id: 'brand',
    title: 'Brand',
    fields: [
      {
        id: 'filesLink',
        label: 'Link to your logo and photos',
        type: 'url',
        hint: 'Google Drive, Dropbox or WeTransfer. Original files, not WhatsApp copies (WhatsApp shrinks them).',
      },
      { id: 'colours', label: 'Brand colours, if you have them', type: 'text' },
      { id: 'likedSites', label: '2–3 websites you like, and why', type: 'textarea' },
    ],
  },
  {
    id: 'goals',
    title: 'Goals',
    fields: [
      {
        id: 'mainAction',
        label: 'What should visitors do first?',
        type: 'choice',
        required: true,
        options: ['Call', 'WhatsApp', 'Fill a form', 'Book online', 'Buy online'],
      },
      {
        id: 'searches',
        label: 'Top 3 searches you want to be found for, in your customers’ words',
        type: 'textarea',
        placeholder: 'e.g. cement blocks Asaba',
      },
      { id: 'competitors', label: 'Competitors you know of (names or websites)', type: 'textarea' },
    ],
  },
  {
    id: 'access',
    title: 'Access',
    intro: 'We never ask for passwords here. We will set up access with you on a call.',
    fields: [
      {
        id: 'domain',
        label: 'Do you already own a domain (web address)?',
        type: 'choice',
        required: true,
        options: ['Yes', 'No, please register one in my name', 'Not sure'],
      },
      { id: 'domainName', label: 'If yes: the domain and where it was bought', type: 'text', placeholder: 'mybusiness.com, bought on ...' },
      {
        id: 'gbp',
        label: 'Do you have a Google Business Profile?',
        type: 'choice',
        options: ['Yes', 'No', 'Not sure'],
        hint: 'If yes, please add hello@elevatewebandmarketing.com as a manager.',
      },
      { id: 'currentSite', label: 'Current website, if any', type: 'url' },
    ],
  },
  {
    id: 'signoff',
    title: 'Sign-off',
    fields: [
      { id: 'approver', label: 'Who approves the website? (name and WhatsApp or email)', type: 'text', required: true },
      { id: 'anythingElse', label: 'Anything else we should know?', type: 'textarea' },
    ],
  },
];

export const INTAKE_FIELDS: IntakeField[] = INTAKE_SECTIONS.flatMap((s) => s.fields);
