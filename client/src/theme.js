import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#a2c493',
        },
        secondary: {
            main: '#dddddd',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    overrides: {
        MuiButton : {
            text: { textTransform: 'none'}
        }
    }
});

export default theme;
