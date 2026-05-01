/**
 * GAS API クライアント（/exec エンドポイント対応）
 * * 外部ホスティング（Vercel, Netlify等）からPWAとして実行することを想定
 */

// --- 型定義 ---
export type LoginResponse = {
  status: 'success' | 'error';
  message: string;
  user?: { id: string; email: string; name: string; permissions: string[] };
  httpCode: number;
};

export type FetchDataResponse = {
  status: 'success' | 'error';
  message: string;
  data?: { date: string; granularity: 'summary' | 'detail' | 'full'; count: number; entries: DataEntry[] };
  httpCode: number;
};

export type SaveDataResponse = {
  status: 'success' | 'error';
  message: string;
  data?: any;
  httpCode: number;
};

export type GranularityLevel = 'summary' | 'detail' | 'full';

export type DataEntry = {
  id?: string;
  date?: string;
  shop?: string;
  amount?: string;
  category?: string;
  paymentMethod?: string;
  paymentPerson?: string;
  isAdvancePayment?: string;
  memo?: string;
};

// --- クライアントクラス ---

class GASClient {
  private static instance: GASClient; // シングルトン用
  private gasUrl: string;
  // フロントエンド側での簡易キャッシュ（key: "2024-05", value: FetchDataResponse）
  private dataCache: Map<string, FetchDataResponse> = new Map();
  private abortController: AbortController | null = null; // ★追加

  // privateにして外部からの new を禁止
  private constructor(gasUrl: string) {
    this.gasUrl = gasUrl;
  }

  /**
   * インスタンスを取得する（シングルトン）
   */
  public static getInstance(gasUrl?: string): GASClient {
    if (!GASClient.instance) {
      if (!gasUrl) {
        throw new Error("初回初期化にはURLが必要です。");
      }
      GASClient.instance = new GASClient(gasUrl);
    }
    return GASClient.instance;
  }

  /**
   * キャッシュをクリアする（データ更新後などに呼ぶ）
   */
  public clearCache(): void {
    this.dataCache.clear();
  }

  /**
   * Google OAuth トークンを使用してログイン
   * 指定いただいた安定版 fetch 構成を採用
   */
  async login(id_token: string): Promise<LoginResponse> {
    try {
      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'login');
      url.searchParams.append('id_token', id_token);

      // 指定いただいた構成でのリクエスト
      const response = await fetch(url.toString(), {
        method: 'GET',     // GASへの初回アクセスはGETが最も安定
        mode: 'cors',
        redirect: 'follow', // 重要：リダイレクトを自動追跡
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('🔴 ログインエラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }

  /**
   * データを取得（キャッシュ対応版）
   */
  async fetchData(id_token: string, date: string, granularity: GranularityLevel = 'detail'): Promise<FetchDataResponse> {
    const cacheKey = `${date}_${granularity}`;

    // 1. キャッシュがあれば即座に返す（通信ゼロ）
    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey)!;
    }

    // ★ 新しいコントローラーを作成
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    try {
      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'fetch');
      url.searchParams.append('id_token', id_token);
      url.searchParams.append('date', date);
      url.searchParams.append('granularity', granularity);

      const response = await fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        signal, // ★追加
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const result = await response.json();

      // 2. 成功したらキャッシュに保存
      if (result.status === 'success') {
        this.dataCache.set(cacheKey, result);
      }

      return result;
    } catch (error) {
      console.error('🔴 データ取得エラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }
  /**
   * データを保存（データセット）
   * POSTリクエストもリダイレクト追跡を必須とする
   */
  async saveData(id_token: string, data: any): Promise<SaveDataResponse> {
    try {
      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'save');
      url.searchParams.append('id_token', id_token);

      const response = await fetch(url.toString(), {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow', // POST後の完了画面へのリダイレクトを追跡して結果を取得
        headers: {
          'Content-Type': 'text/plain', // CORSプリフライト回避のため
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('🔴 データ保存エラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }
}

export default GASClient;