import { SelectYYYYMM } from '@components/SelectYYYYMM';
import { getDayData } from '@service/DataService';
import React, { useEffect, useState } from 'react';
import { MASTERS } from '@service/master';
import { useData } from '@cnxt/DataContext';
import { BudgeCategoryList } from '@components/BudgeCategoryList';
import type { ChartDataCategoryTotals } from '@type/type';
import { TotalAmount } from '@components/TotalAmount';
import { PieChart } from '@components/PieChart';

export default function Analytics() {
	const { updateData, loading, setLoading } = useData();
	const [chartData, setChartData] = useState<ChartDataCategoryTotals[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedMonth, setSelectedMonth] = useState(
		// 初期値はアプリを開いた日の月を入れる
		new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Asia/Tokyo',
			year: 'numeric',
			month: '2-digit',
		}).format(new Date())
	);

	useEffect(() => {
		let month: string = ''
		if (selectedMonth === null) {
			// 初期値はアプリを開いた日の月を入れる
			month = new Intl.DateTimeFormat('sv-SE', {
				timeZone: 'Asia/Tokyo',
				year: 'numeric',
				month: '2-digit',
			}).format(new Date())
		} else {
			month = selectedMonth
		}

		// 日付指定でデータを取得する
		getData(month);

	}, [selectedMonth]);

	const getData = async (month: string) => {

		setChartData([])
		setTotalAmount(0)
		// 1. 開始時にローディングをON
		setLoading(true);

		try {

			const dataTemp = await getDayData(month); // これも必要に応じて呼び出してください
			if (dataTemp !== null && dataTemp.data !== undefined && dataTemp.data.period === month) {
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
				console.log(temp)
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
			<SelectYYYYMM setSelectedDate={setSelectedMonth} />
			<PieChart loading={loading} chartData={chartData} />
			<TotalAmount loading={loading} amount={totalAmount} />
			<BudgeCategoryList data={chartData} />
		</React.Fragment>
	)
}
