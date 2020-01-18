import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const FavoritiesScreen = props => {

    // react reduz provides a state for the useSelector(function)
    // state.meals was created into App.js..is a slice of the state
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(!favMeals || favMeals.length === 0) {
        return (<View style={styles.content}><DefaultText>Empty</DefaultText></View>);
    } 

    return <MealList 
                listData={favMeals} 
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

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritiesScreen;