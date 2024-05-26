/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Welcome from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import Profile from './src/screens/Profile';
import Input from './src/screens/Input';
import {useState, useEffect} from 'react';
import {Text} from 'react-native';

// define new stack navigator and use Stack to create stack navigator in App
const Stack = createStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  // declare state variable user
  const [user, setUser] = useState();

  // Handle user state changes based on auth state changes
  function onAuthStateChanged(user) {
    // sets  user state variable to value passed as user parameter
    // updates state with new user object
    setUser(user);
    if (initializing) {
      // finish initializing app by setting it to false
      setInitializing(false);
    }
  }

  useEffect(() => {
    // subscribe to auth state changes, to see changes such as sign in or out
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // app returns null if still initializing
  if (initializing) {
    return null;
  }

  // screens that are only accessible once a user exists / logs in
  if (user) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Input" component={Input} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  // the general screens you can see without logging in
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
