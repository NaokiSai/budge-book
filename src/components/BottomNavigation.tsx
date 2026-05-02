import { useNavigate, useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useData } from '@cnxt/DataContext'
import HomeImage from '@assets/Home.png'
import AddImage from '@assets/Add.png'
import ChartImage from '@assets/Chart.png'
// import SettingImage from '@assets/Setting.png'
import { Image } from '@styledComponents/Image'

export const BottomNavigation = () => {
	const { loading } = useData();
	const navigate = useNavigate()
	const location = useLocation()
	const [value, setValue] = React.useState(0);

	useEffect(() => {
		setValue(getValueFromPath(location.pathname))
	}, []);

	const getValueFromPath = (pathname: string): number => {
		if (pathname === '/home' || pathname === '/') return 0
		if (pathname === '/add') return 1
		if (pathname === '/analytics') return 2
		if (pathname === '/settings') return 3
		return 0
	}

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
		if (newValue === 0) {
			navigate('/home')
		} else if (newValue === 1) {
			navigate('/add')
		} else if (newValue === 2) {
			navigate('/analytics')
		} else if (newValue === 3) {
			navigate('/settings')
		}
	}

	return (
		<React.Fragment>
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={12}>
				<MuiBottomNavigation
					value={value}
					onChange={handleChange}
					sx={{
						backgroundColor: '#F5F5F5',
						height: 48,
						'& .MuiBottomNavigationAction-root': {
							minWidth: 'auto',
							p: '3px 0',
							fontSize: '0.65rem',
							'&.Mui-selected': {
								fontSize: '0.65rem',
							},
						},
					}}
				>
					<BottomNavigationAction disabled={loading} icon={<Image src={HomeImage} sx={{ width: 36 }} />} />
					<BottomNavigationAction disabled={loading} icon={<Image src={AddImage} sx={{ width: 54 }} />} />
					<BottomNavigationAction disabled={loading} icon={<Image src={ChartImage} sx={{ width: 54 }} />} />
					{/* <BottomNavigationAction disabled={loading} icon={<Image src={SettingImage} sx={{ width: 60 }} />} /> */}
				</MuiBottomNavigation>
			</Paper>
			<Box sx={{ minHeight: 56 }} />
		</React.Fragment>
	)
}

