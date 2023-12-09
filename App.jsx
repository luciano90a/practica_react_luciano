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
            <Text style={styles.textinfo}>ID: {user.id}</Text>
            <Text style={styles.textinfo} >Nombre: {user.name}</Text>
            <View style={styles.cont_butons}>
            <TouchableOpacity onPress={() => handleViewProfile(user)}
            style={styles.buton_scroll_profile}
            >
              <Text style={styles.profileButton}>Ver Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditProfile(user)}
             style={styles.buton_scroll_edit}
            >
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            </View>
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
          <Text style={styles.text_profile}>Nombre: {selectedUser?.name}</Text>
          <Text style={styles.text_profile} >Apellido: {selectedUser?.lastname}</Text>
          <Text style={styles.text_profile} >Ciudad: {selectedUser?.city}</Text>
          <Text style={styles.text_profile} >País: {selectedUser?.pais}</Text>
          <Text style={styles.text_profile} >Resumen: {selectedUser?.resumen}</Text>
          <Text style={styles.text_profile} >Email: {selectedUser?.email}</Text>

          {/* ScrollView para frameworks */}
          <View style={styles.cont_profile}>
          <ScrollView style={styles.framework_scroll_profile}>
            <Text style={styles.tittle_scroll}>Frameworks:</Text>
            {selectedUser?.frameworks &&
              JSON.parse(selectedUser?.frameworks).map((framework, index) => (
                <View key={index}>
                  <Text style={styles.text_scroll_profile}>Name: {framework.name}</Text>
                  <Text style={styles.text_scroll_profile}>Level: {framework.level}</Text>
                  <Text style={styles.text_scroll_profile}>Year: {framework.year}</Text>
                </View>
              ))}
          </ScrollView>
          </View>
          {/* ScrollView para hobbies */}
          <View style={styles.cont_profile} >
          <ScrollView style={styles.hobbies_scroll_profile}>
            <Text style={styles.tittle_scroll}>Hobbies:</Text>
            {selectedUser?.hobbies &&
              JSON.parse(selectedUser?.hobbies).map((hobby, index) => (
                <View key={index}>
                  <Text style={styles.text_scroll_profile}>Name: {hobby.name}</Text>
                  <Text style={styles.text_scroll_profile}>Description: {hobby.description}</Text>
                </View>
              ))}
          </ScrollView>
          </View>
          

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
          <View style={styles.cont_profile}>
          <ScrollView style={styles.framework_scroll_profile}>
            <Text style={styles.tittle_scroll} >Editar Frameworks:</Text>
            {selectedUser?.frameworks &&
              JSON.parse(selectedUser?.frameworks).map((framework, index) => (
                <View key={index}>
                  <Text style={styles.text_scroll_profile}>Name: {framework.name}</Text>
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
                  <Text style={styles.text_scroll_profile}>Level: {framework.level}</Text>
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
                  <Text style={styles.text_scroll_profile}>Year: {framework.year}</Text>
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
          <View style={styles.cont_profile}>
          <ScrollView style={styles.hobbies_scroll_profile}>
            <Text style={styles.tittle_scroll}>
              Editar Hobbies:</Text>
            {selectedUser?.hobbies &&
              JSON.parse(selectedUser?.hobbies).map((hobby, index) => (
                <View key={index}>
                  <Text style={styles.text_scroll_profile}> Name: {hobby.name}</Text>
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
                  <Text style={styles.text_scroll_profile} >Description: {hobby.description}</Text>
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
  tittle_scroll:{
    fontSize:20,
    textAlign:'center',
    color:'black'
  },
  text_scroll_profile:{
    fontSize:18,
    color:'black',
    fontFamily:'fantasy',
    backgroundColor:'goldenrod',
    textAlign:'center',
    borderRadius:50,
    margin:5,
    borderColor:'yellow',
    borderWidth:4
  },
  cont_profile:{
    height:'15%',
    width:'100%',
    justifyContent:'center',
    backgroundColor:'green',
    alignContent:'center',
    alignItems:'center',
    marginTop:'5%',
    borderColor:'blue',
    borderWidth:2
  },
  hobbies_scroll_profile:{
    backgroundColor:'lightgreen',
    position:'relative',
    width:'100%',
    
  },
  framework_scroll_profile:{
    backgroundColor:'lightgreen',
    position:'relative',
    width:'100%',
    
    
  },
  text_profile:{
    fontSize:18,
    color:'black',
    backgroundColor:'lightgreen',
    borderRadius:30,
    marginTop:'5%',
    padding:'3%',
    borderColor:'yellow',
    borderWidth:5,
    textAlign:"center",
    fontFamily:'fantasy'
  },
  buton_scroll_edit:{
    marginLeft:'70%',
  },
  cont_butons:{
    flexDirection:'row',
    
  },
  text_for_frameworks_hobbies:{
    backgroundColor:'white',
    margin:'1%',
    borderColor:'yellow',
    borderWidth:3
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
    color: 'darkblue',
    fontSize: 16,
    fontFamily:'Cooper Black'
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    backgroundColor:'gray',
    
    
  },
  userContainer: {
    borderWidth: 10,
    borderColor: 'yellow',
    padding: 20,
    marginBottom: '5%',
  },
  profileButton: {
    color: 'black',
    paddingTop:'2%',
    borderRadius:10,
    
  },
  editButton: {
    color: 'black',
    paddingTop:'2%'
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 16,
  },
  modalCloseButton: {
    color: 'black',
    marginTop: 16,
    backgroundColor:'red',
    fontSize:18,
    borderRadius:10,
    borderColor:'blue',
    borderWidth:2,
    fontFamily:'fantasy'
  },
  modalSaveButton: {
    color: 'black',
    marginTop: 16,
    backgroundColor:'aquamarine',
    fontSize:18,
    borderRadius:10,
    borderColor:'blue',
    borderWidth:2,
    fontFamily:'fantasy'

  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor:'white',
    borderWidth:4,
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
    width: '100%',  
  },
  textinfo:{
    backgroundColor:'yellow',
    padding:'1%',
    textAlign:'center',
    color:'black',
    width:'50%',
    marginLeft:'28%',
    borderRadius:50,
    marginTop:'2%',
    
  }
});

export default App;

