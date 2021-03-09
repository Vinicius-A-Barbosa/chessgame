import React from 'react';
import ChessTile from '../../Atoms/ChessTile/ChessTile';
import './ChessTable.scss';

const ChessTable = (props) => {
    function renderChessTile(lin, col, color) {
        return(
            <ChessTile 
                tileColor={color} 
                key={lin + col} 
                id={lin + col} 
                chessTableSimulator={props.chessTableSimulator}
                row={lin}
                column={col}
                onClick={() => props.onClick(lin, col)}
            />
        )
    }

    function renderChessTable() {
        let lin = 0;
        let col = 0;
        let count = 1;
        var item = [];
        var line = [];
        let colorBool = true;
        let color = "white";
        for(lin=7;lin>-1;lin--){
            for(col=0;col<8;col++){
                color = colorBool ? 'white' : 'black';
                count++;
                item.push(renderChessTile(lin , col, color));
                colorBool = !colorBool;
            }
            line.push(<div className="board-row" key={lin}>{item}</div>);
            item = [];
            colorBool = !colorBool;
        }
        return(
            <div key={count}>
                {line}
            </div>
        );
    }
    return (
        <div className="chessTableSquare">
            {renderChessTable()}
        </div>
    )
};

export default ChessTable;