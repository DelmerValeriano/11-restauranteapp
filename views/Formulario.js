import React,{useState,useContext,useEffect} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Button,
  Grid,
  Text,
  Col,
  Footer,
  FooterTab,
} from 'native-base';
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';

export const Formulario = () => {

  //State para cantidades
  const [cantidad, setCantidad] = useState(1);
  const [total,setTotal] = useState(0);
  //Context de pedidos
  const {platillo,guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;

  //redireccionar con navigation
  const navigation = useNavigation();


  //En cuanto el componente carga calcular el total a pagar

  useEffect(() => {
    calcularTotal();



  } ,[cantidad]);


  //calcula el total del platillo por du cantidad

  const calcularTotal =()=>{
    const totalPagar =precio*cantidad
    setTotal(totalPagar);


  }

  //Se incrementa en 1 ;a cantidad
  const incrementarUno = () => {

    const nuevCantidad = parseInt(cantidad) +1

    setCantidad(nuevCantidad);

  }
  //Decrementar en uno
  const decrementarUno = () => {

    if (cantidad>1) {
      const nuevCantidad = parseInt(cantidad) -1
      setCantidad(nuevCantidad);

      
    }
    
  }
  //confirma si la orden es correctamente

const confirmarOden = () =>{
  Alert.alert(
    'Confirmar Orden',
    'Estas seguro de que quieres confirmar la orden?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
         onPress: () => {
           //almacenar el pedido principal
           const pedido = {
             ...platillo,
              cantidad,
              total,

           }
           guardarPedido(pedido);

           //navegar al resumen
            navigation.navigate('ResumenPedido');


        }
     },
    ],
   
  );


}

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{height:80,justifyContent:'center',width:'100%'}}
                onPress={() => decrementarUno()}

              >
                <Icon style={{fontSize:40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                value={cantidad.toString()}
                style  ={{textAlign: 'center',fontSize:40}}  
                keyboardType="numeric"
                onChangeText={(cantidad) => setCantidad(cantidad)}         
              />
            </Col>
            <Col
            
            >
            <Button
                props
                dark
                style={{height: 80, justifyContent: 'center',width:'100%'}}
                onPress={() => incrementarUno()}


              >
                <Icon style={{fontSize:40}} name="add" />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
          

        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => confirmarOden()}
          >
            <Text style={[globalStyles.botonTexto,{fontSize:15}]}>Agregar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
