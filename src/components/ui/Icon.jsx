import {
  Boxes,
  Container,
  Construction,
  Factory,
  Fuel,
  Gauge,
  Leaf,
  Ship,
  ShieldCheck,
  Star,
  Warehouse,
} from 'lucide-react';

/** One registry keeps icon weight and sizing consistent across the site. */
const registry = {
  boxes: Boxes,
  container: Container,
  construction: Construction,
  factory: Factory,
  fuel: Fuel,
  gauge: Gauge,
  leaf: Leaf,
  ship: Ship,
  shield: ShieldCheck,
  star: Star,
  warehouse: Warehouse,
};

export function resolveIcon(name) {
  return registry[name] ?? Factory;
}

export default function Icon({ name, className = '', strokeWidth = 1.6, ...rest }) {
  const Component = resolveIcon(name);
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
