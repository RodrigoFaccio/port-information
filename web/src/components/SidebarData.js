import React from 'react';
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md"
import * as FaIcons from "react-icons/fa"
import * as GoIcons from "react-icons/go"

export const SidebarQueriesData = [
  {
    title: 'Inicial',
    path: '/initial',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Publicações',
    path: '/news',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
]

export const SidebarAdminData = [
  {
    title: 'Nova Publicação',
    path: '/newNews',
    icon: <MdIcons.MdNewReleases />,
    cName: 'nav-text'
  },
  {
    title: 'Tags',
    path: '/tags',
    icon: <AiIcons.AiFillTags />,
    cName: 'nav-text'
  },
  {
    title: 'Assuntos',
    path: '/topics',
    icon: <BsIcons.BsFillBookmarksFill />,
    cName: 'nav-text'
  },
  {
    title: 'Menus',
    path: '/menus',
    icon: <MdIcons.MdSubject />,
    cName: 'nav-text'
  },
  {
    title: 'Grupo de usuários',
    path: '/groups',
    icon: <MdIcons.MdGroups />,
    cName: 'nav-text'
  },
]

export const SidebarEmailsData = [
  {
    title: 'Emails',
    path: '/emails',
    icon: <MdIcons.MdEmail />,
    cName: 'nav-text'
  },
  {
    title: 'Novo disparo',
    path: '/sendEmails',
    icon: <BiIcons.BiMailSend />,
    cName: 'nav-text'
  }
]

export const SidebarNotificationsData = [
  {
    title: 'Notificações',
    path: '/notifications',
    icon: <MdIcons.MdSendToMobile />,
    cName: 'nav-text'
  },
]

export const SidebarNetmidiaData = [
  {
    title: 'Usuários',
    path: '/users',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/statistics',
    icon: <GoIcons.GoGraph />,
    cName: 'nav-text'
  }
]