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
          <Text>Email: {selectedUser?.email}</Text>

          {/* ScrollView para frameworks */}
          <ScrollView style={styles.scrollView}>
            <Text>Frameworks:</Text>
            {selectedUser?.frameworks &&
              JSON.parse(selectedUser?.frameworks).map((framework, index) => (
                <View key={index}>
                  <Text>Name: {framework.name}</Text>
                  <Text>Level: {framework.level}</Text>
                  <Text>Year: {framework.year}</Text>
                </View>
              ))}
          </ScrollView>

          {/* ScrollView para hobbies */}
          <ScrollView style={styles.scrollView}>
            <Text>Hobbies:</Text>
            {selectedUser?.hobbies &&
              JSON.parse(selectedUser?.hobbies).map((hobby, index) => (
                <View key={index}>
                  <Text>Name: {hobby.name}</Text>
                  <Text>Description: {hobby.description}</Text>
                </View>
              ))}
          </ScrollView>

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
          <View style={styles.cont_frameworks}>
          <ScrollView style={styles.scroll_frameworks}>
            <Text>Frameworks:</Text>
            {selectedUser?.frameworks &&
              JSON.parse(selectedUser?.frameworks).map((framework, index) => (
                <View key={index}>
                  <Text>Name: {framework.name}</Text>
                  <TextInput 
                  placeholder='ingrese nuevo nombre'
                  style={styles.text_for_frameworks_hobbies}
                  onChangeText={(text) => {
                    const updatedFrameworks = JSON.parse(selectedUser?.frameworks).map((f, i) => {
                      if (i === index) {
                        return { ...f, name: text };
                      }
                      return f;
                    });
                    setEditedUserData({ ...editedUserData, frameworks: JSON.stringify(updatedFrameworks) });
                  }}
                  ></TextInput>
                  <Text>Level: {framework.level}</Text>
                  <TextInput placeholder='ingrese nuevo level' 
                  style={styles.text_for_frameworks_hobbies}
                  onChangeText={(text) => {
                    const updatedFrameworks = JSON.parse(selectedUser?.frameworks).map((f, i) => {
                      if (i === index) {
                        return { ...f, level: text };
                      }
                      return f;
                    });
                    setEditedUserData({ ...editedUserData, frameworks: JSON.stringify(updatedFrameworks) });
                  }}
                  ></TextInput>
                  <Text>Year: {framework.year}</Text>
                  <TextInput placeholder='ingrese nuevo year'
                  style={styles.text_for_frameworks_hobbies}
                  onChangeText={(text) => {
                    const updatedFrameworks = JSON.parse(selectedUser?.frameworks).map((f, i) => {
                      if (i === index) {
                        return { ...f, year: text };
                      }
                      return f;
                    });
                    setEditedUserData({ ...editedUserData, frameworks: JSON.stringify(updatedFrameworks) });
                  }}
                  ></TextInput>
                </View>
              ))}
          </ScrollView>
          </View>
          <View style={styles.cont_hobbies}>
          <ScrollView style={styles.scroll_hobbies}>
            <Text>Hobbies:</Text>
            {selectedUser?.hobbies &&
              JSON.parse(selectedUser?.hobbies).map((hobby, index) => (
                <View key={index}>
                  <Text>Name: {hobby.name}</Text>
                  <TextInput placeholder='ingrese nuevo nombre hobbie'
                  style={styles.text_for_frameworks_hobbies}
                  onChangeText={(text) => {
                    const updatedhobbies = JSON.parse(selectedUser?.hobbies).map((f, i) => {
                      if (i === index) {
                        return { ...f, name: text };
                      }
                      return f;
                    });
                    setEditedUserData({ ...editedUserData, hobbies: JSON.stringify(updatedhobbies) });
                  }}
                  ></TextInput>
                  <Text>Description: {hobby.description}</Text>
                  <TextInput placeholder='ingrese nueva des'
                  style={styles.text_for_frameworks_hobbies}
                  onChangeText={(text) => {
                    const updatedhobbies = JSON.parse(selectedUser?.hobbies).map((f, i) => {
                      if (i === index) {
                        return { ...f, description: text };
                      }
                      return f;
                    });
                    setEditedUserData({ ...editedUserData, hobbies: JSON.stringify(updatedhobbies) });
                  }}
                  ></TextInput>
                </View>
              ))}
          </ScrollView>
          </View>
        
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
  text_for_frameworks_hobbies:{
    backgroundColor:'gray'
  },
  cont_hobbies:{
    height:'15%',
    width:'100%',
    justifyContent:'center',
    backgroundColor:'green',
    paddingRight:'10%',
    alignContent:'center',
    alignItems:'center',
    marginTop:'5%'
  },
  scroll_hobbies:{
    alignContent:'center',
    width:'100%'
  },
  cont_frameworks:{
    height:'15%',
    width:'100%',
    justifyContent:'center',
    backgroundColor:'yellow',
    paddingRight:'10%',
    alignContent:'center',
    alignItems:'center'
  },
  scroll_frameworks:{
    alignContent:'center',
    width:'100%'
  },
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
    backgroundColor:'gray'
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

