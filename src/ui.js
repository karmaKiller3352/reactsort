import styled, { createGlobalStyle } from "styled-components"
import { colorsMap } from "./theme"



export const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  body {
    padding: 0;
    margin: 0;
  }
`


export const GlobalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #fffccc;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Rectangle = styled.div.attrs({
  style: ({ height, backgroundColor }) => ({
    height,
    backgroundColor: colorsMap[backgroundColor]
  })
})`
  flex-grow: 1;
  margin-right: 1px;
  margin-left: 1px;
`
export const CollectionWrapper = styled.div`
  border-color: ${props => colorsMap[props.color]};
  border-width: 3px;
  border-style: solid;
  margin-bottom: 50px;
  cursor: pointer;
  display: flex;
  width: 50%;
  min-width: 800px;
  height: 300px;
  align-items: flex-end;
  
`

export const Button = styled.div`
  font-size: 20px;
  background-color: ${props => {
    if (props.red) return colorsMap.red
    if (props.yellow) return colorsMap.yellow
    if (props.green) return colorsMap.green
    return colorsMap.blue
  }};
  opacity: ${props => props.disabled && 0.4};
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px 20px;
`
export const Flex = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 324px;
  justify-content: space-between
`