/**
 * Client onboarding questions (sent after the deposit).
 *
 * Everyone answers the common sections. The industry picked in step 1 adds that industry's
 * section, and answers inside a section can open follow-up questions (showIf). So a dental
 * clinic, a photographer and a property developer each get a different, more specific form.
 *
 * The same definitions drive the public form (/onboarding), server validation (/api/intake),
 * the email and the admin view (/admin/intakes).
 * Wording builds on Claude-Motion-Graphics/business/operations/forms.md §B and
 * SEO_Website_AI_Skills/client-intake/BuildForms.gs (the older Google Form).
 */

export type IntakeFieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'choice' | 'multi';

export interface ShowIf {
  field: string;
  /** Show when the answer equals one of these (choice fields). */
  is?: string[];
  /** Show when a multi-select answer includes any of these. */
  includes?: string[];
}

export interface IntakeField {
  id: string;
  label: string;
  type: IntakeFieldType;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: string[];
  showIf?: ShowIf;
}

export interface IntakeSection {
  id: string;
  title: string;
  intro?: string;
  /** Only shown when the industry answer is one of these. */
  industries?: string[];
  fields: IntakeField[];
}

export const MULTI_SEPARATOR = '; ';

export const INDUSTRIES = {
  dental: 'Dental clinic',
  medical: 'Medical clinic, hospital, pharmacy or wellness',
  photo: 'Photographer or videographer',
  realEstate: 'Real estate',
  construction: 'Construction or building materials',
  trades: 'Home services and trades',
  beauty: 'Salon, barber, spa or beauty',
  food: 'Restaurant, café, bakery or catering',
  coach: 'Coach, consultant or personal brand',
  shop: 'Online shop or retail',
  education: 'School, tutoring or training',
  professional: 'Law, accounting or professional firm',
  hospitality: 'Hotel, shortlet or event venue',
  other: 'Other',
} as const;

const I = INDUSTRIES;
const YES_NO = ['Yes', 'No'];
const YES_NO_UNSURE = ['Yes', 'No', 'Not sure'];

