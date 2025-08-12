import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import MenuScreen from '../screens/MenuScreen';
import IngredientScreen from '../screens/IngredientScreen';
import ViewMoreScreen from '../screens/ViewMoreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // ✅ Store selection state here so all screens share it
  const [selectedIds, setSelectedIds] = useState([]);

  // Toggle selection
  const toggleSelect = dishId => {
    setSelectedIds(prev =>
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId],
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Menu">
          {props => (
            <MenuScreen
              {...props}
              toggleSelect={toggleSelect}
              selectedIds={selectedIds}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Ingredients" component={IngredientScreen} />

        <Stack.Screen
          name="ViewMore"
          options={{
            headerShown: false,
            presentation: 'transparentModal', // ✅ overlay style
            animation: 'fade', // optional for smoothness
          }}
        >
          {props => (
            <ViewMoreScreen
              {...props}
              toggleSelect={toggleSelect}
              selectedIds={selectedIds}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
