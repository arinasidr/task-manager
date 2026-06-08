import type { Task } from "../types/task"

const BASE_URL = import.meta.env.VITE_API_URL

export async function getTasks(params: {from_date?: string, to_date?: string, sort?: string}): Promise<Task[]> {
    const q = new URLSearchParams()

    if (params.from_date) q.append("from_date", params.from_date)
    if (params.to_date) q.append("to_date", params.to_date)
    if (params.sort) q.append("sort", params.sort)

    const res = await fetch(`${BASE_URL}/tasks?${q}`)
    return res.json()
}

export async function getToday(): Promise<Task[]> {
    const res = await fetch(`${BASE_URL}/tasks/today`)
    return res.json()
}

export async function getUpcoming(period: "week" | "month"): Promise<Task[]> {
    const q = new URLSearchParams()
    q.append("period", period)

    const res = await fetch(`${BASE_URL}/tasks/upcoming?${q}`)
    return res.json()
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Ошибка сервера")
    }

    return res.json()
}