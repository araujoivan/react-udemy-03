import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux';

const FavoritiesScreen = props => {

    // react reduz provides a state for the useSelector(function)
    // state.meals was created into App.js..is a slice of the state
    const availableMeasl = useSelector(state => state.meals.favoriteMeals);

    return <MealList 
                listData={availableMeasl} 
                navigation={props.navigation}
            />
}

FavoritiesScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Your Favorites',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title="Menu" 
                            iconName="ios-menu"
                            onPress={() => {
                                navData.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>
    }
}

export default FavoritiesScreen;