src/
├── assets/                  # 画像などの静的ファイル（Logo.png など）
│
├── components/              # 全画面で共通して使う「純粋なUIパーツ」
│   ├── Button.tsx           # (styledComponentsから昇格・統合も可)
│   ├── Dialog.tsx           # MessageDialogやTimeoutDialogの共通基盤
│   └── MenuAppBar.tsx
│
├── styledComponents/        # アプリ全体で共有する共通スタイル・レイアウト部品
│   ├── PageContainer.tsx
│   └── ...
│
├── cnxt/                    # グローバルなContext（AuthContextなど認証・最低限のものに絞る）
│   └── AuthContext.tsx
│
├── service/                 # GAS（サーバー）との通信層
│   ├── api.ts               # fetchやgoogle.script.runのラッパー
│   └── gasClient.ts
│
├── type/                    # アプリ全体で共有するTypeScriptの型定義
│   └── type.ts
│
# 👇 ここから「機能ごと」に完全に独立させる（Feature-based）
├── features/
│   │
│   ├── transactions/        # 【家計簿の記録・一覧機能】（一番複雑になりやすい部分）
│   │   ├── components/      # この機能専用のコンポーネント
│   │   │   ├── BudgeList.tsx
│   │   │   ├── BudgeListItem.tsx
│   │   │   ├── DataFormFields.tsx
│   │   │   └── forms/       # フォームの各パーツやメタ情報ごとの入力欄
│   │   │       ├── FormAmount.tsx
│   │   │       ├── FormCategory.tsx
│   │   │       ├── FormPaymentMethod.tsx
│   │   │       └── ...
│   │   ├── hooks/           # データ取得やフィルタリングのカスタムフック
│   │   │   └── useTransactions.ts
│   │   └── api/             # この機能固有のGAS呼び出し関数
│   │       └── transactionApi.ts
│   │
│   ├── analytics/           # 【分析・グラフ機能】
│   │   ├── components/      # PieChart, BudgeCategoryList など
│   │   └── hooks/           # グラフ用の集計ロジックなど
│   │
│   └── settings/            # 【設定・マスタ管理機能】
│       └── components/      # 設定画面まわりのコンポーネント
│
├── pages/                   # 【画面のエントリポイント】（中身は非常にシンプルにする）
│   ├── Add.tsx              # features/transactions のフォームを配置するだけ
│   ├── Analytics.tsx        # features/analytics のコンポーネントを配置するだけ
│   ├── Home.tsx             # features/transactions のリスト等を配置するだけ
│   ├── Login.tsx
│   ├── Pay.tsx
│   └── Settings.tsx
│
├── App.tsx                  # ルーティングやプロバイダの定義
└── main.tsx