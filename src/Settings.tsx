import { Container, Paper, Typography, Box, List, ListItem, ListItemText, Switch } from '@mui/material'
import MenuAppBar from './MenuAppBar'
import { BottomNavigation } from './BottomNavigation'

export default function Settings() {
	return (
		<>
			<MenuAppBar />
			<Container maxWidth="sm" sx={{ pb: 7, pt: 2 }}>
				<Paper elevation={3} sx={{ p: 3 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Settings
					</Typography>
					<Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
						Manage your application preferences
					</Typography>

					<List>
						<ListItem>
							<ListItemText
								primary="Notifications"
								secondary="Enable push notifications"
							/>
							<Switch defaultChecked />
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Dark Mode"
								secondary="Use dark theme"
							/>
							<Switch />
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Auto-save"
								secondary="Automatically save changes"
							/>
							<Switch defaultChecked />
						</ListItem>
					</List>

					<Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #ddd' }}>
						<Typography variant="subtitle2" color="textSecondary">
							Version 1.0.0
						</Typography>
					</Box>
				</Paper>
			</Container>
			<BottomNavigation />
		</>
	)
}
