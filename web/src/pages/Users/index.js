import { useEffect, useState } from 'react'
import { useSidebar } from '../../contexts/NavbarContext'
import api from '../../services/api';
import { VscGear } from "react-icons/vsc";
import { IoEyeSharp } from "react-icons/io5"
import { FaRegFileArchive } from "react-icons/fa"


import './styles.css'

function Users() {
  const { sidebar } = useSidebar(false)
  console.log(sidebar)
const [news,setNews] = useState([])
  useEffect(() => {

    async function requestNews(){
 const { data } = await api.get('/users')
    setNews(data)
    console.log(data)

      
    }
   requestNews()

  },[])
  return (
    <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
      <div className="pageContent">
        <h1>Usuários</h1>
        <table className='table'>
           <tr className='trTable'>
              <td>Id</td>
            <td>Nome</td>
              <td>Empresa</td>
            
              <td>Contato</td>
              <td>Cadastro em</td>
                  <td>App</td>
              <td>Tipo</td>
            <td>Ações</td>
            
            
          </tr>

          {
            news.map(item => (
              <>
            <div className="divider" />
                
                <tr>
                  
                  <td>{item.id}</td>

                  <td >{item.nome}</td>
                  <td >{ item.ogranizacao}</td>
                  <td >{ item.telefone}</td>
                  <td  >{ item.criado_em}</td>
                  <td className={item.app === true ? 'tdSim' : 'tdNao'} >{item.app===true?'SIM':'NÃO' }</td>
                  <td className={'LPAY'} >LPAY</td>
                  
                  <td className='tableClick'><VscGear onClick={()=>alert('Configurar')}/> </td>
                  
                  
                  
                  
                  
              </tr>
             
                </>
            ))
          }
          
          
            
            
        </table>

      </div>
    </div>
  );
}

export default Users;