import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { COLORS } from '../../utils/constants';

const VegNonVegToggle = ({
  category = "Main Course",
  selectedCount = 0,
  selectedType,
  onSelectType,
}) => {
  const normalizedType = selectedType?.toLowerCase();
  const showVeg = normalizedType === 'veg';
  const showNonVeg = normalizedType === 'non-veg';

  // Animation refs (X position of thumb)
  const vegAnim = useRef(new Animated.Value(showVeg ? 18 : 2)).current;
  const nonVegAnim = useRef(new Animated.Value(showNonVeg ? 18 : 2)).current;

  // Animate when toggled
  useEffect(() => {
    Animated.timing(vegAnim, {
      toValue: showVeg ? 18 : 2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [showVeg]);

  useEffect(() => {
    Animated.timing(nonVegAnim, {
      toValue: showNonVeg ? 18 : 2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [showNonVeg]);

  return (
    <View style={styles.container}>
      {/* Left: Category + Count */}
      <Text style={styles.categoryText}>
        {category} Selected <Text style={styles.countText}>({selectedCount})</Text>
      </Text>

      {/* Right: Toggles */}
      <View style={styles.toggleRow}>

        {/* Veg Toggle */}
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={() => onSelectType(showVeg ? '' : 'VEG')}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.switchTrack,
              { borderColor: showVeg ? 'green' : COLORS.lightGray }
            ]}
          >
            <Animated.View style={[styles.switchThumb, { transform: [{ translateX: vegAnim }] }]}>
              <Image
                source={require('../../assets/veg.jpg')}
                style={styles.iconImage}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* Non-Veg Toggle */}
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={() => onSelectType(showNonVeg ? '' : 'NON-VEG')}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.switchTrack,
              { borderColor: showNonVeg ? 'red' : COLORS.lightGray }
            ]}
          >
            <Animated.View style={[styles.switchThumb, { transform: [{ translateX: nonVegAnim }] }]}>
              <Image
                source={require('../../assets/non-veg.webp')}
                style={styles.iconImage}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default VegNonVegToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  countText: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchTrack: {
    width: 40,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: 2,
    position: 'relative',
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    position: 'absolute',
    left: 0,
    marginTop: 8,
    marginBottom: 8,
    padding: 3
  },
  iconImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
