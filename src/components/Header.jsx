import "../styles/Header.css"
import {useState, useEffect} from 'react'
import {MdWbSunny, MdNightlight} from "react-icons/md"
export default function Header({currencys, fun, cur}) {
  const [theme, setTheme] = useState(true)
  const toggleTheme = _ => {
    setTheme(!theme)
  }
  useEffect(() => {
    if(!theme){
      document.documentElement.style.setProperty("--bg","white")
      document.documentElement.style.setProperty("--colorS","#01403a")
      document.documentElement.style.setProperty("--colorTxtCR","black") 
    }else{
      document.documentElement.style.setProperty("--bg","#121212")
      document.documentElement.style.setProperty("--colorS","#1f1f1f")
      document.documentElement.style.setProperty("--colorTxtCR","#eff2f7")  
    }
  },[theme])
  return (
    <header className='app-header'>
      <p>Crypto Dash</p>
      <div className='select-button'>
      <select value={cur} id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {!theme ? <MdWbSunny size={20}/>
        : <MdNightlight size={20}/>
        }
      </button>
      </div>
    </header>
  )
}
