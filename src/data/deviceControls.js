// Botões do dispositivo, na ORDEM FÍSICA (da esquerda para a direita, na parte baixa da frente).
// Usada pelo Manual e pelo resumo da página Produto: mude aqui e as duas páginas se atualizam.
export const BOTOES = [
    {
        id: 'retroceder',
        nome: 'Retroceder',
        tato: 'Botão da esquerda, com uma seta em relevo apontando para a esquerda.',
        resumo: 'Volta ao caractere anterior.',
        gestos: [],
    },
    {
        id: 'pausar',
        nome: 'Pausar',
        tato: 'Botão do meio, totalmente liso.',
        resumo: 'Alterna entre pausar e a leitura automática.',
        gestos: [
            { quando: 'Um clique', efeito: 'Liga a leitura automática. Outro clique pausa de novo.' },
            { quando: 'Três cliques rápidos', efeito: 'Aumenta a velocidade da leitura.' },
            { quando: 'Segurar por 10 segundos', efeito: 'Apaga o livro do dispositivo.' },
        ],
    },
    {
        id: 'avancar',
        nome: 'Avançar',
        tato: 'Botão da direita, com uma seta em relevo apontando para a direita.',
        resumo: 'Passa para o próximo caractere.',
        gestos: [],
    },
]