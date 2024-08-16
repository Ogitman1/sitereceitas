import React, { useContext, useEffect, useState } from 'react';
import { Context } from './RecipeForm';
import { db, auth } from '../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../css/RecipeList.css';

function RecipeList({userr}) {
  const { mapa } = useContext(Context);
  const [rec, setRec] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  //função asyncrona/Promise que retorna a query comm try e catch
  const searchRecipes = async() => {
    //printa o uid do usuário se ele existir
    console.log("UID do usuário:", userr?.uid);
    //se ele não existir, fala que o usuário não está conectado
    if (!userr) {
      alert("Usuário não conectado: " + userr);
      return;
    }
    try {
      console.log("Buscando receitas para UID:", userr.uid);
      const q = query(collection(db, 'recipes'), where('userId', '==', userr.uid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log(userr.uid);
        alert("Você não adicionou nada");
        return;
      }
  
      console.log("Receitas encontradas:", querySnapshot.docs.map((doc) => doc.data()));
      const recipeData = querySnapshot.docs.map((doc) => doc.data());
      setRec(recipeData);
      
      setCarregando(false);
    } catch (erro) {
      console.error("Erro ao buscar receitas:", erro);
    }
  }
  const fetchRecipes = () => {
    setCarregando(true);
    //'Atraso proposital para a request de query
    setTimeout(() => {
      searchRecipes()
    }, 1000)
    
  };
  //função que verifica o tamanho do array e mapeia a query
  const Loading = () => {
    if(rec.length > 0){
      return(
        <>
        {
      rec.map((mp) => (
      <div id='table' key={mp.uid}>
        <hr />
        <h2>{mp.nmreceita}</h2>
        <hr />
        <h3>Ingredientes</h3>
        <hr />
        <ul>
          {mp.ingredientes.map((nn, i) => (
            <li key={i}>{nn}</li>
          ))}
        </ul>
        <hr />
        <h3>Instruções</h3>
        <hr />
        <ul>
          {mp.inst.map((nn, i) => (
            <li key={i}>{nn}</li>
          ))}
        </ul>
        <hr />
      </div>
      )
    )
    }
    </>)
    }
    else{
      return null
    }
    
  }

  return (
    <div>
      {

      mapa.length > 0 &&
        mapa.map((mp, id) => (
          <div id='table' key={id}>
            <hr />
            <h2>{mp.nmreceita }</h2>
            <hr />
            <h3>Ingredientes</h3>
            <hr />
            <ul>
              {mp.ingredientes.map((nn, i) => (
                <li style={{ margin: '10px 0 20px 0', padding: '15px 5px' }} key={i}>
                  {nn}
                </li>
              ))}
            </ul>
            <hr />
            <h3>Instruções</h3>
            <hr />
            <ul>
              {mp.inst.map((nn, i) => (
                <li style={{ margin: '10px 0 20px 0', padding: '15px 5px' }} key={i}>
                  {nn}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}

      {
        carregando ? (
          <div className='loading-screen'>
            <div className='spinner'>

            </div>
          </div>
        ) : (
        <>
        <button onClick={fetchRecipes}>Recuperar receitas</button>
        <Loading />
        </>
      )
      }

      
    </div>
  );
}

export default RecipeList;
