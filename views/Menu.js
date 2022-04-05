import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';

import globalStyles from '../styles/global';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';




export const Menu = () => {
  //Context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);

  //Context de pedidos
  const {pedido, seleccionarPlatillo} = useContext(PedidoContext);

  //Hook para redireccionar
  const navigation = useNavigation();



  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    const categoriaAnterior = menu[i - 1]?.categoria;

    if (categoriaAnterior !== categoria) {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container styles={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map((platillo, i) => {
            const {imagen, nombre, descripcion, categoria, precio, id} =
              platillo;

            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() =>{
                    const {existencia,...platillo2} =platillo;                   
                    seleccionarPlatillo(platillo2)
                    navigation.navigate('DetallePlatillo');

                  }}

                >
                  <Thumbnail large source={{uri: imagen}} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text numberOfLines={2} note>
                      {descripcion}
                    </Text>
                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
