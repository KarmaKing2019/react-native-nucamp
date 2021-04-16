import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card , Icon} from 'react-native-elements';
import {CAMPSITES} from '../shared/campsites';
import {COMMENTS} from '../shared/comments';



function RenderCampsite(props) {

    const {campsite} = props;


    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}>
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon 
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    color="#f50"
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as favorite') :
                        props.markFavorite()}
                
                />
                
            </Card>
        );
    }
    return <View />;
}

// CREATE THE RENDERCOMMENTS COMPONENT SO THAT WE CAN GENERATE THE COMPONENT
// FIRST DESTRUCTURE THE ARRAY 
// PLACE IT INTO A CARD COMPONENT 

function RenderComments({comments}) {

    // WE CAN SET UP A VIEW 
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            // will setup the "renderCommentItem" function above
            keyEctractor={item => item.id.toString()}
        />
    )

}






// COVERT FUNCTONAL TO CLASS COMPONENT
class CampsiteInfo extends Component {

    // SETUP A CONSTRUCTOR 
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            favorite: false
        };
    }

    // CREATE HANDLER TO TOGGLE THE STATE "favorite" to true

    markFavorite() {
        this.setState({favorite: true});
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

        // FILTER OUT THE COMMENTS TO MATCH THE CAMPSITE ID
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
        
        // WE WILL RENDER A NEW COMPONENT WITH THE COMMENTS THAT WE JUST FILTERED OUT
        // AND WRAP IN A SCROLLVIEW
        return (
            <ScrollView>

<RenderCampsite 
    campsite={campsite} 
    favorite={this.state.favorite} 
    markFavorite={()=> this.markFavorite()} />

<RenderComments comments={comments} /> 
            </ScrollView>

        )
        
    }
    
}

export default CampsiteInfo;