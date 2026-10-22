/**
 * The six service lines. The `summary` strings are the copy shown on the
 * cards; the longer fields feed the individual service pages.
 */
export const services = [
  {
    slug: 'bitumen-supply',
    title: 'Bitumen Supply',
    icon: 'warehouse',
    summary:
      'Reliable supply of quality bitumen grades for road construction, infrastructure, and industrial applications.',
    intro:
      'Bitumen supply is the core of our business. We source penetration grades and cutback grades against confirmed specifications, organise the packaging that suits the receiving site, and keep delivery dates aligned with the construction programme.',
    overview: [
      'We work with refineries and producers to secure consistent grades, then handle the documentation, packing and transport needed to move them to your site. Quantities are confirmed against your schedule rather than a fixed catalogue quantity, so supply can be planned across a multi-phase project.',
      'Each enquiry is reviewed for grade, volume, delivery point and timing. We confirm what can be supplied, at what specification, and when — before any commitment is made.',
    ],
    points: [
      'Penetration grades supplied against confirmed specifications',
      'Drums, bitumen bags and bulk tanker arrangements',
      'Documentation prepared for each shipment',
      'Delivery planning aligned with project phases',
      'Support for repeat and framework supply programmes',
    ],
  },
  {
    slug: 'petroleum-products',
    title: 'Petroleum Products',
    icon: 'fuel',
    summary:
      'Professional sourcing and supply of petroleum products for commercial and industrial customers.',
    intro:
      'We source petroleum-derived products for commercial and industrial buyers, matching each enquiry to a supplier and specification that fits the application.',
    overview: [
      'Requirements differ widely between customers — from process industries needing a defined specification to contractors who need dependable repeat volumes. We review the application, the specification and the commercial terms before recommending a source.',
      'Product is consolidated, documented and shipped with the paperwork the receiving site needs to accept the delivery without delay.',
    ],
    points: [
      'Requirement review before a source is proposed',
      'Specification and documentation handled per order',
      'Consolidated shipments for multi-product orders',
      'Coordination with the receiving facility',
      'Repeat supply arrangements for regular demand',
    ],
  },
  {
    slug: 'industrial-solutions',
    title: 'Industrial Solutions',
    icon: 'factory',
    summary:
      'Practical material supply solutions designed to support demanding industrial operations.',
    intro:
      'For industrial operations, supply reliability matters more than catalogue breadth. We build a straightforward supply arrangement around what your process actually consumes.',
    overview: [
      'We start with the operational requirement: the materials, the volumes, the frequency and the constraints at the receiving site. From there we propose a supply structure that keeps stock available without tying up capital in material you do not need yet.',
      'Where a site needs several material lines, we coordinate them together so deliveries arrive in a usable sequence rather than as unrelated shipments.',
    ],
    points: [
      'Supply structure built around your consumption pattern',
      'Multiple material lines coordinated into one programme',
      'Delivery sequencing matched to site constraints',
      'Single point of contact for order tracking',
      'Documentation and acceptance support at delivery',
    ],
  },
  {
    slug: 'road-construction',
    title: 'Road Construction',
    icon: 'construction',
    summary:
      'Bitumen solutions supporting durable roads, highways, and infrastructure development projects.',
    intro:
      'Road and highway programmes depend on binder arriving on the right day, at the right grade. We plan supply around the paving sequence.',
    overview: [
      'We support contractors and infrastructure programmes with binder grades suited to the specification and the climate, delivered according to the paving schedule.',
      'Where a project runs across multiple sections, deliveries are phased so that binder and aggregate work stay in step.',
    ],
    points: [
      'Binder grades matched to the project specification',
      'Delivery phased to the paving programme',
      'Coordination with site storage and handling capacity',
      'Replenishment planning for long-running sections',
      'Documentation aligned with project requirements',
    ],
  },
  {
    slug: 'export-logistics',
    title: 'Export & Logistics',
    icon: 'ship',
    summary:
      'Coordinated product handling, shipment planning, and logistics support for international trade.',
    intro:
      'Cross-border supply succeeds or fails on paperwork and planning. We handle the commercial handling steps that sit between a supplier and a delivered shipment.',
    overview: [
      'We coordinate packing, terminal handling, shipment planning and the export documentation package, and we keep the customer informed at each stage rather than at the end.',
      'Where several suppliers feed one shipment, consignments are consolidated and reconciled before departure.',
    ],
    points: [
      'Shipment planning against confirmed quantity and timing',
      'Export documentation package per shipment',
      'Consolidation of multiple supplier consignments',
      'Status updates through loading and departure',
      'Support for the receiving port or facility',
    ],
  },
  {
    slug: 'bulk-supply',
    title: 'Bulk Supply',
    icon: 'container',
    summary:
      'Scalable supply arrangements for distributors, contractors, and large-volume industrial buyers.',
    intro:
      'For distributors and large-volume buyers, we structure repeatable bulk supply with agreed terms, so replenishment stops being a negotiation each time.',
    overview: [
      'Bulk arrangements are defined by volume bands, delivery points and review intervals. That structure lets distributors plan stock and lets industrial buyers plan production.',
      'Volumes are reviewed against actual consumption so the arrangement stays practical as demand changes.',
    ],
    points: [
      'Volume-based supply agreements',
      'Scheduled replenishment across the term',
      'Consistent specification between shipments',
      'Periodic review against actual consumption',
      'Commercial terms confirmed in writing',
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) ?? null;
}
