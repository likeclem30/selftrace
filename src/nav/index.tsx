import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import AuthScreen from '../screens/auth';
import PasswordResetScreen from '../screens/password-reset';
import SplashScreen from '../screens/splash';
import { AuthStatus } from '../data-types';
import { Theme, StackScreenOptions } from './config';

const Stack = createStackNavigator();

interface Props {
  authStatus: AuthStatus;
}

export default function Layout({ authStatus }: Props) {
  if (authStatus === AuthStatus.Checking) {
    return <SplashScreen />;
  }

  const isSignedOut = authStatus === AuthStatus.SignedOut;

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator screenOptions={StackScreenOptions}>
        {isSignedOut ? (
          <>
            <Stack.Screen
              name='AuthScreen'
              component={AuthScreen}
              options={{
                ...StackScreenOptions,
                headerShown: false,
                headerTitle: 'Sign in',
                animationTypeForReplace: isSignedOut ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name='PasswordResetScreen'
              component={PasswordResetScreen}
              options={{
                ...StackScreenOptions,
                headerTitle: 'Reset password',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name='BottomTab'
            component={BottomTab}
            options={{ ...StackScreenOptions, headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
