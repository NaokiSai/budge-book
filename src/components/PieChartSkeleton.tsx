import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const PieChartSkeleton = () => {
  return (
    <Stack spacing={1} direction='row' sx={{ mx: 'auto', mt: 1, width: 'fit-content' }}>
      <Skeleton variant="circular" width={200} height={200} />
      <Stack spacing={1} sx={{ justifyContent: 'center' }}>
        {[...Array(8)].map((_, index) => (
          <Stack key={index} spacing={1} direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Skeleton variant="circular" width={10} height={10} />
            <Skeleton variant="text" sx={{ width: 80, fontSize: 10 }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
