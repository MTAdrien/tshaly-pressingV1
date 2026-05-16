const services = [
  {
    category: "Prestations vêtements",

    sections: [
      {
        title: "Vestes, manteaux et vêtements d’extérieur",

        items: [
          {
            name: "Blouson",
            description: "Nettoyage pressing et lavage professionnel pour blouson en coton ou matière synthétique.",
            price: 12.5
          },

          {
            name: "Blouson à capuche",
            description: "Lavage et entretien textile pour blouson à capuche toute matière.",
            price: 14
          },

          {
            name: "Blouson fourrure synthétique",
            description: "Nettoyage à sec professionnel pour blouson avec doublure ou fourrure synthétique.",
            price: 22
          },

          {
            name: "Doudoune",
            description: "Lavage pressing pour doudoune avec entretien du rembourrage textile.",
            price: 18
          },

          {
            name: "Doudoune à capuche",
            description: "Nettoyage professionnel pour doudoune à capuche toute matière.",
            price: 20.5
          },

          {
            name: "Parka",
            description: "Nettoyage textile et entretien pressing pour parka doublée.",
            price: 22
          },

          {
            name: "Parka à capuche",
            description: "Lavage et nettoyage professionnel pour parka à capuche.",
            price: 25
          },

          {
            name: "Manteau",
            description: "Nettoyage à sec professionnel pour manteau en laine ou coton.",
            price: 16.5
          },

          {
            name: "Manteau cachemire",
            description: "Nettoyage pressing délicat pour manteau en cachemire.",
            price: 22
          },

          {
            name: "Manteau fourrure synthétique",
            description: "Entretien textile et nettoyage professionnel pour manteau avec fourrure synthétique.",
            price: 22
          },

          {
            name: "Imperméable doublé",
            description: "Lavage et nettoyage textile pour imperméable doublé.",
            price: 15
          },

          {
            name: "Imperméable non doublé",
            description: "Nettoyage pressing pour imperméable léger toute matière.",
            price: 15
          }
        ]
      },

      {
        title: "Hauts",

        items: [
          {
            name: "T-shirt",
            description: "Lavage et repassage professionnel pour t-shirt coton.",
            price: 3.5
          },

          {
            name: "Polo",
            description: "Nettoyage pressing et repassage pour polo coton.",
            price: 4.4
          },

          {
            name: "Sweat-shirt à capuche",
            description: "Lavage textile et entretien professionnel pour sweat à capuche.",
            price: 7.5
          },

          {
            name: "Pull over simple",
            description: "Nettoyage et entretien textile pour pull en laine ou coton.",
            price: 6
          },

          {
            name: "Pull over cachemire / fantaisie",
            description: "Nettoyage délicat pour pull cachemire ou textile fantaisie.",
            price: 7.5
          },

          {
            name: "Gilet simple",
            description: "Lavage pressing et entretien professionnel pour gilet simple.",
            price: 5.5
          },

          {
            name: "Gilet fantaisie",
            description: "Nettoyage délicat pour gilet fantaisie ou textile sensible.",
            price: 15.5
          },

          {
            name: "Gilet de costume",
            description: "Nettoyage à sec et finition professionnelle pour gilet de costume.",
            price: 7
          },

          {
            name: "Chemisier simple",
            description: "Lavage et repassage pressing pour chemisier coton ou lin.",
            price: 4.4
          },

          {
            name: "Chemisier délicat",
            description: "Nettoyage délicat pour chemisier en soie ou matière sensible.",
            price: 8.2
          },

          {
            name: "Chemise sur cintre",
            description: "Nettoyage et repassage professionnel avec finition sur cintre.",
            price: 4.4
          },

          {
            name: "Chemise pliée",
            description: "Lavage pressing avec pliage professionnel.",
            price: 5.1
          }
        ]
      },

      {
        title: "Bas",

        items: [
          {
            name: "Pantalon",
            description: "Nettoyage pressing et repassage professionnel pour pantalon.",
            price: 7
          },

          {
            name: "Pantalon de ski",
            description: "Nettoyage technique pour pantalon de ski et textile extérieur.",
            price: 12.5
          },

          {
            name: "Short / Bermuda",
            description: "Lavage et entretien textile pour short ou bermuda.",
            price: 6
          },

          {
            name: "Jupe doublée",
            description: "Nettoyage pressing pour jupe doublée toute matière.",
            price: 7
          },

          {
            name: "Jupe non doublée",
            description: "Lavage professionnel pour jupe légère ou coton.",
            price: 7
          },

          {
            name: "Jupe plissée",
            description: "Nettoyage délicat et entretien professionnel pour jupe plissée.",
            price: 10.5
          }
        ]
      },

      {
        title: "Tenues et pièces spéciales",

        items: [
          {
            name: "Costume",
            description: "Nettoyage à sec professionnel pour costume homme ou femme.",
            price: 15
          },

          {
            name: "Combinaison de ski",
            description: "Nettoyage textile technique pour combinaison de ski.",
            price: 25.9
          },

          {
            name: "Pyjama (haut + bas – 2 pièces)",
            description: "Lavage et entretien textile pour pyjama coton.",
            price: 10
          },

          {
            name: "Pyjama soie / satin",
            description: "Nettoyage délicat pour pyjama en soie ou satin.",
            price: 20
          },

          {
            name: "Robe simple",
            description: "Nettoyage pressing professionnel pour robe simple.",
            price: 8
          },

          {
            name: "Robe doublée",
            description: "Lavage et entretien textile pour robe doublée.",
            price: 8
          },

          {
            name: "Robe délicate",
            description: "Nettoyage délicat pour robe en soie ou textile fragile.",
            price: 18
          },

          {
            name: "Robe de soirée",
            description: "Nettoyage pressing pour robe avec strass ou paillettes.",
            price: 35
          },

          {
            name: "Robe de mariage",
            description: "Nettoyage haut de gamme pour robe de mariée et textile délicat.",
            price: 145
          },

          {
            name: "Voile de mariée",
            description: "Nettoyage délicat et entretien professionnel pour voile de mariée.",
            price: 15
          }
        ]
      },

      {
        title: "Accessoires",

        items: [
          {
            name: "Cravate",
            description: "Nettoyage à sec professionnel pour cravate textile.",
            price: 5
          },

          {
            name: "Écharpe",
            description: "Lavage et entretien textile pour écharpe laine ou coton.",
            price: 10
          },

          {
            name: "Foulard",
            description: "Nettoyage délicat pour foulard soie ou textile léger.",
            price: 10
          },

          {
            name: "Chaussettes (paire)",
            description: "Lavage pressing et entretien textile quotidien.",
            price: 2.5
          },

          {
            name: "Caleçon / Slip / Culotte",
            description: "Lavage professionnel pour sous-vêtements coton ou synthétique.",
            price: 4
          },

          {
            name: "Peignoir",
            description: "Nettoyage pressing pour peignoir coton ou textile épais.",
            price: 12
          }
        ]
      }
    ]
  },

  {
    category: "Linge de maison",

    sections: [
      {
        title: "Literie",

        items: [
          {
            name: "Drap blanc",
            description: "Lavage professionnel pour drap blanc coton.",
            price: 4
          },

          {
            name: "Drap de couleur",
            description: "Nettoyage textile pour drap de couleur toute matière.",
            price: 4.8
          },

          {
            name: "Drap housse",
            description: "Lavage pressing pour drap housse coton ou jersey.",
            price: 4.8
          },

          {
            name: "Drap jersey ou flanelle",
            description: "Nettoyage textile délicat pour drap en jersey ou flanelle.",
            price: 8.5
          },

          {
            name: "Housse de couette",
            description: "Lavage et repassage professionnel pour housse de couette.",
            price: 9.5
          },

          {
            name: "Housse de couette délicate",
            description: "Nettoyage délicat pour housse de couette en textile sensible.",
            price: 23.5
          },

          {
            name: "Couette synthétique",
            description: "Lavage grand volume pour couette synthétique.",
            price: 27.5
          },

          {
            name: "Couette à plume",
            description: "Nettoyage professionnel pour couette à plume.",
            price: 38
          },

          {
            name: "Alèse coton",
            description: "Lavage et entretien textile pour alèse coton.",
            price: 9
          },

          {
            name: "Alèse plastifiée",
            description: "Nettoyage pressing pour alèse plastifiée.",
            price: 10
          },

          {
            name: "Dessus de lit simple",
            description: "Lavage professionnel pour dessus de lit simple.",
            price: 19
          },

          {
            name: "Dessus de lit épais",
            description: "Nettoyage textile pour dessus de lit épais.",
            price: 28
          },

          {
            name: "Dessus de lit molletonné",
            description: "Lavage grand format pour dessus de lit molletonné.",
            price: 35
          }
        ]
      },

      {
        title: "Linge de toilette et divers",

        items: [
          {
            name: "Serviette de toilette",
            description: "Lavage pressing pour serviette coton.",
            price: 5
          },

          {
            name: "Serviette de bain",
            description: "Nettoyage textile pour serviette de bain.",
            price: 8
          },

          {
            name: "Serviette de plage",
            description: "Lavage professionnel pour serviette de plage.",
            price: 8
          },

          {
            name: "Tapis de bain (petit)",
            description: "Nettoyage textile pour petit tapis de bain.",
            price: 4
          },

          {
            name: "Tapis de bain (grand)",
            description: "Lavage pressing pour grand tapis de bain.",
            price: 4
          },

          {
            name: "Couverture 1 personne / plaid",
            description: "Nettoyage grand volume pour couverture ou plaid.",
            price: 18
          },

          {
            name: "Couverture 2 personnes",
            description: "Lavage pressing pour couverture grand format.",
            price: 21
          },

          {
            name: "Sac de couchage synthétique",
            description: "Nettoyage professionnel pour sac de couchage synthétique.",
            price: 22
          },

          {
            name: "Sac de couchage à plume",
            description: "Nettoyage délicat pour sac de couchage à plume.",
            price: 32
          },

          {
            name: "Nappe",
            description: "Nettoyage et repassage professionnel pour nappe textile.",
            price: "Sur devis"
          }
        ]
      }
    ]
  },

  {
    category: "Retoucherie",

    sections: [
      {
        title: "Retouches et réparations",

        items: [
          {
            name: "Pose de bouton, attache ou fermoir",
            description: "Pose et remplacement de bouton ou fermoir textile.",
            price: 4.5
          },

          {
            name: "Petite retouche",
            description: "Ajustement textile et petite réparation couture.",
            price: 8
          },

          {
            name: "Ourlet pantalon simple",
            description: "Ourlet et ajustement professionnel pour pantalon.",
            price: 14
          },

          {
            name: "Ourlet jupe",
            description: "Retouche couture et ajustement de jupe.",
            price: 25
          },

          {
            name: "Entrejambe avec pièce",
            description: "Réparation couture avec renfort textile.",
            price: 22
          },

          {
            name: "Poche déchirée",
            description: "Réparation et couture professionnelle de poche déchirée.",
            price: 18
          },

          {
            name: "Fermeture éclair (jupe, pantalon, jean)",
            description: "Remplacement de fermeture éclair sur vêtement textile.",
            price: 25
          },

          {
            name: "Autre retouche",
            description: "Retouche couture et réparation textile sur devis.",
            price: "Sur devis"
          }
        ]
      }
    ]
  }
];