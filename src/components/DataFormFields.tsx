// @src/components/DataFormFields.tsx
import { Stack } from '@mui/material';
import { FormAmount } from './FormAmount';
import { FormPaymentPerson } from './FormPaymentPerson';
import { FormCategory } from './FormCategory';
import { FormPaymentMethod } from './FormPaymentMethod';
import { FormIsAdvance } from './FormIsAdvance';
import { FormPurchaseStore } from './FormPurchaseStore';
import { FormMemo } from './FormMemo';

// 1. formState の型を定義（anyを避ける場合）
interface FormState {
  amount: string | number;
  paymentPerson: string;
  category: string;
  paymentMethod: string;
  isAdvance: string;
  purchaseStore: string;
  memo: string;
}

interface DataFormFieldsProps {
  formState: FormState;
  // 2. 引数 field が FormState のキーであることを明示
  updateField: (field: keyof FormState) => (value: any) => void;
}

export const DataFormFields = ({ formState, updateField }: DataFormFieldsProps) => {
  return (
    <Stack 
      spacing={1} 
      sx={{ 
        bgcolor: 'background.paper', 
        border: 1, 
        borderColor: 'divider', 
        borderRadius: 2, 
        boxShadow: 1, 
        p: 2 
      }}
    >
      <FormAmount amount={formState.amount} setAmount={updateField('amount')} />
      <FormPaymentPerson paymentPerson={formState.paymentPerson} setPaymentPerson={updateField('paymentPerson')} />
      <FormCategory category={formState.category} setCategory={updateField('category')} />
      <FormPaymentMethod paymentMethod={formState.paymentMethod} setPaymentMethod={updateField('paymentMethod')} />
      <FormIsAdvance isAdvance={formState.isAdvance} setIsAdvance={updateField('isAdvance')} />
      <FormPurchaseStore purchaseStore={formState.purchaseStore} setPurchaseStore={updateField('purchaseStore')} />
      <FormMemo memo={formState.memo} setMemo={updateField('memo')} />
    </Stack>
  );
};