import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layouts/Header";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "react-bootstrap";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./config/firebase";
import { AddToFavFrmFire } from "./redux/action/FavouriteAction";
import { particularPokoAddedActionFromFire } from "./redux/action/particularAddedAction";
import errImg from "../src/assests/404/404NotFound.gif";
import Loader from "../src/assests/loader/Dual Ball.png";

const Pokemon = lazy(() => import("./pages/Pokemon"));
const PokemonDetails = lazy(() => import("./pages/PokemonDetails"));
const FavoritePoke = lazy(() => import("./pages/FavoritePoke"));

let initial = true;
let initial1 = true;

function App() {
  const favData = useSelector((state) => state.fav.favData);
  const particularPokoAdded = useSelector(
    (state) => state.url.particularPokoAdded
  );
  const dispatch = useDispatch();

  /******************* 
    @Purpose : updating fire from redux (initially it will not)
    @Parameter : {}
    @Author : DARSH
    ******************/
  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    const favRef = firebase.database().ref("favBase");

    favRef.update({
      favData: favData,
      particularPokoAdded: particularPokoAdded,
    });
  }, [favData, particularPokoAdded]);

  /******************* 
    @Purpose : fetch data from fire at only once at first rendering
    @Parameter : {}
    @Author : DARSH
    ******************/
  useEffect(() => {
    if (initial1) {
      const favRef = firebase.database().ref("favBase");

      favRef.once("value", (snapshot) => {
        dispatch(AddToFavFrmFire(snapshot.val() ? snapshot.val().favData : []));
        dispatch(
          particularPokoAddedActionFromFire(
            snapshot.val() ? snapshot.val().particularPokoAdded : {}
          )
        );
      });

      initial1 = false;
    }
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "80vh",
            width: "70vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Loader} alt="Loader" height="250" width="250" />
        </div>
      }
    >
      <Container className="App">
        <header>
          <Header />
        </header>
        <section>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/pokemon" />
            </Route>
            <Route exact path="/pokemon" component={Pokemon} />
            <Route path="/pokemon/:id" component={PokemonDetails} />
            <Route path="/Favourite" component={FavoritePoke} />
            <Route
              path="*"
              render={() => {
                return (
                  <div align="center">
                    <h1 className="text-center" style={{ fontSize: "100px" }}>
                      404
                    </h1>
                    <img src={errImg} alt="404" style={{ cursor: "pointer" }} />
                  </div>
                );
              }}
            />
          </Switch>
        </section>
      </Container>
    </Suspense>
  );
}

export default App;
