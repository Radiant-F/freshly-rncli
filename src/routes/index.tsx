import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Cart, FruitDetail, Checkout, Demo} from '../screens';
import type {RootStackParamList} from './config';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarStyle: 'dark',
        statusBarColor: 'transparent',
        contentStyle: {
          backgroundColor: 'white',
          paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        },
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FruitDetail" component={FruitDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Demo" component={Demo} />
    </Stack.Navigator>
  );
}
