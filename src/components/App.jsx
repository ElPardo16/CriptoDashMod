import '../styles/App.css';
import {useState, useEffect} from 'react'
import CardPrincipal from '../components/CardPrincipal'
import Card from './Card';
import Header from './Header';
import TableCoins from './TableCoins';
import Graph from './Graph'
import Convert from './Convert';
import Footer from './Footer';

function App() {
  const [coins, setCoins] = useState()
  const [currencys, setCurrencys] = useState()
  const [selCur, setSelCur] = useState("usd")
  const getData = async _ => {
    /* fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y")
    .then(res => res.json())
    .then(json => console.log(json[1].name)) */
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`)
    const json = await res.json()
    const curRes = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const curJson = await curRes.json()
    setCoins(json)
    setCurrencys(curJson)
  }
  useEffect(() => {
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])

  return !coins ? "Cargando..." : (
    <>
      <Header currencys={currencys} fun={setSelCur} cur={selCur}/>
      <Convert/>
      <main>
      <div className="cards_con">
          {coins.map(({id,symbol,image,price_change_percentage_30d_in_currency,current_price},index) => {
            if(index != 0 && index <= 3){
              return <Card key={index} coinId={id} cur={selCur} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} price={`${symbol} - ${current_price} ${selCur}`} img={image} />
            }
          })}
        </div>
        <CardPrincipal json={coins[0]} cur={selCur}/>
      </main>
      <TableCoins coins={coins}/>
      <Footer/>
    </>
  )
}

export default App;

export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
export const numberF = Intl.NumberFormat("es-ES")
