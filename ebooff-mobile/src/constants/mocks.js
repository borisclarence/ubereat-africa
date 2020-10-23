const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['products', 'inspirations'],
    count: 147,
    image: require('../assets/images/plants.png')
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['products', 'shop'],
    count: 16,
    image: require('../assets/images/seeds.png')
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['products', 'inspirations'],
    count: 16,
    image: require('../assets/images/flowers.png')
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['products', 'shop'],
    count: 17,
    image: require('../assets/images/sprayers.png')
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['products', 'inspirations'],
    count: 47,
    image: require('../assets/images/pots.png')
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['products', 'inspirations'],
    count: 47,
    image: require('../assets/images/fertilizers.png')
  },
];

const products = [
  {
    id: 1,
    name: '16 best products That go to your bedroom, if youy ',
    description: '',
    tags: ['Interior', '27m', 'Ideas'],
    gallery: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      // show only 3 images, show +3 for the rest
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ]
  }
];

const explore = [
  //images
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'boris',
  location: 'Paris'
  email:'reactifdev@gmail.com                                                        '
  avatar: require('../assets/images/avatar.png'),
  budget: 100000,
  monthly_cap: 500,
  notifications: true,
  newsletter: false,
};

export {
  categories,
  explore,
  products,
  profile,
}
