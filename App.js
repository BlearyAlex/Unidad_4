import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import UserList from './views/UserList';
import CreateUser from './views/CreateUser';
import UserDetail from './views/UserDetail';
import UserEdit from './views/UserEdit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{ title: 'Listado de Usuarios' }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUser}
          options={{ title: 'Agregar Usuario' }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{ title: 'Detalle de Usuario' }}
        />
        <Stack.Screen
          name="UserEdit"
          component={UserEdit}
          options={{ title: 'Editar Usuario' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
