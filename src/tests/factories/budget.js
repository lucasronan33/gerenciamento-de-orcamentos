export function makeBudget(overrides = {}) {
    return {
        ...overrides,
        basic: {
            code: Date.now(),
            date: '01/01/2001',
            name: 'budget teste',
            status: 'Aprovado',
            time: '10:30',
            validUntil: '01/01/2001',
            timeService: '01:30',
        },
        client: {},
        items: [],
        totals: {},
        conditions: {},
    }
}