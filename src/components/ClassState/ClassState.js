import React from "react";
import { Loading } from "./Loading";
const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {

    constructor(){
        super();
        this.state = {
            error:false,
            loading:false,
            value:"",
        };
    }

    // componentDidMount(){
    //     console.log("componentDidMount");
    // }

    // componentWillUnmount(){
    //     console.log("componentWillUnmount");
    // }

    // UNSAFE_componentWillMount (){
    //     console.log("componentWillMount");
    // }

 
   
    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(()=>{
                console.log("Validacion");
                if(SECURITY_CODE !== this.state.value){
                    this.setState({error:true});
                }else{
                    this.setState({error:false});
                }
                this.setState({loading:false});
                console.log("Terminando validacion");
            },3000);
        }
    }


    render(){
        const {error,loading,value} = this.state;
        return(
            <>
                <div>
                    <h2>Eliminar {this.props.name}</h2>
                    <p>Por favor, escribe el código de seguridad</p>
                    {error && (<p>Código incorrecto</p>)}
                    {loading && (<Loading/>)}
                    <input 
                        placeholder="Código de seguridad"
                        value={value}
                        onChange={(even)=>{
                            this.setState({value:even.target.value});
                        }}
                    />
                    <button
                        onClick={
                            ()=>{
                                this.setState(
                                    {
                                        error:false,
                                        loading:true
                                    }
                                );                   
                            }
                        }>
                        Comprobar
                    </button>
                </div>
            </>
        )
    };

}

export {ClassState};