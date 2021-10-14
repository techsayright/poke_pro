import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import "../css/PokemonList.module.css";
import { AddToFav } from "../redux/action/FavouriteAction";

export default function PokemonList(props) {
  const { id, name, image } = props;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(props);
  return (
    <Card
      style={{ width: "18rem", cursor: "pointer" }}
      id={id}
      onClick={() => history.push(`${location.pathname}/${id}`)}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title> {name.charAt(0).toUpperCase() + name.slice(1)}</Card.Title>
        <Button
          variant="primary"
          onClick={(e) => {
            dispatch(AddToFav({ ...props }));
            e.stopPropagation();
          }}
        >
          Add to Favourite
        </Button>
      </Card.Body>
    </Card>
  );
}
