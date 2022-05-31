import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'


const Container = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  width: 80%;
  max-width: 400px;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'lato', sans-serif;
  color: white;
  text-align:center;
  font-weight:700;
  margin-top:80px ;
  margin-bottom: 50px;
  font-size:34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block ;
    margin: 10px auto 0 auto;
  }
`

const App = () => {

  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {

      const {moneda, cripto} = monedas;
      setCotizacion({});

      const cotizarCripto = async () => {
        setSpinner(true);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const response = await fetch(url);
        const result = await response.json();

        setTimeout(() => {
          setSpinner(false);
          setCotizacion(result.DISPLAY[cripto][moneda]);
        }, 1500);
        
      }
      cotizarCripto();
      
    }
  }, [monedas])

  return (
    <Container>
      <Imagen src={ImagenCripto} />
      
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form 
          setMonedas={setMonedas}
        />
        {spinner && <Spinner />}
        {cotizacion.PRICE && <Result cotizacion={cotizacion}/>}
      </div>

    </Container>
  )
}

export default App