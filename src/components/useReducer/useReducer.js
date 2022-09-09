import React from "react";

const initialState = {
    value:'',
    error:false,
    loading:false,
    deleted:false,
    confirmed:false,
};

const actionTypes = {
    confirm:'CONFIRM',
    error:'ERROR',
    check:'CHECK',
    write:'WRITE',
    delete:'DELETE',
    reset:'RESET',
    finishLoading:'FINISHLOADING',
};

/*const reducer = (state,action) =>{
    if(action.type === 'ERROR'){
        return{
            ...state,
            error:true, 
            confirmed:false, 
        }
    }else if(action.type === 'CHECK'){
        return{
            ...state,
            error:false,
            loading:true,
        }
    }else if(action.type === 'CONFIRM'){
        return{
            ...state,
            confirmed:true, 
        }
    }else{
        return{
            ...state,
        }
    }
}*/

/*const reducer = (state,action) =>{

    switch (action.type) {
        case 'ERROR':
            return{
                ...state,
                error:true, 
                confirmed:false, 
            }
            break;
        case 'CHECK':
            return{
                ...state,
                error:false,
                loading:true,
            }
            break;
        case 'CONFIRM':
            return{
                ...state,
                confirmed:true, 
            }
            break;
        default:
            return{
                ...state,
            }
            break;
    }
    
}*/

const reducerObject = (state,action)=>({
    [actionTypes.error]:{
        ...state,
        error:true, 
        confirmed:false, 
    },
    [actionTypes.check]:{
        ...state,
        error:false,
        loading:true,
    },
    [actionTypes.confirm]:{
        ...state,
        confirmed:true, 
    },
    [actionTypes.write]:{
        ...state,
        value:action, 
    },
    [actionTypes.delete]:{
        ...state,
        deleted:true
    },
    [actionTypes.reset]:{
        ...state,
        deleted:false,
        confirmed:false,
        value:''
    },
    [actionTypes.finishLoading]:{
        ...state,
        loading:false,
    },
})

const reducer = (state,action)=>{
    if(reducerObject(state)[action.type]){
        return reducerObject(state,action.playLoad)[action.type]
    }else{
        return state;
    }
}

const SECURITY_CODE = "paradigma";

const UseReducer = ({name}) =>{

    const [state,dispatch] = React.useReducer(reducer, initialState);

    const onError = () =>{
        dispatch({
            type: actionTypes.error
        })
    }

    const onConfirm = ()=>{
        dispatch({
            type: actionTypes.confirm
        })
    }

    const onWrite = (value) =>{
        dispatch({
            type:actionTypes.write,
            playLoad:value
        }) 
    }

    const onCheck = () =>{
        dispatch({
            type:actionTypes.check
        }) 
    }

    const onDelete = ()=>{
        dispatch({
            type:actionTypes.delete
        }) 
    }

    const onReset = ()=>{
        dispatch({
            type:actionTypes.reset
        })
    }

    const onFinishLoading = ()=>{
        dispatch({
            type:actionTypes.finishLoading
        })
    }

    React.useEffect(()=>{
        if(state.loading){
            setTimeout(()=>{
                if(state.value !== SECURITY_CODE){
                    onError();
                }else{
                    onConfirm();
                }
                onFinishLoading();
            },3000);
        }
    },[state.loading])

    if(!state.deleted && !state.confirmed){
        return(
            <>
                <div>
                    <h2>Eliminar {name}</h2>
                    <p>Por favor, escribe el código de seguridad</p>
                    {state.error && !state.loading && (<p>El código es incorrecto</p>)}
                    {state.loading && (<p>Cargando...</p>)}
                    <input 
                        placeholder="Código de seguridad"
                        value={state.value}
                        onChange={(event)=>{
                                onWrite(event.target.value);  
                            }
                        }
                    />
                    <button onClick=
                        {
                            ()=>{
                                onCheck();
                            }
                        }
                    >
                        Comprobar
                    </button>
                </div>
            </>
        );
    }else if(!state.deleted && state.confirmed){
        return(
            <>
                <p>Pedimos confirmación. ¿estas seguro?</p>
                <button
                    onClick={()=>{
                        onDelete();
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={()=>{
                        onReset(); 
                    }}                
                >
                    No, cancelar
                </button>
            </>
        )
    }else{
        return(
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={()=>{
                        onReset();
                    }}                
                >
                    Volver al inicio
                </button>
            </>
        )
    }

}

export {UseReducer};