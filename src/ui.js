import styled, { createGlobalStyle } from "styled-components"

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

export const Rectangle = styled.div`
  flex-grow: 1;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  margin-right: 1px;
  margin-left: 1px;
  margin-bottom: -3px;
`
export const CollectionWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  width: 50%;
  min-width: 800px;
  height: 300px;
  align-items: flex-end;
  border: 3px solid black;
`