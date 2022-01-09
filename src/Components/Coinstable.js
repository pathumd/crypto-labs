import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';

const Coinstable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory();
    const { currency, symbol } = CryptoState();
    
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);
    
    const darkTheme = createTheme({
        palette : {
            primary: {
                main: "#52a7e7",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };

    const useStyles = makeStyles(() => ({
        row: {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#151738",
            },
            fontFamily: "Inter",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
              color: "#59ace9",
            },
          },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center" }}>
                <Typography variant="h4" style={{margin: 18, fontFamily: "Inter", marginTop: 80, fontWeight: "bold" }}>
                    Crypto Prices by Market Cap
                </Typography>
                <TextField label="Search for a cryptocurrency..." variant="outlined" style={{ marginBottom: 20, width: "50%", marginTop: 20 }} onChange={(e)=>setSearch(e.target.value)} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "#59ace9"}} />
                        ) : (
                            <Table style={{ width: "90%", margin: "0 auto", marginTop: 60 }}>
                                <TableHead>
                                    <TableRow>
                                        {["Coin", "Price", "24H Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "#f5f5f7",
                                                    fontWeight: "700",
                                                    fontFamily: "Inter",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                                >
                                                {head}
                                            </TableCell>
                  ))}
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>{handleSearch().slice((page - 1) * 10,(page - 1) * 10 + 10).map(row=>{
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow onClick={() => history.push(`/coins/${row.id}`)} className={classes.row} key={row.name}>
                                                <TableCell component='th' scope='row' style={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}>
                                                        <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                        >
                                                        {row.symbol}
                                                        </span>
                                                        <span style={{ color: "#626482" }}>
                                                        {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                align="right"
                                                style={{
                                                    color: profit > 0 ? "#5ac1a8" : "#e86370",
                                                    fontWeight: 500,
                                                }}
                                                >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right" style={{
                                                }}>
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}</TableBody>
                            </Table>
                    )}
                    
                </TableContainer>
                    <Pagination
                        style={{
                            padding: 20,
                            marginTop: 40,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        classes={{ ul: classes.pagination }} 
                        count={(handleSearch()?.length/10).toFixed(0)}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                        }}
                    />
            </Container>
        </ThemeProvider>
    )
};


export default Coinstable;
