const DEFAULT_PHONE = '5511917513230';

export function whatsappLink(phone = DEFAULT_PHONE, message = '') {
  const cleanPhone = String(phone || DEFAULT_PHONE).replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
}

export function whatsappContactTemplate() {
  return [
    'Olá! Gostaria de falar sobre os serviços da Evolutionis.',
    '',
    'Pode me ajudar com mais informações?',
  ].join('\n');
}

export function whatsappQuoteTemplate({
  nome,
  telefone,
  email,
  local,
  servico,
  mensagem,
}) {
  const lines = [
    'Olá! Gostaria de solicitar um orçamento.',
    '',
    'Dados para contato:',
    `Nome: ${nome || '-'}`,
    `Telefone: ${telefone || '-'}`,
    email ? `E-mail: ${email}` : null,
    '',
    'Detalhes da solicitação:',
    `Tipo de local: ${local || '-'}`,
    `Serviço: ${servico || '-'}`,
    mensagem ? `Observação: ${mensagem}` : null,
  ];

  return lines.filter((line) => line !== null).join('\n');
}
