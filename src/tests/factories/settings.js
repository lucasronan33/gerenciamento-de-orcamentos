export function makeSettings(overrides = {}) {
    return {
        data: {
            services: {
                workDays: [0, 1, 2, 3, 4, 5, 6],
                priceHour: 0,
                endHour: '18:00',
                startHour: '08:00',
                stepHour: 30,
                minTimeService: '01:00',
            }
        }
    }
}