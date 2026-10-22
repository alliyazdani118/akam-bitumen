/**
 * FAQ entries and the small legal pages.
 *
 * The answers describe how this site is built and how enquiries are handled.
 * They deliberately avoid claims about certifications, approvals or audit
 * results, which we have no verified information for.
 */

export const faqItems = [
  {
    id: 'product-information',
    question: 'What product information can you provide before an order?',
    answer:
      'For each enquiry we confirm the grade or specification, the packaging format, the volume band and the delivery point. Written confirmation is issued before any commitment, and the same specification is referenced on the shipping documentation so the receiving site can check it on arrival.',
  },
  {
    id: 'shipping-information',
    question: 'How are shipments planned and delivered?',
    answer:
      'Deliveries are planned against the date the receiving site needs the material rather than a fixed dispatch calendar. We confirm the handling arrangement (drums, bags or bulk), the delivery point and the documentation needed on arrival, then keep the customer updated as the shipment is prepared and dispatched. Cross-border consignments include the export documentation package.',
  },
  {
    id: 'order-quantities',
    question: 'Is there a minimum order quantity?',
    answer:
      'Minimum quantities depend on the grade, the packaging format and the destination. Small trial consignments are assessed case by case, and repeat or volume-based arrangements are set up for customers with regular demand.',
  },
  {
    id: 'samples',
    question: 'Can we request samples or documentation first?',
    answer:
      'Yes. Send us the specification you are working to and the application, and we will confirm what can be supplied against it. Documentation that accompanies a shipment can be reviewed in advance of the first order.',
  },
  {
    id: 'quoting',
    question: 'How do I request a quote?',
    answer:
      'Use the request form on the contact page, email us, or call. Quotes are prepared against a confirmed specification, volume and delivery point so the terms you receive match what will actually be supplied.',
  },
  {
    id: 'newsletter-data',
    question: 'What happens to the details I submit on this website?',
    answer:
      'Newsletter subscriptions are stored in this site’s own database so we can send the updates you asked for. Enquiry details are stored for the purpose of answering your enquiry. Details are not sold or shared with third parties, and you can ask for them to be removed at any time.',
  },
];

export const infoPages = {
  'privacy-policy': {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'This policy explains what this website collects, why it is collected, and how you can ask for it to be removed.',
    notice:
      'Placeholder policy text for this website. It should be reviewed and finalised before the site is used publicly.',
    sections: [
      {
        heading: 'What this website collects',
        body: [
          'Newsletter subscriptions: the email address you submit through the newsletter form, stored in this site’s own database so the updates you requested can be sent to you.',
          'Enquiry details: the name, email address, phone number, company and message you submit through a contact form, stored so that your enquiry can be answered.',
          'The site itself does not use advertising trackers.',
        ],
      },
      {
        heading: 'How the information is used',
        body: [
          'Submitted details are used only to respond to your enquiry or to send the newsletter you subscribed to. They are not sold, rented or shared with third parties for marketing.',
        ],
      },
      {
        heading: 'Retention and removal',
        body: [
          'Enquiry records are kept for as long as needed to handle the enquiry and any resulting supply relationship. Newsletter subscriptions are kept until you unsubscribe or ask for removal.',
          'You can request a copy of your details or ask for them to be deleted by contacting us using the details at the bottom of this page.',
        ],
      },
    ],
  },
  'cookie-policy': {
    eyebrow: 'Legal',
    title: 'Cookie Policy',
    intro:
      'How this website uses cookies and similar browser storage, and what you can do about it.',
    notice:
      'Placeholder policy text for this website. It should be reviewed and finalised before the site is used publicly.',
    sections: [
      {
        heading: 'What is stored in your browser',
        body: [
          'This website does not set advertising or analytics cookies. Anything kept in your browser is limited to what the page needs in order to work — for example the state of the mobile menu while you are browsing.',
        ],
      },
      {
        heading: 'Third-party resources',
        body: [
          'Photography and fonts are loaded from external providers. Those providers may receive the request needed to serve the file, including your IP address, in the same way any website request works.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'You can block or delete cookies and site data through your browser settings. Blocking them does not stop you from reading this website; it may reset small interface preferences.',
        ],
      },
    ],
  },
  'terms-of-use': {
    eyebrow: 'Legal',
    title: 'Terms of Use',
    intro:
      'The terms that apply to your use of this website and to the information published on it.',
    notice:
      'Placeholder terms for this website. They should be reviewed and finalised before the site is used publicly.',
    sections: [
      {
        heading: 'Information on this website',
        body: [
          'Product descriptions, service descriptions and figures shown on this website are provided for general information. They are not an offer, and they do not create a supply contract.',
          'Supply terms — specification, volume, price, delivery point and timing — are confirmed in writing for each order.',
        ],
      },
      {
        heading: 'Illustrative content',
        body: [
          'Statistics and testimonials shown on this website are sample content used for layout purposes. They should not be relied on as verified company figures or as verified customer statements.',
        ],
      },
      {
        heading: 'External links',
        body: [
          'Where this website links to an external site, we are not responsible for its content or its practices.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions about these terms can be sent to the contact details published in the footer of this website.',
        ],
      },
    ],
  },
};

export function getInfoPage(slug) {
  return infoPages[slug] ?? null;
}
