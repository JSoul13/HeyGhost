import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SessionScreen from './src/screens/SessionScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LogsScreen from './src/screens/LogsScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import {ThemeProvider} from './src/context/ThemeContext';
import {SensorProvider} from './src/context/SensorContext';
import {AudioProvider} from './src/context/AudioContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <SensorProvider>
        <AudioProvider>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {backgroundColor: '#1a1a1a'},
                headerTintColor: '#ff6b6b',
                headerTitleStyle: {fontWeight: 'bold'},
              }}>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{title: 'Spirit Communicator'}}
              />
              <Stack.Screen 
                name="Session" 
                component={SessionScreen} 
                options={{title: 'Active Session'}}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{title: 'Settings'}}
              />
              <Stack.Screen 
                name="Logs" 
                component={LogsScreen} 
                options={{title: 'Session Logs'}}
              />
              <Stack.Screen 
                name="Premium" 
                component={PremiumScreen} 
                options={{title: 'Premium Features'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AudioProvider>
      </SensorProvider>
    </ThemeProvider>
  );
};

export default App;