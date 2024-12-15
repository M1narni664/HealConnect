import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPen, faMap, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons'; // Ensure icons are properly imported
import Createdata from './HomeScreen';
import Listdata from './ListDoctorScreen';
import EditData from './EditDataScreen'; // Import the EditData component
import MapScreen from './MapScreen';
 // Import the BeforeLoginNav component

function HomeScreen() {
  return <Createdata />;
}

function SettingsScreen() {
  return <Listdata />;
}

function EditdataScreen() {
  return <EditData />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Tab for adding data */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for displaying the map */}
        <Tab.Screen
          name="Map"
          component={MapScreen} // Ini tampilan peta nya jangan lupa namanya MapScreen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for editing data */}
        <Tab.Screen
          name="Edit"
          component={EditdataScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}