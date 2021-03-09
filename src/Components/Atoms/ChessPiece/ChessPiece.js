import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as KingIcon} from '../../../Common/Assets/king.svg';
import {ReactComponent as QueenIcon} from '../../../Common/Assets/queen.svg';
import {ReactComponent as BishopIcon} from '../../../Common/Assets/bishop.svg';
import {ReactComponent as KnightIcon} from '../../../Common/Assets/knight.svg';
import {ReactComponent as RookIcon} from '../../../Common/Assets/rook.svg';
import {ReactComponent as PawnIcon} from '../../../Common/Assets/pawn.svg';
import './ChessPiece.scss';

const ChessPiece = ({ pieceName, pieceColor }) => {
    const piece = {
        name: {
            king: <KingIcon />,
            queen: <QueenIcon />,
            bishop: <BishopIcon />,
            knight: <KnightIcon />,
            rook: <RookIcon />,
            pawn: <PawnIcon />,
        },
    };

    return (
        <div className={`chessPieceImage ` + pieceColor}>{piece.name[pieceName]}</div>
    );
}

ChessPiece.propTypes = {
    pieceName: PropTypes.string.isRequired,
};

export default ChessPiece;