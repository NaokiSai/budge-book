import { CreateDataForm } from "@components/CreateDataForm";

export default function Add() {

	return (
		<CreateDataForm
			data={{
				id: 'new',
				date: '',
				shop: '',                      // 利用先
				amount: '',                     // 金額 (数値) または空文字
				category: '',                  // カテゴリコード
				paymentMethod: '',             // 支払方法コード
				paymentPerson: '',             // 支払者コード
				isAdvancePayment: '',          // 立替の有無
				memo: ''                         // メモ（エラー内容を含む場合あり）
			}} />
	)
}
