import { useNavigate } from 'react-router-dom'

import logo from '../../assets/logo-login.png'

import './styles.css'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    navigate('/dashboard/initial')
  }

  return (
    <div className="content">
      <img src={logo} alt="Port Information Logo" />

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  )
}