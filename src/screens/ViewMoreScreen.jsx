import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../utils/constants';

const { height } = Dimensions.get('window');

export default function ViewMoreScreen({ route, navigation, toggleSelect, selectedIds }) {
  const { dish } = route.params;
  const isSelected = selectedIds.includes(dish.id);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        {/* Stop click propagation inside the card */}
        <TouchableWithoutFeedback>
          <View style={styles.bottomSheet}>
            {/* Dish Image */}
            <Image source={{ uri: dish.image }} style={styles.image} />

            {/* Dish Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{dish.name}</Text>
              <Text style={styles.subTitle}>North Indian</Text>
              <Text style={styles.description}>{dish.description}</Text>

              {/* Actions */}
              <TouchableOpacity
                style={[styles.button, isSelected ? styles.removeButton : styles.addButton]}
                onPress={() => toggleSelect(dish.id)}
              >
                <Text style={styles.buttonText}>
                  {isSelected ? 'Remove' : 'Add'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Ingredients', { dish })}>
                <Text style={styles.ingredientLink}>Ingredient</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)', // dim background
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: height * 0.45,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
  infoContainer: {
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLORS.primary,
  },
  removeButton: {
    backgroundColor: COLORS.gray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  ingredientLink: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
