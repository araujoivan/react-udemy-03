import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/colors';

const FilterSwitch = props => {

    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{
                    true: Colors.primary
                }}
                thumbColor={Colors.primary}
                value={props.state} 
                onValueChange={props.onChange}
            />
        </View>
    );
}

const FiltersScreen = props => {
    
    // object destructuring props.navigation into navigation
    const { navigation } = props;

    const [isGluttenFree, setIsGluttenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    // this function will be created only if its dependencies change
    // no matter if the component is re-created
    const saveFilters = useCallback(() => {

        const appliedFilters = {
            gluttenFree: isGluttenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }

    }, [isGluttenFree, isLactoseFree, isVegan, isVegetarian]); //array of dependecies

    // communicating between my component and the navigation
    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch 
                label="Glutten-free"
                state={isGluttenFree}
                onChange={setIsGluttenFree}
            />
            <FilterSwitch 
                label="Lactose-free"
                state={isLactoseFree}
                onChange={setIsLactoseFree}
            />
            <FilterSwitch 
                label="Vegan"
                state={isVegan}
                onChange={setIsVegan}
            />
             <FilterSwitch 
                label="Vegetarian"
                state={isVegetarian}
                onChange={setIsVegetarian}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Filter',

        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title="Filter" 
                            iconName="ios-menu"
                            onPress={() => navData.navigation.toggleDrawer()}
                        />
                    </HeaderButtons>),

        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title="Save" 
                            iconName="ios-save"
                            onPress={() => {
                                navData.navigation.getParam('save')();
                            }}
                        />
                    </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;