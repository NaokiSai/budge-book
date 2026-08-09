import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material"
import { List } from "@styledComponents/List"
import type { ChartDataCategoryTotals } from "@type/type"
import { BudgeCategoryListItem } from "@components/BudgeCategoryListItem"
import { useData } from "@cnxt/DataContext";
import { BudgeCategoryListItemSkeleton } from "@components/BudgeCategoryListItemSkeleton";
import { useState } from "react";
import { BudgeList } from "./BudgeList";

const SKELETON_NUMBER = 6
// const COLORS = [
//   '#A4D4AE',
//   '#C7E296',
//   '#E4ED9F',
//   '#F8D67C',
//   '#FFC27A',
//   '#FFA478',
//   '#F28F79',
//   '#E67A82',
//   '#D17291'
// ]
const COLORS = [
  // --- 緑・アースカラー（追加） ---
  '#2C5F40', // 1. 【追加】より深みのあるフォレストグリーン（パレットの始まりを強調）
  '#4B8B60', // (元: 深い緑)

  // --- 黄・オレンジへの移行（追加） ---
  '#65964D', // 2. 【追加】中間を埋める草色
  '#7BA03E', // (元: オリーブグリーン)
  '#8A942C', // (元: マスタード)
  '#A09121', // 3. 【追加】マスタードとゴールデンイエローの中間

  // --- オレンジ・暖色（追加） ---
  '#B88E1A', // (元: ゴールデンイエロー)
  '#BF841D', // 4. 【追加】アンバー（琥珀色）を加え、オレンジへの移行を滑らかに
  '#C47A20', // (元: ダークオレンジ)
  '#C66C29', // 5. 【追加】焼けたようなオレンジ

  // --- レッド・赤茶（追加） ---
  '#C85D32', // (元: テラコッタ)
  '#C35534', // 6. 【追加】テラコッタとレッドオレンジのグラデーションを補間
  '#BF4D36', // (元: レッドオレンジ)
  '#B8463F', // 7. 【追加】より深く、少し茶色みを帯びた赤

  // --- ピンク・紫（追加） ---
  '#B13F48', // (元: ローズレッド)
  '#A13E51', // 8. 【追加】ローズレッドとワインマゼンタを滑らかにつなぐ
  '#923D5A', // (元: ワインマゼンタ)

  // --- 紫の深まり（追加） ---
  '#7B385D', // 9. 【追加】ワインマゼンタの先にある、より暗い紫
  '#5F304B'  // 10.【追加】最も深く、落ち着いたプラム色（パレットの終わりを引き締める）
];

type BudgeCategoryListProps = {
  data: ChartDataCategoryTotals[]
  openTimeoutDialog: boolean
  setOpenTimeoutDialog: (b: boolean) => void
}
export const BudgeCategoryList = (props: BudgeCategoryListProps) => {
  // const { loadingCtx } = useData();
  const { data, openTimeoutDialog = false, setOpenTimeoutDialog } = props
  console.log('BudgeCategoryList', data, openTimeoutDialog)
  const { dataCtx, loadingCtx, setSelectedDateCtx } = useData();
  // const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false)

  // ドロワーの開閉状態を管理
  const [open, setOpen] = useState(false);
  // クリックされたアイテムの情報を保持（任意）
  const [selectedItem, setSelectedItem] = useState('');

  const toggleDrawer = (newOpen: boolean, itemText: string) => {
    console.log(newOpen, itemText)
    setOpen(newOpen);
    setSelectedItem(itemText);
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      {!loadingCtx ? (
        data.length > 0 ?
          <List sx={{ py: 0, px: 2, width: 'calc(100% - 32px)', position: 'unset' }}>
            {data?.map((data: ChartDataCategoryTotals, index: number) => {
              // console.log(data, data.id, COLORS[data.id]);
              return (
                <BudgeCategoryListItem data={data} key={index} color={COLORS[index]} onClickdd={toggleDrawer} />
              );
            })}
          </List>
          :
          <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          </Stack>
      ) : (
        <List sx={{ px: 2, width: 'calc(100% - 32px)' }}>
          {[...Array(SKELETON_NUMBER)].map((_, index) => (
            <BudgeCategoryListItemSkeleton key={index} />
          ))}
        </List>
      )}
      {/* 右側から出てくるドロワー */}
      <Drawer
        variant='persistent'
        anchor="right"
        open={open}
        slotProps={{
          paper: {
            sx: {
              position: 'absolute', // 親のBoxに対して絶対配置
              height: '100%',        // 親の高さに合わせる
              width: 'fit-content',
              zIndex: 0
            }
          }
        }
        }
      >
        <Box
          sx={{ width: 'calc(100% - 36px)', p: 2 }}
          role="presentation"
        >
          <Button onClick={() => toggleDrawer(false, '')}>afafa</Button>
          <Typography variant="h6" gutterBottom>
            {selectedItem} の詳細
          </Typography>
          <Divider sx={{ my: 2 }} />
          <BudgeList setSelectedDate={setSelectedDateCtx} setOpenTimeoutDialog={setOpenTimeoutDialog} inputData={dataCtx} />
        </Box>
      </Drawer>
    </Box>
  )
}