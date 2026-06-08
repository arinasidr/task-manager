import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { PRIORITY_COLOR, type Task, PRIORITY_LABEL } from '../types/task'

interface Props {
    task: Task
}

const formatDate = (over_date: string) => {
    const today = new Date().toISOString().split('T')[0]
    if (over_date === today) return 'Сегодня'
    return over_date
}

export default function TaskCard({ task }: Props) {
    return (
        <Card variant="outlined" sx={{ mb: 1, borderRadius: 2, width: '100%' }}>
            <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#534AB7',
                            flexShrink: 0,
                        }}
                    />
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            {task.title}
                            {task.description && (
                                <Typography
                                    component="span"
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ ml: 1 }}
                                >
                                    | {task.description}
                                </Typography>
                            )}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                        >
                            {formatDate(task.over_date)}
                            {task.over_time && ` · ${task.over_time}`}
                        </Typography>
                    </Box>
                    <Chip
                        label={PRIORITY_LABEL[task.priority]}
                        color={PRIORITY_COLOR[task.priority]}
                        size="small"
                    />
                </Box>
            </CardContent>
        </Card>
    )
}
