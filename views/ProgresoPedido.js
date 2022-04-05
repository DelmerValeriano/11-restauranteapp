import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text, H1, H3, Button} from 'native-base';

import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';
import {useNavigation} from '@react-navigation/native';
//muestra el el countdown en la pantalla

export const ProgresoPedido = () => {
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  const navigation = useNavigation();


  const {idPedido} = useContext(PedidoContext);

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idPedido)
        .onSnapshot(function (doc) {
          setTiempo(doc.data().tiempoEntrega);
          setCompletado(doc.data().completado);
        });
    };

    obtenerProducto();
  }, []);

  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes} : {seconds}
      </Text>
    );
  };

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Hemos recivido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Su orden estara lista en:{' '}
            </Text>
            <Text style={{textAlign: 'center'}}>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
          <>
          <H1 style={styles.textoCompletado}> Orden Lista </H1>
          <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>
            <Button
              style={[globalStyles.boton,{marginTop:100}]}
              block
              rounded
              onPress={() => navigation.navigate('NuevaOrden')}
            >
              <Text style={globalStyles.botonTexto}>Comenzar una orden nueva</Text>

            </Button>
          </>
        )}

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    marginTop: 30,
  },
  textoCompletado:{
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom:20,
  }
});
