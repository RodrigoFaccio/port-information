import { useContext, useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'

import logo from '../../assets/logo-login.png'
import api from '../../services/api'
import LoginContext from '../../contexts/LoginContext'

import {useHistory} from 'react-router-dom'

import './styles.css'

function initialState() {
  return {email:'',senha:''}
}

export default function Login() {
  const { token,setToken } = useContext(LoginContext)
  

  function onChage(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]:value
    })
  }
  const [values,setValues] = useState(initialState)
  const navigate = useNavigate()

 

  async function onSubmit(event) {
    event.preventDefault();
    const { data } = await api.post('/user/login', { email: values.email, senha: values.senha });

    if (data.message === 'Logado com sucesso') {
      setToken(data)

     navigate('/dashboard')

    }

    
    

  } 

  return (
    <div className="content">
      <img src={logo} alt="Port Information Logo" />

      <form onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChage}
          value={values.email}

        />
        <input
          type="password"
          id="password"
          name="senha"
          value={values.senha}
          
          placeholder="Senha"
          onChange={onChage}

        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  )
}