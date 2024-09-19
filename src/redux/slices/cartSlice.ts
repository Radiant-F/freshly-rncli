import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageSourcePropType} from 'react-native';

type CartItem = {
  name: string;
  description: string;
  price_per_unit: number;
  color: string;
  amount: number;
  image: ImageSourcePropType | undefined;
};
type CartTypes = {
  item: CartItem[];
  total_item: number;
  total_price: number;
};

const initialState: CartTypes = {
  item: [],
  total_item: 0,
  total_price: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemToAdd = action.payload;
      const isExist = state.item.find(item => item.name == itemToAdd.name);

      if (isExist) {
        // increase the amount property to the existing item in the array
        const increasedAmountItem = state.item.map(item =>
          item.name == itemToAdd.name
            ? {...item, amount: item.amount + 1}
            : item,
        );

        // update cart item
        state.item = increasedAmountItem;

        // update total item
        state.total_item = increasedAmountItem.reduce(
          (acc, item) => acc + item.amount,
          0,
        );

        // update total price
        state.total_price = increasedAmountItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      } else {
        // add the amount property & add new item to the array
        const newItem = [{...itemToAdd, amount: 1}, ...state.item];

        // add item to cart
        state.item = newItem;

        // update total item
        state.total_item = newItem.reduce((acc, item) => acc + item.amount, 0);

        // update total price
        state.total_price = newItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      }
    },
    removeFromCart(state, action: PayloadAction<CartItem>) {
      const itemToSubstract = action.payload;
      const isExist = state.item.find(
        item => item.name == itemToSubstract.name,
      );

      if (isExist && itemToSubstract.amount != 1) {
        // decrease selected item amount
        const decreasedAmountItem = state.item.map(item =>
          item.name == itemToSubstract.name
            ? {...item, amount: item.amount - 1}
            : item,
        );

        // update cart with decreased selected item amount
        state.item = decreasedAmountItem;

        // update total price
        state.total_price = decreasedAmountItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      } else {
        const filteredItem = state.item.filter(
          item => item.name != itemToSubstract.name,
        );

        // remove item by filter
        state.item = filteredItem;

        // update total price
        state.total_price = filteredItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      }

      // update total item
      state.total_item = state.total_item - 1;
    },
    emptyTheCart(state) {
      state.item = [];
      state.total_item = 0;
      state.total_price = 0;
    },
  },
});

export const {addToCart, removeFromCart, emptyTheCart} = cartSlice.actions;

export default cartSlice.reducer;
