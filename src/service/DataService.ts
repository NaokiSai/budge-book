import { gasClient } from "./api";
import type { FetchDataResponse } from "@type/type";
import { jwtDecode } from 'jwt-decode';

/**
 * 
 * @param date
 * @returns 
 */
export const getData = async (date: string): Promise<FetchDataResponse | null> => {

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

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.fetchData(idToken, date, 'detail', timestamp, true);

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

export const PostEditData = async (data: string): Promise<FetchDataResponse | null> => {

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

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.PostData(idToken, data, timestamp, 'saveEdit');

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

export const PostUpdateData = async (data: string): Promise<FetchDataResponse | null> => {

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

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.PostData(idToken, data, timestamp, 'saveUpdate');

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


export const PostRemoveData = async (data: string): Promise<FetchDataResponse | null> => {

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

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. 通信実行（await で完了を待つ）
    const response = await gasClient.PostData(idToken, data, timestamp, 'remove');

    // GASClient側でエラーが返ってきた場合のチェック
    if (response.status === 'error') {
      throw new Error(response.message);
    }

    const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response));
    return dataTemp

  } catch (error) {
    console.error('データ削除に失敗しました:', error);
    // 必要ならここでユーザーにトースト通知などを出す
    return null;
  }

  return null; // データがない場合は null を返す
};

export const CheckDedlineToken = () => {

  // ローカルストレージからIDトークンを取得
  const idToken = localStorage.getItem('id_token');

  if (!idToken) {
    console.error('ログインが必要です');
    return { status: 'error', message: 'ログインが必要です', httpCode: 401, user: '' }; // ここでエラーオブジェクトを返すのも一つの方法です
  }

  // IDトークンの期限を確認する
  const decoded: { exp: number } = jwtDecode(idToken);
  const currentTime = Date.now() / 1000; // 秒単位

  // 期限の5分前には「期限切れ」とみなすと安全
  if (decoded.exp < (currentTime + 300)) {
    console.error('IDトークンが期限切れです。')
    return { status: 'error', message: 'IDトークンが期限切れです', httpCode: 419, user: '' }
  }

  return { status: 'success', message: '', httpCode: 200, user: '' }
}


export const getImage = async (targetPath: string): Promise<string | null> => {
  try {
    // 1. ローカルストレージからIDトークンを取得
    const idToken = localStorage.getItem('id_token');

    // 2. IDトークンの有無を確認
    if (!idToken) {
      console.error('ログインが必要です');
      return null;
    }

    // 3. IDトークンの期限を確認する
    const decoded: { exp: number } = jwtDecode(idToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < (currentTime + 300)) {
      console.error('IDトークンが期限切れです。');
      return null;
    }

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. gasClient（または fetch）を使ってGASへリクエスト
    // ※ gasClient側に image取得用のメソッドを生やすか、直接fetchする形にします
    // const gasUrl = "https://script.google.com/macros/s/YOUR_URL/exec";
    // const url = `${gasUrl}?option=image&id=${fileId}&id_token=${encodeURIComponent(idToken)}&timestamp=${timestamp}`;

    const response = await gasClient.fetchImage(idToken, targetPath, timestamp);

    if (response.status === 'error') {
      throw new Error(response.message);
    }

    // 5. 成功時は Base64 のデータURLを返す
    return response.data || null; // "data:image/png;base64,..."

  } catch (error) {
    console.error('画像の取得に失敗しました:', error);
    return null;
  }
};


export const getAllImages = async (): Promise<Record<string, string> | null> => {
  try {
    // 1. ローカルストレージからIDトークンを取得
    const idToken = localStorage.getItem('id_token');

    // 2. IDトークンの有無を確認
    if (!idToken) {
      console.error('ログインが必要です');
      return null;
    }

    // 3. IDトークンの期限を確認する
    const decoded: { exp: number } = jwtDecode(idToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < (currentTime + 300)) {
      console.error('IDトークンが期限切れです。');
      return null;
    }

    // タイムスタンプを作成
    const timestamp = new Date().getTime();

    // 4. gasClient（または fetch）を使ってGASへリクエスト
    // ※ gasClient側に image取得用のメソッドを生やすか、直接fetchする形にします
    // const gasUrl = "https://script.google.com/macros/s/YOUR_URL/exec";
    // const url = `${gasUrl}?option=image&id=${fileId}&id_token=${encodeURIComponent(idToken)}&timestamp=${timestamp}`;

    const response = await gasClient.fetchAllImages(idToken, timestamp);

    if (response.status === 'error') {
      throw new Error(response.message);
    }

    // 5. 成功時は Base64 のデータURLを返す
    return response.data || null; // "data:image/png;base64,..."

  } catch (error) {
    console.error('画像の取得に失敗しました:', error);
    return null;
  }
};