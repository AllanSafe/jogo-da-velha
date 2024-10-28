/* Variáveis globais */
var tabuleiro = new Array(3);
var jogador = 1;

/* Função de reinicialização */
function restart() {
    inicia();
}

/* Função para inicializar o jogo */
function inicia() {
    // Inicializa a variável board
    board = document.querySelector("#board");

    for (let i = 0; i < 3; i++) {
        tabuleiro[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            tabuleiro[i][j] = 0;
        }
    }
    trocaTurno();
    exibe();
}


/* Função para exibir o tabuleiro */
function exibe() {
    if (board === null) {
        return;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] == 1) {
                board.querySelector(".cell:nth-child(3n + 2)").className = "x";
            } else if (tabuleiro[i][j] == -1) {
                board.querySelector(".cell:nth-child(3n + 2)").className = "o";
            } else {
                board.querySelector(".cell:nth-child(3n + 2)").className = "";
            }
        }
    }
}


/* Função para trocar de turno */
function trocaTurno() {
    jogador = jogador % 2 + 1;
}

/* Função para marcar o tabuleiro */
function marca(lin, col) {
    tabuleiro[lin][col] = jogador;
}

/* Função para verificar vitória */
function verificaVitoria() {
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] == tabuleiro[i][1] && tabuleiro[i][1] == tabuleiro[i][2] && tabuleiro[i][0] != 0) {
            return tabuleiro[i][0];
        } else if (tabuleiro[0][i] == tabuleiro[1][i] && tabuleiro[1][i] == tabuleiro[2][i] && tabuleiro[0][i] != 0) {
            return tabuleiro[0][i];
        } else if (tabuleiro[0][0] == tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[2][2] && tabuleiro[0][0] != 0) {
            return tabuleiro[0][0];
        } else if (tabuleiro[2][0] == tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[0][2] && tabuleiro[2][0] != 0) {
            return tabuleiro[2][0];
        }
    }
    return 0;
}

/* Função para lidar com o clique na célula */
function clica(lin, col) {
    if (isNaN(lin) || isNaN(col)) {
        return;
    }

    if (tabuleiro[lin][col] == 0) {
        marca(lin, col);
        trocaTurno();
        exibe();
        if (verificaVitoria() != 0) {
            alert("Jogador " + verificaVitoria() + " venceu!");
        }
    }
}

/* Evento de clique */
document.querySelector("#board").addEventListener("click", function(event) {
    try {
        let lin = event.target.id.substr(-2);
        let col = event.target.id.substr(-1);
        lin = parseInt(lin);
        col = parseInt(col);

        clica(lin, col);
    } catch (error) {
        // Tratar o erro aqui
    }
});

/* Botão de reinicialização */
document.querySelector("#restart-button").addEventListener("click", restart);

/* Inicia o jogo */
inicia();
