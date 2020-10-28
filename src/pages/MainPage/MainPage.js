import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import Header from "./../../components/Header/Header.js";
import Select from "react-select";
import Card from "../../components/Card/Card";

export default function MainPage() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const [cardsOnPage] = useState(5);
  const [startFrom, setStartFrom] = useState(0);

  const getCards = () => {
    fetch("https://api.pokemontcg.io/v1/cards")
      .then(response => response.json())
      .then(response => {
        setCards(response.cards);
        setSelectedCards(response.cards);
      });
  };

  const getTypes = () => {
    fetch("https://api.pokemontcg.io/v1/types")
      .then(response => response.json())
      .then(response => {
        return response.types.map((el, index) => {
          return {
            value: index,
            label: el
          };
        });
      })
      .then(types => {
        setTypes(types);
      });
  };

  const getSubtypes = () => {
    fetch("https://api.pokemontcg.io/v1/subtypes")
      .then(response => response.json())
      .then(response => {
        return response.subtypes.map((el, index) => {
          return {
            value: index,
            label: el
          };
        });
      })
      .then(subtypes => {
        setSubtypes(subtypes);
      });
  };

  useEffect(() => {
    getCards();
    getTypes();
    getSubtypes();
  }, []);

  const handleTypesChange = event => {
    const inputValue = event.label.replace(/\W/g, "");
    let selCards = [];
    cards.forEach(card => {
      if (card.types) {
        card.types.forEach(type => {
          if (type == inputValue) {
            selCards.push(card);
          }
        });
      }
    });

    setSelectedCards(selCards);
    toPage(0);
    return inputValue;
  };

  const handleSubtypesChange = event => {
    const inputValue = event.label.replace(/\W/g, "");
    let selCards = [];
    cards.forEach(card => {
      if (card.subtype && card.subtype == inputValue) {
        selCards.push(card);
      }
    });
    setSelectedCards(selCards);
    return inputValue;
  };

  function toPage(page) {
    setStartFrom(page * cardsOnPage);
  }

  return (
    <div className="main-page">
      <Header back={false} />
      <div className="pagination">
        {selectedCards.length
          ? selectedCards.map((el, index) => {
              let i;
              if (index === 0) {
                i = 0;
                return (
                  <a key={i} onClick={() => toPage(i)} href="#">
                    {i}
                  </a>
                );
              } else if ((index + 1) % 5 == 0) {
                i = (index + 1) / 5;
                return (
                  <a key={i} onClick={() => toPage(i)} href="#">
                    {i}
                  </a>
                );
              }
            })
          : ""}
      </div>

      <div className="content">
        <aside>
          <div className="type">
            <Select
              classNamePrefix="select"
              name="type"
              options={types}
              placeholder="Type"
              onChange={handleTypesChange}
            />
          </div>
          <div className="subtype">
            <Select
              classNamePrefix="select"
              name="subtype"
              placeholder="Subtype"
              options={subtypes}
              onChange={handleSubtypesChange}
            />
          </div>
        </aside>

        <main>
          {selectedCards.length
            ? selectedCards
                .slice(startFrom, startFrom + cardsOnPage)
                .map(card => {
                  return <Card card={card} key={card.id}></Card>;
                })
            : "Нет данных"}
        </main>
      </div>
    </div>
  );
}
