// src/features/transactions/hooks/useAddTransaction.ts
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import type { DataEntry } from "@type/type";

const INITIAL_FORM_STATE = {
  amount: "" as string | number,
  paymentPerson: "",
  category: "",
  paymentMethod: "",
  isAdvance: "",
  purchaseStore: "",
  memo: "",
};

interface UseAddTransactionProps {
  selectedDateCtx: dayjs.Dayjs | undefined;
  // コンテキストから提供される新規追加用関数を受け取る（成功時に true を返す想定）
  onSave: (payload: DataEntry) => Promise<boolean | undefined>;
}

export const useAddTransaction = ({ selectedDateCtx, onSave }: UseAddTransactionProps) => {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  const updateField = useCallback((field: keyof typeof INITIAL_FORM_STATE) => (value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    const id = dayjs().format("YYYYMMDDHHmmss");
    const dateStr = selectedDateCtx?.format("YYYY-MM-DD") ?? "2000-01-01";

    const payload: DataEntry = {
      id,
      date: dateStr,
      amount: formState.amount,
      paymentPerson: formState.paymentPerson,
      category: formState.category,
      paymentMethod: formState.paymentMethod,
      isAdvancePayment: formState.isAdvance,
      shop: formState.purchaseStore,
      memo: formState.memo,
    };

    // コンテキスト側の保存処理を呼び出す
    const success = await onSave(payload);

    // 正常に保存・追加が成功したときだけフォームを初期状態に戻す
    if (success) {
      setFormState(INITIAL_FORM_STATE);
    }
  };

  return {
    formState,
    updateField,
    handleSave,
  };
};