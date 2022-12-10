function formatDate(date) {
  let year = date.getFullYear()
  let month = months[date.getMonth()]
  let day = date.getDate()

  return `${day}. ${month} ${year}`
}

function getDateFromISO(ISODate) {
  return new Date(ISODate)
}

function formatDateFromISO(ISODate) {
  return formatDate(getDateFromISO(ISODate))
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export { formatDate, getDateFromISO, formatDateFromISO }
