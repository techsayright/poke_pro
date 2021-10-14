import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layouts/Header";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "react-bootstrap";
import Pokemon from "./pages/Pokemon";
import PokemonDetails from "./pages/PokemonDetails";
import FavoritePoke from "./pages/FavoritePoke";

function App() {
  return (
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
        </Switch>
      </section>
    </Container>
  );
}

export default App;
