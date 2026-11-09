import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const CHART_SIZE = 200;
const LEGEND_ITEM_COUNT = 8;
const LEGEND_ITEM_WIDTH = 80;
const LEGEND_ITEM_CIRCULAR_SIZE = 10;
const LEGEND_ITEM_TEXT_FONT_SIZE = 10;

export const PieChartSkeleton = () => {
  return (
    <Stack
      spacing={1}
      direction='row'
      sx={{ mx: 'auto', mt: 1, width: 'fit-content' }}>
      <Skeleton
        variant="circular"
        width={CHART_SIZE}
        height={CHART_SIZE} />
      <Stack
        spacing={1}
        sx={{ justifyContent: 'center' }}>
        {[...Array(LEGEND_ITEM_COUNT)].map((_, index) => (
          <Stack
            key={index}
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Skeleton
              variant="circular"
              width={LEGEND_ITEM_CIRCULAR_SIZE}
              height={LEGEND_ITEM_CIRCULAR_SIZE} />
            <Skeleton
              variant="text"
              sx={{ width: LEGEND_ITEM_WIDTH, fontSize: LEGEND_ITEM_TEXT_FONT_SIZE }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
