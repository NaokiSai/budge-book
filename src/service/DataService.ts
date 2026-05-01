import { gasClient } from "./api";
import type { FetchDataResponse } from "@type/type";
import { jwtDecode } from 'jwt-decode';

export const getDayData = async (date: string): Promise<FetchDataResponse | null> => {

  try {
    // 1. ローカルストレージからIDトークンを取得
    const idToken = localStorage.getItem('id_token');

    // 2. IDトークンの有無を確認
    if (!idToken) {
      console.error('ログインが必要です');
      return { status: 'error', message: 'ログインが必要です', httpCode: 401, user: '' };
    }

    // 3. IDトークンの期限を確認する
    const decoded: { exp: number } = jwtDecode(idToken);
    const currentTime = Date.now() / 1000; // 秒単位
    // 期限の5分前には「期限切れ」とみなすと安全
    if (decoded.exp < (currentTime + 300)) {
      console.error('IDトークンが期限切れです。')
      return { status: 'error', message: 'IDトークンが期限切れです', httpCode: 419, user: '' };
    }

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.fetchData(idToken, date, 'detail');
    // GASClient側でエラーが返ってきた場合のチェック
    if (response.status === 'error') {
      throw new Error(response.message);
    }

    // 5. データ更新
    if (response.data?.entries) {
      const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response)); // これで response を JSON オブジェクトとして扱えるようになります
      return dataTemp;
    }

  } catch (error) {
    console.error('データ取得に失敗しました:', error);
    // 必要ならここでユーザーにトースト通知などを出す
    return null;
  }

  return null; // データがない場合は null を返す
};

export const PostData = async (data: string): Promise<FetchDataResponse | null> => {

  try {
    // 1. ローカルストレージからIDトークンを取得
    const idToken = localStorage.getItem('id_token');

    // 2. IDトークンの有無を確認
    if (!idToken) {
      console.error('ログインが必要です');
      return { status: 'error', message: 'ログインが必要です', httpCode: 401, user: '' }; // ここでエラーオブジェクトを返すのも一つの方法です
    }

    // 3. IDトークンの期限を確認する
    const decoded: { exp: number } = jwtDecode(idToken);
    const currentTime = Date.now() / 1000; // 秒単位
    // 期限の5分前には「期限切れ」とみなすと安全
    if (decoded.exp < (currentTime + 300)) {
      console.error('IDトークンが期限切れです。')
      return { status: 'error', message: 'IDトークンが期限切れです', httpCode: 419, user: '' }
    }

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.saveData(idToken, data);

    // GASClient側でエラーが返ってきた場合のチェック
    if (response.status === 'error') {
      throw new Error(response.message);
    }

    const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response));
    return dataTemp

  } catch (error) {
    console.error('データ取得に失敗しました:', error);
    // 必要ならここでユーザーにトースト通知などを出す
    return null;
  }

  return null; // データがない場合は null を返す
};
