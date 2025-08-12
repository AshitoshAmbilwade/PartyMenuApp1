/**
 * Filter dishes by category, veg/non-veg, and search text
 * @param {Array} dishes - list of all dishes
 * @param {String} category - selected category name
 * @param {String} type - selected type ('veg' or 'non-veg')
 * @param {String} search - search query
 */
export const filterDishes = (dishes, category, type, search) => {
  let filtered = dishes;

  // Filter by category (check mealType first, then category)
  if (category) {
    filtered = filtered.filter((dish) =>
      ((dish.mealType || dish.category) || '')
        .toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by type (veg/non-veg) - handle missing type gracefully
  if (type) {
    filtered = filtered.filter(
      (dish) => (dish.type || '').toLowerCase() === type.toLowerCase()
    );
  }

  // Filter by search text
  if (search && search.trim() !== '') {
    const query = search.toLowerCase();
    filtered = filtered.filter((dish) =>
      (dish.name || '').toLowerCase().includes(query)
    );
  }

  return filtered;
};

/**
 * Count selected dishes per category
 * @param {Array} selectedIds - array of selected dish IDs
 * @param {Array} dishes - list of all dishes
 */
export const countSelectedByCategory = (selectedIds, dishes) => {
  const counts = {};

  dishes.forEach((dish) => {
    const category = dish.mealType || dish.category || 'Uncategorized';
    if (!counts[category]) counts[category] = 0;
    if (selectedIds.includes(dish.id)) {
      counts[category] += 1;
    }
  });

  return counts;
};
