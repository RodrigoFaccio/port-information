import React, { useEffect, useState, useMemo } from 'react'
import { useSidebar } from '../../contexts/NavbarContext'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter } from '../../components/TableFilter'
import api from '../../services/api'

import * as AiIcons from "react-icons/ai";

import './styles.css'

function Tags() {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState([])
  const [updateData, setUpadateData] = useState()
  const [reload,setReload] = useState(false)
  const [deleteData, setDeleteData] = useState()
  const [nameTag,setNameTag]=useState()
  
  useEffect(() => {
    const doFetch = async () => {
      const response = await api.get('/tags')
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
    ],
    []
  )


  function searchDetails(datas){
    setUpdateModal(true)
    console.log(datas)
    setUpadateData(datas)

  }

  async function updated() {

    console.log(updateData)
    try {
      await api.put(`/tags/update/${updateData.id}`, {
        nome:updateData.nome
      });
      setReload(!reload)
      setUpdateModal(false)

    } catch (error) {

      console.log(error)
      
    }
  } 
 async function deleteTag() {

    console.log(updateData)
    try {
      await api.delete(`/tags/delete/${deleteData.id}`);
      setReload(!reload)
      setDeleteModal(false)

    } catch (error) {

      console.log(error)
      
    }
  } 

  async function createTag() {
    try {
      await api.post(`/tags/add`, {
        nome:nameTag
      });
      setReload(!reload)
      setCreateModal(false)
      setNameTag()

    } catch (error) {

      console.log(error)
      
    }
  }
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
                searchDetails(props.row.original)
                console.log(props.row.original)
              }}
            />
            <AiIcons.AiFillDelete
              className="actionButton"
              onClick={() => {
                setDeleteData(props.row.original)

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
              <h1>Nova Tag</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setCreateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome da Tag:</span>
              <input type="text" value={nameTag} onChange={((e)=>setNameTag(e.target.value))} placeholder="Nova Tag" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setCreateModal(false) }}>Cancelar</button>
              <button onClick={()=>createTag()} >Criar</button>
            </div>
          </div>
        </div>
      }

      {updateModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Tag</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setUpdateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome da Tag:</span>
              <input type="text" value={updateData.nome} onChange={(e)=>setUpadateData({nome:e.target.value,id:updateData.id})} placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setUpdateModal(false) }}>Cancelar</button>
              <button onClickCapture={()=>updated()}>Salvar</button>
            </div>
          </div>
        </div>
      }

      {deleteModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Tag</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setDeleteModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Você ira deletar a tag '{deleteData.nome}'</span>

            </div>
            <div className="modalFooter">
              <button onClick={() => { setDeleteModal(false) }}>Cancelar</button>
              <button onClick={()=>deleteTag()}>Deletar</button>
            </div>
          </div>
        </div>
      }


      <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
        <div className="pageContent">
          <div className="contentHeader">
            <div className="headerIcon">
              <AiIcons.AiFillTags style={{ color: '#f4516c', height: '34px', width: '34px' }} />
              <h1>Tags</h1>
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
            <table id="tagTable" {...getTableProps()}>
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
      </div >
    </>
  );
}

export default Tags;
