import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../modules/Home/HomeScreen';
import { QRScannerScreen } from '../modules/qr/QRScannerScreen';
import { CardManagementScreen } from '../modules/cardmanagement/CardManagementScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'QRScanner':
              iconName = 'qrcode-scan';
              break;
            case 'CardManagement':
              iconName = 'credit-card-multiple';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.light,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Ana Sayfa',
          headerTitle: 'PayHub'
        }}
      />
      <Tab.Screen 
        name="CardManagement" 
        component={CardManagementScreen}
        options={{ 
          title: 'Kartlarım',
          headerTitle: 'Kartlarım'
        }}
      />
      <Tab.Screen 
        name="QRScanner" 
        component={QRScannerScreen}
        options={{ 
          title: 'QR Tara',
          headerTitle: 'QR Kod Tarama'
        }}
      />
    </Tab.Navigator>
  );
};