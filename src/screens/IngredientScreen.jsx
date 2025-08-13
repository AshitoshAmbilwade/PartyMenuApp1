import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import HeaderBar from '../components/common/HeaderBar';
import IngredientList from '../components/ingredient/IngredientList';
import { COLORS } from '../utils/constants';
import { useRoute } from '@react-navigation/native';

const IngredientScreen = () => {
  const route = useRoute();
  const { dish } = route.params;

  const dishIngredients = dish.ingredients || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Title */}
      <HeaderBar showBack={true} title="Ingredient list" />

      {/* Dish Info + Image in one row */}
      <View style={styles.headerSection}>
        {/* Left Side: Dish info + Ingredients heading */}
        <View style={styles.leftColumn}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {dish.name}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {dish.description}
          </Text>

          {/* Ingredients heading inside the same column */}
          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <Text style={styles.servesText}>For {dish.serves} people</Text>
          </View>
        </View>

        {/* Right Side: Static Image */}
        <Image
          source={require('../assets/image.png')}
          style={styles.dishImage}
          resizeMode="cover"
        />
      </View>

      {/* Separator line */}
      <View style={styles.separator} />

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
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
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
    marginBottom: 8,
  },
  dishImage: {
    width: 165,
    height: 198,
    marginLeft: 10,
  },
  ingredientsHeader: {
    marginTop: 50,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  servesText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray,
    opacity: 0.3,
    marginBottom: 8,
  },
});
