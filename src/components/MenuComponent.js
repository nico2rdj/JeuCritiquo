import React, { Component } from "react";
import { Media } from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        {
          id: 0,
          name: "Risk",
          image: "assets/images/risk.jpeg",
          category: "strategie",
          label: "Hot",
          price: "4.99",
          description:
            "Risk est une guerre à l’échelle planétaire. A la tête d’une armée d’une certaine couleur, vous devrez réussir une mission préalablement tirée au sort. Mais toutes vos manœuvres ne seront et ne se feront pas sans Risk…"
        },
        {
          id: 1,
          name: "Codenames",
          image: "assets/images/codeNames.png",
          category: "appetizer",
          label: "",
          price: "1.99",
          description:
            "Laissez-vous tenter par la version images de Codenames. Pour jouer, devinez ou faites deviner des Images plus loufoques les unes que les autres. Plus accessible que la version classique, Codenames Images garde la même profondeur de jeu tout en étant plus visuel."
        },
        {
          id: 2,
          name: "Huns",
          image: "assets/images/huns.png",
          category: "appetizer",
          label: "New",
          price: "1.99",
          description:
            "Vous voulez devenir le nouveau Khan, et gouverner les Huns ? Alors lancez des razzias, résistez aux fléaux, recrutez des mercenaires, gagnez des équipements, et découvrez de fabuleux trésors ! Cela vous aidera à amasser le plus imposant des magots, et vous sacrera Roi des Huns !"
        },
        {
          id: 3,
          name: "The mind",
          image: "assets/images/theMind.png",
          category: "dessert",
          label: "",
          price: "2.99",
          description:
            "Les joueurs doivent rassembler toutes les cartes qu'ils ont en main dans l'ordre croissant au milieu de la table, une par une. MAIS, vous n'êtes pas autorisé à révéler quoi que ce soit à propos de vos propres cartes !"
        }
      ]
    };
  }

  render() {
    const menu = this.state.games.map(game => {
      return (
        <div key={game.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media object src={game.image} alt={game.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{game.name}</Media>
              <p>{game.description}</p>
            </Media>
          </Media>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Media list>{menu}</Media>
        </div>
      </div>
    );
  }
}

export default Menu;
