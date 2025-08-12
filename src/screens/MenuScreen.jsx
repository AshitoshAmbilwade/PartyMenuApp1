import React, { useState, useMemo } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import HeaderBar from '../components/common/HeaderBar';
import CategoryTabs from '../components/common/CategoryTabs';
import VegNonVegToggle from '../components/common/VegNonVegToggle';
import DishList from '../components/menu/DishList';
import BottomActionBar from '../components/common/BottomActionBar';
import { COLORS, CATEGORIES, DISH_TYPES } from '../utils/constants';
import { filterDishes, countSelectedByCategory } from '../utils/filterUtils';
import dishesData from '../data/dishes.json';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  // State
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [selectedType, setSelectedType] = useState(null); // 'VEG' or 'NON_VEG'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Filtered dishes based on current filters
  const filteredDishes = useMemo(() => {
    return filterDishes(
      dishesData,
      selectedCategory,
      selectedType,
      searchQuery,
    );
  }, [selectedCategory, selectedType, searchQuery]);

  // Count per category for badges
  const categoryCounts = useMemo(() => {
    return countSelectedByCategory(selectedIds, dishesData);
  }, [selectedIds]);

  // Toggle dish selection
  const handleToggleSelect = dishId => {
    setSelectedIds(prev =>
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId],
    );
  };

  // Navigate to Ingredients screen
  const handleViewIngredients = dish => {
    navigation.navigate('Ingredients', { dish });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderBar searchValue={searchQuery} onSearchChange={setSearchQuery} />

      {/* Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Veg/Non-Veg Toggle */}
      <VegNonVegToggle
        category={selectedCategory} // ✅ pass selected category name
        selectedCount={categoryCounts[selectedCategory] || 0} // ✅ pass category-specific count
        selectedType={selectedType}
        onSelectType={type =>
          setSelectedType(prev => (prev === type ? null : type))
        }
      />

      {/* Dish List */}
      <View style={styles.listContainer}>
        <DishList
          dishes={filteredDishes}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onViewIngredients={handleViewIngredients}
        />
      </View>

      {/* Bottom Action Bar */}
      <BottomActionBar
        totalCount={selectedIds.length}
        onContinue={() => console.log('Continue pressed')}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
