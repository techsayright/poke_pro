import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PokemonList from "../components/PokemonList";
import Loader from "../assests/loader/Dual Ball.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokeData,
  pokeUrlAction,
  preUrlAction,
  runAPIAction,
} from "../redux/action/pokeAction";

export default function Pokemon() {
  const [loading, setLoading] = useState(null);
  const [err, setErr] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const dispatch = useDispatch();

  const CurrentUrl = useSelector((state) => state.url.CurrentUrl);
  const isItTimeToRunAPI = useSelector((state) => state.url.isItTimeToRunAPI);
  const pokemonList = useSelector((state) => state.url.pokeData);
  const preUrl = useSelector((state) => state.url.preUrl);

  /******************* 
    @Purpose : fetching data only when first time page render and current url changed
    @Parameter : {}
    @Author : DARSH
    ******************/
  useEffect(() => {
    if (!isItTimeToRunAPI) {
      return;
    }
    setErr(null);
    setLoading(true);
    let cancel;
    axios
      .get(CurrentUrl || "https://pokeapi.co/api/v2/pokemon?limit=20", {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        // console.log(res.data);
        setNextUrl(res.data.next);
        dispatch(preUrlAction(res.data.previous));

        let tempAry = [];
        res.data.results.forEach((element) => {
          axios.get(element.url).then((res) => {
            // console.log(res.data);
            tempAry.push(res.data);
            dispatch(addPokeData(tempAry));
          });
        });
        setLoading(false);
        dispatch(runAPIAction(false));
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.message);
        setErr(err.message);
      });

    return () => cancel();
  }, [CurrentUrl, isItTimeToRunAPI, dispatch]);

  /******************* 
    @Purpose : change current url to nexturl
    @Parameter : {}
    @Author : DARSH
    ******************/
  const nextUrlFetch = () => {
    dispatch(runAPIAction(true));
    dispatch(pokeUrlAction(nextUrl));
  };

  /******************* 
    @Purpose : change current url to pre url
    @Parameter : {}
    @Author : DARSH
    ******************/
  const preUrlFetch = () => {
    dispatch(runAPIAction(true));
    dispatch(pokeUrlAction(preUrl));
  };

  if ((loading || pokemonList.length === 0) && !err) {
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
    return err ? (
      <h1 className="text-center">{err}</h1>
    ) : (
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
