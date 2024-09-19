import {Image, StyleSheet, Text, View} from 'react-native';
import Gap from './Gap';
import CartCounter from './CartCounter';

export default function Header() {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.viewHeader}>
        <Image
          source={require('../assets/png/app_logo.png')}
          resizeMethod="resize"
          style={{width: 50, height: 50}}
        />
        <CartCounter />
      </View>

      <Gap height={15} />

      <Text style={{fontSize: 16, color: 'black'}}>Seasonal</Text>
      <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
        Fresh Fruit from the Root
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    padding: 20,
    elevation: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    maxWidth: 520,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
