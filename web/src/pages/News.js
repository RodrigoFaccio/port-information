import { useEffect, useState } from 'react'
import { useSidebar } from '../contexts/NavbarContext'
import api from '../services/api'
import { VscGear } from "react-icons/vsc";
import { IoEyeSharp } from "react-icons/io5"
import { FaRegFileArchive } from "react-icons/fa"


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
        <h1>Publicações</h1>
        <table className='table'>
           <tr className='trTable'>
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
                
                <tr className='trBorder'>
                  
                  <td>{item.id}</td>

                  <td style={{fontWeight:'bold',color:'black'}}>{item.titulo}</td>
                  <td style={{fontWeight:'initial'}}>Port information</td>
                  <td style={{fontWeight:'bold',color:'black'}}>04/03/2022</td>
                  <td className={item.html?'tdHtml':'tdBoletins'} >{item.html ? 'HTML' : 'BOLETIM'}</td>
                  <td className={item.oculto===1?'tdHtml':'tdBoletins'} >{item.oculto === 1 ? 'OCULTO' : 'EM EXIBIÇÃO'}</td>
                  <td>{item.arquivo&&(<FaRegFileArchive/>) }</td>
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