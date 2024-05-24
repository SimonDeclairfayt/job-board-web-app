export function getTimeSince(dateString) {
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = now - then;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `Il y a ${days} jours`;
  } else {
    return "Moins d'une journée";
  }
}
