import React, { Component } from 'react'
import { Tile } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import Loading from './LoadingComponent'
import * as Animatable from 'react-native-animatable'

// THIS IS WERE YOU HAVE CAMPSITEINFO USE REDUX STATE
const mapStateToProps = state => {
  return {
    campsites: state.campsites
  }
}

// Changed from function to class
class Directory extends Component {
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
    const { navigate } = this.props.navigation
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      )
    }

    if (this.props.campsites.isLoading) {
      return <Loading />
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      )
    }
    return (
      <FlatList
        // change the reference or props.campsites to this.state.campsites
        //data={props.campsites}
        data={this.props.campsites.campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
}
// connect to redux
export default connect(mapStateToProps)(Directory)
