import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet
} from 'react-native'
import { Card, Icon, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'
import { Rating, AirbnbRating } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

// THIS IS WERE YOU HAVE CAMPSITEINFO USE REDUX STATE
const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = {
  postFavorite: campsiteId => postFavorite(campsiteId),
  postComment: (campsiteId, rating, author, text, comments) =>
    postComment(campsiteId, rating, author, text, comments)
}

function RenderCampsite (props) {
  const { campsite } = props

  if (campsite) {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }}
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              raised
              reverse
              onPress={() =>
                props.favorite
                  ? console.log('Already set as favorite')
                  : props.markFavorite()
              }
            />
            <Icon
              name='pencil'
              type='font-awesome'
              color='#5637DD'
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    )
  }
  return <View />
}

// CREATE THE RENDERCOMMENTS COMPONENT SO THAT WE CAN GENERATE THE COMPONENT
// FIRST DESTRUCTURE THE ARRAY
// PLACE IT INTO A CARD COMPONENT

function RenderComments ({ comments }) {
  // WE CAN SET UP A VIEW
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          imageSize={10}
          startingValue={item.rating}
          read-only
          onFinishRating={rating => this.setState({ rating: rating })}
          style={{
            alignItems: 'flex-start',
            paddingVertical: '5%'
          }}
        />

        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    )
  }

  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          // will setup the "renderCommentItem" function above
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  )
}

// COVERT FUNCTONAL TO CLASS COMPONENT
class CampsiteInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    }
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  handleComment (campsiteId) {
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    )
    this.toggleModal()
  }

  resetForm () {
    this.setState({
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    })
  }

  markFavorite (campsiteId) {
    this.props.postFavorite(campsiteId)
  }

  static navigationOptions = {
    title: 'Campsite Information'
  }

  // ADD RENDER METHOD
  render () {
    const campsiteId = this.props.navigation.getParam('campsiteId')

    const campsite = this.props.campsites.campsites.filter(
      campsite => campsite.id === campsiteId
    )[0]

    const comments = this.props.comments.comments.filter(
      comment => comment.campsiteId === campsiteId
    )

    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />

        <RenderComments comments={comments} />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View styles={styles.modal}>
            <View style={styles.modal}>
              <Rating
                showRating={true}
                imageSize={40}
                startingValue={40}
                onFinishRating={rating => this.setState({ rating: rating })}
                style={{
                  paddingVertical: 10
                }}
              />
              {/* AUTHOR */}
              <Input
                placeholder='Author'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={value => this.setState({ author: value })}
                value={this.state.author}
              />
              {/* COMMENTS */}

              <Input
                placeholder='Comment'
                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={value => this.setState({ text: value })}
                value={this.state.text}
              />
            </View>

            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment(campsiteId)
                  this.resetForm()
                }}
                color='#5637DD'
                title='Submit'
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal()
                  this.resetForm()
                }}
                color='#808080'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#5637DD',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
})

// DONT FORGET TO ADD THE CONNECT => CONNECTS REDUX TO COMPONENT
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo)
