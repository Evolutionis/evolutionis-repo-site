import { IconeWhatsApp } from '../Icones';

export default function WhatsAppFloat({ contato, visivel }) {
  const href = `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(
    'Olá! Gostaria de falar sobre os serviços da Evolutionis.'
  )}`;
  return (
    <a id="wa" className={visivel ? 'show' : undefined} href={href}
       target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <span className="wic"><IconeWhatsApp /></span>
      <span className="wtx"><b>Falar no WhatsApp</b><span>resposta rápida</span></span>
    </a>
  );
}
