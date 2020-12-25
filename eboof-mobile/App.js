import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import Home from './src/screens/HomeScreen';
import Specialities from './src/screens/SpecialitiesScreen';
import Commands from './src/screens/CommandsScreen';
import Localization from './src/screens/LocalizationScreen';
import Rating from './src/screens/RatingScreen';
import Profile from './src/screens/ProfileScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Specialities" component={SpecialitiesScreen} />
          <Stack.Screen name="Commands" component={CommandsScreen} />
          <Stack.Screen name="Localization" component={LocalizationScreen} />
          <Stack.Screen name="Rating" component={RatingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
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
