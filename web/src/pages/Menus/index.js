import React, { useEffect, useState, useMemo } from 'react'
import { useSidebar } from '../../contexts/NavbarContext'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter } from '../../components/TableFilter'
import api from '../../services/api'

import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import './styles.css'


function Menus() {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [menus, setMenus] = useState([])

  useEffect(() => {
    async function loadMenus() {
      const response = await api.get('/menus')

      console.log(response.data)
      setMenus(response.data)
    }

    loadMenus()
  }, [])

  const { sidebar } = useSidebar(false)

  return (
    <>

      {createModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1>Novo Menu</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setCreateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" placeholder="Novo menu" />
              <span>Descrição</span>
              <input type="text" placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setCreateModal(false) }}>Cancelar</button>
              <button>Criar</button>
            </div>
          </div>
        </div>
      }

      {updateModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1>Menu</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setUpdateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" placeholder="" />
              <span>Descrição</span>
              <input type="text" placeholder="" />
            </div>
            <div className="modalFooter menu-modal">
              <button onClick={() => { setUpdateModal(false) }}>Cancelar</button>
              <button>Ocultar menu</button>
              <button>Salvar</button>
            </div>
          </div>
        </div>
      }

      <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
        <div className="pageContent">
          <div className="contentHeader">
            <div className="headerIcon">
              <MdIcons.MdSubject style={{ color: '#f4516c', height: '34px', width: '34px' }} />
              <h1>Menus</h1>
            </div>
            <div className="headerTools">
              <button
                className="openModalBtn"
                onClick={() => { setCreateModal(true) }}
              >
                Novo
              </button>
            </div>
          </div>
          <div className="contentBody">
            <div className="menusHeader">
              <span>Aplicativo</span>
            </div>
            <div className="menusCards">
              <ul id="cards">
                {menus.map(menu => (
                  <li key={menu.id} className="menuItem">
                    <span>{menu.nome}</span>
                    <button onClick={() => { setUpdateModal(true) }}>Ativo</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menus;