import { styled } from "@mui/material/styles"
import Stack, { type StackProps } from "@mui/material/Stack"

export const StyledStack = styled((props: StackProps) => <Stack direction='row'  {...props} />
)(({
  width: '100%',
  alignItems: 'center'
}))