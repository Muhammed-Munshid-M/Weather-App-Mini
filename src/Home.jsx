import './style.css'

function Home() {
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
            <input type="text" placeholder="Enter City Name" />
            <button><img width='18px' height='20px' src="/search-icon.png" alt="" /></button>
        </div>
        <div className="winfo">
            <img src="/cloud-icon.png" width='200px' alt="" />
            <h1>22°c</h1>
            <h2>Calicut</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
