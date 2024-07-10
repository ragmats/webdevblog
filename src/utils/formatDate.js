// Split MM/DD/YYYY date into parts for better formatting control
export function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${months[month]} ${day}, ${year}`;
  //   return `${month}.${day}.${year}`;
}
