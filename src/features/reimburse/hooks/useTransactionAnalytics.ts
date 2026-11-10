import { useMemo } from 'react';
import type { DataEntry, DataPayerReimburseTotals, PayerReimburseTotalsGroup } from '@type/type';

export const useTransactionAnalytics = (transactions: DataEntry[]) => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { payerReimburseTotalsGroup: [] };
    }

    const paymentPersonTotals: { [key: string]: number } = {};
    const paymentPersonEntriesMap: { [key: string]: DataEntry[] } = {};

    // 1. ICATを含まないデータをフィルタリングし、カテゴリごとに集計・グループ化する
    transactions
      .filter((entry: DataEntry) => !entry.isAdvancePayment.includes('PISADV001'))
      .forEach((entry: DataEntry) => {
        if (entry.paymentPerson) {
          if (!paymentPersonTotals[entry.paymentPerson]) {
            paymentPersonTotals[entry.paymentPerson] = 0;
            paymentPersonEntriesMap[entry.paymentPerson] = [];
          }
          paymentPersonTotals[entry.paymentPerson] += Number(entry.amount || 0);
          paymentPersonEntriesMap[entry.paymentPerson].push(entry);
        }
      });

    // 2. データを作成
    const temp: DataPayerReimburseTotals[] = Object.keys(paymentPersonTotals).map((key) => ({
      paymentPerson: key,
      total: paymentPersonTotals[key]
    }));

    // 3. ★ 画面のカテゴリ別リスト表示にそのまま使える配列（カテゴリグループ配列）を作成
    const payerReimburseTotalsGroup: PayerReimburseTotalsGroup[] = temp.map((item) => ({
      paymentData: item,
      entries: paymentPersonEntriesMap[item.paymentPerson] || [], // そのカテゴリに属する明細の配列
    }));

    return {
      payerReimburseTotalsGroup,               // ★ カテゴリごとの配列データ（UIでループして回しやすい！）
    };
  }, [transactions]);
};