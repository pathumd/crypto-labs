import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {
        
    },
    bannerContent: {
        height: 520,
        width: "100%",
        backgroundColor: "#151738",
        display: "flex",
        flexDirection: "column",
        paddingTop: 120,
        paddingBottom: 50,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        paddingBottom: 20,
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}));

const Banner = () => {
    
    const classes = useStyles();
    return <div className={classes.Banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant="h2" style={{fontWeight: "bold", marginBottom: 15, fontFamily: "Inter",}}>
                    Track your crypto today.
                </Typography>
                <Typography variant="subtitle2" style={{color: "#626482", fontFamily: "Inter",}}>
                    Get the most up-to-date info for your favorite cryptocurrency.
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
};

export default Banner;
