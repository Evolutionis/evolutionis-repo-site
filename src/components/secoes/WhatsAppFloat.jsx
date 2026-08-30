import { IconeWhatsApp } from '../Icones';
import { whatsappContactTemplate, whatsappLink } from '../../lib/whatsapp';

export default function WhatsAppFloat({ contato, visivel }) {
  const href = whatsappLink(contato.whatsapp, whatsappContactTemplate());
  return (
    <a id="wa" className={visivel ? 'show' : undefined} href={href}
       target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <span className="wic"><IconeWhatsApp /></span>
      <span className="wtx"><b>Falar no WhatsApp</b><span>resposta rápida</span></span>
    </a>
  );
}
