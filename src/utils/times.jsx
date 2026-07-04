export function getWorkTime({ startTime: [startHour, startMinute], endTime: [endHour, endMinute], stepTime = 30 }) {
    const result = []
    for (let h = startHour; h <= endHour; h++) {
        for (let m = [startMinute]; m < 60; m += stepTime) {
            if (h > endHour && m > endMinute) return
            result.push(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
            )
        }

    }
    return result
}

export function sanitizeTime(time) {
    const newTime = time.split(':')
    const [a, b] = newTime
    return [Number(a), Number(b)]
}