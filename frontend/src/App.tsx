import { Route, Routes } from 'react-router-dom'

import Navbar from "./components/Navbar"

import AddTask from "./pages/AddTask"
import DaySchedule from "./pages/DaySchedule"
import Home from "./pages/Home"
import WeekMonthSchedule from "./pages/WeekMonthSchedule"

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route 
          path="/"
          element={<Home/>}
        />
        <Route 
          path="/day"
          element={<DaySchedule/>}
        />
        <Route 
          path="/week"
          element={<WeekMonthSchedule/>}
        />
        <Route 
          path="/add"
          element={<AddTask/>}
        />
      </Routes>
    </>
  )
}