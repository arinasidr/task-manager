import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import { getTasks } from '../api/tasks'
import { type Task } from '../types/task'
import TaskCard from '../components/TaskCard'

export default function Home() {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const allTasks = await getTasks({ sort: 'priority' })

                const tasks: Task[] = []
                allTasks.forEach((t) => {
                    if (t['priority'] == 3) {
                        tasks.push(t)
                    }
                })
                setTasks(tasks.slice(0, 5))
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
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={4}>
                    <Card
                        onClick={() => navigate('/day')}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid #534AB7',
                            borderRadius: 6,
                            '&:hover': { backgroundColor: '#b5aff8' },
                        }}
                    >
                        <CardActionArea>
                            <CardContent sx={{ textAlign: 'left', py: 1 }}>
                                <Typography sx={{ fontSize: 28 }}>📅</Typography>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Расписание на день
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Задачи на сегодня
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card
                        onClick={() => navigate('/week')}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid #534AB7',
                            borderRadius: 6,
                            '&:hover': { backgroundColor: '#b5aff8' },
                        }}
                    >
                        <CardActionArea>
                            <CardContent sx={{ textAlign: 'left', py: 1 }}>
                                <Typography sx={{ fontSize: 28 }}>🗓️</Typography>
                                <Typography sx={{ fontWeight: 'bold' }}>Неделя / месяц</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Расписание
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card
                        onClick={() => navigate('/add')}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid #534AB7',
                            borderRadius: 6,
                            '&:hover': { backgroundColor: '#b5aff8' },
                        }}
                    >
                        <CardActionArea>
                            <CardContent sx={{ textAlign: 'left', py: 1 }}>
                                <Typography sx={{ fontSize: 28 }}>➕</Typography>
                                <Typography sx={{ fontWeight: 'bold' }}>Добавить задачу</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Новая запись
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            <Typography sx={{ mb: 2, textAlign: 'left' }}>Пора приступить</Typography>
            {isLoading && <CircularProgress />}
            {!isLoading && tasks.length === 0 && (
                <Typography
                    color="text.disabled"
                    variant="body2"
                    sx={{ textAlign: 'center', py: 2 }}
                >
                    Нет срочных задач
                </Typography>
            )}
            {!isLoading && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </Box>
    )
}
