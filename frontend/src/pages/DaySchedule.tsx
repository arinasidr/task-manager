import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

import { getToday, getUpcoming } from '../api/tasks'
import { type Task } from '../types/task'
import TaskCard from '../components/TaskCard'

export default function DaySchedule() {
    const [todayTasks, setTodayTasks] = useState<Task[]>([])
    const [weekTasks, setWeekTasks] = useState<Task[]>([])
    const [monthTasks, setMonthTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const [today, week, month] = await Promise.all([
                    getToday(),
                    getUpcoming('week'),
                    getUpcoming('month'),
                ])
                setTodayTasks(today)
                setWeekTasks(week)
                setMonthTasks(month)
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
    }, [])
    return (
        <Box sx={{ mt: 3 }}>
            <Typography>Расписание на сегодня</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {isLoading && <CircularProgress />}

            {!isLoading && todayTasks.length === 0 && (
                <Typography color="text.secondary">Задач на сегодня нет</Typography>
            )}
            {!isLoading &&
                todayTasks.map((task) => (
                    <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="caption">{task.over_time}</Typography>
                        <TaskCard task={task} />
                    </Box>
                ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Топ задач на неделю</Typography>

            {!isLoading && weekTasks.length === 0 && (
                <Typography color="text.secondary">Задач на неделе нет</Typography>
            )}
            {!isLoading && weekTasks.map((task) => <TaskCard key={task.id} task={task} />)}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Топ задач на месяц</Typography>

            {!isLoading && monthTasks.length === 0 && (
                <Typography color="text.secondary">Задач на месяц нет</Typography>
            )}
            {!isLoading && monthTasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </Box>
    )
}
