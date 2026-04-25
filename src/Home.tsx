import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'
import DateCalendarServerRequest from './DateCalendarServerRequest'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import GASClient from './gasClient';
import type { DataEntry, FetchDataResponse } from './type'
import { useEffect } from 'react'
import { BudgeListItem } from './BudgeListItem';
import { BudgeList } from './BudgeList';
import { useData } from './DataContext';
import Skeleton from '@mui/material/Skeleton';

function Home() {
  const { data, updateData } = useData();

  // useeffectでデータを取得する
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // onSuccess: async (tokenResponse) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('ログインが必要です');
      return;
    }

    // const date = new Date().toISOString().slice(0, 7); // "2026-04"
    // const date = new Date().toISOString().slice(0, 10); // "2026-04-25"
    // const date = new Intl.DateTimeFormat('sv-SE', {
    //   timeZone: 'Asia/Tokyo'
    // }).format(new Date());

    // 1. 現在の時刻を取得
    const targetDate = new Date();

    // 2. 今日をマークする（月を跨いでもJSが自動計算します）
    targetDate.setDate(targetDate.getDate());

    // 3. 日本時間で YYYY-MM-DD 形式にする
    const date = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Tokyo'
    }).format(targetDate);


    // console.log('リクエストする日付:', date);
    const gasClient = new GASClient('https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec');
    const response = await gasClient.fetchData(accessToken, date, 'detail');
    const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response)); // これで response を JSON オブジェクトとして扱えるようになります
    // console.log('取得したデータ:', dataTemp);
    updateData(dataTemp.data.entries);
    // }
  }

  // 合計金額を計算する
  const totalAmount = data?.reduce((sum, entry) => sum + Number(entry.amount), 0);

  return (
    <Box
      sx={{
        // 画面全体の高さからAppBarの高さを引く
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // 親はスクロールさせない
      }}
    >
      <Box>
        <MenuAppBar />
        <DateCalendarServerRequest />
        <Box sx={{ p: 0.5, backgroundColor: '#F5F5F5' }}>
          {data ? (
            <Typography sx={{ width: 'fit-content', fontSize: 18, mx: 'auto' }}>
              {`合計金額: ${totalAmount?.toLocaleString()}円`}
            </Typography>
          ) : (
            <Button sx={{ textTransform: 'none', mx: 'auto' }} variant='contained' onClick={() => getData()}>押下してデータを取得してください</Button>
          )}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <BudgeList>
          {data?.map((entry: DataEntry) => (data.length > 0 ?
            <BudgeListItem entry={entry} key={entry.id} />
            :
            <Skeleton />
          ))}
        </BudgeList>
      </Box>
      <SimpleBottomNavigation />
      <Box sx={{ minHeight: 56 }} />
    </Box>
  )
}

export default Home
