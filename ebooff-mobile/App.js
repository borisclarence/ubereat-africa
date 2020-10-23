import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import useLinking from './src/navigation/useLinking';

import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
/*import HomeScreen from './src/screens/HomeScreen';
import SpecialitiesScreen from './src/screens/SpecialitiesScreen';
import CommandsScreen from './src/screens/CommandsScreen';*/
import LocalizationScreen from './src/screens/LocalizationScreen';
import RatingScreen from './src/screens/RatingScreen';
//import ProfileScreen from './src/screens/ProfileScreen';

import { AuthContext } from './src/context/user-context';

import AsyncStorage from '@react-native-community/async-storage';
//import * as Splashs from 'expo-splash-screen';
import SplashScreen from './src/screens/SplashScreen';


const Stack = createStackNavigator();


export default function App(props) {
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);

   const CustomDefaultTheme = {
   ...NavigationDefaultTheme,
   ...PaperDefaultTheme,
   colors: {
     ...NavigationDefaultTheme.colors,
     ...PaperDefaultTheme.colors,
     background: '#ffffff',
     text: '#333333'
   }
 }

 const CustomDarkTheme = {
   ...NavigationDarkTheme,
   ...PaperDarkTheme,
   colors: {
     ...NavigationDarkTheme.colors,
     ...PaperDarkTheme.colors,
     background: '#333333',
     text: '#ffffff'
   }
 }

   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


   const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);
    const { skipLoadingScreen } = props;
    // const auth = useAuth();

    //YellowBox.ignoreWarnings(['Setting a timer']);


    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
      async function loadResourcesAndDataAsync() {
        try {
          SplashScreen.preventAutoHide();

          // Load our initial navigation state
          setInitialNavigationState(await getInitialState());

          // Load fonts
          await Font.loadAsync({
            ...Ionicons.font,
            'space-mono': require('./assets/SpaceMono-Regular.ttf'),
          });
        } catch (e) {
          // We might want to provide this error information to an error reporting service
          // console.warn(e);
        } finally {
          setLoadingComplete(true);
          SplashScreen.hide();
        }
      }

      loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !skipLoadingScreen) {
      return null;
    }



  return (
    <AuthContext>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#81101A',
                  }
                }}/>
                <Stack.Screen name="Signin" component={SigninScreen}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#81101A',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                 />
                <Stack.Screen name="Signup" component={SignupScreen}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#81101A',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                />
            </Stack.Navigator>
          </NavigationContainer>
      </View>
    </AuthContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
