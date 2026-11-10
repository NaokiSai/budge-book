import { useMemo } from 'react';
import type { DataEntry, DataPaymentMethodTotals, PaymentMethodTotalsGroup } from '@type/type';

export const useTransactionAnalytics = (transactions: DataEntry[]) => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { paymentMethodTotalsGroup: [] };
    }

    const paymentMethodTotals: { [key: string]: number } = {};
    const paymentMethodEntriesMap: { [key: string]: DataEntry[] } = {};

    // 1. ICATを含まないデータをフィルタリングし、カテゴリごとに集計・グループ化する
    transactions
      // .filter((entry: DataEntry) => !entry.isAdvancePayment.includes('PISADV001'))
      .forEach((entry: DataEntry) => {
        if (entry.paymentMethod) {
          if (!paymentMethodTotals[entry.paymentMethod]) {
            paymentMethodTotals[entry.paymentMethod] = 0;
            paymentMethodEntriesMap[entry.paymentMethod] = [];
          }
          paymentMethodTotals[entry.paymentMethod] += Number(entry.amount || 0);
          paymentMethodEntriesMap[entry.paymentMethod].push(entry);
        }
      });

    // 2. データを作成
    const temp: DataPaymentMethodTotals[] = Object.keys(paymentMethodTotals).map((key) => ({
      paymentMethod: key,
      total: paymentMethodTotals[key]
    }));

    // 3. ★ 画面のカテゴリ別リスト表示にそのまま使える配列（カテゴリグループ配列）を作成
    const paymentMethodTotalsGroup: PaymentMethodTotalsGroup[] = temp.map((item) => ({
      paymentData: item,
      entries: paymentMethodEntriesMap[item.paymentMethod] || [], // そのカテゴリに属する明細の配列
    }));

    return {
      paymentMethodTotalsGroup,               // ★ カテゴリごとの配列データ（UIでループして回しやすい！）
    };
  }, [transactions]);
};