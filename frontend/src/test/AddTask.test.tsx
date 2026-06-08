import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import AddTask from '../pages/AddTask'

describe('AddTask', () => {
    it('показывает ошибку если поле названия пустое', async () => {
        render(
            <MemoryRouter>
                <AddTask />
            </MemoryRouter>,
        )
        fireEvent.click(screen.getByText('Отправить'))
        expect(await screen.findByText('Необходимо ввести название')).toBeInTheDocument()
    })

    it("кнопка 'отправить' есть в dom", () => {
        render(
            <MemoryRouter>
                <AddTask />
            </MemoryRouter>,
        )
        expect(screen.getByText('Отправить')).toBeInTheDocument()
    })
})
