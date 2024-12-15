import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Listdata = () => {
  const jsonUrl = 'http://192.168.86.228:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  function deleteData(id) {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data terhapus');
        refreshPage();
      });
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Image
          source={{ uri: item.avatar || 'https://via.placeholder.com/80' }}
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.cardSubtitle}>{item.kelas}</Text>
        <Text style={styles.cardDetail}>{item.gender}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
            { text: 'Tidak' },
            { text: 'Ya', onPress: () => deleteData(item.id) },
          ])
        }
      >
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Text style={styles.cardTitle}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={dataUser}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshing={refresh}
          onRefresh={refreshPage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
  },
  avatar: {
    marginRight: 15,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardDetail: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Listdata;
