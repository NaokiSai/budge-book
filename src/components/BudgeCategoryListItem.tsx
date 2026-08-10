import { ListItemButton, Stack, Typography } from '@mui/material';
// import type { DataEntry } from '@type/type';
import type { ChartDataCategoryTotals } from '@type/type';
import { MASTERS } from '@service/master';
import { ListItem } from '@styledComponents/ListItem';
import { Image } from '@styledComponents/Image';
import React, { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

type BudgeCategoryListItemProps = {
  data: ChartDataCategoryTotals,
  color: string,
  onClickdd: (newOpen: boolean, itemText: string) => void
}
export const BudgeCategoryListItem = (props: BudgeCategoryListItemProps) => {
  const { data, color, onClickdd } = props

  // // ドロワーの開閉状態を管理
  // const [open, setOpen] = useState(true);
  // // クリックされたアイテムの情報を保持（任意）
  // const [selectedItem, setSelectedItem] = useState('');

  // const toggleDrawer = (newOpen: boolean, itemText: string = '') => () => {
  //   setOpen(newOpen);
  //   setSelectedItem(itemText);
  // };
  return (
    <ListItem sx={{ width: '100%', padding: 0 }}>
      <ListItemButton sx={{ padding: '8px 4px' }} onClick={() => {
        onClickdd(true, MASTERS.getPaymentCategoryName(data.label))
        console.log('dada')
      }}>
        <Stack direction="row" spacing={0} sx={{ width: '100%' }}>
          <Image src={`${BASE}images/${data.catid}.png`} sx={{ width: 36, height: 36, backgroundImageorderRadius: 1, my: 'auto !important' }} />
          <Stack direction="column" spacing={0.1} sx={{ flexGrow: 1, justifyContent: 'center', width: 'calc(100% - 36px)' }}>
            <Stack direction="row" sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: 12, ml: 2, mr: 'auto', color: color, fontWeight: 600 }}>
                {MASTERS.getPaymentCategoryName(data.label)}
              </Typography>
              <Typography sx={{ fontSize: 12, ml: 'auto', mr: 0, color: color, fontWeight: 600 }}>
                {Number(data.value).toLocaleString()}円
              </Typography>
              <Typography sx={{ fontSize: 12, ml: 1, mr: 0, width: 60, textAlign: 'right', color: color, fontWeight: 600 }}>
                {data.rate?.toFixed(1)}%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}