import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('http://localhost:3001/api/budgets', async () => {
        return HttpResponse.json({
            success: true,
        })
    }),
]