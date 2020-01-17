import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

// select a slice of the state and use into component
import { useSelector } from 'react-redux';

const CategoryMealsScreen = props => {

    const categoryId = props.navigation.getParam('categoryId');

    // react reduz provides a state for the useSelector(function)
    // state.meals was created into App.js
    const availableMeals  = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

    return (
        <MealList 
            listData={displayedMeals}
            navigation={props.navigation}
        />
    );
}

CategoryMealsScreen.navigationOptions = navigationData => {

    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        headerTitle: selectedCategory.title
    }
};

export default CategoryMealsScreen;