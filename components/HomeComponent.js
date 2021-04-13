import React, { Component } from 'react';
// import ScrollView
import { View, Text, ScrollView  } from 'react-native';
// import Card
import { Card } from 'react-native-elements';
// import all DataTypes from 
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

// WE NEED TO CREATE A RENDERITEM COMPONENT, TO DESTRUCTOR, AND DISPLAY THE DATA 
// WE WILL RETURN A FORMATTED CARD.

function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}



class Home extends Component {
   
    // Create Constructor to bring the data into the class state
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS
        }
    }

    // Return a tilte of "Home"
    static navigationOptions = {
        title: 'Home'
    }

    // We will return a simple view with text "Home Component"
    // HERE WE ARE SETTING UP A SCROLLVIEW COMPONENT
    // SCROLLVIEW ACTS LIKE FLATLIST FOR DISPLAYING DATA_TYPES
    // IMPORTANT NOTE: SCROLLVIEW USES "LAZY LOADING" ... SEE NOTES
    // A MORE EFFICENT WAY OF LOADING ... IF YOU HAVE A LONG LIST,
    // USE FLATLIST, BECAUSE WE HAVE 3 ITEMS SCROLLVIEW WOULD BE 
    // OPTIMAL

    render() {
        return (
            <ScrollView>
                {/* // WE WILL USE RenderItem TO DISPLAY DIFFERENT SET OF DATA
                // NOTE: "featured" will either return true or false ... check data files */}
                <RenderItem 
                    item={this.state.campsites.filter(campsite => campsite.featured)[0]}
                />
                <RenderItem 
                    item={this.state.promotions.filter(promotion => promotion.featured)[0]}
                />
                <RenderItem 
                    item={this.state.partners.filter(partner => partner.featured)[0]}
                />
            </ScrollView>
        )
    }

}
 
export default Home;