import { useState, useCallback } from "react";
import { Box, Stack } from "@mui/material";
import dayjs from "dayjs";

import { useData } from "@cnxt/DataContext";
import type { DataEntry } from "@type/type";
import { PostEditData } from "@src/service/DataService";

import { Button } from "@src/styledComponents/Button";
import { DatePickerGroup } from "@src/components/DatePickerGroup";
import { TimeoutDialog } from "@src/components/TimeoutDialog";
import { DataFormFields } from "@src/components/DataFormFields";

// 初期値の型定義と定数化
const INITIAL_FORM_STATE = {
	amount: "" as string | number,
	paymentPerson: "",
	category: "",
	paymentMethod: "",
	isAdvance: "",
	purchaseStore: "",
	memo: "",
};

export default function Add() {
	const { loadingCtx, setLoadingCtx, selectedDateCtx, setSelectedDateCtx } = useData();
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [openTimeoutDialog, setOpenTimeoutDialog] = useState(false);

	// 汎用的な入力ハンドラー（各コンポーネントがname属性をサポートしている場合により有効）
	const updateField = useCallback((field: keyof typeof INITIAL_FORM_STATE) => (value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	}, []);

	const handleSave = async () => {
		setLoadingCtx(true);

		// IDと日付の整形
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

		try {
			const response = await PostEditData(JSON.stringify(payload));

			if (response?.status === "error" && response.httpCode === 419) {
				setOpenTimeoutDialog(true);
				return;
			}

			// 保存成功時にフォームをリセット
			setFormState(INITIAL_FORM_STATE);

		} catch (error) {
			console.error("データの保存に失敗しました:", error);
		} finally {
			setLoadingCtx(false);
		}
	};

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

			<TimeoutDialog
				open={openTimeoutDialog}
				onClose={() => setOpenTimeoutDialog(false)}
			/>
		</Stack>
	);
}
