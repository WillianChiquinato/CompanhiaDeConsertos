export default function FormatadorMoeda({ valor }) {
  const formatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  return <span>{formatado}</span>;
}