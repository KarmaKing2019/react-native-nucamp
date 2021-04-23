import React, { Component } from 'react';
// import ScrollView
import { View, Text, ScrollView  } from 'react-native';
// import Card
import { Card } from 'react-native-elements';
// import all DataTypes from 
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux';
import Loading from './LoadingComponent';

// THIS IS WERE YOU HAVE CAMPSITEINFO USE REDUX STATE
const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners
  }
}

// WE NEED TO CREATE A RENDERITEM COMPONENT, TO DESTRUCTOR, AND DISPLAY THE DATA 
// WE WILL RETURN A FORMATTED CARD.

function RenderItem(props) {
    
    
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
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
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </ScrollView>
        )
    }

}
 
export default connect(mapStateToProps)(Home);