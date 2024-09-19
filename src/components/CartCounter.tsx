import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../hooks';
import {useNavigation} from '@react-navigation/native';

export default function CartCounter() {
  const totalItem = useAppSelector(state => state.cart.total_item);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btnCart}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('Cart' as never)}>
      <Icon name="cart" color={'orange'} size={35} />
      {totalItem != 0 && (
        <View style={styles.viewCounter}>
          <Text style={{textAlign: 'center', color: 'white'}}>{totalItem}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCounter: {
    backgroundColor: 'green',
    minWidth: 20,
    height: 20,
    borderRadius: 20 / 2,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btnCart: {
    width: 50,
    height: 50,
    backgroundColor: '#ffe4b3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
  },
});
