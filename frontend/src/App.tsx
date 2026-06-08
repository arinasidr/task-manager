import { Route, Routes } from 'react-router-dom'

import { Container } from '@mui/material'

import Navbar from './components/Navbar'

import AddTask from './pages/AddTask'
import DaySchedule from './pages/DaySchedule'
import Home from './pages/Home'
import WeekMonthSchedule from './pages/WeekMonthSchedule'

export default function App() {
    return (
        <>
            <Navbar />
            <Container
                maxWidth={false}
                disableGutters
                sx={{ mt: 3, minHeight: '100vh', px: '0 !important', maxWidth: '960px' }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/day" element={<DaySchedule />} />
                    <Route path="/week" element={<WeekMonthSchedule />} />
                    <Route path="/add" element={<AddTask />} />
                </Routes>
            </Container>
        </>
    )
}
