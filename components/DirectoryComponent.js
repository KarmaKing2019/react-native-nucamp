import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { CAMPSITES } from '../shared/campsites'
// Changed from function to class
class Directory extends Component {
  // ADD CONTRUCTOR
  constructor(props) {
      super(props);
      this.state = {
          campsites: CAMPSITES
      }
  }
  // In the directory Navigator screen there is title, you can configure the title
  // here. You can do this by using the static keyword - is a javascript key workd that 
  // sets a method on the class itself rather than the object that is created by the 
  // class. Static is being used to communicate with the DirectoryNavigators
  static navigationOptions = {
      this: 'Directory'
  }


  // Place contents in render() function
  render () {
    // deconstruct navigator prop
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          // the onPress is supossed to call the method from Main, but
          // we deleted it. We will replace it with the navigate() function
          //onPress={() => props.onPress(item.id)}
          // Syntax: navigate(<screen to nav to>, <optional params to route>)
          // For the statement below, we will give the id of the campsite pressed
          onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
          leftAvatar={{ source: require('./images/react-lake.jpg') }}
        />
      )
    }
    return (
      <FlatList
      // change the reference or props.campsites to this.state.campsites
        //data={props.campsites}
        data={this.state.campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
}
export default Directory