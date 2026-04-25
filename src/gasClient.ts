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
  private gasUrl: string;
  private timeout: number = 30000;

  constructor(gasUrl: string) {
    this.gasUrl = gasUrl;
    console.log('📊 GAS クライアント初期化（/exec対応）');
  }

  /**
   * Google OAuth トークンを使用してログイン
   * 指定いただいた安定版 fetch 構成を採用
   */
  async login(accessToken: string): Promise<LoginResponse> {
    try {
      console.log('🔑 ログイン開始');

      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'login');
      url.searchParams.append('access_token', accessToken);

      // console.log('📡 ログインリクエストURL:', url.toString());
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
      console.log('✅ ログイン成功:', data);
      return data;
    } catch (error) {
      console.error('🔴 ログインエラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }

  /**
   * データを取得
   */
  async fetchData(accessToken: string, date: string, granularity: GranularityLevel = 'detail'): Promise<FetchDataResponse> {
    try {
      console.log('✅ データ取得開始');
      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'fetch');
      url.searchParams.append('access_token', accessToken);
      url.searchParams.append('date', date);
      url.searchParams.append('granularity', granularity);
      console.log('📡 データ取得リクエストURL:', url.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      // console.log('✅ データ取得成功:', await response.json());
      return await response.json();
    } catch (error) {
      console.error('🔴 データ取得エラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }

  /**
   * データを保存（データセット）
   * POSTリクエストもリダイレクト追跡を必須とする
   */
  async saveData(accessToken: string, data: any): Promise<SaveDataResponse> {
    try {
      console.log('💾 データ保存開始');

      const url = new URL(this.gasUrl);
      url.searchParams.append('option', 'save');
      url.searchParams.append('access_token', accessToken);

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
      console.log('✅ データ保存成功:', responseData);
      return responseData;
    } catch (error) {
      console.error('🔴 データ保存エラー:', error);
      return { status: 'error', message: String(error), httpCode: 0 };
    }
  }
}

export default GASClient;