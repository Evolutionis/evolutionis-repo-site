import { useState } from 'react';
import { href } from '../../paginas';

const LINKS = [
  { id: 'operacao', k: 'menu1' },
  { id: 'servicos', k: 'menu2' },
  { id: 'acompanhe', k: 'menu3' },
  { id: 'clientes', k: 'menu4' },
  { id: 'diferenciais', k: 'menu5' },
  { id: 'contato', k: 'menu6' },
];

export default function Nav({ cabecalho, logo, ativo, stuck }) {
  const [aberto, setAberto] = useState(false);
  return (
    <header id="nav" className={stuck ? 'stuck' : undefined}>
      <div className="bar">
        <a href={`${href()}#inicio`} className="logo" aria-label="Evolutionis Serviços — início">
          <img src={logo} alt="Evolutionis Serviços" width="150" height="38" />
        </a>

        <nav className={`links${aberto ? ' open' : ''}`} onClick={() => setAberto(false)}>
          {LINKS.map(({ id, k }) => (
            // As seções vivem na home: fora dela o link precisa levar para lá.
            // Contato é exceção — toda página tem o seu formulário.
            <a key={id} href={id === 'contato' ? '#contato' : `${href()}#${id}`} className={ativo === id ? 'on' : undefined}>
              {cabecalho[k]}
            </a>
          ))}
          <a href="#contato" className="cta-mobile">{cabecalho.textoBotao}</a>
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="#contato" className="btn btn-solid">{cabecalho.textoBotao}</a>
          <button
            className="nav-toggle"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
