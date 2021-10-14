import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RmvFrmFav } from "../redux/action/FavouriteAction";

export default function FavoritePoke() {
  const favData = useSelector((state) => state.fav.favData);
  const history = useHistory();
  const dispatch = useDispatch();

  let content = null;
  if (favData.length === 0) {
    content = <h1 className="text-center">No Favourite Added till Now</h1>;
  } else {
    content = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {favData.map((poke, index) => {
          console.log(poke);
          return (
            <Card
              key={index}
              style={{ width: "18rem", cursor: "pointer" }}
              onClick={() => history.push(`/pokemon/${poke.id}`)}
            >
              <Card.Img variant="top" src={poke.image} />
              <Card.Body>
                <Card.Title>
                  {" "}
                  {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                </Card.Title>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    dispatch(RmvFrmFav(poke.id));
                    e.stopPropagation();
                  }}
                >
                  Remove From Favourite
                </button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }

  return content;
}
