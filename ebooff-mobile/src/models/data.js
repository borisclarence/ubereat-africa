const Images = [
  {image: require('../../assets/restaurants/africain/thiephouse/poulet-yassa-plate.jpeg')},
  {image: require('../../assets/restaurants/asiatique/bol-chine/img-bolchine-resto.jpg')},
  {image: require('../../assets/restaurants/africain/saucetartare-africa/brochette-poisson-plate.jpg')},
  {image: require('../../assets/restaurants/asiatique/transushi/img-transushi-resto.jpeg')},
  {image: require('../../assets/restaurants/burger/burgerking/wrap-crispy-chicken.jpg')},
  {image: require('../../assets/restaurants/tacos/tacos-and-burger/tacos-kebab-plate.jpg')},
  {image: require('../../assets/restaurants/burger/fais-chez-wam/cheese-burger-poulet.jpeg')},
];

export const data = [
  {
    id: '1',
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'ThiepHouse',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[0].image,
    rating: 4,
    reviews: 99,
    categories: ['Africain'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '2',
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Bol-Chine',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[1].image,
    rating: 5,
    reviews: 102,
    categories: ['Asiatique'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '3',
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Saucetartare-Africa',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[2].image,
    rating: 3,
    reviews: 220,
    categories: ['Africain'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '4',
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Transushi',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[3].image,
    rating: 4,
    reviews: 48,
    categories: ['Asiatique'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '5',
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Burgerking',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[4].image,
    rating: 4,
    reviews: 178,
    categories: ['Burger'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '6',
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Tacos-And-Burger',
    description: `Heure de début: 09h, heure de fermeture: 23h 2500F à la livraison`,
    image: Images[0].image,
    rating: 4,
    reviews: 99,
    categories: ['Tacos'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
  {
    id: '7',
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Fais-Chez-Wam',
    description: `2500F à la livraison`,
    image: Images[1].image,
    rating: 5,
    reviews: 102,
    categories: ['Burger'],
    productone: {
      name: 'plate',
      price: '1500',
    },
  },
];
