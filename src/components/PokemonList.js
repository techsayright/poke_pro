import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import "../css/PokemonList.module.css";
import { AddToFav, RmvFrmFav } from "../redux/action/FavouriteAction";
import { particularPokoAddedAction } from "../redux/action/particularAddedAction";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import Fade from "react-reveal/Fade";

function PokemonList(props) {
  const { id, name, image } = props;

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const isAddedToFavrite = useSelector(
    (state) => state.url.particularPokoAdded
  );

  /******************* 
    @Purpose : for adding and removing poko from fav page
    @Parameter : {event obj}
    @Author : DARSH
    ******************/
  const btnHandler = (e) => {
    e.stopPropagation();
    dispatch(AddToFav({ ...props }));
    dispatch(particularPokoAddedAction(id));

    if (isAddedToFavrite[`${id}a`]) {
      dispatch(RmvFrmFav(id));
    }
  };
  return (
    <Fade bottom>
      <Card
        style={{ width: "18rem", cursor: "pointer" }}
        id={id}
        onClick={() => history.push(`${location.pathname}/${id}`)}
      >
        <Card.Img variant="top" src={image} alt="Pokemon" />
        <Card.Body>
          <Card.Title>
            {" "}
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Card.Title>
          <button
            style={{ border: "none", background: "transparent" }}
            onClick={btnHandler}
          >
            {isAddedToFavrite[`${id}a`] ? (
              <BsFillHeartFill color="red" size="30px" />
            ) : (
              <BsHeart size="30px" />
            )}
          </button>
        </Card.Body>
      </Card>
    </Fade>
  );
}

export default React.memo(PokemonList);
