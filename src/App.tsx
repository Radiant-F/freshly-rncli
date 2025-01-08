import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routes';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  console.log('dude, im not on windows alright i cant commit anything except this log')
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
