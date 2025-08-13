import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../utils/constants';

const { height } = Dimensions.get('window');

export default function ViewMoreScreen({
  route,
  navigation,
  toggleSelect,
  selectedIds,
}) {
  const { dish } = route.params;
  const isSelected = selectedIds.includes(dish.id);

  const typeIcon =
    dish.type?.toLowerCase() === 'veg'
      ? require('../assets/veg.jpg')
      : require('../assets/non-veg.webp');

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.bottomSheet}>
            {/* Dish Image */}
            <Image source={{ uri: dish.image }} style={styles.image} />

            {/* Dish Info */}
            <View style={styles.infoContainer}>
              {/* Title Row */}
              <View style={styles.titleRow}>
                <View style={styles.titleLeft}>
                  <Image source={typeIcon} style={styles.typeIcon} />
                  <Text style={styles.title}>{dish.name}</Text>
                </View>

                {/* Add/Remove button */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    isSelected ? styles.removeButton : styles.addButton,
                  ]}
                  onPress={() => toggleSelect(dish.id)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isSelected ? styles.removeText : styles.addText,
                    ]}
                  >
                    {isSelected ? 'Remove' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cuisine + Description */}
              <Text style={styles.description}>
                <Text style={styles.cuisine}>{dish.cuisine} </Text>
                {dish.description}
              </Text>

              {/* Ingredient Link */}
              <TouchableOpacity
                style={styles.ingredientRow}
                onPress={() => navigation.navigate('Ingredients', { dish })}
              >
                <Text style={styles.ingredientIcon}>📜</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    minHeight: height * 0.45,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    margin: 5,
    width: '100%',
    aspectRatio: 2.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  typeIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginTop: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  // Button styles same as DishCard
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#E6F4EA',
    borderColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#FDECEA',
    borderColor: '#FF5A5A',
  },
  addText: {
    color: '#4CAF50',
  },
  removeText: {
    color: '#FF5A5A',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cuisine: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ingredientIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ingredientLink: {
    fontSize: 14,
    color: COLORS.orange || '#FFA500',
    fontWeight: '600',
  },
});
