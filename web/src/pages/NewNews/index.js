import React, { useState, useEffect, } from 'react';
import api from '../../services/api'
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import ReactQuill from "react-quill";
import { useSidebar } from '../../contexts/NavbarContext'
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar'

import "react-quill/dist/quill.snow.css";
import './styles.css'


function NewNews() {
  const [inputValue, setInputValue] = useState('');
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [video, setVideo] = useState('')
  const [isSpecial, setIsSpecial] = useState()
  const [isExhibition, setIsExhibition] = useState()
  const [deadline, setDeadline] = useState('')
  const [newsValue, setNewsValue] = useState('')
  const [url, setUrl] = useState('')
  const [viaHtml, setViaHtml] = useState(true)
  const [nextPage, setNextPage] = useState(false)
  const [withImage, setWithImage] = useState("")
  const [withFile, setWithFile] = useState("")

  // handle input change event
  const handleInputChange = value => {
    setInputValue(value);
  };

  // handle selection
  const handleMenuChange = value => {
    setSelectedMenuId(value);
  }

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      const response =await api.post('/news/add', {
        f_id_menu:selectedMenuId.id,
        f_id_assunto:selectedTopicId.id,
        f_id_tags:`${selectedTagId[0].id}`,
        titulo:title,
        subtitulo:subtitle,
        video:video,
        conteudo_especial:isSpecial.value,
        tela_inicial:isExhibition.value,
        html:newsValue,
        url:url,
        tipo:withFile
      })


console.log(response)

    } catch (error) {
      console.log(error)
    }
   

    
  }

  const handleTopicChange = value => {
    setSelectedTopicId(value);
  }

  const handleTagsChange = value => {
    setSelectedTagId(value)
  }

  const handleIsSpecialChange = value => {
    setIsSpecial(value)
  }

  const handleIsExibithionChange = value => {
    setIsExhibition(value)
  }

  function toNextPage(e) {
    e.preventDefault();
    let result = selectedTagId.map(({ id }) => id)
    console.log(selectedMenuId.id, selectedTopicId.id, result.toString(), title, subtitle, publishDate, video, isSpecial.value, isExhibition.value, deadline, newsValue, url,)
    setNextPage(true)
  }

  function Debug(e) {
    e.preventDefault();
    let result = selectedTagId.map(({ id }) => id)
    console.log(selectedMenuId.id, selectedTopicId.id, result.toString(), title, subtitle, publishDate, video, isSpecial.value, isExhibition.value, deadline, newsValue, url,)
  }


  const loadMenuData = () => {
    return api.get('/menus').then(result => {
      const res = result.data;
      return res;
    });
  }

  const loadTopicData = () => {
    return api.get('/topics').then(result => {
      const res = result.data;
      return res;
    });
  }

  const loadTagsData = () => {
    return api.get('/tags').then(result => {
      const res = result.data;
      return res;
    });
  }

  const specialContent = [
    { value: false, label: 'Não, publicação normal' },
    { value: true, label: 'Sim, conteúdo especial' }
  ]

  const exhibition = [
    { value: false, label: 'Não exibe na tela inicial' },
    { value: true, label: 'Sim, exibir na tela inicial' }
  ]

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      height: 40,
      marginBottom: 15
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  }

  const { sidebar } = useSidebar(false)

  return (

    <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
      <div className="pageContent">

        <form id='new-news' action="submit" autoComplete="off">
          {!nextPage &&
            <>
              <div className="row1">
                <div className="options">
                  <span>Menu:</span>
                  <AsyncSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    cacheOptions
                    defaultOptions
                    value={selectedMenuId}
                    getOptionLabel={e => e.nome}
                    getOptionValue={e => e}
                    loadOptions={loadMenuData}
                    onChange={handleMenuChange}
                    placeholder="Selecionar menu"
                  />
                </div>
                <div className="options">
                  <span>Assunto:</span>
                  <AsyncSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    cacheOptions
                    defaultOptions
                    value={selectedTopicId}
                    getOptionLabel={e => e.nome}
                    getOptionValue={e => e}
                    loadOptions={loadTopicData}
                    onChange={handleTopicChange}
                    placeholder="Selecionar assunto"
                  />

                </div>
                <div className="options">
                  <span>Tags:</span>
                  <AsyncSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    cacheOptions
                    defaultOptions
                    value={selectedTagId}
                    getOptionLabel={e => e.nome}
                    getOptionValue={e => e}
                    loadOptions={loadTagsData}
                    onChange={handleTagsChange}
                    placeholder="Selecionar tags"
                    isMulti
                  />
                </div>
              </div>
              <div className="row2">
                <div className="news-form-inputs">
                  <label>Título:</label>
                  <input
                    onChange={e => setTitle(e.target.value)}
                    autoComplete="off"
                    type="text"
                    value={title}
                    name="newsTitle"
                    className="news-form"
                  />
                </div>
                <div className="news-form-inputs">
                  <label>Subtítulo (segunda linha / linha fina):</label>
                  <input onChange={e => setSubtitle(e.target.value)}
                    autoComplete="off"
                    type="text"
                    name="newsSubtitle"
                    value={subtitle}
                    className="news-form"
                  />
                </div>
              </div>
              <div className="row3">
                <div className="news-form-inputs">
                  <label>Data da publicação:</label>
                  <input
                    value={publishDate}
                    onChange={e => setPublishDate(e.target.value)}
                    autoComplete="off"
                    type="date"
                    name="newsTitle"
                    className="news-form" />
                  <span><strong>Não selecione nada para ser publicada na data atual.</strong></span>
                </div>
                <div className="news-form-inputs">
                  <label>Vídeo:</label>
                  <input
                    value={video}
                    onChange={e => setVideo(e.target.value)}
                    autoComplete="off"
                    type="text"
                    name="newsTitle"
                    className="news-form" />
                  <span>Exemplo: <strong>https://www.youtube.com/portinformation/watch?v=FwK_Mdp120SK1nBall</strong></span>
                </div>
                <div className="news-form-inputs">
                  <label>Conteúdo especial:</label>
                  <Select
                    value={isSpecial}
                    onChange={handleIsSpecialChange}
                    options={specialContent}
                    styles={selectStyles}
                    placeholder="Selecione"
                  />
                  <span>Preenchimento não obrigatório,<strong>para ser uma publicação normal</strong></span>
                </div>
              </div>
              <div className="row4">
                <div className="news-form-inputs">
                  <label>Exibição em tela:</label>
                  <Select
                    value={isExhibition}
                    onChange={handleIsExibithionChange}
                    options={exhibition}
                    styles={selectStyles}
                    placeholder="Selecione"

                  />
                  <span>Preenchimento não obrigatório <strong>para ser uma exibição normal</strong></span>
                </div>
                <div className="news-form-inputs">
                  <label>Data deadline:</label>
                  <input
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    autoComplete="off"
                    type="date"
                    name="newsTitle"
                    className="news-form" />
                  <span><strong>Deixe sem data para que a publicação seja exibida sempre.</strong></span>
                </div>
              </div>
              <div className="row5">
                <button
                  className={viaHtml ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setViaHtml(true))}>
                  Manualmente (via HTML)
                </button>
                <button
                  className={!viaHtml ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setViaHtml(false))}>
                  Link existente (via URL)
                </button>
              </div>
              {viaHtml &&
                <div className="text-editor">
                  <EditorToolbar />
                  <ReactQuill
                    value={newsValue}
                    onChange={setNewsValue}
                    theme="snow"
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                  />
                </div>
              }
              {!viaHtml &&
                <div className="url-link">
                  <input
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    className="news-form" />
                  <label htmlFor="#">Por favor, entre com uma URL válida.</label>
                </div>
              }
              <div>
                <button
                  className="next-page"
                  onClick={toNextPage}>Continuar</button>
              </div>
            </>}
          {nextPage &&
            <>
              <div className='page2-row1'>
                <h3>{title}</h3>
                <h5>{subtitle}</h5>
              </div>
              <div className="row5 page2-row2">
                <button
                  className={withImage === "active" ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setWithImage("active"))}>
                  Com Imagem
                </button>

                <button
                  className={withImage === "desactive" ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setWithImage("desactive"))}>
                  Sem Imagem
                </button>
              </div>
              {withImage === "active" &&
                <label id="thumbnail">
                  <input type="file" placeholder="Teste"></input>
                  <span>Clique para anexar uma imagem. <br />Importante que ela esteja na <strong>posição paisagem</strong>, ou seja, uma imagem deitada</span>
                </label>
              }
              <div className="row5 page2-row3">
                <button
                  className={withFile === "active" ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setWithFile("active"))}>
                  Com arquivo para baixar
                </button>
                <button
                  className={withFile === "desactive" ? 'selected' : ''}
                  onClick={(e) => e.preventDefault(setWithFile("desactive"))}>
                  Sem Arquivo - Publicação normal
                </button>

              </div>
              {withFile === "active" &&
                <label id="thumbnail">
                  <input type="file" placeholder="Teste"></input>
                  <span>Clique para anexar um arquivo</span>
                </label>
              }
              {/* <button className={withFile === "desactive" ? 'selected' : ''} onClick={(e) => e.preventDefault(console.log(title))}>
                Debug
              </button> */}
              <div className="page2-row4">
                <button
                  className="go-back"
                  onClick={() => setNextPage(false)}
                >
                  Voltar
                </button>
                <button onClick={handleSubmit}>Cadastrar publicação</button>
              </div>
            </>
          }

        </form>
      </div>
    </div >
  );
}

export default NewNews;