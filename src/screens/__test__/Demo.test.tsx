import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function Demo() {
  const [amalan, setAmalan] = useState([
    {
      name: 'Amalan Satu',
      value: 0,
    },
    {
      name: 'Amalan Dua',
      value: 0,
    },
    {
      name: 'Amalan Tiga',
      value: 0,
    },
  ]);

  function setSelectedAmalan(indexAmalan: number) {
    console.log(indexAmalan);
    const newAmalan = amalan.map((itemAmalan, index) =>
      index == indexAmalan
        ? {...itemAmalan, value: itemAmalan.value == 0 ? 1 : 0}
        : itemAmalan,
    );
    setAmalan(newAmalan);
  }

  return (
    <View>
      {amalan.map((amalan, index) => (
        <Button
          onPress={() => setSelectedAmalan(index)}
          title={amalan.name}
          key={index}
          color={amalan.value == 1 ? 'dodgerblue' : 'tomato'}
        />
      ))}
      <Text>Demo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
