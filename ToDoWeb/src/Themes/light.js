import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#64B5F6',
            main: '#2196F3',
            dark: '#0D47A1',
            contrastText: '#fff',
            iconColour: '#444',
        },
        secondary: {
            light: '#EF9A9A',
            main: '#EF5350',
            dark: '#C62828',
            contrastText: '#fff',
        },
        titleBack: '#ddd',
        cardColour: '#fff',
        iconColour: 'black',
        pageBackground: '#eee',
        borderColour: 'rgba(0, 0, 0, 0.23)',
        textColour: '#000',
    },
    typography: {
        useNextVariants: true,
    },
    shape: {
        borderRadius: 8,
    },
});
