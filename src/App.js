import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#1a1d3f",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  )
}

export default App;
