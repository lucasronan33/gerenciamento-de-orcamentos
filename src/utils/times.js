export function getWorkTime({ startTime: [startHour, startMinute], endTime: [endHour, endMinute], stepTime = 30 }) {
    const result = []
    console.log({ startTime: [Number(startHour), Number(startMinute)], endTime: [Number(endHour), Number(endMinute)], stepTime })
    for (let h = Number(startHour); h < Number(endHour); h++) {
        for (let m = [startMinute]; m < 60; m += Number(stepTime)) {
            console.log(h, startHour)
            if (h > Number(endHour) && m > Number(endMinute)) return
            result.push(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
            )
        }

    }
    console.log('result: ', result)
    return result
}