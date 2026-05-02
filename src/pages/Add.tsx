import { useData } from "@cnxt/DataContext";
import type { DataEntry } from "@type/type";
import { PostEditData } from "@src/service/DataService";
import { useState } from "react";
import { Button } from "@src/styledComponents/Button";
import { Box, Stack } from "@mui/material";
import { DatePickerGroup } from "@src/components/DatePickerGroup";
import { FormAmount } from "@src/components/FormAmount";
import { FormPaymentPerson } from "@src/components/FormPaymentPerson";
import { FormCategory } from "@src/components/FormCategory";
import { FormPaymentMethod } from "@src/components/FormPaymentMethod";
import { FormIsAdvance } from "@src/components/FormIsAdvance";
import { FormPurchaseStore } from "@src/components/FormPurchaseStore";
import { FormMemo } from "@src/components/FormMemo";
import { TimeoutDialog } from "@src/components/TimeoutDialog";

const iniData = {
	id: 'new',
	date: '',
	shop: '',                      // 利用先
	amount: '',                     // 金額 (数値) または空文字
	category: '',                  // カテゴリコード
	paymentMethod: '',             // 支払方法コード
	paymentPerson: '',             // 支払者コード
	isAdvancePayment: '',          // 立替の有無
	memo: ''                         // メモ（エラー内容を含む場合あり）
}

export default function Add() {
	const { loading, setLoading, selectedDate, setSelectedDate } = useData();

	// const [selectedDate, setSelectedDate] =
	// 	useState(new Intl.DateTimeFormat('sv-SE', {
	// 		timeZone: 'Asia/Tokyo'
	// 	}).format(new Date()));
	const [amount, setAmount] = useState<string | number>(iniData.amount);
	const [paymentPerson, setPaymentPerson] = useState(iniData.paymentPerson);
	const [category, setCategory] = useState(iniData.category);
	const [paymentMethod, setPaymentMethod] = useState(iniData.paymentMethod);
	const [isAdvance, setIsAdvance] = useState(iniData.isAdvancePayment);
	const [memo, setMemo] = useState(iniData.memo);
	const [purchaseStore, setPurchaseStore] = useState(iniData.shop);

	const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false)

	const savehandle = async () => {

		setLoading(true)
		const now = new Date();

		// 各要素を取得
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
		const date = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		// 連結して 202604251451 の形式にして、IDとして利用する
		const formattedDate = `${year}${month}${date}${hours}${minutes}${seconds}`;

		const dataTemp: DataEntry = {
			date: selectedDate !== undefined ? selectedDate?.format('YYYY/MM/DD') : '2000-01-01',
			id: formattedDate,
			amount,
			paymentPerson,
			category,
			paymentMethod,
			isAdvancePayment: isAdvance,
			memo,
			shop: purchaseStore
		}

		try {
			const response = await PostEditData(JSON.stringify(dataTemp)); // これも必要に応じて呼び出してください

			if (response?.status === 'error' && response.httpCode === 419) {
				setOpenTimeoutDialog(true)
			}
			setAmount(iniData.amount)
			setPaymentPerson(iniData.paymentPerson)
			setCategory(iniData.category)
			setPaymentMethod(iniData.paymentMethod)
			setIsAdvance(iniData.isAdvancePayment)
			setPurchaseStore(iniData.shop)
			setMemo(iniData.memo)

		} catch (error) {
			console.error('データの保存に失敗しました。:', error);
			// 必要ならここでユーザーにトースト通知などを出す
		} finally {
			// 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
			setLoading(false);
		}
	};

	return (
		<Stack sx={{ mx: 'auto' }}>
			<Stack direction="column" spacing={1} sx={{ width: 'fit-content', pt: 2 }}>
				<Box sx={{ margin: '4px auto !important', }}>
					<DatePickerGroup setSelectedDate={setSelectedDate} initialDate={selectedDate}/>
				</Box>
				<Stack spacing={1} sx={{ backgroundColor: '#fff', border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 1, p: 2 }}>
					<FormAmount amount={amount} setAmount={setAmount} />
					<FormPaymentPerson paymentPerson={paymentPerson} setPaymentPerson={setPaymentPerson} />
					<FormCategory category={category} setCategory={setCategory} />
					<FormPaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
					<FormIsAdvance isAdvance={isAdvance} setIsAdvance={setIsAdvance} />
					<FormPurchaseStore purchaseStore={purchaseStore} setPurchaseStore={setPurchaseStore} />
					<FormMemo memo={memo} setMemo={setMemo} />
				</Stack>
			</Stack>
			<Button
				variant="contained"
				loading={loading}
				// disabled={data !== null ? false : true}
				sx={{ width: 100, margin: '16px 0px 0px auto !important' }}
				onClick={savehandle}>追加</Button>
			<TimeoutDialog open={openTimeoutDialog} onClose={() => setOpenTimeoutDialog(false)} />
		</Stack>
	)
}
