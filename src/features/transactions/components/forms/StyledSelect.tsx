import { styled } from "@mui/material/styles"
import Select, { type SelectProps} from "@mui/material/Select"

export const StyledSelect = styled((props: SelectProps) => <Select size="small" {...props} />)(({
  width: 200,
  ml: 'auto',
}))