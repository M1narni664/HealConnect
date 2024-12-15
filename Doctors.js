import React from 'react';
import Datadoctors from './data/doctors.json';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const Doctors = () => {
  return (
    <FlatList
      data={Datadoctors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL(
              `google.navigation:q=${item.latitude},${item.longitude}`,
            )
          }>
          <View style={styles.avatar}>
            <FontAwesomeIcon
              icon={item.gender === 'male' ? faMars : faVenus}
              size={30}
              color={item.gender === 'male' ? '#1E90FF' : '#FF69B4'}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardtitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.specialty}</Text>
            <Text style={styles.cardText}>Lat: {item.latitude}, Lon: {item.longitude}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Doctors;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    marginRight: 15,
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  genderIcon: {
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
  },
});
