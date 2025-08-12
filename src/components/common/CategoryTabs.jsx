import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, CATEGORIES } from '../../utils/constants';

const CategoryTabs = ({ selectedCategory, onSelectCategory, categoryCounts = {} }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.name;
          const count = categoryCounts?.[cat.name] || 0;

          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.tab, isActive ? styles.activeTab : styles.inactiveTab]}
              onPress={() => onSelectCategory(cat.name)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {cat.label} {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: 8,
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  inactiveTab: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  activeTabText: {
    color: COLORS.white,
  },
});
