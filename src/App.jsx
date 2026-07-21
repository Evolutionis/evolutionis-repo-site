import { useState, useEffect } from 'react';
import { Icon } from './components/Icon';

// Lê o content.json servido junto com o site (na pasta public).
// O backend do CMS sobrescreve este arquivo a cada publicação.
// base relativa: usa import.meta.env.BASE_URL para funcionar em subpastas.
async function loadContent() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}content.json?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao carregar conteúdo');
  return res.json();
}

// Resolve URL de imagem vinda do content.json (ex: "/images/x.jpg").
function imgUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return base + path;
}

export default function App() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContent().then(setContent).catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <div className="loader">Não foi possível carregar o conteúdo.</div>;
  }
  if (!content) {
    return <div className="loader"><div className="spinner" /></div>;
  }

  const { hero = {}, sobre = {}, servicos = {}, contato = {} } = content;

  return (
    <>
      <nav>
        <div className="container">
          <div className="brand">Nova<span>Era</span></div>
          <div className="links">
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        className={`hero ${hero.imagemFundo ? 'has-bg' : ''}`}
        style={hero.imagemFundo ? { backgroundImage: `url(${imgUrl(hero.imagemFundo)})` } : {}}
      >
        <div className="container">
          <span className="eyebrow reveal">Agência Digital</span>
          <h1 className="reveal">{hero.titulo}</h1>
          <p className="reveal">{hero.subtitulo}</p>
          {hero.textoBotao && (
            <a href="#contato" className="btn reveal">
              {hero.textoBotao} <Icon name="Send" size={17} />
            </a>
          )}
        </div>
      </header>

      {/* SOBRE */}
      {(sobre.titulo || sobre.texto) && (
        <section className="block" id="sobre">
          <div className="container">
            <div className="two-col">
              <div>
                <div className="label">Sobre nós</div>
                <h2>{sobre.titulo}</h2>
                <p className="prose">{sobre.texto}</p>
              </div>
              {sobre.imagem ? (
                <img className="block-img" src={imgUrl(sobre.imagem)} alt={sobre.titulo || ''} />
              ) : (
                <div className="img-placeholder">imagem da seção</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SERVIÇOS */}
      {(servicos.titulo || servicos.descricao) && (
        <section className="block" id="servicos">
          <div className="container">
            <div className="label">O que fazemos</div>
            <div className="svc-card">
              {servicos.icone && (
                <div className="svc-icon"><Icon name={servicos.icone} size={30} /></div>
              )}
              <div>
                <h2 style={{ fontSize: 32, marginBottom: 14 }}>{servicos.titulo}</h2>
                <p className="prose">{servicos.descricao}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTATO */}
      <section className="block" id="contato">
        <div className="container">
          <div className="label">Fale conosco</div>
          <h2>Vamos conversar sobre o seu projeto</h2>
          <div className="contact-grid">
            {contato.email && (
              <div className="contact-item">
                <span className="k"><Icon name="Mail" size={15} /> E-mail</span>
                <span className="v">{contato.email}</span>
              </div>
            )}
            {contato.telefone && (
              <div className="contact-item">
                <span className="k"><Icon name="Phone" size={15} /> Telefone</span>
                <span className="v">{contato.telefone}</span>
              </div>
            )}
            {contato.endereco && (
              <div className="contact-item">
                <span className="k"><Icon name="MapPin" size={15} /> Endereço</span>
                <span className="v">{contato.endereco}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} NovaEra. Todos os direitos reservados.</span>
          {contato.iconeRedes && (
            <div className="social">
              <a href="#" aria-label="Redes sociais"><Icon name={contato.iconeRedes} size={20} /></a>
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
