// import { useState } from 'react'
// import { Box, Container } from '@mui/material'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'
import DateCalendarViews from './DateCalendarViews'
import DateCalendarServerRequest from './DateCalendarServerRequest'

function Home() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <MenuAppBar />
      {/* <Container maxWidth="sm" sx={{ pb: 7, pt: 2 }}> */}
        <DateCalendarViews />
        <DateCalendarServerRequest />
      {/* </Container> */}
      <SimpleBottomNavigation />
    </>
  )
}

export default Home
