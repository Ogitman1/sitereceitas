import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase'; // Importe seu objeto app configurado
import RecipeForm from './RecipeForm';
import '../css/RecipeList.css';

// Criação e exportação do contexto
export const NovoContexto = createContext();

function Authenticate() {
  const [check, setCheck] = useState({ emailLogin: '', passwordLogin: '', emailRegister: '', passwordRegister: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para controle de autenticação
  const [userr, setUser] = useState(null); // Inicialize como null
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const Verifica = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCheck((st) => ({
      ...st,
      [name]: value
    }));
  };

  // Função de registro
  const RegisterUser = async (e) => {
    e.preventDefault();
    const { emailRegister, passwordRegister } = check;
    try {
      const register = await createUserWithEmailAndPassword(auth, emailRegister, passwordRegister);
      const user = register.user;
      setIsAuthenticated(true);
      setCheck({ emailRegister: '', passwordRegister: '' });
      setUser(user); // Atualiza o estado corretamente
      setError(''); // Limpa mensagens de erro
    } catch (error) {
      console.error("Erro no registro: ", error);
      setError(getFirebaseErrorMessage(error.code));
      setTimeout(() => {setError(null)}, 3000)
      setIsAuthenticated(false);
    }
  };

  // Função de Login
  const LoginUser = async (e) => {
    e.preventDefault();
    const { emailLogin, passwordLogin } = check;
    try {
      const Login = await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
      const user = Login.user;
      setIsAuthenticated(true);
      setCheck({ emailLogin: '', passwordLogin: '' });
      setUser(user); // Atualiza o estado corretamente
      setError(''); // Limpa mensagens de erro
    } catch (error) {
      console.error("Erro ao se conectar: ", error);
      setError(getFirebaseErrorMessage(error.code));
      setTimeout(() => {setError(null)}, 3000)
      setIsAuthenticated(false);
    }
  };

  // Função para obter mensagem de erro do Firebase
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      default:
        return 'Ocorreu um erro desconhecido.';
    }
    
  };

  return (
    <div style={{ color: "white" }}>
      {
        isAuthenticated ? (
          <NovoContexto.Provider value={{ userr }}>
            <RecipeForm />
          </NovoContexto.Provider>
        ) : (
          <div>
          <>{error && <div className='errordiv'><p >{error}</p></div>}</>
          <>
            <h2>Seja Bem-Vindo!</h2>
            <p>Clique em um dos botões abaixo para entrar</p>
            
            <form onSubmit={RegisterUser}>
              <label>
                email: <input type='text' name='emailRegister' value={check.emailRegister} onChange={Verifica} />
              </label>
              <label>
                senha: <input name='passwordRegister' value={check.passwordRegister} onChange={Verifica} type='password' />
              </label>
              <button type="submit">Registrar-se</button>
            </form>
            OU
            <form onSubmit={LoginUser}>
              <label>
                email: <input type='text' name='emailLogin' value={check.emailLogin} onChange={Verifica} />
              </label>
              <label>
                senha: <input name='passwordLogin' value={check.passwordLogin} onChange={Verifica} type='password' />
              </label>
              <button type="submit">Logar</button>
            </form>
          </>
          </div>
        )
      }
    </div>
  );
}

export default Authenticate;
