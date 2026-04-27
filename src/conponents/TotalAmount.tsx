import { Box, Typography } from "@mui/material";
import { useData } from "./../DataContext";

export const TotalAmount = () => {
  const { data } = useData();

  const totalAmount = data?.reduce((sum, entry) => sum + Number(entry.amount), 0);

  return (
    <Box sx={{ p: 0.5, backgroundColor: '#F5F5F5' }}>
      <Typography sx={{ width: 'fit-content', fontSize: 18, mx: 'auto' }}>
        {`合計金額: ${totalAmount?.toLocaleString()}円`}
      </Typography>
    </Box>
  )
}