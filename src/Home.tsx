import MenuAppBar from './MenuAppBar'
import SimpleBottomNavigation from './SimpleBottomNavigation'
import DateCalendarServerRequest from './DateCalendarServerRequest'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { BudgeList } from './conponents/BudgeList';
import { useData } from './DataContext';
import { getDayData } from './service/DataService'
import { TotalAmount } from './conponents/TotalAmount';
import { PageContainer } from './styledComponents/PageContaner';

function Home() {
  const { updateData, setLoading } = useData();

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

  return (
    <PageContainer>
      <Box>
        <MenuAppBar />
        <DateCalendarServerRequest />
        <TotalAmount />
      </Box>
      <BudgeList />
      <SimpleBottomNavigation />
      <Box sx={{ minHeight: 56 }} />
    </PageContainer>
  )
}

export default Home