export const INTAKE_SECTIONS: IntakeSection[] = [
  /* ------------------------------------------------------------------ common: start */
  {
    id: 'basics',
    title: 'You and your business',
    intro: 'The type of business you pick here decides the next questions, so they fit what you do.',
    fields: [
      { id: 'contactName', label: 'Your name', type: 'text', required: true },
      { id: 'role', label: 'Your role in the business', type: 'text', placeholder: 'Owner, manager, marketing…' },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'WhatsApp or phone', type: 'tel', required: true, placeholder: '+234 …' },
      { id: 'preferredContact', label: 'Best way to reach you', type: 'choice', options: ['WhatsApp', 'Phone call', 'Email'] },
      { id: 'businessName', label: 'Business name (as customers know it)', type: 'text', required: true },
      { id: 'legalName', label: 'Registered company name and number, if different', type: 'text', hint: 'e.g. CAC RC number or Companies House number' },
      { id: 'industry', label: 'What type of business is it?', type: 'choice', required: true, options: Object.values(INDUSTRIES) },
      { id: 'industryOther', label: 'Describe your business in one line', type: 'text', required: true, showIf: { field: 'industry', is: [I.other] } },
      { id: 'started', label: 'Year started and team size', type: 'text', placeholder: '2019, 6 staff' },
      {
        id: 'serviceMode',
        label: 'How do customers get your service?',
        type: 'choice',
        required: true,
        options: ['They come to us', 'We go to them', 'Both', 'Online or remote only'],
      },
      {
        id: 'address',
        label: 'Business address (as it should appear on Google)',
        type: 'textarea',
        required: true,
        showIf: { field: 'serviceMode', is: ['They come to us', 'Both'] },
      },
      { id: 'branches', label: 'Do you have more than one branch or location?', type: 'choice', options: YES_NO },
      { id: 'branchList', label: 'List each branch with its address and phone', type: 'textarea', showIf: { field: 'branches', is: ['Yes'] }, hint: 'Each branch can get its own page and Google profile.' },
      { id: 'hours', label: 'Opening hours', type: 'text', placeholder: 'Mon–Sat 8am–6pm, Sun closed' },
      { id: 'leadContact', label: 'Who should receive enquiries? (name, email, WhatsApp)', type: 'textarea' },
      { id: 'socials', label: 'Social media links', type: 'textarea', hint: 'Instagram, Facebook, TikTok, LinkedIn, YouTube: one per line' },
    ],
  },

  /* ------------------------------------------------------------------ industry sections */
  {
    id: 'dental',
    title: 'Your dental practice',
    industries: [I.dental],
    intro: 'Health pages need care: we only publish what you confirm, and never promise results.',
    fields: [
      {
        id: 'dentalTreatments',
        label: 'Treatments you offer',
        type: 'multi',
        required: true,
        options: ['Check-ups and cleaning', 'Fillings', 'Root canal', 'Extractions', 'Braces and aligners', 'Implants', 'Crowns and bridges', 'Dentures', 'Whitening', 'Veneers and cosmetic', 'Children’s dentistry', 'Emergency care', 'Gum treatment', 'Other'],
      },
      { id: 'dentalTreatmentsOther', label: 'Other treatments', type: 'text', showIf: { field: 'dentalTreatments', includes: ['Other'] } },
      { id: 'dentalTop', label: 'Which 3 treatments do you most want more patients for?', type: 'textarea', hint: 'These get their own pages first.' },
      { id: 'dentalTeam', label: 'Dentists and specialists: names, qualifications, registration numbers', type: 'textarea', hint: 'e.g. MDCN (Nigeria) or GDC (UK) number. Shown on the team page to build trust.' },
      { id: 'dentalEmergency', label: 'Do you see emergency patients?', type: 'choice', options: ['Same day', 'Next day', 'No'] },
      { id: 'dentalInsurance', label: 'HMOs, insurance or payment plans you accept', type: 'textarea' },
      { id: 'dentalPrices', label: 'Can we show prices or “from” prices?', type: 'choice', options: ['Yes, full prices', 'Yes, “from” prices', 'No, ask for a consultation'] },
      { id: 'dentalTech', label: 'Equipment or technology worth mentioning', type: 'textarea', placeholder: 'Digital X-ray, intraoral scanner, sedation…' },
      { id: 'dentalBeforeAfter', label: 'Do you have before-and-after photos with written patient consent?', type: 'choice', options: YES_NO_UNSURE },
      { id: 'dentalBooking', label: 'How do patients book today?', type: 'choice', options: ['Phone or WhatsApp', 'Walk-in', 'Online booking system', 'Mix'] },
      { id: 'dentalBookingTool', label: 'Which booking system?', type: 'text', showIf: { field: 'dentalBooking', is: ['Online booking system', 'Mix'] } },
    ],
  },
  {
    id: 'medical',
    title: 'Your clinic or health service',
    industries: [I.medical],
    intro: 'Health pages need care: we only publish what you confirm, and never promise results.',
    fields: [
      { id: 'medType', label: 'What are you?', type: 'choice', required: true, options: ['Clinic or hospital', 'Pharmacy', 'Laboratory or diagnostics', 'Physiotherapy', 'Mental health', 'Wellness or fitness', 'Other'] },
      { id: 'medServices', label: 'Services and specialties, most important first', type: 'textarea', required: true },
      { id: 'medTeam', label: 'Doctors and specialists: names, qualifications, registration numbers', type: 'textarea', hint: 'e.g. MDCN, PCN, MRTB (Nigeria) or GMC (UK).' },
      { id: 'medHours', label: 'Do you offer 24-hour or emergency care?', type: 'choice', options: YES_NO },
      { id: 'medInsurance', label: 'HMOs or insurance you accept', type: 'textarea' },
      { id: 'medOnline', label: 'Do you offer online consultations?', type: 'choice', options: YES_NO },
      { id: 'medPharmacyDelivery', label: 'Do you deliver medication? Where?', type: 'text', showIf: { field: 'medType', is: ['Pharmacy'] } },
      { id: 'medTests', label: 'Main tests you run and turnaround times', type: 'textarea', showIf: { field: 'medType', is: ['Laboratory or diagnostics'] } },
      { id: 'medFacilities', label: 'Facilities worth mentioning', type: 'textarea', placeholder: 'Theatre, ICU, scan, lab on site, parking…' },
    ],
  },
  {
    id: 'photo',
    title: 'Your photography or video work',
    industries: [I.photo],
    fields: [
      {
        id: 'photoTypes',
        label: 'What do you shoot?',
        type: 'multi',
        required: true,
        options: ['Weddings', 'Portraits and families', 'Newborn and maternity', 'Corporate and headshots', 'Events', 'Product and commercial', 'Real estate', 'Fashion and editorial', 'Video and film', 'Drone', 'Other'],
      },
      { id: 'photoTop', label: 'Which type of shoot do you most want more of?', type: 'text', required: true },
      { id: 'photoStyle', label: 'Your style in 3 words', type: 'text', placeholder: 'Bright, candid, editorial' },
      { id: 'photoPackages', label: 'Typical packages: hours, number of images or minutes of film, turnaround, price', type: 'textarea' },
      { id: 'photoTravel', label: 'Where do you work?', type: 'choice', options: ['My city only', 'Anywhere in the country', 'Internationally too'] },
      { id: 'photoVenues', label: 'Venues or locations you shoot at often', type: 'textarea', hint: 'Venue names help you show up in local searches.', showIf: { field: 'photoTypes', includes: ['Weddings', 'Events', 'Portraits and families'] } },
      { id: 'photoStudio', label: 'Do you have a studio people can visit?', type: 'choice', options: YES_NO },
      { id: 'photoGallery', label: 'Client gallery or proofing platform you use', type: 'text', placeholder: 'Pixieset, Pic-Time, Google Drive…' },
      { id: 'photoBooking', label: 'Do clients pay a booking deposit?', type: 'choice', options: YES_NO },
      { id: 'photoPortfolio', label: 'Link to your best 30–60 photos or videos', type: 'url', hint: 'Full-size files, not screenshots.' },
    ],
  },
  {
    id: 'realEstate',
    title: 'Your real estate business',
    industries: [I.realEstate],
    fields: [
      {
        id: 'reRole',
        label: 'What do you do?',
        type: 'multi',
        required: true,
        options: ['Sell or let property for owners (agent)', 'Develop and build property', 'Manage property for landlords', 'Sell land', 'Short-let or rental homes', 'Property investment'],
      },
      { id: 'reAreas', label: 'Areas, estates or neighbourhoods you cover', type: 'textarea', required: true, hint: 'Each area can become a guide page.' },
      { id: 'reTypes', label: 'Property types', type: 'multi', options: ['Land', 'Houses', 'Flats and apartments', 'Luxury homes', 'Commercial', 'Off-plan', 'Shortlets'] },
      { id: 'reListingsCount', label: 'Roughly how many listings do you have at a time?', type: 'choice', options: ['Under 10', '10–50', '50+'] },
      { id: 'reListingsUpdate', label: 'How should listings be updated?', type: 'choice', options: ['We add them ourselves in an admin panel', 'We send them to you', 'From a property portal feed', 'Not sure'] },
      { id: 'reTitles', label: 'Title documents you usually have, and how buyers can verify them', type: 'textarea', placeholder: 'C of O, Governor’s consent, survey plan… verification steps' },
      { id: 'reDiaspora', label: 'Do you sell to buyers abroad (diaspora)?', type: 'choice', options: YES_NO },
      { id: 'reDiasporaHow', label: 'How do buyers abroad inspect and pay?', type: 'textarea', showIf: { field: 'reDiaspora', is: ['Yes'] }, placeholder: 'Video inspections, escrow, lawyer, payment plans…' },
      { id: 'reDevProjects', label: 'Current and past projects: name, location, units, stage', type: 'textarea', showIf: { field: 'reRole', includes: ['Develop and build property'] } },
      { id: 'reDevPlans', label: 'Do you offer off-plan sales or payment plans? Give the terms', type: 'textarea', showIf: { field: 'reRole', includes: ['Develop and build property'] } },
      { id: 'reMgmt', label: 'Property management: units managed and what is included', type: 'textarea', showIf: { field: 'reRole', includes: ['Manage property for landlords'] } },
      { id: 'reTrack', label: 'Track record we can publish (properties sold, years, notable deals)', type: 'textarea', hint: 'Only real numbers you are happy to show.' },
      { id: 'reLicence', label: 'Memberships or licences', type: 'text', placeholder: 'ESVARBON, NIESV, REDAN, Propertymark…' },
    ],
  },
  {
    id: 'construction',
    title: 'Your construction or building materials business',
    industries: [I.construction],
    fields: [
      {
        id: 'conType',
        label: 'What do you do?',
        type: 'multi',
        required: true,
        options: ['Supply building materials', 'Build houses', 'Commercial or industrial building', 'Renovation and finishing', 'Roads and civil works', 'Architecture and design', 'Interior finishing', 'Project management'],
      },
      { id: 'conMaterials', label: 'Materials you sell, with sizes and units', type: 'textarea', required: true, showIf: { field: 'conType', includes: ['Supply building materials'] }, placeholder: '6" and 9" blocks, cement (brands), pavers, kerbs, sand, granite…' },
      { id: 'conDelivery', label: 'Delivery: areas covered, minimum order, delivery cost', type: 'textarea', showIf: { field: 'conType', includes: ['Supply building materials'] } },
      { id: 'conPricesPublic', label: 'Can we show material prices?', type: 'choice', showIf: { field: 'conType', includes: ['Supply building materials'] }, options: ['Yes', 'No, ask for a quote', 'Prices change too often'] },
      { id: 'conProjects', label: 'Projects you have completed: what, where, size, year', type: 'textarea', showIf: { field: 'conType', includes: ['Build houses', 'Commercial or industrial building', 'Renovation and finishing', 'Roads and civil works', 'Interior finishing', 'Project management'] } },
      { id: 'conClients', label: 'Who are your clients?', type: 'multi', options: ['Homeowners', 'Diaspora clients', 'Developers', 'Businesses', 'Government'] },
      { id: 'conSize', label: 'Typical job size or budget range', type: 'text' },
      { id: 'conCerts', label: 'Registrations, certifications and insurance', type: 'textarea', placeholder: 'COREN, CORBON, NIOB, ISO, insurance…' },
      { id: 'conProcess', label: 'Your process from first call to handover', type: 'textarea' },
      { id: 'conStagePhotos', label: 'Do you have photos of projects at different stages?', type: 'choice', options: YES_NO, hint: 'Stage photos are shown as progress, never as the finished building.' },
    ],
  },
  {
    id: 'trades',
    title: 'Your trade or home service',
    industries: [I.trades],
    fields: [
      {
        id: 'tradeServices',
        label: 'What work do you do?',
        type: 'multi',
        required: true,
        options: ['Plumbing', 'Electrical', 'Solar and inverters', 'Air conditioning', 'Roofing', 'Painting', 'Cleaning', 'Fumigation and pest control', 'Landscaping', 'Carpentry and furniture', 'Tiling and flooring', 'Security and CCTV', 'Generator repair', 'Other'],
      },
      { id: 'tradeOther', label: 'Other services', type: 'text', showIf: { field: 'tradeServices', includes: ['Other'] } },
      { id: 'tradeCustomers', label: 'Who are your customers?', type: 'choice', options: ['Homeowners', 'Businesses', 'Both', 'Landlords and estates'] },
      { id: 'tradeEmergency', label: 'Do you take emergency or same-day jobs?', type: 'choice', options: YES_NO },
      { id: 'tradeQuotes', label: 'Do you give free quotes or inspections?', type: 'choice', options: YES_NO },
      { id: 'tradeCerts', label: 'Certifications, licences, insurance, warranties', type: 'textarea' },
      { id: 'tradeBrands', label: 'Brands you install or are approved for', type: 'textarea' },
      { id: 'tradeResponse', label: 'How fast do you usually respond?', type: 'text', placeholder: 'Within 2 hours' },
    ],
  },
  {
    id: 'beauty',
    title: 'Your salon, barber or beauty business',
    industries: [I.beauty],
    fields: [
      { id: 'beautyType', label: 'What do you offer?', type: 'multi', required: true, options: ['Hair (women)', 'Barbering', 'Braids and wigs', 'Nails', 'Lashes and brows', 'Makeup', 'Skincare and facials', 'Massage and spa', 'Bridal', 'Training academy'] },
      { id: 'beautyMenu', label: 'Service menu with prices (or a link to it)', type: 'textarea', required: true },
      { id: 'beautyBooking', label: 'How do clients book?', type: 'choice', options: ['Walk-in', 'Appointment by WhatsApp or call', 'Online booking', 'Mix'] },
      { id: 'beautyHome', label: 'Do you offer home service?', type: 'choice', options: YES_NO },
      { id: 'beautyHomeAreas', label: 'Home service areas and extra charge', type: 'text', showIf: { field: 'beautyHome', is: ['Yes'] } },
      { id: 'beautyTeam', label: 'Stylists or therapists to feature', type: 'textarea' },
      { id: 'beautyProducts', label: 'Products you use or sell', type: 'textarea' },
      { id: 'beautyAcademy', label: 'Training courses: length, price, start dates', type: 'textarea', showIf: { field: 'beautyType', includes: ['Training academy'] } },
    ],
  },
  {
    id: 'food',
    title: 'Your food business',
    industries: [I.food],
    fields: [
      { id: 'foodType', label: 'What are you?', type: 'multi', required: true, options: ['Restaurant', 'Café', 'Bakery', 'Fast food', 'Catering for events', 'Small chops and pastries', 'Food delivery only', 'Bar or lounge'] },
      { id: 'foodMenu', label: 'Menu with prices (or a link or photo of it)', type: 'textarea', required: true },
      { id: 'foodOrder', label: 'How can customers order?', type: 'multi', options: ['Dine in', 'Takeaway', 'Our own delivery', 'Chowdeck, Glovo or similar', 'WhatsApp orders', 'Pre-orders'] },
      { id: 'foodPlatforms', label: 'Links to your delivery-app pages', type: 'textarea', showIf: { field: 'foodOrder', includes: ['Chowdeck, Glovo or similar'] } },
      { id: 'foodReservations', label: 'Do you take table reservations?', type: 'choice', options: YES_NO, showIf: { field: 'foodType', includes: ['Restaurant', 'Café', 'Bar or lounge'] } },
      { id: 'foodCatering', label: 'Catering: event sizes, minimum order, how far ahead to book', type: 'textarea', showIf: { field: 'foodType', includes: ['Catering for events', 'Small chops and pastries'] } },
      { id: 'foodSpecial', label: 'Signature dishes or what you are known for', type: 'textarea' },
      { id: 'foodDiet', label: 'Dietary options', type: 'multi', options: ['Vegetarian', 'Vegan', 'Halal', 'Gluten-free', 'None'] },
    ],
  },
  {
    id: 'coach',
    title: 'Your coaching or consulting',
    industries: [I.coach],
    fields: [
      { id: 'coachType', label: 'What kind?', type: 'multi', required: true, options: ['Business', 'Career', 'Life', 'Fitness and wellness', 'Relationship', 'Finance', 'Speaking and training', 'Consulting', 'Other'] },
      { id: 'coachTransformation', label: 'Where do clients start, and where do they end up after working with you?', type: 'textarea', required: true },
      { id: 'coachFormat', label: 'How do you deliver?', type: 'multi', options: ['1:1', 'Group', 'Online course', 'Membership', 'Workshops', 'In person', 'Online'] },
      { id: 'coachPrograms', label: 'Programmes: name, length, price', type: 'textarea' },
      { id: 'coachMethod', label: 'Your method or framework, if it has a name', type: 'text' },
      { id: 'coachCreds', label: 'Certifications, training and experience', type: 'textarea' },
      { id: 'coachCall', label: 'Do you offer a free discovery call?', type: 'choice', options: YES_NO },
      { id: 'coachSpeaking', label: 'Talks, media or podcasts you have appeared in', type: 'textarea' },
    ],
  },
  {
    id: 'shop',
    title: 'Your shop',
    industries: [I.shop],
    fields: [
      { id: 'shopWhat', label: 'What do you sell?', type: 'textarea', required: true },
      { id: 'shopCount', label: 'How many products?', type: 'choice', required: true, options: ['Under 20', '20–100', '100–500', '500+'] },
      { id: 'shopVariants', label: 'Do products come in sizes, colours or other options?', type: 'choice', options: YES_NO },
      { id: 'shopChannels', label: 'Where do you sell today?', type: 'multi', options: ['Physical shop', 'Instagram', 'WhatsApp', 'Jumia or Konga', 'Amazon or Etsy', 'Existing website'] },
      { id: 'shopPayments', label: 'How should customers pay online?', type: 'multi', options: ['Paystack', 'Flutterwave', 'Bank transfer', 'Pay on delivery', 'Stripe or PayPal (abroad)', 'Not sure'] },
      { id: 'shopDelivery', label: 'Delivery: areas, couriers, prices, how long it takes', type: 'textarea', required: true },
      { id: 'shopInternational', label: 'Do you ship abroad?', type: 'choice', options: YES_NO },
      { id: 'shopStock', label: 'Who will add products and update stock?', type: 'choice', options: ['Us, in an admin panel', 'Elevate, on a care plan', 'Not sure'] },
      { id: 'shopReturns', label: 'Your returns and refunds policy', type: 'textarea' },
    ],
  },
  {
    id: 'education',
    title: 'Your school or training',
    industries: [I.education],
    fields: [
      { id: 'eduType', label: 'What are you?', type: 'choice', required: true, options: ['Nursery or primary school', 'Secondary school', 'Tutoring or exam prep', 'Vocational or skills training', 'Online courses', 'University or college', 'Other'] },
      { id: 'eduPrograms', label: 'Classes, levels or courses offered', type: 'textarea', required: true },
      { id: 'eduAdmissions', label: 'Admissions: when, requirements, steps', type: 'textarea' },
      { id: 'eduFees', label: 'Can we show fees?', type: 'choice', options: ['Yes', 'No, on request'] },
      { id: 'eduAccreditation', label: 'Accreditation, approvals or exam bodies', type: 'textarea', placeholder: 'Ministry approval, WAEC, Cambridge, NBTE…' },
      { id: 'eduFacilities', label: 'Facilities and extracurriculars', type: 'textarea', showIf: { field: 'eduType', is: ['Nursery or primary school', 'Secondary school', 'University or college'] } },
      { id: 'eduOnline', label: 'Do students need a login area (results, lessons, payments)?', type: 'choice', options: YES_NO_UNSURE },
    ],
  },
  {
    id: 'professional',
    title: 'Your firm',
    industries: [I.professional],
    fields: [
      { id: 'proType', label: 'What kind of firm?', type: 'choice', required: true, options: ['Law', 'Accounting and tax', 'Audit', 'HR and recruitment', 'Insurance', 'Business consulting', 'Other'] },
      { id: 'proAreas', label: 'Practice areas or services, most important first', type: 'textarea', required: true },
      { id: 'proIndustries', label: 'Industries or types of clients you serve', type: 'textarea' },
      { id: 'proTeam', label: 'Partners and key staff: names, qualifications, memberships', type: 'textarea', placeholder: 'NBA, ICAN, CITN, ACCA, SRA…' },
      { id: 'proConsult', label: 'First consultation', type: 'choice', options: ['Free', 'Paid', 'Depends on the case'] },
      { id: 'proRules', label: 'Any rules from your professional body about advertising we must follow?', type: 'textarea', hint: 'Some bodies restrict testimonials or comparisons.' },
    ],
  },
  {
    id: 'hospitality',
    title: 'Your hotel, shortlet or venue',
    industries: [I.hospitality],
    fields: [
      { id: 'hosType', label: 'What do you run?', type: 'multi', required: true, options: ['Hotel', 'Shortlet apartments', 'Guest house', 'Event hall or venue', 'Resort', 'Co-working'] },
      { id: 'hosUnits', label: 'Rooms, apartments or halls: types, capacity, price per night or event', type: 'textarea', required: true },
      { id: 'hosAmenities', label: 'Amenities', type: 'textarea', placeholder: 'Power 24/7, pool, Wi-Fi, parking, gym, airport pickup…' },
      { id: 'hosPlatforms', label: 'Where are you listed?', type: 'multi', options: ['Booking.com', 'Airbnb', 'Hotels.ng', 'Instagram', 'None'] },
      { id: 'hosDirect', label: 'Do you want guests to book and pay directly on the website?', type: 'choice', options: YES_NO_UNSURE },
      { id: 'hosEvents', label: 'Events: capacity, packages, what is included', type: 'textarea', showIf: { field: 'hosType', includes: ['Event hall or venue', 'Hotel', 'Resort'] } },
      { id: 'hosPolicies', label: 'Check-in/out times, caution fee, cancellation policy', type: 'textarea' },
    ],
  },
  {
    id: 'otherIndustry',
    title: 'Your business',
    industries: [I.other],
    fields: [
      { id: 'otherDetails', label: 'Tell us how your business works, from first contact to finished job', type: 'textarea', required: true },
      { id: 'otherRules', label: 'Any licences, regulations or rules in your industry we should know about?', type: 'textarea' },
    ],
  },

  /* ------------------------------------------------------------------ common: rest */
  {
    id: 'services',
    title: 'What you sell and to whom',
    intro: 'Each main service usually becomes its own page, so this is the most important section.',
    fields: [
      { id: 'services', label: 'Your services or products, most important first', type: 'textarea', required: true, hint: 'One per line. For each: who it is for, what is included, starting price (optional).' },
      { id: 'lessOf', label: 'Jobs or customers you want LESS of', type: 'textarea' },
      { id: 'areas', label: 'Towns, cities or areas you serve', type: 'textarea', required: true, hint: 'One per line. Only places you really serve.' },
      { id: 'idealCustomer', label: 'Your ideal customer', type: 'textarea', required: true, hint: 'Who they are, where they are, what they care about.' },
      { id: 'problem', label: 'What problem do you solve for them?', type: 'textarea' },
      { id: 'different', label: 'Why do customers choose you over others?', type: 'textarea', required: true },
      { id: 'faqs', label: 'Questions customers ask you most', type: 'textarea', hint: 'These become the FAQ, which also helps with Google and ChatGPT.' },
    ],
  },
  {
    id: 'proof',
    title: 'Proof',
    intro: 'Real jobs and real reviews are what make visitors call. Only share what you have permission to show.',
    fields: [
      { id: 'jobs', label: '3–5 previous jobs or projects', type: 'textarea', hint: 'What you did, where, and the result. Photos go in the files link later.' },
      { id: 'reviews', label: 'Reviews or testimonials you have permission to show', type: 'textarea' },
      { id: 'reviewPlaces', label: 'Where do customers already review you?', type: 'multi', options: ['Google', 'Facebook', 'Instagram comments', 'Trustpilot', 'Industry sites', 'Nowhere yet'] },
      { id: 'credentials', label: 'Awards, press, memberships, years in business, guarantees', type: 'textarea' },
    ],
  },
  {
    id: 'brand',
    title: 'Look and feel',
    fields: [
      { id: 'filesLink', label: 'Link to your logo and photos', type: 'url', hint: 'Google Drive, Dropbox or WeTransfer. Original files, not WhatsApp copies (WhatsApp shrinks them).' },
      { id: 'hasLogo', label: 'Do you have a logo?', type: 'choice', options: ['Yes', 'No, I need one', 'Yes, but I want a new one'] },
      { id: 'colours', label: 'Brand colours, if you have them', type: 'text' },
      { id: 'tone', label: 'How should the website feel?', type: 'choice', options: ['Friendly and simple', 'Professional and serious', 'Luxury and premium', 'Bold and energetic'] },
      { id: 'likedSites', label: '2–3 websites you like, and why', type: 'textarea' },
      { id: 'competitors', label: 'Competitors you know of (names or websites)', type: 'textarea' },
    ],
  },
  {
    id: 'goals',
    title: 'Goals and features',
    fields: [
      { id: 'mainAction', label: 'What should visitors do first?', type: 'choice', required: true, options: ['Call', 'WhatsApp', 'Fill a form', 'Book online', 'Buy online'] },
      { id: 'searches', label: 'Top 3 searches you want to be found for, in your customers’ words', type: 'textarea', placeholder: 'e.g. dentist in Wuse, cement blocks Asaba' },
      {
        id: 'features',
        label: 'Features you need',
        type: 'multi',
        options: ['Online booking', 'Take payments or deposits', 'Online shop', 'Quote request form', 'Photo or video gallery', 'Blog or news', 'Listings or catalogue', 'Staff or client login', 'Several languages', 'Newsletter sign-up'],
      },
      { id: 'bookingTool', label: 'Booking: which tool, or what should be bookable?', type: 'textarea', showIf: { field: 'features', includes: ['Online booking'] } },
      { id: 'paymentNeeds', label: 'Payments: what will people pay for, and in which currencies?', type: 'textarea', showIf: { field: 'features', includes: ['Take payments or deposits', 'Online shop'] } },
      { id: 'languages', label: 'Which languages?', type: 'text', showIf: { field: 'features', includes: ['Several languages'] } },
      { id: 'contentWriter', label: 'Who writes the website text?', type: 'choice', options: ['Elevate drafts, I approve', 'I write it', 'Mix'] },
    ],
  },
  {
    id: 'access',
    title: 'Access',
    intro: 'Please do not put passwords here. We set up access with you on a call.',
    fields: [
      { id: 'domain', label: 'Do you already own a domain (web address)?', type: 'choice', required: true, options: ['Yes', 'No, please register one in my name', 'Not sure'] },
      { id: 'domainName', label: 'The domain and where it was bought', type: 'text', placeholder: 'mybusiness.com, bought on …', showIf: { field: 'domain', is: ['Yes'] } },
      { id: 'domainIdeas', label: 'Domain names you would like', type: 'text', showIf: { field: 'domain', is: ['No, please register one in my name'] } },
      { id: 'businessEmail', label: 'Do you want email addresses like you@yourbusiness.com?', type: 'choice', options: YES_NO_UNSURE },
      { id: 'gbp', label: 'Do you have a Google Business Profile?', type: 'choice', options: YES_NO_UNSURE },
      { id: 'gbpLink', label: 'Link to it', type: 'url', hint: 'Then add hello@elevatewebandmarketing.com as a manager.', showIf: { field: 'gbp', is: ['Yes'] } },
      { id: 'currentSite', label: 'Current website, if any', type: 'url' },
      { id: 'currentSiteKeep', label: 'What should we keep from the current website?', type: 'textarea', showIf: { field: 'currentSite', is: [] } },
    ],
  },
  {
    id: 'signoff',
    title: 'Timeline and sign-off',
    fields: [
      { id: 'deadline', label: 'Is there a date the website must be live by? Why?', type: 'text', placeholder: 'e.g. 1 March, for our grand opening' },
      { id: 'approver', label: 'Who approves the website? (name and WhatsApp or email)', type: 'text', required: true },
      { id: 'anythingElse', label: 'Anything else we should know?', type: 'textarea' },
    ],
  },
];

export const INTAKE_FIELDS: IntakeField[] = INTAKE_SECTIONS.flatMap((s) => s.fields);

export function splitMulti(value: string | undefined): string[] {
  return value ? value.split(MULTI_SEPARATOR).filter(Boolean) : [];
}

export function isFieldVisible(field: IntakeField, values: Record<string, string>): boolean {
  const cond = field.showIf;
  if (!cond) return true;
  const answer = values[cond.field] ?? '';
  // is: [] means "shown once the other question has any answer".
  if (cond.is) return cond.is.length === 0 ? !!answer.trim() : cond.is.includes(answer);
  if (cond.includes) return splitMulti(answer).some((a) => cond.includes!.includes(a));
  return true;
}

export function visibleSections(values: Record<string, string>): IntakeSection[] {
  return INTAKE_SECTIONS.filter((s) => !s.industries || s.industries.includes(values.industry ?? ''));
}

export function visibleFields(section: IntakeSection, values: Record<string, string>): IntakeField[] {
  return section.fields.filter((f) => isFieldVisible(f, values));
}
