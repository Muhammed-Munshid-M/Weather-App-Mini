import { useState } from 'react'
import './style.css'
import { useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [data,setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: ''
  })
  const [name,setName] = useState('')
  const [error, setError] = useState('')
  const API_URL = 'https://api.openweathermap.org/data/2.5'
  const API_KEY = '2b665bb1cc4bb5a72ad37b9a0a506ebf'

  useEffect(()=> {
    axios.get(`${API_URL}/weather/?q=calicut&appid=${API_KEY}&units=metric`)
    .then(res => {
      let imagePath = '';
      if(res.data.weather[0].main == 'Clouds') {
        imagePath = "/cloud-icon.png"
      } else if (res.data.weather[0].main == "Clear") {
        imagePath = "/sun-icon.png"
      }else if (res.data.weather[0].main == "Rain") {
        imagePath = "/rain-icon.png"
      }else if (res.data.weather[0].main == "Drizzle") {
        imagePath = "/drizzle-icon.png"
      }else if (res.data.weather[0].main == "Mist") {
        imagePath = "/mist-icon.png"
      }else {
        imagePath = "/cloud-icon.png"
      }
      console.log(res.data);
      setData({...data, celcius: res.data.main.temp, name: res.data.name,
        humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image: imagePath})
    })
    .catch(err =>{
      // if (err.response.status == 404) {
      //   setError("Invalid City Name")
      // } else {
      //   setError('')
      // }
      console.log(err)
    })
  }, [])

  const handleClick = () => {
    if (name !== '') {
      axios.get(`${API_URL}/weather/?q=${name}&appid=${API_KEY}&units=metric`)
      .then(res => {
        let imagePath = '';
        if(res.data.weather[0].main == 'Clouds') {
          imagePath = "/cloud-icon.png"
        } else if (res.data.weather[0].main == "Clear") {
          imagePath = "/sun-icon.png"
        }else if (res.data.weather[0].main == "Rain") {
          imagePath = "/rain-icon.png"
        }else if (res.data.weather[0].main == "Drizzle") {
          imagePath = "/drizzle-icon.png"
        }else if (res.data.weather[0].main == "Mist") {
          imagePath = "/mist-icon.png"
        }else {
          imagePath = "/cloud-icon.png"
        }
        console.log(res.data);
        setData({...data, celcius: res.data.main.temp, name: res.data.name,
          humidity: res.data.main.humidity, speed: res.data.wind.speed,
         image: imagePath})
      })
      .catch(err =>{
        if (err.response.status === 404) {
          setError("Invalid City Name")
        } else {
          setError('')
        }
        console.log(err)
      })
    }
  }
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
            <input type="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)}/>
            <button><img width='18px' height='20px' src="/search-icon.png" onClick={handleClick} alt="" /></button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
            <img src={data.image} width='200px' alt="" />
            <h1>{data.celcius}°c</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="/humidity-icon.png" alt="" />
                <div className='humidity'>
                  <p>{data.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="/wind-icon.png" alt="" />
                <div className='wind'>
                  <p>{data.speed} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
