import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const BottomActionBar = ({ totalCount, onContinue }) => {
  return (
    <View style={styles.container}>
      {/* Top Row: Total Count + Chevron */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>
          Total Dish Selected <Text style={styles.countNumber}>{totalCount}</Text>
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F2', // same cream background
    borderTopWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  countNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E4',
    marginVertical: 10,
  },
  button: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
