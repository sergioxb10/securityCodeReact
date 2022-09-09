import React from "react";
import { ApiAWS } from "../../services";

const SECURITY_CODE = "paradigma";

const UseState = ({name}) =>{

    const [state,setState] = React.useState({
        value:"",
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
    });


    const [value,setValue] = React.useState("");

    /*const [error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [value,setValue] = React.useState('');*/

    const onError = () =>{
        setState( (prevState) => (
            {
                ...prevState,
                error:true, 
                confirmed:false,  
            }
        ));
    }

    const onConfirm = ()=>{
        setState( (prevState) => (
            {
                ...prevState,
                confirmed:true,  
            }
        ));
    }

    const onWrite = (value) =>{
        setState((prevState) => (
            {
                ...prevState,
                value:value,
            }
        ));
    }

    const onCheck = () =>{
        setState((prevState) => (
            {
                ...prevState,
                error:false,
                loading:true,
            }
        ));
    }

    const onDelete = ()=>{
        setState((prevState) => (
            {
                ...prevState,
                deleted:true
            }
        ))
    }

    const onReset = ()=>{
        setState((prevState) => (
            {
                ...prevState,
                deleted:false,
                confirmed:false,
                value:''
            }
        ))
    }

    const onFinishLoading = ()=>{
        setState((prevState) => (
            {
                ...prevState,
                loading:false,
            }
        ));
    }

    React.useEffect(()=>{
        /*if(state.loading){
            setTimeout(()=>{
                if(state.value !== SECURITY_CODE){
                    onError();
                    //setError(true);
                }else{
                    onConfirm();
                }
                onFinishLoading();
                //setLoading(false);
            },3000);
        }*/

        if(state.loading){
            ApiAWS(state.value)
            .then((response)=>{
                if(response.data.error === ""){
                    onConfirm();
                }else{
                    onError();
                }
            })
            .catch((e)=>{
            setValue(e);
            console.log(e)
            }).finally(()=>{
                onFinishLoading();
            })
            
        }
    },[state.loading])

    if(!state.deleted && !state.confirmed){
        return(
            <>
                <div>
                    <h2>Eliminar tarea</h2>
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
                                //setError(false);
                                //setLoading(true)
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

export {UseState};