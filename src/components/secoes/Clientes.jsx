export default function Clientes({ clientes, assetUrl }) {
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
            <div className={`logo-cell${c.logo ? ' tem-logo' : ''}`} key={c.nome}>
              {/* Enquanto o cliente não tiver logotipo enviado pelo painel, a
                  célula continua mostrando nome e setor em texto — que é como
                  a seção sempre funcionou. O alt leva o nome porque a marca é
                  a informação, não a imagem em si. */}
              {c.logo ? (
                <img
                  className="logo-img"
                  src={assetUrl ? assetUrl(c.logo) : c.logo}
                  alt={c.nome}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <>
                  <span className="mk">{c.nome}</span>
                  <span className="sg">{c.setor}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
