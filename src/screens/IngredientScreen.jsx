import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import HeaderBar from '../components/common/HeaderBar';
import IngredientList from '../components/ingredient/IngredientList';
import { COLORS } from '../utils/constants';
import ingredientsData from '../data/ingredients.json';
import { useRoute } from '@react-navigation/native';

const IngredientScreen = () => {
  const route = useRoute();
  const { dish } = route.params; // Dish passed from MenuScreen

  // Find ingredients for this dish (mock data)
  const dishIngredients = ingredientsData[dish.id] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <HeaderBar showBack={true} />

      {/* Dish Info */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
      </View>

      {/* Ingredients List */}
      <IngredientList ingredients={dishIngredients} />
    </SafeAreaView>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  headerSection: {
    marginTop: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
});
