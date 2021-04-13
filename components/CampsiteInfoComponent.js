import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import {CAMPSITES} from '../shared/campsites'


function RenderCampsite({campsite}) {
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

// COVERT FUNCTONAL TO CLASS COMPONENT
class CampsiteInfo extends Component {

    // SETUP A CONSTRUCTOR 
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    // AGAIN WE WILL SET THE TITLE FOR THE SCREEN 
    // Using the static method in the DirectoryNavigator

    static navigationOptions = {
        title: "Campsite Information"
    }



    // ADD RENDER METHOD
    render() {
        // ACCESS THE NAVIGATION PROP ... REMEMBER THE ID WAS PASSED IN DIRECTORYCOMPONENT
        // THIS WILL GIVE US AN ARRAY
        const campsiteId = this.props.navigation.getParam('campsiteId');
        // USING THE ARRAY, WE CAN PULL OUT WHAT WE WANT USING FILTER
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        // instead of props pass the campsite object we just created above
        //return <RenderCampsite campsite={props.campsite} />;
        return <RenderCampsite campsite={campsite} />;
    }
    
}

export default CampsiteInfo;