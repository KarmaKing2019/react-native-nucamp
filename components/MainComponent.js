import React, { Component } from 'react'
import Directory from './DirectoryComponent'
import CampsiteInfo from './CampsiteInfoComponent'
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from './HomeComponent'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { Icon } from 'react-native-elements'
import SafeAreaView from 'react-native-safe-area-view'
import { connect } from 'react-redux'
import {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners
} from '../redux/ActionCreators'
import Reservation from './ReservationComponent'
import Favorites from './FavoritesComponent'

// SETTING UP: WE ARE ONLY CREATING ONE STACK NAVIGATOR
const mapDispatchToProps = {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners
}

const DirectoryNavigator = createStackNavigator(
  {
    // As an arugment, we will set what components will be available for stack navigation
    Directory: {
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name='list'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      })
    },
    CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    // ADDITIONAL CONFIGURATION
    initialRouteName: 'Directory', // This will be the default on open
    defaultNavigationOptions: {
      // SET DEFAULT CONFIGURATIONS FOR HEADER
      // NOTE: THERE ARE OTHER HEADERSTYLES AVAILABLE IF YOU WANT.
      // SET BACKGROUND COLOR
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' }
    }
  }
)

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='tree'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
)

const FavoritesNavigator = createStackNavigator(
  {
    Reservation: { screen: Favorites }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='heart'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
)

// Create a stack navigtor for Home page

const HomeNavigator = createStackNavigator(
  {
    // As an arugment, we will set what components will be available for stack navigation
    // ==> SET HOME COMPONENT AS ITS SCREEN
    home: { screen: Home }
    // THIS NAVIGATOR WILL ONLY HAVE 1 SCREEN SO WE CAN REMOVE CAMPSITEINFO
    //CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    // ADDITIONAL CONFIGURATION
    // BECAUSE IT ONLY HAS ONE SCREEN WE WONT NEED 'initialRouteName'
    //initialRouteName: 'Directory', // This will be the default on open
    defaultNavigationOptions: ({ navigation }) => ({
      // SET DEFAULT CONFIGURATIONS FOR HEADER
      // NOTE: THERE ARE OTHER HEADERSTYLES AVAILABLE IF YOU WANT.
      // SET BACKGROUND COLOR
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },

      headerLeft: (
        <Icon
          name='home'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
)

const ContactNavigator = createStackNavigator(
  {
    // As an arugment, we will set what components will be available for stack navigation
    // ==> SET HOME COMPONENT AS ITS SCREEN
    contact: { screen: Contact }
    // THIS NAVIGATOR WILL ONLY HAVE 1 SCREEN SO WE CAN REMOVE CAMPSITEINFO
    //CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    // ADDITIONAL CONFIGURATION
    // BECAUSE IT ONLY HAS ONE SCREEN WE WONT NEED 'initialRouteName'
    //initialRouteName: 'Directory', // This will be the default on open
    defaultNavigationOptions: ({ navigation }) => ({
      // SET DEFAULT CONFIGURATIONS FOR HEADER
      // NOTE: THERE ARE OTHER HEADERSTYLES AVAILABLE IF YOU WANT.
      // SET BACKGROUND COLOR
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },

      headerLeft: (
        <Icon
          name='address-card'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
)

const AboutNavigator = createStackNavigator(
  {
    // As an arugment, we will set what components will be available for stack navigation
    // ==> SET HOME COMPONENT AS ITS SCREEN
    about: { screen: About }
    // THIS NAVIGATOR WILL ONLY HAVE 1 SCREEN SO WE CAN REMOVE CAMPSITEINFO
    //CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    // ADDITIONAL CONFIGURATION
    // BECAUSE IT ONLY HAS ONE SCREEN WE WONT NEED 'initialRouteName'
    //initialRouteName: 'Directory', // This will be the default on open
    defaultNavigationOptions: ({ navigation }) => ({
      // SET DEFAULT CONFIGURATIONS FOR HEADER
      // NOTE: THERE ARE OTHER HEADERSTYLES AVAILABLE IF YOU WANT.
      // SET BACKGROUND COLOR
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },

      headerLeft: (
        <Icon
          name='info-circle'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
)

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>NuCamp</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

// ADD THE DRAWER NAVIGATOR
const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name='home' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name='list' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: 'Reserve Campsite',
        drawerIcon: ({ tintColor }) => (
          <Icon name='tree' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: 'My Favorites',
        drawerIcon: ({ tintColor }) => (
          <Icon name='heart' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='address-card'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    drawerBackgroundColor: '#CEC8FF',
    contentComponent: CustomDrawerContentComponent
  }
)

// NOW THAT YOU CRATED A STACK NAVIGATOR, WE NEED TO PASS IT TO A FUNCTION
// "createAppContainer" will return a component.
// This will hand something like pressing a back button on a device
// You will typically wrap your top Navigator with AppNavigator

// AFTER IMPORTING AND WITH THE INTENT OF USING THE DRAWER NAVIGATOR, WE WILL
// CHANGE THE DirectoryNavigator below to the MainNavigator
//const AppNavigator = createAppContainer(DirectoryNavigator)
// Note: Now MainNavigator is the top level Navigator
const AppNavigator = createAppContainer(MainNavigator) // SETS THE MAIN NAVIGATOR

class Main extends Component {
  componentDidMount () {
    this.props.fetchCampsites()
    this.props.fetchComments()
    this.props.fetchPromotions()
    this.props.fetchPartners()
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        {/* // Contains Directory and CampsiteInfo components */}
        <AppNavigator />
        {/* // REPLACED WITH AppNavigator */}
        {/* <Directory
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(
                        campsite => campsite.id === this.state.selectedCampsite)[0]}
                /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
})

export default connect(null, mapDispatchToProps)(Main)
