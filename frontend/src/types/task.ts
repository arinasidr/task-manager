export interface Task {
    id: number,
    title: string,
    description?: string,
    priority: 1 | 2 | 3,
    over_date: string,
    over_time?: string,
    status: "pending" | "done"
}

export const PRIORITY_LABEL: Record<number, string>= {
    1: "Низкий",
    2: "Средний",
    3: "Высокий"
}

export const PRIORITY_COLOR: Record<number, "success" | "warning" | "error"> = {
    1: "success",
    2: "warning",
    3: "error"
}