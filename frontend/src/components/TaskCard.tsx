import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import { PRIORITY_COLOR, type Task, PRIORITY_LABEL } from "../types/task"

interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography>{task.title}</Typography>
                    <Chip label={PRIORITY_LABEL[task.priority]} color={PRIORITY_COLOR[task.priority]} size="small"/>
                </Box>
                {task.description && (
                    <Typography variant="body2" color="text.secondary">
                        {task.description}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                    {task.over_date} {task.over_time && `· ${task.over_time}`}
                </Typography>
            </CardContent>
        </Card>
    )
}

