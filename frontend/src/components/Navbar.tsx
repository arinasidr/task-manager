import { Link, useLocation } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Navbar() {
    const location = useLocation()
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2C2C2A' }}>
            <Toolbar sx={{ maxWidth: '960px', width: '100%', mx: 'auto' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    TaskManager
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        px: 2,
                        color: location.pathname === '/' ? '#EEEDFE' : 'rgba(255,255,255,0.7)',
                        boxShadow: location.pathname === '/' ? 'inset 0 -2px 0 #EEEDFE' : 'none'
                    }}
                >
                    Главная
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/day"
                    sx={{
                        px: 2,
                        color: location.pathname === '/day' ? '#EEEDFE' : 'rgba(255,255,255,0.7)',
                        boxShadow: location.pathname === '/day' ? 'inset 0 -2px 0 #EEEDFE' : 'none'
                    }}
                >
                    День
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/week"
                    sx={{
                        px: 2,
                        color: location.pathname === '/week' ? '#EEEDFE' : 'rgba(255,255,255,0.7)',
                        boxShadow: location.pathname === '/week' ? 'inset 0 -2px 0 #EEEDFE' : 'none'
                    }}
                >
                    Неделя/Месяц
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/add"
                    sx={{
                        ml: 2,
                        px: 2,
                        backgroundColor: '#534AB7',
                        color: 'white',
                        '&:hover': { backgroundColor: '#3C3489' },
                    }}
                >
                    + Задача
                </Button>
            </Toolbar>
        </AppBar>
    )
}
