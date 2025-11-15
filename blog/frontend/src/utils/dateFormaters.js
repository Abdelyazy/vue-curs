export const formatDate = (dateStreing, options) => {
  const date = new Date(dateStreing)

  const settings = options || {
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  }

  return date.toLocaleDateString('ru-RU', settings)
}
