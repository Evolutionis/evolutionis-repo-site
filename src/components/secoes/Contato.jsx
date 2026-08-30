import { useState } from 'react';
import { Icone } from '../Icones';
import { isGoogleMapsUrl } from '../../lib/sanitize';
import {
  whatsappContactTemplate,
  whatsappLink,
  whatsappQuoteTemplate,
} from '../../lib/whatsapp';

export default function Contato({ contato }) {
  const [enviando, setEnviando] = useState(false);

  // O site é estático (build do Vite), então não há backend para receber o POST.
  // Até um serviço de envio ser definido, o formulário monta a mensagem e abre o
  // WhatsApp já preenchido — o canal que a empresa de fato usa. Trocar por um
  // fetch para Formspree/Web3Forms é uma mudança local a esta função.
  function enviar(e) {
    e.preventDefault();
    setEnviando(true);
    const f = new FormData(e.currentTarget);
    const msg = whatsappQuoteTemplate({
      nome: f.get('nome'),
      telefone: f.get('telefone'),
      email: f.get('email'),
      local: f.get('local'),
      servico: f.get('servico'),
      mensagem: f.get('mensagem'),
    });
    window.open(whatsappLink(contato.whatsapp, msg), '_blank', 'noopener');
    setEnviando(false);
  }

  return (
    <section id="contato">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{contato.eyebrow}</span>
          <h2>{contato.titulo}</h2>
          <p>{contato.texto}</p>
        </div>

        <div className="ct-grid">
          <div className="rv">
            <div className="ct-card">
              <a className="ct-row" href={whatsappLink(contato.whatsapp, whatsappContactTemplate())} target="_blank" rel="noopener">
                <span className="ic"><Icone nome="telefone" size={17} /></span>
                <span>
                  <span className="lb">WhatsApp · resposta mais rápida</span>
                  <span className="vl">{contato.whatsappVisivel}</span>
                </span>
              </a>
              <a className="ct-row" href={`mailto:${contato.email}`}>
                <span className="ic"><Icone nome="email" size={17} /></span>
                <span>
                  <span className="lb">E-mail</span>
                  <span className="vl">{contato.email}</span>
                </span>
              </a>
              <div className="ct-row">
                <span className="ic"><Icone nome="local" size={17} /></span>
                <span>
                  <span className="lb">Endereço</span>
                  <span className="vl">{contato.endereco}<small>{contato.bairro}</small></span>
                </span>
              </div>
              <div className="ct-row">
                <span className="ic"><Icone nome="relogio" size={17} /></span>
                <span>
                  <span className="lb">Horário</span>
                  <span className="vl">{contato.horario}</span>
                </span>
              </div>
            </div>

            <div className="urg">
              <b><Icone nome="alerta" size={17} strokeWidth={2} /> {contato.urgenciaTitulo}</b>
              <p>{contato.urgenciaTexto}</p>
            </div>

            {isGoogleMapsUrl(contato.mapaEmbed) ? (
              <iframe
                className="mapa"
                src={contato.mapaEmbed}
                title="Localização da Evolutionis Serviços"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // O mapa do Google precisa de script para desenhar; o que não
                // pode é vir acompanhado de allow-same-origin, porque a dupla
                // permite ao quadro sair do sandbox e alcançar a página.
                sandbox="allow-scripts allow-popups"
              />
            ) : (
              <div className="mapa-vazio">
                <span className="mono">[ mapa do Google Maps entra aqui ]</span>
              </div>
            )}
          </div>

          <div className="rv">
            <form onSubmit={enviar}>
              <div className="two">
                <div className="fr">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" name="nome" required placeholder="Seu nome" autoComplete="name" />
                </div>
                <div className="fr">
                  <label htmlFor="telefone">Telefone</label>
                  <input id="telefone" name="telefone" required placeholder="(11) 90000-0000" autoComplete="tel" inputMode="tel" />
                </div>
              </div>
              <div className="fr">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" />
              </div>
              <div className="two">
                <div className="fr">
                  <label htmlFor="local">Tipo de local</label>
                  <select id="local" name="local" defaultValue="Condomínio">
                    <option>Condomínio</option><option>Empresa</option>
                    <option>Indústria</option><option>Outro</option>
                  </select>
                </div>
                <div className="fr">
                  <label htmlFor="servico">Serviço</label>
                  <select id="servico" name="servico" defaultValue="Limpeza profissional">
                    <option>Limpeza profissional</option><option>Paisagismo</option>
                    <option>Controle de pragas</option><option>Mais de um serviço</option>
                  </select>
                </div>
              </div>
              <div className="fr">
                <label htmlFor="mensagem">Como podemos ajudar?</label>
                <textarea id="mensagem" name="mensagem" placeholder="Conte um pouco sobre o local e a necessidade." />
              </div>
              <button type="submit" className="btn btn-solid" disabled={enviando}
                      style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
                Solicitar orçamento gratuito
              </button>
              <p className="form-note">Ao enviar, abrimos o WhatsApp com a sua mensagem pronta.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
