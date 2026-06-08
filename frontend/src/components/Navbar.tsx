import { Link } from "react-router-dom"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskManager
          </Typography>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/day">День</Button>
          <Button color="inherit" component={Link} to="/week">Неделя/Месяц</Button>
          <Button color="inherit" component={Link} to="/add">+ Задача</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
