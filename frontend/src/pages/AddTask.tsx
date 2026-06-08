import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createTask } from '../api/tasks'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

export default function AddTask() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: 2 as 1 | 2 | 3,
        over_date: "",
        over_time: "",
        status: "pending" as const
    })

    const [validateErrors, setValidateErrors] = useState({
        title: "",
        over_date: ""
    })

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const formValidate = () => {
        const newErrors = { title: "", over_date: "" }
        if (!form.title) {
            newErrors.title = "Необходимо ввести название"
        }
        if (!form.over_date) {
            newErrors.over_date = "Необходимо ввести дедлайн"
        }
        setValidateErrors(newErrors)
        return !newErrors.title && !newErrors.over_date
    }

    const handleSubmit = async () => {
        const res = formValidate()
        if (!res) return 
        setIsLoading(true)
        try {
            await createTask(form)
            navigate('/')
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError('Ошибка при входе')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box sx={{ maxWidth: 500, mt: 3 }}>
            <Typography>
                Новая задача
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField fullWidth sx={{ mb: 2 }}
                label="Название"
                value={form.title}
                onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                error={!!validateErrors.title}
                helperText={validateErrors.title}
            />

            <TextField fullWidth sx={{ mb: 2 }}
                label="Описание (необязательно)"
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                multiline
                rows={2}
            />

            <Select fullWidth sx={{ mb: 2 }}
                value={form.priority}
                onChange={e => setForm(prev => ({ ...prev, priority: e.target.value as 1 | 2 | 3 }))}
            >
                <MenuItem value={1}>Низкий</MenuItem>
                <MenuItem value={2}>Средний</MenuItem>
                <MenuItem value={3}>Высокий</MenuItem>
            </Select>

            <TextField fullWidth sx={{ mb: 2 }}
                label="Дата дедлайна"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={form.over_date}
                onChange={e => setForm(prev => ({ ...prev, over_date: e.target.value }))}
                error={!!validateErrors.over_date}
                helperText={validateErrors.over_date}
            />

            <TextField fullWidth sx={{ mb: 2 }}
                label="Время дедлайна (необязательно)"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                value={form.over_time}
                onChange={e => setForm(prev => ({ ...prev, over_time: e.target.value }))}
            />

            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Отправить'}
            </Button>
        </Box>
    )
}