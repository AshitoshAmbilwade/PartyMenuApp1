import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const BottomActionBar = ({ totalCount, onContinue }) => {
  return (
    <View style={styles.container}>
      {/* Total Count */}
      <Text style={styles.countText}>
        Total Selected: <Text style={styles.countNumber}>{totalCount}</Text>
      </Text>

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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  countNumber: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
