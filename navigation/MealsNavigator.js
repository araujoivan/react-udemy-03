import React from 'react';
import Platform, { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// create a drawer navigation patter
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import Colors from   '../constants/colors';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritiesScreen';
import FilterScreen from '../screens/FiltersScreen';


const defautlStackNavOptions = {

    headerStyle: {
        backgroundColor: Colors.primary
    },

    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },

    headerBackTitleStyle: {
        fontFamily: 'open-sans-bol'
    },

    headerTintColor: 'white'
}

// creating a stack for the filter
const FiltersNavigator = createStackNavigator(
    {
        Filter: FilterScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'The Filters'
        },
        defaultNavigationOptions: defautlStackNavOptions
    } 
);

//creating a stack for favorites
const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: defautlStackNavOptions
    }
 )

 // creating the main stack
const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen, // short form
        CategoryMeals: {
            screen: CategoryMealsScreen //long form 
        },

        MealDetail: MealDetailScreen
    },
    {
       // initialRouteName: 'Categories',
        defaultNavigationOptions: defautlStackNavOptions
    }
);

const tabScreenConfig = {
    
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons 
                            name="ios-restaurant" 
                            size={25} 
                            color={tabInfo.tintColor} 
                        />;
            },
            tabBarColor: Colors.primary,
            tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}} >Meals.</Text>
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons 
                            name="ios-star" 
                            size={25} 
                            color={tabInfo.tintColor} 
                        />;
            },
            tabBarColor: Colors.accent,
            tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}} >Favorites.</Text>
        }
    }    
}

const androidBottomTabNavigator = createMaterialBottomTabNavigator(
    tabScreenConfig,
    {
        activeTintColor: 'white',
        shifting: true, //provides a way to change the attributes like bckground-color
        barStyle: {
            backgroundColor: Colors.primary
        }        
    }
)

const iosBottomTabNavigator =  createBottomTabNavigator(
    tabScreenConfig,
    {
        tabBarOptions: {
            activeTintColor: Colors.accent
        }
    }
)

// configuring the tab navigator
// for some reason is not working
// const MealsFavTabNavigator = (Platform.OS === 'android') ? androidBottomTabNavigator : iosBottomTabNavigator;
const MealsFavTabNavigator =  androidBottomTabNavigator;
   
// the high level navigator DRAWER
const MainNavigator = createDrawerNavigator(
    {

        MealsFav: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'My Meals!'
            }
        },

        Filters: FiltersNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.accent,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }

    });


//a good pattern is wrapping the most important navigator into a container
export default createAppContainer(MainNavigator);