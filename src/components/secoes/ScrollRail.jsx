const SECOES = [
  ['inicio', 'Início'],
  ['operacao', 'A operação'],
  ['servicos', 'Serviços'],
  ['acompanhe', 'Acompanhamento'],
  ['clientes', 'Clientes'],
  ['diferenciais', 'Diferenciais'],
  ['depoimentos', 'Depoimentos'],
  ['contato', 'Contato'],
];

export default function ScrollRail({ ativo }) {
  return (
    <div id="rail" aria-hidden="true">
      {SECOES.map(([id, rotulo]) => (
        <button
          key={id}
          className={ativo === id ? 'on' : undefined}
          tabIndex={-1}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="tag">{rotulo}</span>
          <span className="pip" />
        </button>
      ))}
    </div>
  );
}
