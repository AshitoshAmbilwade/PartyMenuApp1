import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

const DishCard = ({ dish = {}, isSelected, onToggleSelect, onViewIngredients }) => {
  const navigation = useNavigation();

  // Safe check: only run if dish exists
  const isVeg = dish?.type?.toLowerCase() === 'veg';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => dish?.id && navigation.navigate('ViewMore', { dish })}
    >
      {/* Left: Dish Info */}
      <View style={styles.infoContainer}>
        {/* Title with Veg/Non-Veg Icon */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {dish?.name || 'Unnamed Dish'}
          </Text>
          <Image
            source={
              isVeg
                ? require('../../assets/veg.jpg')
                : require('../../assets/non-veg.webp')
            }
            style={styles.vegNonVegIcon}
          />
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {dish?.description || 'No description available.'}{' '}
          <Text style={styles.readMore}>Read more</Text>
        </Text>

        {/* Ingredient link */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            dish?.id && onViewIngredients?.(dish);
          }}
        >
          <Text style={styles.ingredientLink}>🍽 Ingredient</Text>
        </TouchableOpacity>
      </View>

      {/* Right: Image with overlapping button */}
      <View style={styles.rightContainer}>
        <View style={styles.imageWrapper}>
          {dish?.image ? (
            <Image source={{ uri: dish.image }} style={styles.image} />
          ) : (
            <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 10, color: COLORS.gray }}>No Image</Text>
            </View>
          )}

          {/* Add/Remove button overlapping image bottom */}
          <TouchableOpacity
            style={[
              styles.button,
              isSelected ? styles.removeButton : styles.addButton,
            ]}
            onPress={(e) => {
              e.stopPropagation();
              dish?.id && onToggleSelect?.(dish.id);
            }}
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
      </View>
    </TouchableOpacity>
  );
};

export default DishCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginRight: 6,
  },
  vegNonVegIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  readMore: {
    color: COLORS.primary,
  },
  ingredientLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    backgroundColor: COLORS.lightGray,
  },
  button: {
    position: 'absolute',
    bottom: -10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
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
});
