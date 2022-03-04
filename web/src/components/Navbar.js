import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { SidebarQueriesData, SidebarAdminData, SidebarEmailsData, SidebarNotificationsData, SidebarNetmidiaData } from './SidebarData'
import { IconContext } from 'react-icons'
import { Scrollbars } from 'react-custom-scrollbars'

import { useSidebar } from '../contexts/NavbarContext'

import logo from '../assets/logo.png'
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md"

import "./Navbar.css"

function Navbar() {
  const navigate = useNavigate()

  const { sidebar, setSidebar } = useSidebar(false)

  function handleLogout(event) {
    event.preventDefault()

    let response = (window.confirm("Deseja sair da aplicação?"))

    if (response) { navigate('/') }
  }

  return (
    <>
      <div className="navbarContainer">
        <IconContext.Provider value={{ color: '#707070' }}>
          <div className="navbar">
            <div id="navbarToggle">
              <li className={sidebar ? 'navbar-toggle active' : 'navbar-toggle'} onClick={() => setSidebar(!sidebar)}>
                <img src={logo} alt="logo" />
                <div className='menu-bars'>
                  <FaIcons.FaBars />
                </div>
              </li>
            </div>
            <Link to="#" className='menu-bars'>
              <MdIcons.MdLogout className='logout' onClick={handleLogout} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul>

            </ul>
            <Scrollbars className="scrollbar">
              <ul className="nav-menu-items">

                <li className={sidebar ? 'sidebarTopics' : 'sidebarTopics hidden'} style={{ marginTop: 60 }}>
                  <span>{sidebar ? 'CONSULTAS' : '...'}</span>
                </li>
                {SidebarQueriesData.map((item, index) => {
                  return (
                    <li key={index} className='nav-text'>
                      <Link to={`/dashboard${item.path}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}

                <li className={sidebar ? 'sidebarTopics' : 'sidebarTopics hidden'}>
                  <span>{sidebar ? 'ADMIN' : '...'}</span>
                </li>
                {SidebarAdminData.map((item, index) => {
                  return (
                    <li key={index} className='nav-text'>
                      <Link to={`/dashboard${item.path}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}

                <li className={sidebar ? 'sidebarTopics' : 'sidebarTopics hidden'}>
                  <span>{sidebar ? 'EMAILS' : '...'}</span>
                </li>
                {SidebarEmailsData.map((item, index) => {
                  return (
                    <li key={index} className='nav-text'>
                      <Link to={`/dashboard${item.path}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}

                <li className={sidebar ? 'sidebarTopics' : 'sidebarTopics hidden'}>
                  <span>{sidebar ? 'NOTIFICAÇÕES' : '...'}</span>
                </li>
                {SidebarNotificationsData.map((item, index) => {
                  return (
                    <li key={index} className='nav-text'>
                      <Link to={`/dashboard${item.path}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}

                <li className={sidebar ? 'sidebarTopics' : 'sidebarTopics hidden'}>
                  <span>{sidebar ? 'NETMÍDIA' : '...'}</span>
                </li>
                {SidebarNetmidiaData.map((item, index) => {
                  return (
                    <li key={index} className='nav-text'>
                      <Link to={`/dashboard${item.path}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Scrollbars>
          </nav>
        </IconContext.Provider>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar