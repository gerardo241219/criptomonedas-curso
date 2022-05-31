import React from 'react'
import styled from '@emotion/styled'

const Texto = styled.div`
    background-color:  #B7322C;
    color: white;
    padding: 15px;
    font-size: 18px;
    text-transform: uppercase;
    font-family: 'lato', sans-serif;
    font-weight: 400;
    text-align: center;
`

const Error = ({children}) => {
  return (
    <Texto>
        {children}
    </Texto>
  )
}

export default Error