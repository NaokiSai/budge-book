import { Typography, Box } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			tabIndex={0}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Pay() {
	const [value, setValue] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ p: 2 }}>
			<Typography variant="h6" component="h6" gutterBottom>
				Pay Comming Sonn
			</Typography>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Item One" {...a11yProps(0)} disableRipple/>
					<Tab label="Item Two" {...a11yProps(1)} disableRipple/>
					<Tab label="Item Three" {...a11yProps(2)} disableRipple/>
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				Item One
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Item Two
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				Item Three
			</CustomTabPanel>
		</Box>
	)
}
