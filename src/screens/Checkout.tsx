import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {CheckoutProps} from '../routes/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {Gap} from '../components';
import {useAppDispatch} from '../hooks';
import {emptyTheCart} from '../redux/slices/cartSlice';

export default function Checkout({navigation, route}: CheckoutProps) {
  const {transaction_url, order_id} = route.params;
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    if (
      transactionStatus.status == 'settlement' ||
      transactionStatus.status == 'pending'
    )
      return navigation.goBack();
  };

  // refer to https://docs.midtrans.com/reference/transaction-status
  const [transactionStatus, setTransactionStatus] = useState<{
    status: string;
    message: string;
  }>({
    status: '',
    message: 'Memeriksa transaksi...',
  });

  const [loading, setLoading] = useState(false);
  async function getTransactionStatus() {
    setLoading(true);
    setModalVisible(true);
    try {
      const response = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Basic U0ItTWlkLXNlcnZlci1ERFZ1Qm95aGNUakNqSk1oVTZYQV93U2U6',
          },
        },
      );
      if (response.data.status_code == '404') return navigation.goBack();

      const transaction_status = response.data.transaction_status;
      if (transaction_status == 'pending') {
        setTransactionStatus({
          status: response.data.transaction_status,
          message:
            'Transaction is pending. Dismiss this modal or press the back button to exit this page.',
        });
      } else if (transaction_status == 'settlement') {
        setTransactionStatus({
          status: response.data.transaction_status,
          message:
            'Transaction successful! Dismiss this modal or press the back button to exit this page.',
        });
        dispatch(emptyTheCart());
      } else {
        setTransactionStatus({
          status: response.data.transaction_status,
          message: 'Something went wrong with the transaction. Cek the logs.',
        });
        console.log(response);
      }

      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('ERROR RESPONSE:', error.response);
      } else console.log('ERROR SYNTAX:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const backAction = () => {
      getTransactionStatus();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView style={{flex: 1}} source={{uri: transaction_url}} />
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalOverlay} onPress={closeModal} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Icon name="account-cash" color={'black'} size={25} />
              <Text style={{color: 'black'}}>Transaction</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close-circle-outline" color={'black'} size={25} />
              </TouchableOpacity>
            </View>
            <Gap height={20} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.viewStatus}>
                {loading && (
                  <ActivityIndicator
                    animating={true}
                    color={'black'}
                    size={'large'}
                  />
                )}
                {transactionStatus.status == 'settlement' && (
                  <Icon name="cash-check" color={'green'} size={30} />
                )}
                {transactionStatus.status == 'pending' && (
                  <Icon name="cash-fast" color={'orange'} size={30} />
                )}
              </View>
              <Gap width={20} />
              <Text style={{color: 'black', flex: 1}}>
                {transactionStatus.message}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStatus: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    maxWidth: 450,
    alignSelf: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
});
