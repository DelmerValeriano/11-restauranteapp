import {
  SELECCIONAR_PRODUCTOS,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO

} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTOS:
      return {
        ...state,
        platillo: action.payload,
      };
    case CONFIRMAR_ORDENAR_PLATILLO:
      return {
        ...state,
        pedido: [...state.pedido, action.payload],
      };
    case MOSTRAR_RESUMEN:
      return {
        ...state,
        total: action.payload,
      };

    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        pedido: state.pedido.filter(
            (pedido) => pedido.id !== action.payload
        )
      };
    case PEDIDO_ORDENADO:
      return {
        ...state,
        pedido:[],
        total:0,
        idPedido: action.payload,
      }

    default:
      return state;
  }
};
