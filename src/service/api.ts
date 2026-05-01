// api.ts (または GASClient をエクスポートするファイル)
import GASClient from './gasClient';

// 環境変数からURLを取得
const gasUrl = import.meta.env.VITE_GAS_URL; // Viteの場合
// const gasUrl = process.env.NEXT_PUBLIC_GAS_URL; // Next.jsの場合

if (!gasUrl) {
  console.log("Full Env Object:", import.meta.env);
  throw new Error("環境変数 VITE_GAS_URL が設定されていません。");
}

// ここで唯一のインスタンスを生成
export const gasClient = GASClient.getInstance(gasUrl);