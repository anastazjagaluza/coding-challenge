import { useEffect, useState } from 'react';
import './App.css';

type ILimit = 10 | 20 | 50; 

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  
  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    if (response.status == 200) {
      const data = await response.json();
      console.log({data});
    }
  }

  return (
    <div className="App">
      <div className="container">

      </div>
    </div>
  );
}

export default App;
