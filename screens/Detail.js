import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, {Component, useState} from 'react'
import {firebase} from '../config';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';


const Detail = ({route}) => {
  const todoRef= firebase.firestore().collection('todos');
  const [textHeading, onChangeHeadingText] =useState(route.params.item.name);
  const navigation = useNavigation();
  const updateTodo =()=>{
    if(textHeading && textHeading.length > 0){
      todoRef
      .doc(route.params.item.id)
      .update({
        heading:textHeading,
      }).then(()=>{
        navigation.navigate('Home')
      }).catch((error)=>{
        alert(error.message)
      })
    }
  }

  return(
    <View style={{flex:1}}>
      <SafeAreaView>
      <Text style={styles.titulo}>Editar Tarea</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textfield}
          onChangeText={onChangeHeadingText}
          value={textHeading}
          placeholder='Actualizar Actividad'
        />
        <Pressable 
          style={styles.buttonUpdate}
          onPress={()=>{updateTodo()}}
        >
          <Text>Actualizar Acvtividad</Text>
        </Pressable> 
      </View>

      
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
      marginLeft:15,
      marginRight:15,
  },
  textfield: {
      marginBottom: 10,
      padding: 10,
      fontSize: 15,
      color: "#000000",
      backgroundColor: "#e0e0e0",
      borderRadius: 5
  },
  buttonUpdate: {
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: '#CDA6F7',
  },
  titulo:{
    paddingTop:20,
    fontSize:50,
    textAlign:'center',
    fontWeight:'bold',
    color:'#788eec'
  }
});


export default Detail
