import { View ,  Text , FlatList , StyleSheet , TextInput , TouchableOpacity , Keyboard , Pressable} from 'react-native'
import React ,{ useState, useEffect} from 'react'

import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [todos,setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData , setAddData] = useState('');
  const navigation =useNavigation();

  useEffect(() =>{
    todoRef
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      querySnapshot=>{
        const todos= []
        querySnapshot.forEach((doc) => {
          const {heading} = doc.data()
          todos.push({
            id: doc.id,
            heading
          })
        })
        setTodos(todos)
      }
    )
  },[])
  //Metodo  para eliminar
  const deleteTodo =(todos) =>{
    todoRef
    .doc(todos.id)
    .delete()
    .then(()=>{
      alert("Borrado correctamente")
    })
    .catch(error=>{
      alert(error);
    })
  }

  //Metodo para agregar
  const addTodo = ()=>{
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp
      };
      todoRef
      .add(data)
      .then(()=>{
        setAddData('');
        Keyboard.dismiss();
      })
      .catch((error)=>{
        alert(error);
      })
    }
  }

  return(
    <View style={{flex:1}}>
      <SafeAreaView>
      <Text style={styles.titulo}>Lista de Tareas</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Agregar nuevo'
          placeholderTextColor='#aaa'
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({item})=>(
          <View>
            <Pressable
              style={styles.container}
              onPress={()=> navigation.navigate('Detalles',{item})}
            >
              <FontAwesome 
                name='trash-o'
                color='#A6B1F7'
                onPress={ () => deleteTodo(item) }
                style={styles.todoIcon}
              />

              <View style={styles.inneContainer}>
                <Text style={styles.itemHeading}>
                    { item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>

            
          </View>  
        )}
      />
      </SafeAreaView>
    </View>
    
  )

}

export default Home

const styles =StyleSheet.create({
  container:{
    backgroundColor: 'white',
    elevation:8,
    padding:15,
    borderRadius:15,
    margin:5,
    marginHorizontal:10,
    flexDirection:'row',
    alignItems: 'center',
  },
  inneContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginLeft: 45,
  },
  itemHeading:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
  },
  formContainer:{
    flexDirection:'row',
    height:80,
    marginLeft:10,
    marginRight:10,
    marginTop:20,
  },
  input:{
    height:48,
    borderRadius:10,
    overflow:'hidden',
    backgroundColor:'white',
    paddingLeft:16,
    paddingRight:16,
    flex:1,
    marginRight:15,
  },
  button:{
    height:48,
    borderRadius:10,
    backgroundColor:'#788eec',
    width:180,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText:{
    color:'white',
    fontSize:20,
  },
  todoIcon:{
    marginTop:5,
    fontSize:20,
    marginLeft:14,
  },
  titulo:{
    paddingTop:20,
    fontSize:50,
    textAlign:'center',
    fontWeight:'bold',
    color:'#788eec'
  }
})