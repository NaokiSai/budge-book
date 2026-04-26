import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'
import DateCalendarServerRequest from './DateCalendarServerRequest'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import type { DataEntry } from './type'
import { useEffect } from 'react'
import { BudgeListItem } from './conponents/BudgeListItem';
import { BudgeList } from './conponents/BudgeList';
import { useData } from './DataContext';
import { BudgeListItemSkelton } from './conponents/BudgeListItemSkelton'
import { getDayData } from './DataService'
import DeleteIcon from '@mui/icons-material/Delete';
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import { Stack } from '@mui/material'

function Home() {
  const { data, updateData, loading, setLoading } = useData();

  // useeffectでデータを取得する
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // 1. 開始時にローディングをON
    setLoading(true);

    try {
      // 日付計算（sv-SE フォーマットは YYYY-MM-DD になる）
      const date = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo'
      }).format(new Date());

      const dataTemp = await getDayData(date); // これも必要に応じて呼び出してください
      dataTemp !== null && dataTemp.data !== undefined && updateData(dataTemp.data.entries);
      dataTemp !== null && dataTemp.data !== undefined && console.log("取得したデータ:", dataTemp.data); // 取得したデータをコンソールに表示
    } catch (error) {
      console.error('データ取得に失敗しました:', error);
      // 必要ならここでユーザーにトースト通知などを出す
    } finally {
      // 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
      setLoading(false);
    }
  };

  // 合計金額を計算する
  const totalAmount = data?.reduce((sum, entry) => sum + Number(entry.amount), 0);

  // 左スワイプ時に表示されるアクション部分
  const trailingActions = (
    <SwipeAction onClick={() => {}}>
      <Stack
        sx={{
          backgroundColor: 'error.main',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          maxWidth: 64,
          height: '100%',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        <DeleteIcon />
        <Typography variant="button" sx={{ ml: 1 }}>削除</Typography>
      </Stack>
    </SwipeAction>
  );

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
          <SwipeableList>
            {data?.map((entry: DataEntry) => (loading ? (
              <BudgeListItemSkelton />
            ) : (
              <SwipeableListItem
                key={entry.id}
                trailingActions={trailingActions}
              >
                <BudgeListItem entry={entry} key={entry.id} />
              </SwipeableListItem>
            )))}
          </SwipeableList>
        </BudgeList>
      </Box>
      <SimpleBottomNavigation />
      <Box sx={{ minHeight: 56 }} />
    </Box>
  )
}

export default Home
