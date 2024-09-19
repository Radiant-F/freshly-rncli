import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, Header} from '../components';
import {FruitData} from '../constant';
import {HomeProps} from '../routes/config';
import {useAppDispatch, useFormatIDR} from '../hooks';
import {addToCart} from '../redux/slices/cartSlice';

export default function Home({navigation}: HomeProps) {
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const filters: Array<string> = [
    'All',
    'Apples',
    'Mangoes',
    'Grapes',
    'Oranges',
    'Berries',
  ];

  // selected filter OR all
  const data =
    FruitData.filter(data => data.category == filters[selectedFilter])[0]
      ?.types || FruitData.map(category => category.types).flat();

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        columnWrapperStyle={{alignSelf: 'center'}}
        contentContainerStyle={styles.containerItem}
        numColumns={2}
        data={data}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          selectedFilter == 0 ? (
            <View style={styles.viewFooter}>
              <View style={styles.viewLine} />
              <Image
                source={require('../assets/png/basket.png')}
                resizeMethod="resize"
                style={{width: 40, height: 40}}
              />
              <View style={styles.viewLine} />
            </View>
          ) : null
        }
        ListHeaderComponent={
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.containerFilter}>
              {filters.map((filter, index) => {
                const isSelected = selectedFilter == index;
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    style={{
                      ...styles.btnFilter,
                      backgroundColor: isSelected ? '#ffbb3d' : '#ffe4b3',
                    }}
                    onPress={() => setSelectedFilter(index)}>
                    <Text style={{color: 'black', fontWeight: 'normal'}}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <TouchableNativeFeedback
              useForeground
              key={index}
              onPress={() => navigation.navigate('FruitDetail', item)}>
              <View
                style={{
                  ...styles.btnFruitCard,
                  backgroundColor: item.color ? item.color : 'purple',
                }}>
                <TouchableOpacity
                  style={styles.btnAddToCart}
                  activeOpacity={0.5}
                  onPress={() => dispatch(addToCart(item))}>
                  <Icon name="cart-plus" color={'white'} size={25} />
                </TouchableOpacity>
                <Gap flex={1} />
                <View style={styles.viewImgFruit}>
                  <Image
                    source={item.image}
                    resizeMethod="resize"
                    style={{width: '50%', height: '50%'}}
                  />
                </View>
                <View style={{margin: 15}}>
                  <Text style={styles.textFruitName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {useFormatIDR(item.price_per_unit)}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewImgFruit: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItem: {
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  textFruitName: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  viewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    flex: 1,
    opacity: 0.25,
  },
  viewLine: {
    borderWidth: 0.5,
    flex: 0.25,
    marginHorizontal: 15,
  },
  containerFilter: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  btnAddToCart: {
    width: 45,
    height: 45,
    backgroundColor: '#ffffff4d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    alignSelf: 'flex-end',
    margin: 10,
  },
  btnFruitCard: {
    backgroundColor: 'orange',
    width: '45%',
    maxWidth: 200,
    height: 200,
    borderRadius: 25,
    elevation: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    overflow: 'hidden',
    margin: 5,
  },
  btnFilter: {
    paddingHorizontal: 20,
    height: 35,
    justifyContent: 'center',
    borderBottomColor: 'orange',
    borderRadius: 35 / 2,
    elevation: 3,
    margin: 5,
  },
  btnCart: {
    width: 50,
    height: 50,
    backgroundColor: '#ffe4b3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
