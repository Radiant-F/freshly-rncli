import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routes';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  console.log('update log 6')
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
