import React from 'react';
import {View,StyleSheet} from 'react-native';
import globalStyles from '../styles/global';
import {Text,Button,Container} from 'native-base';
import { useNavigation } from '@react-navigation/native';



export const NuevaOrden = () => {
  const navigation = useNavigation();


  return (
   <Container style={globalStyles.contenedor} >
      <View style={[globalStyles.contenido,styles.contenido]}>
        <Button
          block
          rounded
          style={globalStyles.boton}
          onPress={() => navigation.navigate('Menu')}
          
       

        >
          <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
        </Button>
      </View>
   </Container>

  )
}


const styles = StyleSheet.create({
    contenido:{
      flexDirection:'column',
      justifyContent:'center',
    },

})
