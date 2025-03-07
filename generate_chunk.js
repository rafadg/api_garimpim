import blocos from './blocos.json' with { type: 'json' };
import biomas from './biomas.json' with { type: 'json'};

export function gerarChunk () {
    const chunk = Array.from({length: 64}, (_, i) => {return {posicao: i + 1, ...gerarBloco(biomas[0])}});
    return chunk;
}

// Função para gerar um bloco aleatório
export function gerarBloco(bioma) {
    // Calcula a soma total dos pesos
    const somaPesos = bioma.blocos.reduce((acc, x) => acc + x.peso, 0);

    // Verifica se há blocos no bioma
    if (somaPesos === 0) {
        throw new Error("Nenhum bloco no bioma");
    }

    // Gera um número aleatório entre 0 e somaPesos
    const random = Math.random() * somaPesos;
    let acumulado = 0;

    // Itera sobre os blocos para encontrar o escolhido
    for (const bloco of bioma.blocos) {
        acumulado += bloco.peso;
        if (random < acumulado) {
            return {...blocos.find(x => x.id_bloco === bloco.id_bloco), enabled: true}; // Retorna o objeto bloco completo
        }
    }

    // Caso de segurança: retorna o último bloco
    return bioma.blocos[bioma.blocos.length - 1];
}