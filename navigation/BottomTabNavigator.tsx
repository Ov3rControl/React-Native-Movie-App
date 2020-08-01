import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="search1" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="shoppingcart" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return (
    <AntDesign
      size={30}
      color="black"
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: 'Home', headerTitleAlign: 'center' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerTitle: 'Search', headerTitleAlign: 'center' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="CartScreen"
        component={Cart}
        options={{ headerTitle: 'Cart', headerTitleAlign: 'center' }}
      />
    </TabThreeStack.Navigator>
  );
}
