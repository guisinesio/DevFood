import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, Paper, TextField } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')
  const [erro, setErro] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        if (resposta.data.results.length === 0) {
          setErro('Nenhum restaurante encontrado.')
        } else {
          setErro('')
        }
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // useEffect(() => {
  //   axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
  //     .then(resposta => {
  //       setRestaurantes(resposta.data.results)
  //       setProximaPagina(resposta.data.next)
  //       setPaginaAnterior(resposta.data.previous)
  //     })
  //     .catch(erro => {
  //       console.log(erro)
  //     })
  // }, [])

  // const verMais = () => {
  //   axios.get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(resposta => {
  //       setRestaurantes([...restaurantes, ...resposta.data.results])
  //       setProximaPagina(resposta.data.next)
  //     })
  //     .catch(erro => {
  //       console.log(erro)
  //     })
  // }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <div className={style.Center}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, width: '100%' }}>
        <h1>Os restaurantes mais <em>incríveis✨</em>!</h1>
        <p>Pesquise o seu restaurante desejado.</p>
        <form onSubmit={buscar} style={{ width: '100%' }}>
          <TextField value={busca}
            onChange={evento => setBusca(evento.target.value)}
            label="Nome do Restaurante"
            variant="standard"
            margin="dense"
            fullWidth
          >
          </TextField>
          {/* <div>
              <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
            </div> */}
          {/* <div>
              <label htmlFor="select-ordenacao">Ordenação</label>
              <select
                name="select-ordenacao"
                id="select-ordenacao"
                value={ordenacao}
                onChange={evento => setOrdenacao(evento.target.value)}
              >
                <option value="">Padrão</option>
                <option value="id">Por ID</option>
                <option value="nome">Por Nome</option>
              </select>
            </div> */}
          <div>
            <Button sx={{ marginTop: 1, width: '100%' }} type="submit" variant="outlined">Pesquisar</Button>
          </div>
        </form>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </Paper>
    </div>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
  </section>
  )
}

export default ListaRestaurantes