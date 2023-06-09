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
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../database/firebase';

const UserEdit = ({ navigation, route }) => {
  const { id, name, email, phone } = route.params;

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);

  const editUser = async () => {
    if (editName === '') {
      Alert.alert('Completar Nombre', 'Por favor introduce el nombre', [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else if (editEmail === '') {
      Alert.alert('Completar Email', 'Por favor introduce el email', [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else if (editPhone === '') {
      Alert.alert('Completar Teléfono', 'Por favor introduce el teléfono', [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      await setDoc(
        doc(db, 'users', id),
        {
          name: editName,
          email: editEmail,
          phone: editPhone,
        },
        {
          merge: true,
        }
      );
      Alert.alert('Usuario Actualizado', 'Usuario Actualizado Correctamente', [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Nombre de Usuario"
          onChangeText={(text) => setEditName(text)}
          value={editName}
        />
      </View>
      <View>
        <TextInput
          placeholder="Email de Usuario"
          onChangeText={(text) => setEditEmail(text)}
          value={editEmail}
        />
      </View>
      <View>
        <TextInput
          placeholder="Teléfono de Usuario"
          onChangeText={(text) => setEditPhone(text)}
          value={editPhone}
        />
      </View>
      <View>
        <Button title="Guardar Cambios" onPress={() => editUser()} />
      </View>
    </ScrollView>
  );
};

export default UserEdit;
