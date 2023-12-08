import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput } from 'react-native';
import Userapi from './Api/Userapi';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    city: '',
    pais: '',
    resumen: '',
    frameworks:'',
    hobbies:'',
  });
  
  const getUsers = async () => {
    try {
      const response = await Userapi.get('api/profile');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const handleEditProfile = (user) => {
    setSelectedUser(user);
    setEditedUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      pais: user.pais,
      resumen: user.resumen,
      frameworks:user.frameworks,
      hobbies:user.hobbies,

    });
    setEditModalVisible(true);
  };

  const handleEditModalSave = async () => {
    // Implementa la lógica para guardar los cambios editados
    console.log('Datos a enviar:', editedUserData);
    const response = await Userapi.put(`api/edit/${selectedUser.id}`, editedUserData);
    console.log('Respuesta de la API:', response.data);
    console.log('Datos editados:', editedUserData);
    getUsers();
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hola, ¿cómo estás?
      </Text>
      <TouchableOpacity onPress={getUsers} style={styles.button}>
        <Text style={styles.buttonText}>
          Obtener Usuarios
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {users.map((user) => (
          
          <View key={user.id} style={styles.userContainer}>
           
            <Text>ID: {user.id}</Text>
            <Text>Nombre: {user.name}</Text>
            <TouchableOpacity onPress={() => handleViewProfile(user)}>
              <Text style={styles.profileButton}>Ver Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditProfile(user)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para ver perfil */}
      <Modal
        visible={viewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setViewModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text>Nombre: {selectedUser?.name}</Text>
          <Text>Apellido: {selectedUser?.lastname}</Text>
          <Text>Ciudad: {selectedUser?.city}</Text>
          <Text>País: {selectedUser?.pais}</Text>
          <Text>Resumen: {selectedUser?.resumen}</Text>
          <TouchableOpacity onPress={() => setViewModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para editar perfil */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={editedUserData.name}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={editedUserData.lastname}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, lastname: text })}
          />
           <TextInput
            style={styles.input}
            placeholder="email"
            value={editedUserData.email}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={editedUserData.city}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="País"
            value={editedUserData.pais}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, pais: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Resumen"
            value={editedUserData.resumen}
            onChangeText={(text) => setEditedUserData({ ...editedUserData, resumen: text })}
          />
              <TextInput
      style={styles.input}
      placeholder="Frameworks (JSON)"
      value={editedUserData.frameworks}
      onChangeText={(text) => setEditedUserData({ ...editedUserData, frameworks: text })}
    />
    <TextInput
      style={styles.input}
      placeholder="Hobbies (JSON)"
      value={editedUserData.hobbies}
      onChangeText={(text) => setEditedUserData({ ...editedUserData, hobbies: text })}
    />
          <TouchableOpacity onPress={handleEditModalSave}>
            <Text style={styles.modalSaveButton}>Guardar Cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: 'red',
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginBottom: 16,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 8,
  },
  profileButton: {
    color: 'green',
    marginTop: 8,
  },
  editButton: {
    color: 'blue',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  modalCloseButton: {
    color: 'red',
    marginTop: 16,
  },
  modalSaveButton: {
    color: 'green',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
    width: '100%',
  },
});

export default App;



