import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Alert from '@mui/material/Alert'

import { getTasks } from '../api/tasks'
import { type Task } from '../types/task'
import TaskCard from '../components/TaskCard'

export default function WeekMonthSchedule() {
    const [tab, setTab] = useState<'week' | 'month'>('week')
    const [sort, setSort] = useState<'date' | 'priority'>('date')
    const [tasks, setTasks] = useState<Task[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const getDateRange = () => {
        const today = new Date()

        const from_date = today.toISOString().split('T')[0]

        const endDate = new Date(today)
        endDate.setDate(today.getDate() + (tab === 'week' ? 7 : 30))

        const to_date = endDate.toISOString().split('T')[0]

        return { from_date, to_date }
    }

    useEffect(() => {
        setIsLoading(true)
        const { from_date, to_date } = getDateRange()
        const fetchData = async () => {
            try {
                const allTasks = await getTasks({ from_date, to_date, sort })
                setTasks(allTasks)
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
        fetchData()
    }, [tab, sort])

    const grouped = tasks.reduce(
        (nac, task) => {
            const date = task.over_date
            if (!nac[date]) nac[date] = []
            nac[date].push(task)
            return nac
        },
        {} as Record<string, Task[]>,
    )

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4">Расписание</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
                <Tab value="week" label="Неделя" />
                <Tab value="month" label="Месяц" />
            </Tabs>

            <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={(_, newSort) => {
                    if (newSort) setSort(newSort)
                }}
                sx={{ mb: 2 }}
            >
                <ToggleButton value="date">По дате</ToggleButton>
                <ToggleButton value="priority">По приоритету</ToggleButton>
            </ToggleButtonGroup>

            {isLoading && <CircularProgress />}

            {!isLoading && tasks.length === 0 && (
                <Typography color="text.secondary">Нет срочных задач</Typography>
            )}

            {!isLoading &&
                Object.entries(grouped).map(([date, dateTasks]) => (
                    <Box key={date} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                            {date}
                        </Typography>
                        {dateTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </Box>
                ))}
        </Box>
    )
}
