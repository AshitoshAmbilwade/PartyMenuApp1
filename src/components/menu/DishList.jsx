import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import DishCard from './DishCard';
import { COLORS } from '../../utils/constants';

const DishList = ({ dishes, selectedIds, onToggleSelect, onViewIngredients }) => {
  const renderItem = ({ item }) => (
    <DishCard
      dish={item}
      isSelected={selectedIds.includes(item.id)}
      onToggleSelect={onToggleSelect}
      onViewIngredients={onViewIngredients}
    />
  );

  return (
    <View style={styles.container}>
      {dishes.length > 0 ? (
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No dishes found</Text>
        </View>
      )}
    </View>
  );
};

export default DishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
