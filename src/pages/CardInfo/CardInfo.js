import React, { useEffect, useState } from "react";
import "./CardInfo.scss";
import Header from "./../../components/Header/Header";
import { useHistory } from "react-router-dom";

export default function CardInfo() {
  const history = useHistory();
  const [card, setCard] = useState({});

  const getCardInfo = () => {
    let id = history.location.search.slice(1);

    fetch(`https://api.pokemontcg.io/v1/cards?id=${id}`)
      .then(response => response.json())
      .then(card => {
        setCard(card.cards[0]);
      });
  };

  useEffect(() => {
    getCardInfo();
  }, []);

  return (
    <div className="card-info">
      <Header back={true}></Header>
      <main>
        <div className="upper-info">
          <img src={card.imageUrlHiRes} alt="" />
          <div className="properties">
            <p>{card.name}</p>
            <p>{card.types}</p>
            <p>{card.subtype}</p>
            <hr />
            {card.attacks
              ? card.attacks.map(el => {
                  return (
                    <div className="attacks">
                      <p>{el.name}:</p>
                      <p>{el.cost}</p>
                      <p>{el.damage}</p>
                      <hr />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="bottom-info">
          <p>{card.text}</p>
        </div>
      </main>
    </div>
  );
}
