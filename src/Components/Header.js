import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { useHistory } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "white",
      fontFamily: "Inter",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));


const Header = () => {

    const classes = useStyles();

    const history = useHistory();

    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#4da3e3",
          },
          type: "dark",
        },
    });
    
    return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
    <Container>
        <Toolbar>
            <Typography onClick={() => history.push(`/`)} variant="h7" className={classes.title}>Crypto Labs</Typography>
            <Select variant="outlined" 
            style={{
                width: 100,
                height: 40,
                marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
                <MenuItem value={'CAD'}>CAD</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
        </Toolbar>
    </Container>
    </AppBar>
    </ThemeProvider>
    )
};

export default Header;
