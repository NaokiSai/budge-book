import { useState } from 'react';
import { useData } from '@cnxt/DataContext';
import { useTransactionAnalytics } from '@features/analytics/hooks/useTransactionAnalytics';
import { BudgeCategoryList } from '@features/analytics/components/BudgeCategoryList';
import { TotalAmount } from '@styledComponents/TotalAmount';
import { PieChart } from '@features/analytics/components/PieChart';
import { Box, Stack } from '@mui/material';
import { DatePickerGroup } from '@features/transactions/components/DatePickerGroup';
import { BudgeCategoryGroupList } from '@features/analytics/components/BudgeCategoryGroupList';

export default function Analytics() {
	// コンテキストからデータや状態をもらう（ここでキャッシュされたデータを使う）
	const {
		dataCtx,
		loadingCtx,
		selectedDateCtx,
		setSelectedDateCtx,
		handleUpdateData,
		handleDeleteData,
		setSelectedMonthCtx
	} = useData();
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
	// ドロワーの開閉状態を管理
	const [open, setOpen] = useState(false);
	// コンテキストにある生データをフックに渡して、グラフ用の集計済みデータをもらう
	const { chartData, totalAmount, categoryGroups } = useTransactionAnalytics(dataCtx);

	const handleOpenDrawer = (index: number) => {
		setSelectedItemIndex(index);
		setOpen(true);
	}

	const handleCloseDrawer = () => {
		setSelectedItemIndex(null);
		setOpen(false);
	}

	return (
		<Box sx={{
			position: 'relative',
			overflow: 'hidden',
			flexGrow: 1,
			display: 'flex',
			flexDirection: 'column',
		}}>
			<Stack
				direction='column'
				sx={{ mt: 2, mx: 'auto', width: 'fit-content', alignItems: 'center' }}>
				<Stack sx={{ mx: 'auto' }}>
					<DatePickerGroup
						range='month'
						setSelectedDate={setSelectedMonthCtx}
						initialDate={selectedDateCtx} />
				</Stack>
				<PieChart
					loading={loadingCtx}
					chartData={chartData} />
				<TotalAmount
					loading={loadingCtx}
					amount={totalAmount} />
			</Stack>
			<Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
				<BudgeCategoryList
					isLoading={loadingCtx}
					categoryGroups={categoryGroups}
					onClick={handleOpenDrawer}
				/>
				{/* 右側から出てくるドロワー */}
				{selectedItemIndex !== null && (
					<BudgeCategoryGroupList
						categoryGroups={categoryGroups[selectedItemIndex]}
						isLoading={loadingCtx}
						selectedDate={selectedDateCtx}
						setSelectedDate={setSelectedDateCtx}
						onUpdate={handleUpdateData}
						onDelete={handleDeleteData}
						onClose={handleCloseDrawer}
						isOpen={open}
					/>
				)}
			</Box>
		</Box>
	);
}