import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons'; 
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/constants';

const HeaderBar = ({ showBack = false, searchValue, onSearchChange }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.black} />
        </TouchableOpacity>
      )}

      {!showBack && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.gray} style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Search dish for your party......"
            placeholderTextColor={COLORS.gray}
            style={styles.searchInput}
            value={searchValue}
            onChangeText={onSearchChange}
          />
        </View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse', // puts the search icon on the right
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 12,
    marginTop: 0,

    // subtle shadow like the screenshot
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 0,
    paddingRight: 8, // spacing so text doesn't collide with the right icon
  },
});

/**
 * Filter dishes by category, veg/non-veg, and search text
 */
export const filterDishes = (dishes, category, type, search) => {
  let filtered = [...dishes];

  // Filter by category
  if (category && category.toLowerCase() !== 'all') {
    filtered = filtered.filter(
      (dish) => dish.mealType.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by type (veg/non-veg)
  if (type) {
    filtered = filtered.filter(
      (dish) => dish.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Filter by search text (name + description)
  if (search && search.trim() !== '') {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query)
    );
  }

  return filtered;
};

/**
 * Count selected dishes per category
 */
export const countSelectedByCategory = (selectedIds, dishes) => {
  const counts = {};

  dishes.forEach((dish) => {
    const category = dish.mealType;
    if (!counts[category]) counts[category] = 0;
    if (selectedIds.includes(dish.id)) {
      counts[category] += 1;
    }
  });

  return counts;
};
