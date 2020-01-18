export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

// a function that returs an object with a pre-defined param 
export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id};
} 

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings};
}