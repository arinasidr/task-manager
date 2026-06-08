import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskCard from '../components/TaskCard'

const mockTask = {
    id: 1,
    title: "Тестовая задача",
    description: "Описание",
    priority: 3 as const,
    over_date: "2024-06-08",
    over_time: "10:00",
    status: "pending" as const
}

describe('TaskCard', () => {
    it("рендерит название задачи", () => {
        render(<TaskCard task={mockTask}/>)
        expect(screen.getByText("Тестовая задача")).toBeInTheDocument()
    })

    it("проверяет строку 'Высокий' для priority 3", () => {
        render(<TaskCard task={mockTask}/>)
        expect(screen.getByText("Высокий")).toBeInTheDocument()
    })

    it("рендерит описание если оно есть", () => {
        render(<TaskCard task={mockTask}/>)
        expect(screen.getByText(/Описание/)).toBeInTheDocument()
    })

    it("НЕ рендерит описание если его НЕТ есть", () => {
        const taskWithoutDescription = { ...mockTask, description: undefined }
        render(<TaskCard task={taskWithoutDescription}/>)
        expect(screen.queryByText("Описание")).not.toBeInTheDocument()
    })

})

