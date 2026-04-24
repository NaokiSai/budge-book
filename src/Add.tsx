import { Container, Paper, Typography, Box } from '@mui/material'
import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'

export default function Add() {
	return (
		<>
			<MenuAppBar />
			<Container maxWidth="sm" sx={{ pb: 10, pt: 3 }}>
				<Paper elevation={3} sx={{ p: 3, mb: 3 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Analytics
					</Typography>
					<Typography variant="body1" color="textSecondary">
						This is the analytics page. Charts and statistics will be displayed here.
					</Typography>
				</Paper>

				<Paper elevation={3} sx={{ p: 3 }}>
					<Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography variant="h6" color="textSecondary">
							Analytics Dashboard
						</Typography>
					</Box>
				</Paper>
			</Container>
			<SimpleBottomNavigation />
			<Box sx={{ height: 70 }} />
		</>
	)
}
