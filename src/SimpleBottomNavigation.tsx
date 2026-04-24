import { useNavigate, useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AddIcon from '@mui/icons-material/Add'
import AreaChartIcon from '@mui/icons-material/AreaChart'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home';

export default function SimpleBottomNavigation() {
	const navigate = useNavigate()
	const location = useLocation()

	const getValueFromPath = (pathname: string): number => {
		if (pathname === '/home' || pathname === '/') return 0
		if (pathname === '/analytics') return 1
		if (pathname === '/settings') return 2
		return 0
	}

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'black' }} elevation={3}>
			<BottomNavigation
				value={getValueFromPath(location.pathname)}
				onChange={handleChange}
				sx={{
					height: 56,
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
				<BottomNavigationAction icon={<HomeIcon sx={{ fontSize: '1.2rem' }} />} />
				<BottomNavigationAction icon={<AddIcon sx={{ fontSize: '1.2rem' }} />} />
				<BottomNavigationAction icon={<AreaChartIcon sx={{ fontSize: '1.2rem' }} />} />
				<BottomNavigationAction icon={<SettingsIcon sx={{ fontSize: '1.2rem' }} />} />
			</BottomNavigation>
		</Paper>
	)
}

