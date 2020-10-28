import React from "react";
import { useHistory } from "react-router-dom";

export default function Card(props) {
  const history = useHistory();

  const openFullInfo = card => {
    console.log("card: ", card);
    history.push(`/card?${card.id}`);
  };

  return (
    <div
      onClick={() => openFullInfo(props.card)}
      className="card"
      key={props.card.id}
    >
      <img src={props.card.imageUrl} alt="" />
      <div className="name">{props.card.name}</div>
      <div className="artist">{props.card.artist}</div>
    </div>
  );
}
