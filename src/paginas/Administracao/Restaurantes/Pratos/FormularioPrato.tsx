import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ITag from "../../../../interfaces/ITag";
import http from "../../../../http";
import IRestaurante from "../../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../../interfaces/IPrato";

const FormularioPrato = () => {
    const parametros = useParams();
    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState<number | ''>('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const carregarImagem = (url: string) => {
        // Faz uma requisição GET para buscar a imagem
        fetch(url)
            .then(response => response.blob()) // Converte a resposta para um blob
            .then(blob => {
                // Cria um novo objeto File a partir do blob com um nome fictício
                const file = new File([blob], 'imagem.png', { type: blob.type });
    
                // Atualiza o estado da imagem com o novo objeto File
                setImagem(file);
            })
            .catch(erro => console.log(erro));
    };

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/').then(resposta => setTags(resposta.data.tags));
        http.get<IRestaurante[]>('restaurantes/').then(resposta => setRestaurantes(resposta.data));
    }, []);

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                    setDescricaoPrato(resposta.data.descricao);
                    setTag(resposta.data.tag);
                    setRestaurante(resposta.data.restaurante);

                    carregarImagem(resposta.data.imagem);
                })
                .catch(erro => console.log(erro));
        }
    }, [parametros]);

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        
        const formData = new FormData();

        if (nomePrato !== '' && descricaoPrato !== '' && tag !== '' && restaurante !== '' && imagem) {
            formData.append('nome', nomePrato);
            formData.append('descricao', descricaoPrato);
            formData.append('tag', tag);
            formData.append('restaurante', restaurante.toString());
            formData.append('imagem', imagem);

            if (parametros.id) {
                http.patch(`pratos/${parametros.id}/`, formData)
                    .then(() => {
                        alert("Prato atualizado com sucesso.");
                        setNomePrato('');
                        setDescricaoPrato('');
                        setTag('');
                        setRestaurante('');
                    })
                    .catch(erro => console.log(erro));
            } else {
                http.post('pratos/', formData)
                    .then(() => {
                        alert("Prato cadastrado com sucesso!");
                        setNomePrato('');
                        setDescricaoPrato('');
                        setTag('');
                        setRestaurante('');
                        setImagem(null);
                    })
                    .catch(erro => console.log(erro));
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(Number(evento.target.value))}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    );
};

export default FormularioPrato;




















































// const FormularioPrato = () => {

//     const parametros = useParams()

//     const [nomePrato, setNomePrato] = useState('')
//     const [descricaoPrato, setDescricaoPrato] = useState('')

//     const [tag, setTag] = useState('')
//     const [restaurante, setRestaurante] = useState('')

//     const [imagem, setImagem] = useState<File | null>(null)


//     const [tags, setTags] = useState<ITag[]>([])
//     const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


//     useEffect(() => {
//         http.get<{ tags: ITag[] }>('tags/')
//             .then(resposta => setTags(resposta.data.tags))
//         http.get<IRestaurante[]>('restaurantes/')
//             .then(resposta => setRestaurantes(resposta.data))

//     }, [])

//     const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
//         if (evento.target.files?.length) {
//             setImagem(evento.target.files[0])
//         } else {
//             setImagem(null)
//         }
//     }

//     const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
//         evento.preventDefault()

//         const formData = new FormData;

//         formData.append('nome', nomePrato)
//         formData.append('descricao', descricaoPrato)

//         formData.append('tag', tag)

//         formData.append('restaurante', restaurante)

//         if (imagem) {
//             formData.append('imagem', imagem)
//         }

//         // http.request({
//         //     url:'pratos/',
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'multipart/form-data'
//         //     },
//         //     data: formData
//         // })
//         //     .then(() => {
//         //         setNomePrato('')
//         //         setDescricaoPrato('')
//         //         setTag('')
//         //         setRestaurante('')
//         //         alert("Prato cadastrado com sucesso!")
//         //     })
//         //     .catch(erro => console.log(erro))


//         if (parametros.id) {
//                 http.patch(`pratos/${parametros.id}/`, {
//                     nome: nomePrato,
//                     tag: tag,
//                     imagem: imagem,
//                     descricao: descricaoPrato,
//                     restaurante: restaurante
//             })
//                 .then(() => {
//                     alert("Restaurante atualizado com sucesso.")
//                 })
//         } else {
//             http.request({
//                 url: 'pratos/',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 data: formData
//             })
//                 .then(() => {
//                     setNomePrato('')
//                     setDescricaoPrato('')
//                     setTag('')
//                     setRestaurante('')
//                     alert("Prato cadastrado com sucesso!")
//                 })
//                 .catch(erro => console.log(erro))
//         }
//     }



//     return (

//         <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
//             <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
//             <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
//                 <TextField value={nomePrato}
//                     onChange={evento => setNomePrato(evento.target.value)}
//                     label="Nome do Prato"
//                     variant="standard"
//                     fullWidth
//                     required
//                     margin="dense"
//                 />

//                 <TextField value={descricaoPrato}
//                     onChange={evento => setDescricaoPrato(evento.target.value)}
//                     label="Descriçao do Prato"
//                     variant="standard"
//                     fullWidth
//                     required
//                     margin="dense"
//                 />

//                 <FormControl margin="dense" fullWidth>
//                     <InputLabel id="select-tag" >Tag</InputLabel>
//                     <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
//                         {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
//                             {tag.value}
//                         </MenuItem>)}
//                     </Select>
//                 </FormControl>

//                 <FormControl margin="dense" fullWidth>
//                     <InputLabel id="select-restaurante" >Restaurante</InputLabel>
//                     <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
//                         {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
//                             {restaurante.nome}
//                         </MenuItem>)}
//                     </Select>
//                 </FormControl>

//                 <input type="file" onChange={selecionarArquivo} />

//                 <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
//             </Box>
//         </Box>
//     )
// }

// export default FormularioPrato