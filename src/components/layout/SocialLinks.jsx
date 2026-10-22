import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { socialLinks } from '../../data/site.js';

const ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

/** Social icons shared by the header strip, the mobile menu and the footer. */
export default function SocialLinks({ className = '', linkClassName = '' }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = ICONS[social.id] ?? Facebook;
        return (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${social.label} (opens in a new tab)`}
              className={`block text-faint transition-colors duration-200 ease-premium hover:text-brand-500 ${linkClassName}`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
