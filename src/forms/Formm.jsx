import React, {useState} from "react";
//treino de form
function Formm (){
const [state, setState] = useState({name: '', email: ''})
  const [mapa, setMapa] = useState([])

  const Send = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState((st) => {
      return {...st,[name]: value} 
    })
    console.log(state)
    
  }
  const HandleSubmit = (e) => {
    e.preventDefault()
    setMapa([...mapa, state]);
    setState({name: '', email:''})
    }
  const Mape = () => {
    if(mapa.length > 0){
      return(
        <ul>
          {mapa.map((mp, index) => (
            <li key={index}>
              {mp.name}, {mp.email}
            </li>
          ))}
        </ul>
      )
    }
  }
  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <label>
          Nome:
            <input name="name" value={state.name} onChange={Send}>
            </input>
          </label>
          <label>
          Email:
          <input name="email" value={state.email} onChange={Send}>
          </input>
          </label>
          <button type='submit'>Enviar</button>
        </form>
        <Mape />
      </div>
    </>
  )
}
export default Formm