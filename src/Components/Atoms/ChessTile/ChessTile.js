import React from 'react';
import ChessPiece from '../ChessPiece/ChessPiece';
import './ChessTile.scss';

const ChessTile = (props) => {
    return (
        <button className={`chessTileSquare `+ props.tileColor} onClick={() => props.onClick()}>
            <ChessPiece 
                pieceName={props.chessTableSimulator[props.row][props.column].piece}
                pieceColor={props.chessTableSimulator[props.row][props.column].color}
            />
        </button>
    );
}

export default ChessTile;