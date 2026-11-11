import { useMemo } from 'react';
import { MASTERS } from '@service/master';
import type { CategoryGroup, ChartDataCategoryTotals, DataEntry } from '@type/type';

export const useTransactionAnalytics = (transactions: DataEntry[]) => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { chartData: [], categoryGroups: [], totalAmount: 0 };
    }

    const categoryTotals: { [key: string]: number } = {};
    const categoryEntriesMap: { [key: string]: DataEntry[] } = {};

    // 1. ICATを含まないデータをフィルタリングし、カテゴリごとに集計・グループ化する
    transactions
      // .filter((entry: any) => !entry.category.includes('ICAT'))
      .forEach((entry: any) => {
        if (entry.category) {
          if (!categoryTotals[entry.category]) {
            categoryTotals[entry.category] = 0;
            categoryEntriesMap[entry.category] = [];
          }
          categoryTotals[entry.category] += Number(entry.amount || 0);
          categoryEntriesMap[entry.category].push(entry);
        }
      });

    const calculatedTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

    // 2. グラフ用のデータを作成
    const temp: ChartDataCategoryTotals[] = Object.keys(categoryTotals).map((key) => ({
      catid: key,
      value: categoryTotals[key],
      label: MASTERS.getPaymentCategoryName(key),
      rate: calculatedTotal > 0 ? (categoryTotals[key] / calculatedTotal) * 100 : 0,
    }));

    const sortedChartData = [...temp].sort((a, b) => (b.rate as number) - (a.rate as number));

    // 3. ★ 画面のカテゴリ別リスト表示にそのまま使える配列（カテゴリグループ配列）を作成
    const categoryGroups: CategoryGroup[] = sortedChartData.map((item) => ({
      chartData: {
        catid: item.catid,
        label: item.label,
        value: item.value,
        rate: item.rate ?? 0,
      },
      entries: categoryEntriesMap[item.catid] || [], // そのカテゴリに属する明細の配列
    }));

    return {
      chartData: sortedChartData,   // グラフ用データ
      categoryGroups,               // ★ カテゴリごとの配列データ（UIでループして回しやすい！）
      totalAmount: calculatedTotal, // 総額
    };
  }, [transactions]);
};