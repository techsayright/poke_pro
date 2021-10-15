import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RmvFrmFav } from "../redux/action/FavouriteAction";
import { particularPokoAddedAction } from "../redux/action/particularAddedAction";
import Zoom from "react-reveal/Zoom";

function FavoritePoke() {
  const history = useHistory();

  const favData = useSelector((state) => state.fav.favData);
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
            <Zoom bottom>
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
                    /******************* 
                  @Purpose : remove fav 
                  @Parameter : {e}
                  @Author : DARSH
                  ******************/
                    onClick={(e) => {
                      dispatch(RmvFrmFav(poke.id));
                      dispatch(particularPokoAddedAction(poke.id));
                      e.stopPropagation();
                    }}
                  >
                    Remove From Favourite
                  </button>
                </Card.Body>
              </Card>
            </Zoom>
          );
        })}
      </div>
    );
  }

  return content;
}

export default React.memo(FavoritePoke);
