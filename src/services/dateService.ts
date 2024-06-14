var abbreviatedMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// Extrair dia, mês e ano
export const formatDate = (date: string) => {
  const dataHoraOriginal = new Date(date);

  let day = dataHoraOriginal.getDate();
  let month = abbreviatedMonths[dataHoraOriginal.getMonth()];
  let year = dataHoraOriginal.getFullYear();

  let formattedDate = day + " " + month + ", " + year;

  return formattedDate;
};
