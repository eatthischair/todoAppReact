import { styled } from '@mui/material/styles';
import { FormControl } from '@mui/material';

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    '& fieldset': {
      borderRadius: '20px',
    },
  },
}));

export default CustomFormControl;
