import {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import useSelectMondedas from '../hooks/useSelectMondedas';
import monedas from '../data/monedas';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease ;
    margin-top: 30px;

    &:hover {
        background-color: #7a7b7e;
        cursor: pointer;
    }
`

const Form = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [ moneda, SelectMonedas ] = useSelectMondedas('Escoge tu moneda', monedas);
    const [ cripto, SelectCripto ] = useSelectMondedas('Escoge tu criptomoneda', criptos);

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map( cripto => {
                const obj = {
                    id : cripto.CoinInfo.Name,
                    nombre : cripto.CoinInfo.FullName
                }

                return obj;
            })

            setCriptos(arrayCriptos);
        }

        consultarApi();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if([moneda, cripto].includes('')) {
            setError(true);
            return;
        }

        setError(false);
        setMonedas({moneda, cripto});
    }
    
  return (

    <>
        {error && <Error>Todos los campos son obligatorios</Error> }

        <form
            onSubmit={handleSubmit}
        >
            <SelectMonedas />
            <SelectCripto />
            <InputSubmit 
                type="submit" 
                value="Cotizar"
            />
        </form>
    </>
  )
}

export default Form