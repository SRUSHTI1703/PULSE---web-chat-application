import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import history from './Utilities/history';
import PrivateRoute from './Utilities/private-route';
import Home from './Home/Home';
import Chat from './Chat/Chat';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8b7cff',
            main: '#6c5ce7',
            dark: '#5546c7',
        },
        secondary: {
            light: '#ff9a9e',
            main: '#ff6b81',
            dark: '#e05268',
        },
        background: {
            default: '#080b14',
            paper: '#111522',
        },
        text: {
            primary: '#f5f7ff',
            secondary: '#9299ad',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
            >
                <Router history={history}>
                    <Route
                        path="/"
                        exact
                        component={Home}
                    />

                    <PrivateRoute
                        path="/chat"
                        component={Chat}
                    />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;