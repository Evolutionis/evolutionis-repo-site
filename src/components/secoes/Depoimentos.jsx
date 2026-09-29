// Preposições fora: a função nasceu para nome de pessoa ("Marina R." -> MR),
// mas quem assina um depoimento também pode ser a empresa, e aí elas aparecem.
// Sem este filtro "Flores de Lago" vira FD, que parece erro de digitação.
const LIGACOES = new Set(['de', 'do', 'da', 'dos', 'das', 'e']);

const iniciais = (n) =>
  n
    .split(/\s+/)
    .filter((p) => p && !LIGACOES.has(p.toLowerCase()))
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Depoimentos({ depoimentos }) {
  return (
    <section id="depoimentos">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{depoimentos.eyebrow}</span>
          <h2>{depoimentos.titulo}</h2>
          {depoimentos.placeholder && (
            <span className="ph-flag">◆ conteúdo de exemplo — substituir por depoimentos reais</span>
          )}
        </div>
        <div className="dep-grid rv">
          {depoimentos.itens.map((d) => (
            <figure className="dep" key={d.nome}>
              <span className="q" aria-hidden="true">&ldquo;</span>
              <blockquote><p>{d.texto}</p></blockquote>
              <figcaption className="who">
                <span className="av" aria-hidden="true">{iniciais(d.nome)}</span>
                {/* Sem cargo não existe a linha: um <span> vazio ainda ocupa
                    altura pela regra `.who span{display:block}` e desalinha o
                    nome em relação ao avatar. Depoimento assinado só pela
                    empresa é caso normal — nem sempre se sabe quem falou. */}
                <span><b>{d.nome}</b>{d.cargo && <span>{d.cargo}</span>}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
