import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';

const App = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailureModalVisible, setFailureModalVisible] = useState(false);

  const toggleSuccessModal = () =>
    setSuccessModalVisible(!isSuccessModalVisible);
  const toggleFailureModal = () =>
    setFailureModalVisible(!isFailureModalVisible);

  const handlePostRequest = async () => {
    try {
      const response = await fetch(
        'https://dummy.restapiexample.com/api/v1/create',
        {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body: JSON.stringify({name, salary, age}),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Success
        toggleSuccessModal();
      } else {
        // Failure
        toggleFailureModal();
      }

      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={text => setSalary(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={text => setAge(text)}
      />
      <Button title="Submit" onPress={handlePostRequest} />

      {/* Success Modal */}
      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Success!</Text>
          <Button title="OK" onPress={toggleSuccessModal} />
        </View>
      </Modal>

      {/* Failure Modal */}
      <Modal isVisible={isFailureModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Failure!</Text>
          <Button title="OK" onPress={toggleFailureModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
