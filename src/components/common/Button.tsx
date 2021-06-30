import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    /* padding: 0.25rem 1rem; */
    color: white;
    outline: none;
    cursor: pointer;

    height: 36px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #46BDFE;
    &:hover{
        background: #409FFE;
    }
`
interface BttonProps {
    title: string;
    onClick: () => void;
}

const Button = ( props : BttonProps ) => <StyledButton onClick={props.onClick}>{props.title}</StyledButton>

export default Button;