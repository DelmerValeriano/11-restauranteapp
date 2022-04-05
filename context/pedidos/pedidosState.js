import React, {useReducer} from 'react';

import pedidosReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';
import {
  CONFIRMAR_ORDENAR_PLATILLO,
  SELECCIONAR_PRODUCTOS,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from '../../types';

const PedidoState = props => {
  //crear un state inicializar
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idPedido:'',
  };

  //useReducer con dispatch para ejecutar funciones

  const [state, dispatch] = useReducer(pedidosReducer, initialState);

  //Selecciona el producto que el usuario presione

  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTOS,
      payload: platillo,
    });
  };

  //CUANDO USUARIO CONFIRMA UN PLATILLOS
  const guardarPedido = pedido => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };

  //Muestra el total a pagar en el resumen

  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  //elimina un articulo del carrito

  const eliminaProducto = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  const pedidoRealizado = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  }

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idPedido: state.idPedido,
        mostrarResumen,
        seleccionarPlatillo,
        guardarPedido,
        eliminaProducto,
        pedidoRealizado
      }}>
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
