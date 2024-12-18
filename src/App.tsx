import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routes';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  console.log('pushing something from a branch other than main branch doesnt count as contribution?')
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
