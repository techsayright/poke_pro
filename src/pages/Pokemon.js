import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PokemonList from "../components/PokemonList";
import Loader from "../assests/loader/Dual Ball.png";

export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [nextUrl, setNextUrl] = useState(null);
  const [preUrl, setPreUrl] = useState(null);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res.data);
        setNextUrl(res.data.next);
        setPreUrl(res.data.previous);

        let tempAry = [];
        res.data.results.forEach((element) => {
          axios.get(element.url).then((res) => {
            // console.log(res.data);
            tempAry.push(res.data);
            setPokemonList([...tempAry]);
          });
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    return () => cancel();
  }, [currentUrl]);

  const nextUrlFetch = () => {
    setCurrentUrl(nextUrl);
  };

  const preUrlFetch = () => {
    setCurrentUrl(preUrl);
  };

  if (loading || pokemonList.length === 0) {
    return (
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
    );
  } else {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {pokemonList.map((poke, index) => {
            return (
              <PokemonList
                key={index}
                id={poke.id}
                name={poke.name}
                image={poke.sprites.other.dream_world.front_default}
              />
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "50px 0",
          }}
        >
          <div>
            <Button
              variant="btn btn-danger"
              className="text-center btn-lg"
              onClick={nextUrlFetch}
            >
              Next
            </Button>
          </div>
          <div>
            {preUrl && (
              <Button
                variant="btn btn-warning"
                className="text-center btn-lg"
                onClick={preUrlFetch}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
