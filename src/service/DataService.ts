import { gasClient } from "./api";
import type { FetchDataResponse } from "../type";

export const getDayData = async (date: string): Promise<FetchDataResponse | null> => {
  // 1. 開始時にローディングをON
  // setLoadin(true);

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('ログインが必要です');
      return { status: 'error', message: 'ログインが必要です', httpCode: 401, user: '' }; // ここでエラーオブジェクトを返すのも一つの方法です
    }

    // 2. 通信実行（await で完了を待つ）
    const response = await gasClient.fetchData(accessToken, date, 'detail');

    // GASClient側でエラーが返ってきた場合のチェック
    if (response.status === 'error') {
      throw new Error(response.message);
    }

    // データ更新
    if (response.data?.entries) {
      const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response)); // これで response を JSON オブジェクトとして扱えるようになります
      return dataTemp;
      // updateData(dataTemp.data.entries); 
    }

  } catch (error) {
    console.error('データ取得に失敗しました:', error);
    // 必要ならここでユーザーにトースト通知などを出す
    return null;
  }

  return null; // データがない場合は null を返す
};