/** GASのレスポンス形式を定義 */
type GasResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: any;
  user?: {
    id: string;
    email: string;
    name?: string;
    picture?: string;
    permissions?: string[];
  };
  httpCode?: number;
};

/**
 * 家計簿データの1件分の明細
 */
type DataEntry = {
  id: number | string;           // タイムスタンプ（数値）または "test"
  date: string;                  // 利用日 (YYYY-MM-DD or 空文字)
  shop: string;                  // 利用先
  amount: number | string;       // 金額 (数値) または空文字
  category: string;              // カテゴリコード
  paymentMethod: string;         // 支払方法コード
  paymentPerson: string;         // 支払者コード
  isAdvancePayment: string;      // 立替の有無
  memo: string;                  // メモ（エラー内容を含む場合あり）
};

/**
 * 取得データの本体
 */
type FetchDataPayload = {
  period: string;
  pattern: string;
  granularity: string;
  count: number;
  entries: DataEntry[];          // 明細リスト
  uniqueDates: string[];         // 明細の中で利用されている日付のリスト (YYYY-MM-DD)
};

/**
 * GAS Web App API 全体レスポンス
 */
type FetchDataResponse = {
  status: 'success' | 'error';
  message: string;               // レスポンスメッセージ
  user: string;                  // ユーザーメールアドレス
  data?: FetchDataPayload;
  httpCode: number;              // ステータスコード
};

/** チャート用のカテゴリ別合計データ */
type ChartDataCategoryTotals = {
  id: number;
  value: number;
  label: string;
  rate?: number; // 全体に対する割合（%）を追加
};

export type { GasResponse, DataEntry, FetchDataPayload, FetchDataResponse, ChartDataCategoryTotals };