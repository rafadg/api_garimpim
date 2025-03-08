import items from './items.json' with { type: 'json' }

export function segundosParaFinalizar (data) {
    return Math.round((data - new Date()) / 1000);
}

export function esta_minerando (player) {
    if (player.data_inicio && player.data_objetivo) {
        const segundos = segundosParaFinalizar(player.data_objetivo);
        return segundos ? true : false; // Se negativo, retorna falso
    } else {
        return false;
    }
}

export function calcularDrop(bloco) {
    const dropsResultado = [];
  
    // Para cada item na lista de drops do bloco
    bloco.drops.forEach(drop => {
      const id_item = drop.id_item;
      let quantidade = drop.quantidade_minima; // Começa com a quantidade mínima
      let probabilidadeAtual = drop.probabilidade_base; // Probabilidade inicial
  
      // Calcula unidades adicionais até o máximo
      for (let i = 1; i <= (drop.quantidade_maxima - drop.quantidade_minima); i++) {
        // Gera um número aleatório entre 0 e 1
        if (Math.random() <= probabilidadeAtual) {
          quantidade++; // Adiciona uma unidade
          probabilidadeAtual *= drop.decaimento; // Reduz a probabilidade para a próxima unidade
        } else {
          break; // Para se a probabilidade não for atendida
        }
      }
  
      // Só adiciona ao resultado se a quantidade for maior que 0
      if (quantidade > 0) {
        const item = items.find(item => item.id === id_item)
        dropsResultado.push({...item, quantidade: quantidade})
      }
    });
  
    return dropsResultado;
  }