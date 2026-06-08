import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

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
        <Box sx={{ mt: 3, px: 0}}>
            {error && <Alert severity="error">{error}</Alert>}
            {isLoading && <CircularProgress />}

            {!isLoading && (
                <Grid container spacing={3.5}>
                    <Grid size={6} sx={{ minWidth: 0 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            По времени
                        </Typography>
                        {todayTasks.length === 0 && (
                            <Typography color="text.secondary">Задач на сегодня нет</Typography>
                        )}
                        {todayTasks.map((task) => (
                            <Box
                                key={task.id}
                                sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'flex-start' }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ pt: 1, minWidth: 35 }}
                                >
                                    {task.over_time}
                                </Typography>
                                <Box
                                    sx={{
                                        borderLeft: '2px solid #AFA9EC',
                                        pl: 1,
                                        flex: 1,
                                        width: '100%',
                                    }}
                                >
                                    <TaskCard task={task} />
                                </Box>
                            </Box>
                        ))}
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Топ недели
                        </Typography>
                        {weekTasks.length === 0 ? (
                            <Typography color="text.secondary">Задач нет</Typography>
                        ) : (
                            weekTasks.map((task) => (
                                <Box key={task.id} sx={{ width: '100%' }}>
                                    <TaskCard task={task} />
                                </Box>
                            ))
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Топ месяца
                        </Typography>
                        {monthTasks.length === 0 ? (
                            <Typography color="text.secondary">Задач нет</Typography>
                        ) : (
                            monthTasks.map((task) => (
                                <Box key={task.id} sx={{ width: '100%' }}>
                                    <TaskCard task={task} />
                                </Box>
                            ))
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}
