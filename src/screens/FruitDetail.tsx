import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import type {FruitDetailProps} from '../routes/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartCounter, Gap} from '../components';
import {useAppDispatch, useFormatIDR, useOrientation} from '../hooks';
import {addToCart} from '../redux/slices/cartSlice';

export default function FruitDetail({navigation, route}: FruitDetailProps) {
  const dispatch = useAppDispatch();
  const fruit = route.params;
  const orientation = useOrientation();

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flex: orientation == 'portrait' ? 1 : 0}}>
        <View style={styles.viewImage}>
          <Image
            source={fruit.image}
            resizeMethod="resize"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.viewHeader}>
          <TouchableOpacity
            style={styles.btnGoBack}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={'black'} size={35} />
          </TouchableOpacity>
          <CartCounter />
        </View>

        <Gap height={20} />

        <View style={styles.viewDetail}>
          <Text style={styles.textFruitName}>{fruit.name}</Text>
          <View style={styles.viewDetailRatingStock}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={'star'} color={'gold'} size={25} />
              <Icon name={'star'} color={'gold'} size={25} />
              <Icon name={'star'} color={'gold'} size={25} />
              <Icon name={'star-half-full'} color={'gold'} size={25} />
              <Icon name={'star-outline'} color={'gold'} size={25} />
            </View>
            <Text style={{color: 'black'}}>Stock: 20</Text>
          </View>

          <Text style={{color: 'black'}}>{fruit.description}</Text>

          <Gap flex={1} height={20} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPrice}>
              {useFormatIDR(fruit.price_per_unit, true)}
            </Text>
            <Gap width={20} />
            <TouchableNativeFeedback
              useForeground
              onPress={() => dispatch(addToCart(fruit))}>
              <View
                style={{...styles.btnAddToCart, backgroundColor: fruit.color}}>
                <Icon name="cart-plus" color={'white'} size={20} />
                <Gap width={5} />
                <Text style={styles.textBtn}>Add to Cart</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeaderTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: 0,
    padding: 20,
  },
  btnGoBack: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrice: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
  btnAddToCart: {
    backgroundColor: 'orange',
    height: 50,
    borderRadius: 25,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  viewDetailRatingStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textFruitName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  viewDetail: {
    backgroundColor: 'white',
    elevation: 10,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  viewImage: {
    width: '100%',
    height: 400,
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
