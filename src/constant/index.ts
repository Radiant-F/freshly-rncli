import {ImageSourcePropType} from 'react-native';

export type FruitDataTypes = {
  category: string;
  description: string;
  color: string;
  types: {
    name: string;
    description: string;
    price_per_unit: number;
    color: string;
    image: ImageSourcePropType;
    amount: number;
  }[];
}[];

export const FruitData: FruitDataTypes = [
  {
    category: 'Apples',
    description:
      'A versatile and popular fruit, available in many varieties with different flavors and textures.',
    color: '#FF4F4F',
    types: [
      {
        name: 'Honeycrisp',
        description:
          'Crisp and sweet with a juicy texture, a favorite for fresh eating.',
        price_per_unit: 30000,
        color: '#FF4F4F',
        image: require('../assets/images/apples/Honeycrisp.webp'),
        amount: 0,
      },

      {
        name: 'Red Delicious',
        description:
          'Sweet and juicy with a mild flavor, known for its deep red color.',
        price_per_unit: 18000,
        color: '#FF4F4F',
        image: require('../assets/images/apples/red-delicions-with-shadow.webp'),
        amount: 0,
      },
      {
        name: 'Granny Smith',
        description: 'Tart and crisp, perfect for baking and fresh eating.',
        price_per_unit: 22000,
        color: '#FF4F4F',
        image: require('../assets/images/apples/granny-smith.png'),
        amount: 0,
      },
      {
        name: 'Fuji',
        description: 'Sweet and crunchy, great for snacking and desserts.',
        price_per_unit: 27000,
        color: '#FF4F4F',
        image: require('../assets/images/apples/Fuji.webp'),
        amount: 0,
      },
    ],
  },
  {
    category: 'Mangoes',
    description:
      'A tropical fruit known for its juicy, sweet flavor and vibrant color.',
    color: '#FFA500',
    types: [
      {
        name: 'Alphonso',
        description: 'Sweet and fragrant, often called the king of mangoes.',
        price_per_unit: 45000,
        color: '#FFA500',
        image: require('../assets/images/mangoes/Alphonso.webp'),
        amount: 0,
      },
      {
        name: 'Kent',
        description: 'Rich and sweet with a smooth, fiberless texture.',
        price_per_unit: 38000,
        color: '#FFA500',
        image: require('../assets/images/mangoes/kent.webp'),
        amount: 0,
      },
      {
        name: 'Ataulfo',
        description: 'Small and creamy, with a rich and buttery flavor.',
        price_per_unit: 33000,
        color: '#FFA500',
        image: require('../assets/images/mangoes/ataulfo.webp'),
        amount: 0,
      },
      {
        name: 'Haden',
        description: 'Bright and sweet, with a slight tangy flavor.',
        price_per_unit: 42000,
        color: '#FFA500',
        image: require('../assets/images/mangoes/haden.webp'),
        amount: 0,
      },
    ],
  },
  {
    category: 'Grapes',
    description:
      'Small, sweet or tart fruits often used for snacking, juice, or wine.',
    color: '#6A0DAD',
    types: [
      {
        name: 'Red Globe',
        description: 'Large, firm grapes with a sweet, mild flavor.',
        price_per_unit: 45000,
        color: '#6A0DAD',
        image: require('../assets/images/grapes/red-globe.webp'),
        amount: 0,
      },
      {
        name: 'Concord',
        description:
          'Dark purple and very sweet, commonly used for juices and jams.',
        price_per_unit: 38000,
        color: '#6A0DAD',
        image: require('../assets/images/grapes/concord.png'),
        amount: 0,
      },
      {
        name: 'Thompson Seedless',
        description: 'Sweet, green grapes, perfect for snacking.',
        price_per_unit: 30000,
        color: '#6A0DAD',
        image: require('../assets/images/grapes/thompson-seedless.png'),
        amount: 0,
      },
      {
        name: 'Cotton Candy',
        description: 'Uniquely sweet, with a flavor resembling cotton candy.',
        price_per_unit: 52000,
        color: '#6A0DAD',
        image: require('../assets/images/grapes/cotton-candy.png'),
        amount: 0,
      },
    ],
  },
  {
    category: 'Oranges',
    description:
      'Citrus fruits known for their refreshing flavor and vitamin C content.',
    color: '#FFA07A',
    types: [
      {
        name: 'Mandarin',
        description: 'Small and sweet, easy to peel.',
        price_per_unit: 22000,
        color: '#FFA07A',
        image: require('../assets/images/oranges/mandarin.png'),
        amount: 0,
      },
      {
        name: 'Navel',
        description: 'Seedless and sweet, perfect for eating fresh.',
        price_per_unit: 27000,
        color: '#FFA07A',
        image: require('../assets/images/oranges/navel.webp'),
        amount: 0,
      },
      {
        name: 'Clementine',
        description: 'A hybrid variety, known for its juicy and sweet flavor.',
        price_per_unit: 24000,
        color: '#FFA07A',
        image: require('../assets/images/oranges/clementine.png'),
        amount: 0,
      },
      {
        name: 'Blood Orange',
        description: 'Rich and sweet with a hint of raspberry-like flavor.',
        price_per_unit: 30000,
        color: '#FFA07A',
        image: require('../assets/images/oranges/blood-orange.webp'),
        amount: 0,
      },
    ],
  },
  {
    category: 'Berries',
    description:
      'Small, juicy fruits, often eaten fresh or used in desserts and smoothies.',
    color: '#FF69B4',
    types: [
      {
        name: 'Strawberry',
        description: 'Sweet and juicy, perfect for fresh eating or desserts.',
        price_per_unit: 60000,
        color: '#FF69B4',
        image: require('../assets/images/berries/strawberry.png'),
        amount: 0,
      },
      {
        name: 'Blueberry',
        description: 'Sweet and slightly tart, great for snacking or baking.',
        price_per_unit: 52000,
        color: '#FF69B4',
        image: require('../assets/images/berries/blueberry.png'),
        amount: 0,
      },
      {
        name: 'Raspberry',
        description: 'Bright and tangy with a delicate texture.',
        price_per_unit: 67000,
        color: '#FF69B4',
        image: require('../assets/images/berries/raspberry.webp'),
        amount: 0,
      },
      {
        name: 'Blackberry',
        description: 'Deep and sweet with a slightly tart finish.',
        price_per_unit: 63000,
        color: '#FF69B4',
        image: require('../assets/images/berries/blackberry.webp'),
        amount: 0,
      },
    ],
  },
];
