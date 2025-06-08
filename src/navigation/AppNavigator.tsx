import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../modules/Home/HomeScreen';
import { QRScannerScreen } from '../modules/qr/QRScannerScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }: { route: RouteProp<Record<string, object | undefined>, string> }) => ({
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            let iconName;

            switch (route.name) {
              case 'Ana Sayfa':
                iconName = 'home';
                break;
              case 'QR Tara':
                iconName = 'qrcode-scan';
                break;
              default:
                iconName = 'help';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary.main,
          tabBarInactiveTintColor: colors.text.light,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="QR Tara" component={QRScannerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};