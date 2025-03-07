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