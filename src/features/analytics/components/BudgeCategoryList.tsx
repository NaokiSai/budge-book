import { List } from "@styledComponents/List"
import { BudgeCategoryListItem } from "./list/BudgeCategoryListItem"
import { BudgeCategoryListItemSkeleton } from "./list/BudgeCategoryListItemSkeleton";
import React from "react";
import type { CategoryGroup } from "../hooks/useTransactionAnalytics";
import { COLORS } from "@src/constants/color";

const SKELETON_NUMBER = 6

type BudgeCategoryListProps = {
  categoryGroups: CategoryGroup[]
  isLoading: boolean
  onClick: (index: number) => void
}

export const BudgeCategoryList = (props: BudgeCategoryListProps) => {

  const { isLoading, categoryGroups, onClick } = props

  // ドロワーの開閉状態を管理

  const handleClickCategory = (index: number) => {
    onClick(index);
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        categoryGroups.length > 0 &&
        <List sx={{ py: 0, px: 2, pb: 2, width: 'calc(100% - 32px)', position: 'unset' }}>
          {categoryGroups?.map((data, index) => {
            return (
              <BudgeCategoryListItem
                data={data.chartData}
                key={index}
                color={COLORS[index]}
                index={index}
                onClick={handleClickCategory} />
            );
          })}
        </List>
      ) : (
        <List sx={{ px: 2, width: 'calc(100% - 32px)' }}>
          {[...Array(SKELETON_NUMBER)].map((_, index) => (
            <BudgeCategoryListItemSkeleton key={index} />
          ))}
        </List>
      )}
    </React.Fragment>
  )
}