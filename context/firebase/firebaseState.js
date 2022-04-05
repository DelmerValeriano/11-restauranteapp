import React,{useReducer} from 'react';

import firebase from '../../firebase'


import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import { OBTENER_PRODUCTOS_EXITO } from '../../types';
import _ from 'lodash';



const FirebaseState = (props) => {


    //crear un state inicializar
    const initialState = {
        menu:[]
    }

    //useReducer con dispatch para ejecutar funciones

    const [state,dispatch] = useReducer(FirebaseReducer,initialState);

    //funcion que se ejecuta para traer los productos

    const obtenerProductos = () => {


        //consultar firebase
        // firebase.db.settings({ experimentalForceLongPolling: true }); 
         firebase.db.collection('productos')
                    .where('existencia','==',true)
                    .onSnapshot(manejarSnapshot)


        function manejarSnapshot(snapshot){

            //crear un arreglo
            let platillos = snapshot.docs.map(doc => {
                return{
                    id:doc.id,
                    ...doc.data()
                }
            })

            //ordenar por categoria por lodash

            platillos = _.sortBy(platillos, 'categoria') 

           
            dispatch({
                type:OBTENER_PRODUCTOS_EXITO,
                payload:platillos
            });

        }


    }



    return(
        <FirebaseContext.Provider  value={{menu:state.menu, firebase,obtenerProductos}}>
            {props.children}
        </FirebaseContext.Provider>
    )

}

export default FirebaseState;



