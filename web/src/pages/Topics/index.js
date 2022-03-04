import React, { useEffect, useState, useMemo } from 'react'
import { useSidebar } from '../../contexts/NavbarContext'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter } from '../../components/TableFilter'
import api from '../../services/api'

import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

import './styles.css'

function Topics() {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)

  const [newTopic, setNewTopic] = useState({
    nome:'',cor:''
  })



  async function create() {
    console.log(newTopic)

    try {
      const response = await api.post('/topics/add', {
        nome: newTopic.nome,
        cor: newTopic.cor,
        f_id_admin:1
      })

      setReload(!reload)
    } catch (error) {
      
      console.log(error)
    }





    setCreateModal(false)
    setNewTopic({ nome:'',cor:''})
    
    
  }
  async function upadate() {

    console.log(newTopic)

        try {
      await api.put(`/topics/update/${newTopic.id}`, {
        nome: newTopic.nome,
        cor:newTopic.cor
      });
          setReload(!reload)
          setUpdateModal(false)
          setNewTopic({ nome:'',cor:''})
          

    } catch (error) {

      console.log(error)
      
    }


     
  }

   async function deleteTopic(){

    console.log(newTopic)
    try {
      await api.delete(`/topics/delete/${newTopic.id}`);
      setReload(!reload)
      setDeleteModal(false)

    } catch (error) {

      console.log(error)
      
    }
     
     setReload(!reload)
     setDeleteModal(false)
     setNewTopic({nome:'',cor:'',id:''})
  } 



  useEffect(() => {
    const doFetch = async () => {
      const response = await api.get('/topics')
      console.log(response.data)
      setData(response.data)
    }
    doFetch()
  }, [reload])

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Cor",
        accessor: "cor",
      },
    ],
    []
  )

  const tableHooks = (hooks) => {

    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Actions',
        Header: 'Ações',
        Cell: (props) => (
          <div className="actions">
            <AiIcons.AiFillEdit
              className="actionButton"
              onClick={() => {
                setUpdateModal(true)
                setNewTopic({
                  id:props.row.original.id,
                  nome: props.row.original.nome,
                  cor: props.row.original.cor,
                  
                })
                console.log(props.row.original)
              }}
            />
            <AiIcons.AiFillDelete
              className="actionButton"
              onClick={() => {

                setNewTopic({id:props.row.original.id,nome:props.row.original.nome})
                setDeleteModal(true)
              }}
            />
          </div>
        )
      }
    ])
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    setPageSize,
    pageOptions,
    setGlobalFilter,
    canNextPage,
    canPreviousPage,
  } = useTable({
    columns,
    data,
  }, tableHooks, useGlobalFilter, useSortBy, usePagination)

  const { globalFilter, pageIndex, pageSize } = state

  const { sidebar } = useSidebar(false)

  return (

    <>

      {createModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1>Novo Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setCreateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" value={newTopic.nome} onChange={(e)=>setNewTopic({nome:e.target.value,cor:newTopic.cor})} placeholder="Novo assunto" />
              <span>Cor</span>
              <input value={newTopic.cor} onChange={(e)=>setNewTopic({cor:e.target.value,nome:newTopic.nome})} type="text" placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setCreateModal(false) }}>Cancelar</button>
              <button onClick={()=>create()}>Criar</button>
            </div> 
          </div>
        </div>
      }

      {updateModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setUpdateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" value={newTopic.nome} onChange={(e)=>setNewTopic({nome:e.target.value,cor:newTopic.cor,id:newTopic.id})}  placeholder="" />
              <span>Cor</span>
              <input type="text" value={newTopic.cor} onChange={(e)=>setNewTopic({cor:e.target.value,nome:newTopic.nome,id:newTopic.id})} placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setUpdateModal(false) }}>Cancelar</button>
              <button onClick={()=>upadate()}>Salvar</button>
            </div>
          </div>
        </div>
      }

      {deleteModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setDeleteModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Você irá deletar o assunto '{newTopic.nome }'</span>

            </div>
            <div className="modalFooter">
              <button onClick={() => { setDeleteModal(false) }}>Cancelar</button>
              <button onClick={()=>deleteTopic()}>Deletar</button>
            </div>
          </div>
        </div>
      }

      <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
        <div className="pageContent">
          <div className="contentHeader">
            <div className="headerIcon">
              <BsIcons.BsFillBookmarksFill style={{ color: '#f4516c', height: '34px', width: '34px' }} />
              <h1>Assuntos</h1>
            </div>
            <div className="headerTools">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />


              <button
                className="openModalBtn"
                onClick={() => { setCreateModal(true) }}
              >
                Novo
              </button>

            </div>
          </div>

          <div className="contentBody">
            <table id="topicsTable" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className='previous'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Anterior
              </button>
              <span>
                Página <strong>{pageIndex + 1} de {pageOptions.length}</strong>
              </span>
              <select
                className="rowsSelection"
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
              <button
                className='next'
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topics;