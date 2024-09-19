import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  FruitDetail: {
    name: string;
    description: string;
    price_per_unit: number;
    color: string;
    amount: number;
    image: ImageSourcePropType | undefined;
  };
  Cart: undefined;
  Checkout: {transaction_url: string; order_id: string};
  Demo: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CartProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;
export type DemoProps = NativeStackScreenProps<RootStackParamList, 'Demo'>;
export type CheckoutProps = NativeStackScreenProps<
  RootStackParamList,
  'Checkout'
>;
export type FruitDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'FruitDetail'
>;
