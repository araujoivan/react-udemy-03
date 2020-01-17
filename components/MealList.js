import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MealItem from '../components/MealItem';

const MealList = props => {

    const renderMealItem = itemData => {
        return <MealItem 
                    title={itemData.item.title} 
                    onSelectMeal={() => {
                        props.navigation.navigate({
                            routeName: 'MealDetail',
                            params: {
                                mealId: itemData.item.id,
                                mealTitle: itemData.item.title
                            }
                        })
                    }}
                    duration={itemData.item.duration}
                    complexity={itemData.item.complexity}
                    affordability={itemData.item.affordability}
                    image={itemData.item.imageUrl}
                />;
    }

    return(
        <View style={styles.list}>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;


/* <View style={styles.screen}>
    <Text>Hello World from CategoryMealsScreen</Text>
    <Button title="Got to Details" onPress={() => {
        props.navigation.navigate("MealDetail");
    }} />

    <Button title="Go back" onPress={() => {
        //  props.navigation.pop();
        props.navigation.goBack();
    }}/>

</View> */