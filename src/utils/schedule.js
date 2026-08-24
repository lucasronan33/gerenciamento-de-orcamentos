export function convertHourToDate(hour) {

  const [h, m] =
    hour.split(':')

  const newDate = new Date()

  newDate.setHours(Number(h))
  newDate.setMinutes(Number(m))
  newDate.setSeconds(0)

  return newDate
}

export function validateDay(date) {

  const weekDay =
    new Date(date).getDay()

  return weekDay
}

export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]