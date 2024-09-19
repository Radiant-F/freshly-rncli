import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector, useFormatIDR} from '../hooks';
import {CartProps} from '../routes/config';
import {Gap} from '../components';
import {addToCart, removeFromCart} from '../redux/slices/cartSlice';
import axios from 'axios';

export default function Cart({navigation}: CartProps) {
  const {item: data, total_price} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  async function checkoutTransaction() {
    setLoading(true);
    try {
      const orderId = `YOUR-ORDERID-${new Date().getTime()}`;
      const response = await axios.post(
        'https://app.sandbox.midtrans.com/snap/v1/transactions',
        {
          transaction_details: {
            order_id: orderId,
            gross_amount: total_price,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: 'budi',
            last_name: 'pratama',
            email: 'budi.pra@example.com',
            phone: '08111222333',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Basic U0ItTWlkLXNlcnZlci1ERFZ1Qm95aGNUakNqSk1oVTZYQV93U2U6',
          },
        },
      );
      setLoading(false);
      // console.log('SUCCESS:', response.data);
      navigation.navigate('Checkout', {
        transaction_url: response.data.redirect_url,
        order_id: orderId,
      });
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('RESPONSE ERROR:', error.response?.data);
      } else console.log('SYNTAX ERROR:', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color={'black'} size={35} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Your Cart</Text>
      </View>
      <FlatList
        ListEmptyComponent={
          <Text style={styles.textEmpty}>Cart is empty! Go get some.</Text>
        }
        contentContainerStyle={styles.viewCartContainer}
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles.viewItem}>
              <Pressable
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                onPress={() => navigation.navigate('FruitDetail', item)}>
                <View style={styles.viewImage}>
                  <View
                    style={{...styles.imgOverlay, backgroundColor: item.color}}
                  />
                  <Image source={item.image} style={{width: 60, height: 60}} />
                </View>
                <Gap width={10} />
                <View style={{flex: 1}}>
                  <Text style={styles.textItemTitle}>{item.name}</Text>
                  <Text style={{color: 'black'}}>
                    {useFormatIDR(item.price_per_unit)}
                  </Text>
                </View>
              </Pressable>
              <TouchableOpacity
                style={styles.btnAmount}
                activeOpacity={0.5}
                onPress={() => dispatch(removeFromCart(item))}>
                <Icon
                  name={item.amount == 1 ? 'trash-can' : 'minus'}
                  color={'white'}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.textAmount}>{item.amount}</Text>
              <TouchableOpacity
                style={styles.btnAmount}
                activeOpacity={0.5}
                onPress={() => dispatch(addToCart(item))}>
                <Icon name="plus" color={'white'} size={20} />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {data.length != 0 && (
        <View style={styles.viewCheckout}>
          <Text style={styles.textTotalPrice}>
            Total Price:{' '}
            <Text style={{fontWeight: 'bold'}}>
              {useFormatIDR(total_price)}
            </Text>
          </Text>
          <Gap height={10} />
          <TouchableNativeFeedback useForeground onPress={checkoutTransaction}>
            <View style={styles.btnCheckout}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.textBtnTitle}>Checkout</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewCartContainer: {
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  textBtnTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
  viewCheckout: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  btnCheckout: {
    backgroundColor: 'orange',
    maxWidth: 480,
    width: '80%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 50 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textTotalPrice: {
    color: 'black',
    textAlign: 'right',
    marginHorizontal: 20,
    fontSize: 17,
    marginVertical: 5,
  },
  textAmount: {
    color: 'black',
    width: 30,
    textAlign: 'center',
  },
  btnAmount: {
    width: 30,
    height: 30,
    backgroundColor: '#ffc14d',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginVertical: 10,
  },
  textItemTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  imgOverlay: {
    width: 70,
    height: 70,
    borderRadius: 30,
    position: 'absolute',
    opacity: 0.5,
  },
  viewImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
  textTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btnGoBack: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
