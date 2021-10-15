import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../assests/loader/Dual Ball.png";
import Flash from "react-reveal/Flash";

function PokemonDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [DetailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  /******************* 
    @Purpose : fetching particular id poke
    @Parameter : {}
    @Author : DARSH
    ******************/
  useEffect(() => {
    setErr(null);
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        console.log(res.data);
        setDetailsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.message);
        setErr(err.message);
      });
  }, [id]);

  return (
    <React.Fragment>
      {(loading || DetailsData.length === 0) && !err ? (
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
      ) : err ? (
        <h1 className="text-center">{err}</h1>
      ) : (
        <Flash>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card className="my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white">
                <Card.Img
                  style={{ width: "15rem" }}
                  src={DetailsData.sprites.other.dream_world.front_default}
                  variant="top"
                  className="container"
                />

                <Card.Body>
                  <Card.Title style={{ color: "black" }}>
                    <strong>
                      {DetailsData.id}.
                      {DetailsData.name.charAt(0).toUpperCase() +
                        DetailsData.name.slice(1)}
                    </strong>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card
                className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
                style={{ border: "none" }}
              >
                <Card.Body>
                  <Card.Text>
                    <Row>
                      {DetailsData.types.map((t) => (
                        <Col key={t.type.name}>
                          <div
                            className={`${t.type.name} rounded px-4 py-1`}
                            style={{ color: "white" }}
                          >
                            {t.type.name.toUpperCase()}
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <Row>
                      <Col>
                        <Card.Img
                          style={{ width: "15rem" }}
                          src={DetailsData.sprites.front_default}
                        />
                        <Card.Text>Normal Form</Card.Text>
                      </Col>
                      <Col>
                        <Card.Img
                          style={{ width: "15rem" }}
                          src={DetailsData.sprites.front_shiny}
                        />
                        <Card.Text>Shiny Form</Card.Text>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div
                          className="px-4 py-1 rounded"
                          style={{ border: "1px black solid" }}
                        >
                          Abilities
                        </div>
                      </Col>
                    </Row>
                    <Row className="text-center">
                      {DetailsData.abilities.map((a) => (
                        <Col
                          key={a.ability.name}
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                        >
                          <div className={`rounded px-4 py-1`}>
                            {a.ability.name.toUpperCase()}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="text-center my-2">
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => history.go(-1)}
              >
                Back
              </button>
            </Col>
          </Row>
        </Flash>
      )}
    </React.Fragment>
  );
}

export default React.memo(PokemonDetails);
