import React, {useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Text,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from 'native-base';
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';

import firebase from '../firebase';

export const ResumenPedido = () => {
  const navigation = useNavigation();

  //context de pedido

  const {pedido, total, mostrarResumen, eliminaProducto,pedidoRealizado} =
    useContext(PedidoContext);


  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;

    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );

    mostrarResumen(nuevoTotal);
  };

  //redireccionar a progreso pedido

  const progresoPedido = () => {
    Alert.alert('Revisa tu pedido', '¿Estás seguro de que deseas continuar?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Continuar',
        onPress:  () => agregarFirestore(),
      },
    ]);
  };

  //Agregar a firestoragemodel
  const agregarFirestore = async ()=>{
    const pedidoObj = {
      tiempoEntrega: 0,
      completado: false,
      total: Number(total),
      orden: pedido, //array
      creado: Date.now(),
    };
    //Escribir nuestro pedido en firebase
    try {
      const pedido = await  firebase.db
        .collection('ordenes')
        .add(pedidoObj);

        
        pedidoRealizado(pedido.id);

        navigation.navigate('ProgresoPedido');
    } catch (error) {
      console.log(error);
    }



  }

  //elimina un producto del arreglo del pedido

  const confirmarEliminacion = id => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Si, Eliminar',
          onPress: () => {
            //eliminar del state
            eliminaProducto(id);
          },
        },
      ],
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen del pedido</H1>

        {pedido.map((platillo, i) => {
          const {nombre, precio, cantidad, imagen, id} = platillo;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: imagen}} />
                </Left>
                <Body>
                  <Text> {nombre} </Text>
                  <Text>Cantidad: {cantidad} </Text>
                  <Text>Precio: $ {precio} </Text>

                  <Button
                    full
                    danger
                    style={{marginTop: 10}}
                    onPress={() => confirmarEliminacion(id)}>
                    <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}

        <Text style={globalStyles.cantidad}>Total a Pagar: $ {total} </Text>

        <Button
          block
          onPress={() => navigation.navigate('Menu')}
          style={{marginTop: 30}}
          dark>
          <Text style={[globalStyles.botonTexto, {color: 'white'}]}>
            Seguir Pidiendo
          </Text>
        </Button>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            block
            onPress={() => progresoPedido()}
            style={[globalStyles.boton]}
            full>
            <Text style={[globalStyles.botonTexto, {fontSize: 16}]}>
              Ordenar Pedido
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
