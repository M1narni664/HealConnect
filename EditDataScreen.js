import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditData = () => {
  const jsonUrl = 'http://192.168.86.228:3000/mahasiswa'; // API endpoint
  const [isLoading, setLoading] = useState(true);
  const [dataDokter, setDataDokter] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedDokter, setSelectedDokter] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [qualification, setQualification] = useState('');
  const [clinicNo, setClinicNo] = useState('');
  const [clinicContact, setClinicContact] = useState('');

  // Fetch data from API
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataDokter(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
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

  // Handle form submission for add/edit
  const submit = () => {
    const data = { name, speciality, qualification, clinicNo, clinicContact };
    const method = selectedDokter ? 'PATCH' : 'POST';
    const url = selectedDokter ? `${jsonUrl}/${selectedDokter.id}` : jsonUrl;

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert(selectedDokter ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
        resetForm();
        refreshPage();
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  // Handle item selection for editing
  const selectItem = (item) => {
    setSelectedDokter(item);
    setName(item.name);
    setSpeciality(item.speciality);
    setQualification(item.qualification);
    setClinicNo(item.clinicNo);
    setClinicContact(item.clinicContact);
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedDokter(null);
    setName('');
    setSpeciality('');
    setQualification('');
    setClinicNo('');
    setClinicContact('');
  };

  // Delete user data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data berhasil dihapus!');
        refreshPage();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataDokter}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refresh}
        onRefresh={refreshPage}
        ListHeaderComponent={
          <View style={styles.form}>
            <Text style={styles.title}>
              {selectedDokter ? 'Edit Data Dokter' : 'Tambah Data Dokter'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Spesialisasi"
              value={speciality}
              onChangeText={setSpeciality}
            />
            <TextInput
              style={styles.input}
              placeholder="Kualifikasi"
              value={qualification}
              onChangeText={setQualification}
            />
            <TextInput
              style={styles.input}
              placeholder="Nomor Ruangan"
              value={clinicNo}
              onChangeText={setClinicNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Kontak Klinik"
              value={clinicContact}
              onChangeText={setClinicContact}
            />
            <Button title={selectedDokter ? 'Perbarui Data' : 'Tambah Data'} onPress={submit} />
            {selectedDokter && <Button title="Batal" color="red" onPress={resetForm} />}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardtitle}>{item.name}</Text>
              <Text>{item.speciality}</Text>
              <Text>{item.qualification}</Text>
              <Text>{item.clinicNo}</Text>
              <Text>{item.clinicContact}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => selectItem(item)}>
                <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ marginHorizontal: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                    { text: 'Tidak', style: 'cancel' },
                    { text: 'Ya', onPress: () => deleteData(item.id) },
                  ])
                }>
                <FontAwesomeIcon icon={faTrash} size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
});

export default EditData;
