import TextField, { type TextFieldProps} from "@mui/material/TextField"
import { styled } from "@mui/material"

export const StyledTextField = styled((props: TextFieldProps) => <TextField size="small" {...props} />)(({
  width: 200,
  ml: 'auto',
}))