import { useEffect, useState } from 'react'
import { DatePickerGroup } from '@components/DatePickerGroup'
import { Stack, TextField, MenuItem, Select, Typography, Box } from '@mui/material'
import { MASTERS } from '@service/master'
import type { DataEntry } from '@type/type'
// import { PostData } from '@service/DataService'
// import { useData } from '@cnxt/DataContext'
// import { Button } from '@styledComponents/Button'

type CreateDataFormProps = {
	// ここに必要なpropsを定義してください
	data: DataEntry; // 例: 家計簿の明細データを受け取るためのprops
	type: 'create' | 'change'
	setData: (data: DataEntry) => void
};

/**
 * CreateDataForm
 * @param param0 
 * @returns 
 */
export const CreateDataForm = ({ data, type, setData }: CreateDataFormProps) => {
	console.log(data)
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

	useEffect(() => {
		const dataTemp = {
			date: selectedDate,
			id: data.id,
			amount,
			paymentPerson,
			category,
			paymentMethod,
			isAdvancePayment: isAdvance,
			memo,
			shop: purchaseStore
		}

		console.log(data)
		
		setData(dataTemp)

	}, [selectedDate, amount, paymentPerson, category, paymentMethod, isAdvance, memo, purchaseStore]);

	return (
		<Stack direction="column" spacing={1} sx={{ width: 'fit-content', pt: 2 }}>
			{type === 'create' &&
				<Box sx={{ margin: '4px auto !important', }}>
					<DatePickerGroup setSelectedDate={setSelectedDate} />
				</Box>}
			{type === 'change' &&
				<Box sx={{ margin: '4px auto !important', }}>
					<DatePickerGroup setSelectedDate={setSelectedDate} initialDateStr={data.date} />
				</Box>}
			<Stack spacing={1} sx={{ backgroundColor: '#fff', border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 1, p: 2 }}>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>金額 : </Typography>
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
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>支払者 : </Typography>
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
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>カテゴリ : </Typography>
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
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>支払方法 : </Typography>
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
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>立替有無 : </Typography>
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
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>購入店 : </Typography>
					<TextField
						value={purchaseStore}
						onChange={(e) => setPurchaseStore(e.target.value)}
						size="small"
						placeholder='購入場所'
						sx={{ width: 200, ml: 'auto' }}
					/>
				</Stack>
				<Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontSize: 14, minWidth: 80 }}>メモ : </Typography>
					<TextField
						value={memo}
						onChange={(e) => setMemo(e.target.value)}
						size="small"
						placeholder='自由入力'
						sx={{ width: 200, ml: 'auto' }}
					/>
				</Stack>
			</Stack>
		</Stack>
	)
}
