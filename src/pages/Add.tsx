// src/pages/Add.tsx
import { Box, Stack } from "@mui/material";
import { useData } from "@cnxt/DataContext";
import { useAddTransaction } from "@features/transactions/hooks/useAddTransaction";
import { Button } from "@src/styledComponents/Button";
import { DatePickerGroup } from "@features/transactions/components/DatePickerGroup";
import { DataFormFields } from "@features/transactions/components/DataFormFields";

export default function Add() {
  const { loadingCtx, selectedDateCtx, setSelectedDateCtx, handleAddData } = useData();

  // フックには必要な変数・関数だけを渡す
  const {
    formState,
    updateField,
    handleSave,
  } = useAddTransaction({
    selectedDateCtx,
    onSave: handleAddData, // コンテキストの追加関数を渡す,
  });

  return (
    <Stack sx={{ mx: "auto", pt: 2 }}>
      <Stack direction="column" spacing={1} sx={{ width: "fit-content", mx: "auto" }}>
        <Box sx={{ mb: 1 }}>
          <DatePickerGroup
            setSelectedDate={setSelectedDateCtx}
            initialDate={selectedDateCtx}
          />
        </Box>
        <DataFormFields formState={formState} updateField={updateField} />
      </Stack>

      <Button
        variant="contained"
        loading={loadingCtx}
        sx={{ width: 100, ml: "auto", mt: 2 }}
        onClick={handleSave}
      >
        追加
      </Button>
    </Stack>
  );
}