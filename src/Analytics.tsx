import { Typography } from '@mui/material'
import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'
import { PageContainer } from './styledComponents/PageContaner';
import { SelectYYYYMM } from './conponents/SelectYYYYMM';
import { getDayData } from './service/DataService';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { MASTERS } from './master';
import { useData } from './DataContext';
import { BudgeCategoryList } from './conponents/BudgeCategoryList';
import type { ChartDataCategoryTotals } from './type';

export default function Analytics() {
	const { updateData } = useData();
	// const { updateData, setLoading } = useData<{ [key: string]: number }>({});
	const [chartData, setChartData] = useState<ChartDataCategoryTotals[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedDate, setSelectedDate] = useState(new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Asia/Tokyo'
	}).format(new Date()));

	useEffect(() => {
		getData();
		console.log("選択された日付:", selectedDate); // 選択された日付をコンソールに表示
	}, [selectedDate]);

	const getData = async () => {
		// 1. 開始時にローディングをON
		// setLoading(true);

		try {
			// 日付計算（sv-SE フォーマットは YYYY-MM-DD になる）
			// const date = new Intl.DateTimeFormat('sv-SE', {
			// 	timeZone: 'Asia/Tokyo'
			// }).format(selectedDate);

			const dataTemp = await getDayData(selectedDate); // これも必要に応じて呼び出してください
			if (dataTemp !== null && dataTemp.data !== undefined) {
				updateData(dataTemp.data.entries);
				// ChartDataCategoryTotalsの配列を作成するために、カテゴリごとに金額を合計する

				const categoryTotals: { [key: string]: number } = {};
				dataTemp.data.entries
					.filter((entry: any) => !entry.category.includes('ICAT'))
					.map((entry: any) => {
						// categoryごとに金額を合計する
						if (entry.category) {
							if (!categoryTotals[entry.category]) {
								categoryTotals[entry.category] = 0;
							}
							categoryTotals[entry.category] += entry.amount;
						}
						// console.log("カテゴリごとの合計金額:", categoryTotals); // カテゴリごとの合計金額をコンソールに表示
					})
				// 合計金額を計算
				const totalAmount = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
				setTotalAmount(totalAmount);
				// console.log("カテゴリごとの合計金額:", Object.values(categoryTotals).reduce((a, b) => a + b, 0)); // カテゴリごとの合計金額をコンソールに表示

				// categoryTotalsオブジェクトをChartDataCategoryTotalsの配列に変換する
				const temp: ChartDataCategoryTotals[] = Object.keys(categoryTotals).map((key, index) => ({
					id: index,
					value: categoryTotals[key],
					label: MASTERS.getPaymentCategoryName(key), // ここでカテゴリIDを名前に変換
					rate: totalAmount > 0 ? (categoryTotals[key] / totalAmount) * 100 : 0, // 全体に対する割合を計算
				}));
				const sortedData = [...temp].sort((a, b) => {
					// b - a で降順（大きい順）
					return (b.value as number) - (a.value as number);
				});
				setChartData(sortedData);

			}
		} catch (error) {
			console.error('データ取得に失敗しました:', error);
			// 必要ならここでユーザーにトースト通知などを出す
		} finally {
			// 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
			// setLoading(false);
		}
	};


	return (
		<PageContainer>
			<MenuAppBar />
			<SelectYYYYMM setSelectedDate={setSelectedDate} />
			<PieChart
				series={[
					{
						data: chartData,
						outerRadius: 120,
					},
				]}
				sx={{ ' .MuiChartsLegend-root': { gap: 1 } }} // 凡例を非表示にするスタイル
				width={250}
				height={250}
			/>
			<Typography variant="h6" align="center" sx={{ mt: 2 }}>
				Total Amount: {Number(totalAmount).toLocaleString()}円
			</Typography>
			<BudgeCategoryList data={chartData} />
			<SimpleBottomNavigation />
		</PageContainer>
	)
}
