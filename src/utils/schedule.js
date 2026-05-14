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