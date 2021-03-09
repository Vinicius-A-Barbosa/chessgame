import React, { Component } from 'react';
import ChessTable from '../../Molecules/ChessTable/ChessTable';
import './ChessGame.scss';

export function ChessTileSimulator(color, piece) {
    this.color = color;
    this.piece = piece;
};

export const generatedInicialTable = () => {
    let chessTableSimulator = [];
    let colSimulator = [];
    let lin = 0;
    let col = 0;
    for(lin=0;lin<8;lin++){
        for(col=0;col<8;col++){
            colSimulator.push(new ChessTileSimulator("", ""));
            if(lin<2){
                colSimulator[col]["color"] = "white";
                if(lin>0){
                    colSimulator[col]["piece"] = "pawn";
                } else {
                    if(col === 0 || col === 7) {
                        colSimulator[col]["piece"] = "rook";
                    } else if(col === 1 || col === 6) {
                        colSimulator[col]["piece"] = "knight";
                    } else if(col === 2 || col === 5) {
                        colSimulator[col]["piece"] = "bishop";
                    } else if(col === 3) {
                        colSimulator[col]["piece"] = "queen";
                    } else if(col === 4) {
                        colSimulator[col]["piece"] = "king";
                    }
                }
            }
            if(lin>5){
                colSimulator[col]["color"] = "black";
                if(lin<7){
                    colSimulator[col]["piece"] = "pawn";
                } else {
                    if(col === 0 || col === 7) {
                        colSimulator[col]["piece"] = "rook";
                    } else if(col === 1 || col === 6) {
                        colSimulator[col]["piece"] = "knight";
                    } else if(col === 2 || col === 5) {
                        colSimulator[col]["piece"] = "bishop";
                    } else if(col === 3) {
                        colSimulator[col]["piece"] = "queen";
                    } else if(col === 4) {
                        colSimulator[col]["piece"] = "king";
                    }
                }
            }
        }
        chessTableSimulator.push(colSimulator);
        colSimulator = [];
    }
    return chessTableSimulator;
}

class ChessGame extends Component {
    constructor() {
        super();
        this.state = {
            chessTableSimulator: generatedInicialTable(),
            posicaoInitial: {
                row: '',
                col: '',
            },
            movimentacao: [],
            colorToMove: 'white',
        };
    }

    validateMovement(pieceInitial, colorInitial, pieceFinal, colorFinal) {
        const { chessTableSimulator, movimentacao } = this.state;
        const {posicaoInitial, posicaoFinal} = movimentacao;
        if (colorFinal === colorInitial) {
            return false;
        }
        switch (pieceInitial) {
            case 'pawn':
                if (colorInitial === 'white' && posicaoInitial.row < posicaoFinal.row && (posicaoInitial.col -1 <= posicaoFinal.col <= posicaoInitial.col +1)) {
                    if (posicaoInitial.row === 1 && posicaoFinal.row <= 3) {
                        if (posicaoInitial.col === posicaoFinal.col) {
                            if (posicaoFinal.row === 2 && pieceFinal === '') {
                                return true;
                            }
                            if (posicaoFinal.row === 3 && pieceFinal === '' && chessTableSimulator[posicaoInitial.row + 1][posicaoInitial.row + 1].piece === '') {
                                return true;
                            }
                        } else {
                            if(pieceFinal !== '') {
                                return true;
                            }
                        }
                    }
                }
                if (colorInitial === 'black' && posicaoInitial.row > posicaoFinal.row && (posicaoInitial.col -1 <= posicaoFinal.col <= posicaoInitial.col +1)){
                    
                }
                break;
            default:
                return false;
        }
        return false;
    }

    mutateChessTable(i, j){
        const {chessTableSimulator, posicaoInitial, movimentacao} = this.state;
        const newChessTableSimulator = { ...chessTableSimulator};
        const pieceInitial = newChessTableSimulator[posicaoInitial.row][posicaoInitial.col].piece;
        const colorInitial = newChessTableSimulator[posicaoInitial.row][posicaoInitial.col].color;
        const pieceFinal = newChessTableSimulator[i][j].piece;
        const colorFinal = newChessTableSimulator[i][j].color;
        newChessTableSimulator[posicaoInitial.row][posicaoInitial.col].piece = '';
        newChessTableSimulator[posicaoInitial.row][posicaoInitial.col].color = '';
        newChessTableSimulator[i][j].piece = pieceInitial;
        newChessTableSimulator[i][j].color = colorInitial;
        this.setState({
            ...this.state,
            chessTableSimulator: newChessTableSimulator,
            posicaoInitial: {
                row: '',
                col: '',
            },
        });
    }
    
    handleClick(i, j){
        const { chessTableSimulator, posicaoInitial } = this.state;
        console.log(posicaoInitial, i, j);
        if ((chessTableSimulator[i][j].piece !== '' || (posicaoInitial.row !== '' && posicaoInitial.col !== '')) && (posicaoInitial.row.toString() + posicaoInitial.col.toString() !== (i.toString() + j.toString()))) {
            if (posicaoInitial.row === '' && posicaoInitial.col === '') {
                this.setState({
                    ...this.state,
                    posicaoInitial: {
                        row: i,
                        col: j,
                    },
                });
            } else {
                console.log('entrei');
                this.mutateChessTable(i, j);
            }
        }
    }

    render = () => {
        const { chessTableSimulator } = this.state;
        return (
            <ChessTable chessTableSimulator={chessTableSimulator} onClick={(lin, col) => this.handleClick(lin, col)}/>
        );
    }
}

export default ChessGame;