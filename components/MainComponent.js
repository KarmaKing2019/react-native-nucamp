import React, { Component } from 'react'
import Directory from './DirectoryComponent'
import CampsiteInfo from './CampsiteInfoComponent'
import { View, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from './HomeComponent'
import { createDrawerNavigator } from 'react-navigation-drawer'
import About from './AboutComponent';
import Contact from './ContactComponent';

// SETTING UP: WE ARE ONLY CREATING ONE STACK NAVIGATOR

const DirectoryNavigator = createStackNavigator(
  {
    // As an arugment, we will set what components will be available for stack navigation
    Directory: { screen: Directory },
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

// Create a stack navigtor for Home page

const HomeNavigator = createStackNavigator (

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


const ContactNavigator = createStackNavigator (

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



const AboutNavigator = createStackNavigator (

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



// ADD THE DRAWER NAVIGATOR
const MainNavigator = createDrawerNavigator (

    // FIRST CREATE THE SCREENS THAT WILL BE IN THE DRAWER
    // WE WILL ADD THE HOME AND DIRECTORY SCREENS IN THIS DRAWER
    // YOU WILL WANT TO ROUTE THEM THROUGH THE STACK NAVIGATOR ... SO WE WILL GIVE
    // THEM THE HOME AND DIRECTORY NAVIGATORS INSTEAD OF THE COMPONENTS THEMSELVES
    {
        Home: { screen: HomeNavigator},
        Directory: { screen: DirectoryNavigator },
        Contact: { screen: ContactNavigator },
        About: { screen: AboutNavigator },
    },
    {
        // ADDING OPTIONAL SECOND ARGUMENT FOR ADDTIONAL CONFIGURATIONS
        drawerBackgroundColor: '#CEC8FF'
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
  // CONSTRUCTOR DELETED ... WE WILL MOVE CAMPSITE DATA TO DIRECTORY COMPONENT
  //**(CONSTRUCTOR DELETED)

  // the selectedCampsite will be handle by Navigator (Detete)
  // ** (onCampsiteSelect() - eventHandler DELETED)

  render () {
    return (
      <View style={{ 
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
          }}>
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

export default Main
