export default function Clientes({ clientes }) {
  return (
    <section id="clientes">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{clientes.eyebrow}</span>
          <h2>{clientes.titulo}</h2>
          <p>{clientes.texto}</p>
          {clientes.placeholder && (
            <span className="ph-flag">◆ conteúdo de exemplo — substituir pelos clientes reais</span>
          )}
        </div>
        <div className="logo-grid rv">
          {clientes.itens.map((c) => (
            <div className="logo-cell" key={c.nome}>
              <span className="mk">{c.nome}</span>
              <span className="sg">{c.setor}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
