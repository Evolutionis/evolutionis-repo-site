import App from './App';
import PaginaServico from './components/PaginaServico';
import PaginaListaServicos from './components/PaginaListaServicos';
import { paginaPorPathname } from './paginas';

/**
 * Escolhe a página pelo pathname. Sem react-router de propósito: as páginas são
 * documentos separados (um HTML pré-renderizado cada), ligados por <a> comum —
 * não existe navegação interna que justifique a dependência.
 */
export default function Raiz({ pathname, inicial }) {
  const pagina = paginaPorPathname(pathname);
  if (pagina.tipo === 'servico') return <PaginaServico pagina={pagina} inicial={inicial} />;
  if (pagina.tipo === 'lista') return <PaginaListaServicos pagina={pagina} inicial={inicial} />;
  return <App inicial={inicial} />;
}
