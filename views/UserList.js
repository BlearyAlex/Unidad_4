import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Avatar, Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

import { db } from '../database/firebase';
import { getDoc, collection, doc, deleteDoc } from 'firebase/firestore';

const UserList = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const dataColl = collection(db, 'users');
    const docsDB = await getDocs(dataColl);

    const readUsers = [];
    docsDB.forEach((doc) => {
      // console.log(doc.data);

      const { name, email, phone } = doc.data();
      readUsers.push({
        id: doc.id,
        name,
        email,
        phone,
      });
    });

    setUsers(readUsers);
    setLoading(false);
  };
  useEffect(() => {
    if (users.length > 0) return;
    setLoading(true);
    getUsers();
  }, [users]);

  async function onDelete(id) {
    Alert.alert('Eliminar Usuario', 'Realmente deseas eliminar el usuario', [
      {
        text: 'Ok',
        onPress: async () => {
          await deleteDoc(doc(db, 'users', id));
          setUsers([]);
        },
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }

  return (
    <View>
      {loading ? (
        <Text>Cargando Usuarios...</Text>
      ) : (
        <ScrollView>
          <Button
            title="Crear Usuario"
            onPress={() => {
              navigation.navigate('CreateUser');
            }}
          ></Button>
          {users.map((user) => {
            return (
              <ListItem
                key={user.id}
                bottomDivider
                onPress={navigation.navigate('UserList', { id: user.id })}
              >
                <ListItem.Chevron />
                <Avatar
                  source={{
                    uri: 'hCps://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
                  }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{user.name}</ListItem.Title>
                  <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                  <Button
                    type="clear"
                    onPress={() => {
                      onDelete(user.id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={25} color="red" />
                  </Button>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default UserList;
