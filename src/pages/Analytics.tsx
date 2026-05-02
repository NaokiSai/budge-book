import { getData } from '@service/DataService';
import React, { useEffect, useState } from 'react';
import { MASTERS } from '@service/master';
import { useData } from '@cnxt/DataContext';
import { BudgeCategoryList } from '@components/BudgeCategoryList';
import type { ChartDataCategoryTotals } from '@type/type';
import { TotalAmount } from '@components/TotalAmount';
import { PieChart } from '@components/PieChart';
import { Stack } from '@mui/material';
import { DatePickerGroup } from '@src/components/DatePickerGroup';
import { TimeoutDialog } from '@src/components/TimeoutDialog';

export default function Analytics() {
	const { updateData, loading, setLoading, selectedMonth, setSelectedMonth } = useData();
	
	const [chartData, setChartData] = useState<ChartDataCategoryTotals[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false)

	useEffect(() => {
		let month: string = ''
		if (selectedMonth === undefined) {
			// 初期値はアプリを開いた日の月を入れる
			month = new Intl.DateTimeFormat('sv-SE', {
				timeZone: 'Asia/Tokyo',
				year: 'numeric',
				month: '2-digit',
			}).format(new Date())
		} else {
			month = selectedMonth.format('YYYY-MM')
		}

		// 日付指定でデータを取得する
		getAnalyticsData(month);

	}, [selectedMonth]);

	const getAnalyticsData = async (month: string) => {

		setChartData([])
		setTotalAmount(0)
		// 1. 開始時にローディングをON
		setLoading(true);

		try {

			const response = await getData(month); // これも必要に応じて呼び出してください
			if (response?.status === 'error' && response.httpCode === 419) {
				setOpenTimeoutDialog(true)
			}

			if (response !== null && response.data !== undefined && response.data.period === month) {
				updateData(response.data.entries);
				// ChartDataCategoryTotalsの配列を作成するために、カテゴリごとに金額を合計する

				const categoryTotals: { [key: string]: number } = {};
				response.data.entries
					.filter((entry: any) => !entry.category.includes('ICAT'))
					.map((entry: any) => {
						// categoryごとに金額を合計する
						if (entry.category) {
							if (!categoryTotals[entry.category]) {
								categoryTotals[entry.category] = 0;
							}
							categoryTotals[entry.category] += entry.amount;
						}

					})
				// 合計金額を計算
				const totalAmount = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
				setTotalAmount(totalAmount);

				// categoryTotalsオブジェクトをChartDataCategoryTotalsの配列に変換する
				const temp: ChartDataCategoryTotals[] = Object.keys(categoryTotals).map((key, index) => ({
					id: index,
					catid: key,
					value: categoryTotals[key],
					label: MASTERS.getPaymentCategoryName(key), // ここでカテゴリIDを名前に変換
					rate: totalAmount > 0 ? (categoryTotals[key] / totalAmount) * 100 : 0, // 全体に対する割合を計算
				}));

				const sortedData = [...temp].sort((a, b) => {
					// b - a で降順（大きい順）
					return (b.value as number) - (a.value as number);
				});

				setChartData(sortedData);
				setLoading(false)

			}
		} catch (error) {
			setLoading(false)

			// 必要ならここでユーザーにトースト通知などを出す
		} finally {
			// 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
			setLoading(false);
		}
	};

	return (
		<React.Fragment>
			<Stack sx={{ mt: 2, mx: 'auto' }}>
				<DatePickerGroup range='month' setSelectedDate={setSelectedMonth} />
			</Stack>
			<PieChart loading={loading} chartData={chartData} />
			<TotalAmount loading={loading} amount={totalAmount} />
			<BudgeCategoryList data={chartData} />
			<TimeoutDialog open={openTimeoutDialog} onClose={() => setOpenTimeoutDialog(false)} />
		</React.Fragment>
	)
}
