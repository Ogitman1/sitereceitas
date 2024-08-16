import React, { useState, useContext, createContext } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import RecipeList from './RecipeList';
import { NovoContexto } from './Authenticate';

// Criação e exportação do contexto
export const Context = createContext();

function RecipeForm() {
  const [state, setState] = useState({ nmreceita: '', inst: '', ingredientes: '' });
  const [mapa, setMapa] = useState([]);
  
  // Pega o valor do contexto
  const { userr } = useContext(NovoContexto);

  // Função para lidar com as mudanças no formulário
  const Send = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Função para adicionar uma nova receita ao Firestore
  const Check = async (e) => {
    e.preventDefault();
    // Verifica se algum dos campos obrigatórios está vazio
    if (state.nmreceita.trim() === '' || state.inst.trim() === '' || state.ingredientes.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return; // Não continua o envio dos dados ao Firestore
    }
    const newRecipe = {
      ...state,
      inst: state.inst.split('.').map((item) => item.trim()), // separe o array em uma lista de substrings com . e tire os espaços em branco
      ingredientes: state.ingredientes.split('.').map((item) => item.trim()), // separe o array em uma lista de substrings com . e tire os espaços em branco
      userId: userr.uid
    };
    try {
      // Adiciona a nova receita ao Firestore
      const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
      console.log('Receita adicionada com sucesso', docRef.id);

      // Limpa o formulário após adicionar
      setMapa((prevMapa) => [...prevMapa, newRecipe]);
      setState({ nmreceita: '', inst: '', ingredientes: '' });
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
    }
  };

  return (
    <Context.Provider value={{ mapa, setMapa }}>
      <div>
        <form onSubmit={Check}>
          <label>
            Receita
            <input type='text' name="nmreceita" value={state.nmreceita} onChange={Send} />
          </label>
          <label>
            Instruções
            <textarea style={{
              height: '200px',
              width: '500px',
              overflowY: 'scroll',
              borderRadius: '12px',
            }} name="inst" value={state.inst} onChange={Send} />
          </label>
          <label>
            Ingredientes
            <textarea style={{
              height: '200px',
              width: '500px',
              overflowY: 'scroll',
              borderRadius: '12px',
            }} name="ingredientes" value={state.ingredientes} onChange={Send} />
          </label>
          <button type="submit">Guardar</button>
        </form>
        <RecipeList userr={userr} />
      </div>
    </Context.Provider>
  );
}

export default RecipeForm;
