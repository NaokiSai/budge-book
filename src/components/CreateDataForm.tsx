import { useState } from 'react'
import { DatePickerGroup } from '@components/DatePickerGroup'
import { Stack, TextField, MenuItem, Select, Typography, Box } from '@mui/material'
import { MASTERS } from '@service/master'
import type { DataEntry } from '@type/type'
import { PostData } from '@service/DataService'
import { useData } from '@cnxt/DataContext'
import { Button } from '@styledComponents/Button'

type CreateDataFormProps = {
	// ここに必要なpropsを定義してください
	data: DataEntry; // 例: 家計簿の明細データを受け取るためのprops
};

/**
 * CreateDataForm
 * @param param0 
 * @returns 
 */
export const CreateDataForm = ({ data }: CreateDataFormProps) => {
	const { loading, setLoading } = useData();
	const [selectedDate, setSelectedDate] =
		useState(data.id === 'new' ? new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Asia/Tokyo'
		}).format(new Date()) : data.date);
	const [amount, setAmount] = useState(data.amount);
	const [paymentPerson, setPaymentPerson] = useState(data.paymentPerson);
	const [category, setCategory] = useState(data.category);
	const [paymentMethod, setPaymentMethod] = useState(data.paymentMethod);
	const [isAdvance, setIsAdvance] = useState(data.isAdvancePayment);
	const [memo, setMemo] = useState(data.memo);
	const [purchaseStore, setPurchaseStore] = useState(data.shop);

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

		const data: DataEntry = {
			date: selectedDate,
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
			await PostData(JSON.stringify(data)); // これも必要に応じて呼び出してください

		} catch (error) {
			console.error('データ取得に失敗しました:', error);
			// 必要ならここでユーザーにトースト通知などを出す
		} finally {
			// 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
			setLoading(false);
		}
	};

	return (
		<Stack direction="column" spacing={1} sx={{ width: 'fit-content', mx: 'auto', pt: 2 }}>
			<Box sx={{ margin: '4px auto !important', }}>
				<DatePickerGroup setSelectedDate={setSelectedDate} />
			</Box>
			<Stack spacing={1} sx={{ backgroundColor: '#fff', border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 1, p: 2 }}>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>金額 : </Typography>
					<TextField
						value={amount}
						onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
						size="small"
						slotProps={{
							htmlInput: {
								inputMode: 'numeric',
								pattern: '[0-9]*',
							},
						}}
						placeholder='数字のみ入力可能'
						sx={{ width: 200, ml: 'auto' }} />
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>支払者 : </Typography>
					<Select
						value={paymentPerson}
						onChange={(e) => setPaymentPerson(e.target.value)}
						size="small"
						sx={{ width: 200, ml: 'auto' }} >
						{MASTERS.USER.map(user => (
							<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
						))}
					</Select>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>カテゴリ : </Typography>
					<Select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						size="small"
						sx={{ width: 200, ml: 'auto' }} >
						{MASTERS.PAYMENT_CATEGORIES.map(category => (
							<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
						))}
					</Select>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>支払方法 : </Typography>
					<Select
						value={paymentMethod}
						onChange={(e) => setPaymentMethod(e.target.value)}
						size="small"
						sx={{ width: 200, ml: 'auto' }} >
						{MASTERS.PAYMENT_METHOD.map(method => (
							<MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
						))}
					</Select>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>立替有無 : </Typography>
					<Select
						value={isAdvance}
						onChange={(e) => setIsAdvance(e.target.value)}
						size="small"
						sx={{ width: 200, ml: 'auto' }} >
						{MASTERS.PAYMENT_IS_ADVANCE.map(isAdvance => (
							<MenuItem key={isAdvance.id} value={isAdvance.id}>{isAdvance.name}</MenuItem>
						))}
					</Select>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>購入店 : </Typography>
					<TextField
						value={purchaseStore}
						onChange={(e) => setPurchaseStore(e.target.value)}
						size="small"
						placeholder='購入場所'
						sx={{ width: 200, ml: 'auto' }}
					/>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 100 }}>メモ : </Typography>
					<TextField
						value={memo}
						onChange={(e) => setMemo(e.target.value)}
						size="small"
						placeholder='自由入力'
						sx={{ width: 200, ml: 'auto' }}
					/>
				</Stack>
			</Stack>

			<Button
				variant="contained"
				loading={loading}
				sx={{ width: 100, margin: '16px 0px 0px auto !important' }}
				onClick={savehandle}>追加</Button>
		</Stack>
	)
}
