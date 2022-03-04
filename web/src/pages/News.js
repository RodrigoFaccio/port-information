import { useEffect, useState } from 'react'
import { useSidebar } from '../contexts/NavbarContext'
import api from '../services/api'
import { VscGear } from "react-icons/vsc";
import {IoEyeSharp} from "react-icons/io5"
import './News.css'

function News() {
  const { sidebar } = useSidebar(false)
  console.log(sidebar)
const [news,setNews] = useState([])
  useEffect(() => {

    async function requestNews(){
 const { data } = await api.get('/news')
    setNews(data)
    console.log(data)

      
    }
   requestNews()

  },[])
  return (
    <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
      <div className="pageContent">
        <h1>News</h1>
        <table className='trTable'>
           <tr>
              <td>Id</td>
              <td>Titulo</td>
              <td>Assunto</td>
              <td>Data</td>
                  <td>Tipo</td>
              <td>Exibicao</td>
                  <td>Arquivos</td>
              <td>Ações</td>
          </tr>

          {
            news.map(item => (
              <>
              <tr>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td>Port information</td>
                  <td>04/03/2022</td>
                  <td>{item.html ? 'HTML' : 'BOLETIM'}</td>
                  <td>{item.html?'HTML':'BOLETIM' }</td>
                  <td>{item.oculto === 1 ? 'OCULTO' : 'EM EXIBIÇÃO'}</td>
                  <td className='tableClick'><VscGear onClick={()=>alert('Configurar')}/> <IoEyeSharp onClick={()=>alert('Ver news')}/></td>
                  
                  
                  
                  
                  
              </tr>
             
                </>
            ))
          }
          
          
            
            
        </table>

      </div>
    </div>
  );
}

export default News;