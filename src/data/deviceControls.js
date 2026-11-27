// Botões do dispositivo. Usada pelo Manual e pelo resumo da página Produto.
// Para mudar um texto, mude aqui: as duas páginas se atualizam.
export const BOTOES = [
    {
        id: 'avancar',
        nome: 'Avançar',
        resumo: 'Passa para o próximo caractere.',
        gestos: [],
    },
    {
        id: 'retroceder',
        nome: 'Retroceder',
        resumo: 'Volta ao caractere anterior.',
        gestos: [],
    },
    {
        id: 'pausar',
        nome: 'Pausar',
        resumo: 'Pausa e retoma a leitura automática.',
        gestos: [
            { quando: 'Três cliques rápidos', efeito: 'Muda a velocidade da leitura.' },
            { quando: 'Segurar por 10 segundos', efeito: 'Apaga o arquivo do dispositivo.' },
        ],
    },
]