import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { db } from '../database/firebase';

const CreateUser = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const SaveNewUser = async () => {
    if (name === '') {
      Alert.alert('Completar Nombre', 'Por favor introduce el nombre', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else if (email === '') {
      Alert.alert('Completar Email', 'Por favor introduce el email', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else if (phone === '') {
      Alert.alert('Completar Teléfono', 'Por favor introduce el teléfono', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      const dataColl = collection(db, 'users');
      const user = await addDoc(dataColl, {
        name: name,
        email: email,
        phone: phone,
      });
      Alert.alert(
        'Usuario Agregado',
        'Usuario agregado correctamente a la base de datos',
        [
          {
            text: 'Ok',
          },
        ]
      );
      navigation.navigate('UserList');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre del Usuario"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email del Usuario"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono del Usuario"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
      </View>
      <View>
        <Button title="Guardar" onPress={() => SaveNewUser()} />
      </View>
    </ScrollView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});
