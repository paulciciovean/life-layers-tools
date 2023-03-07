import React from 'react'
import styled from "styled-components"

const ButtonStyle = styled.button`
    background-color: ${props => props.color || 'blue'};
    width: ${props => props.width || '80px'};
    height: ${props => props.height || '40px'};
    border-radius: 20px;
    border: none;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    outline: none;
`
export const Button = ({text,color,width,height,onClick}) => {
  return (
    <ButtonStyle color={color} width={width} height={height} onClick={()=> {onClick()} }>{ text }</ButtonStyle>
  )
}

export default Button