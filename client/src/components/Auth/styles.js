import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    // marginTop: theme.spacing(8),
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: theme.spacing(2),
    padding: '1rem',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '1rem',
    },
  },
  avatar: {
    // margin: theme.spacing(1),
    margin: '1rem',
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
    marginTop: '1rem',
    popping: '0.5rem' 
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    marginTop: '0.5rem',
    marginBottom: '0.5rem' 
  },
  googleButton: {
    // marginBottom: theme.spacing(2),
    marginBottom: '1rem'
  },
}));