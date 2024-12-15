import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateDoctorData = () => {
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [qualification, setQualification] = useState('');
  const [clinicNo, setClinicNo] = useState('');
  const [clinicContact, setClinicContact] = useState('');
  const [availability, setAvailability] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAvailability(selectedDate);
    }
  };

  const submitData = () => {
    const data = {
      name,
      speciality,
      qualification,
      clinicNo,
      clinicContact,
      availability: availability.toISOString().split('T')[0], // Format date as YYYY-MM-DD
    };

    fetch('http://192.168.86.228:3000/mahasiswa', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data Tersimpan');
        setName('');
        setSpeciality('');
        setQualification('');
        setClinicNo('');
        setClinicContact('');
        setAvailability(new Date());
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tambah Data Dokter</Text>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Spesialisasi</Text>
        <Picker
          selectedValue={speciality}
          style={styles.picker}
          onValueChange={(itemValue) => setSpeciality(itemValue)}
        >
          <Picker.Item label="Pilih Spesialisasi" value="" />
          <Picker.Item label="Umum" value="Umum" />
          <Picker.Item label="Penyakit Dalam" value="Penyakit Dalam" />
          <Picker.Item label="Kardiologi" value="Kardiologi" />
        </Picker>

        <Text style={styles.label}>Kualifikasi</Text>
        <TextInput
          style={styles.input}
          placeholder="Kualifikasi"
          value={qualification}
          onChangeText={setQualification}
        />

        <Text style={styles.label}>Nomor Ruangan</Text>
        <TextInput
          style={styles.input}
          placeholder="Nomor Ruangan"
          value={clinicNo}
          onChangeText={setClinicNo}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Kontak Klinik</Text>
        <TextInput
          style={styles.input}
          placeholder="Kontak Klinik"
          value={clinicContact}
          onChangeText={setClinicContact}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Ketersediaan</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {availability.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={availability}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={submitData}>
          <Text style={styles.submitText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateDoctorData;
