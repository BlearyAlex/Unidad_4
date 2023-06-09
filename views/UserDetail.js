import { View, Text, ActivityIndicator, Button } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { ListItem, Avatar } from '@rneui/base';

import { db } from '../database/firebase';
import { getDoc, doc } from 'firebase/firestore';

const UserDetail = ({ navigation, route }) => {
  const { id } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(nul);

  // Funcion para obtener un usuario de la base de datos
  const getUserById = async () => {
    const docRef = doc(db, 'users', id);
    const docDB = await getDoc(docRef);
    setUser(docDB.data());
    const { name, email, phone } = docDB.data();
    setIsLoading(false);
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            navigation.navigate('UserEdit', { id, name, email, phone })
          }
          title="Editar"
        />
      ),
      title: name, //Titulo de la pestaña
    });
  };

  useLayoutEffect(() => {
    if (user === null) {
      getUserById();
    }
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando Usuario...</Text>
      </View>
    );
  }

  return (
    <View>
      <ListItem key={user.id} onPress={() => navigation.navigate('UserList')}>
        <Avatar
          source={{ uri: 'hCps://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
          rounded
        />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default UserDetail;
