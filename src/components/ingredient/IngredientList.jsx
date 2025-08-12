import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const IngredientList = ({ ingredients }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {ingredients && ingredients.length > 0 ? (
        <FlatList
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>No ingredients available</Text>
      )}
    </View>
  );
};

export default IngredientList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  name: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  quantity: {
    fontSize: 14,
    color: COLORS.gray,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 20,
  },
});
