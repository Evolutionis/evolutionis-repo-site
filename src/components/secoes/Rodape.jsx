import { Icone } from '../Icones';
import { isHttpsUrl } from '../../lib/sanitize';
import { whatsappContactTemplate, whatsappLink } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';
import { href, paginaDoServico } from '../../paginas';

export default function Rodape({ rodape, contato, logo, servicos }) {
  // Um perfil que não seja https: não vira link. Sem o filtro, um valor como
  // "javascript:..." publicado pelo painel executaria no clique do visitante.
  const redes = [
    { url: rodape.instagram, nome: 'Instagram', icone: 'instagram' },
    { url: rodape.linkedin, nome: 'LinkedIn', icone: 'linkedin' },
    { url: rodape.facebook, nome: 'Facebook', icone: 'facebook' },
  ].filter((r) => isHttpsUrl(r.url));

  return (
    <footer>
      <div className="shell">
        <div className="ft-grid">
          <div>
            <img className="lg" src={logo} alt="Evolutionis Serviços" width="157" height="46" />
            <p className="ab">{rodape.sobre}</p>
            {redes.length > 0 ? (
              <div className="ft-social">
                {redes.map((r) => (
                  <a key={r.nome} href={r.url} target="_blank" rel="noopener" aria-label={r.nome}>
                    <Icone nome={r.icone} size={16} />
                  </a>
                ))}
              </div>
            ) : (
              <span className="ph-flag" style={{ marginTop: 14 }}>◆ redes sociais a definir</span>
            )}
          </div>

          <div>
            <h5>Serviços</h5>
            <ul>
              {/* A mesma lista da home (content.json): serviço novo no painel
                  aparece aqui sozinho; com página própria, o link vai para ela. */}
              {servicos.itens.map((s) => {
                const pagina = paginaDoServico(s.chave);
                return (
                  <li key={s.chave}>
                    <a href={pagina ? href(pagina.caminho) : `${href()}#servicos`}>{s.titulo}</a>
                  </li>
                );
              })}
              <li><a href={href('servicos/')}>Todos os serviços</a></li>
              <li><a href={`${href()}#acompanhe`}>Portal do cliente</a></li>
            </ul>
          </div>

          <div>
            <h5>Contato</h5>
            <ul>
              <li><a href={whatsappLink(contato.whatsapp, whatsappContactTemplate())} target="_blank" rel="noopener"
                     onClick={() => track('clique_whatsapp', { local: 'rodape' })}>{contato.whatsappVisivel}</a></li>
              <li><a href={`mailto:${contato.email}`}
                     onClick={() => track('clique_email', { local: 'rodape' })}>{contato.email}</a></li>
              <li><a href="#contato">{contato.endereco} — {contato.bairro}</a></li>
              <li><a href="#contato">{contato.horario}</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-base">
          <span>{rodape.textoDireitos}</span>
          <span>São Roque · SP</span>
        </div>
      </div>
    </footer>
  );
}
