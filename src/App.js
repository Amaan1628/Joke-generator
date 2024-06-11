import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "https://v2.jokeapi.dev/joke/";
  const container = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];

  const [flags,setFlags] = useState('');
  const [deli,setDeli] = useState('');
  const [joke,setjoke] = useState('');
  const [type,setType] = useState('Programming')

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleFlagsChange = (event) => {
    setFlags(event.target.value);
  }

  const getjoke = async() => {
    try {
      const res = await axios.get(`https://v2.jokeapi.dev/joke/${type}?Flags=${flags}`);
      const typeJoke = res.data.type;
       console.log(`https://v2.jokeapi.dev/joke/${type}?Flags=${flags}`)
      // console.log(res.data.joke)
      if (typeJoke == 'twopart') {
        const data = res.data.setup;
        const delivery = res.data.delivery;
        setjoke(data);
        setDeli(delivery);
      } else {
        const data = res.data.joke;
        setjoke(data);
        setDeli('');
      }
    } 
    catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="bg-[#222831] h-screen">
      <h1 className="text-[#EEEEEE] font-bold font-mono text-center text-[60px] p-5">
        {" "}
        Joke Generatorrrr{" "}
      </h1>

      <div className="flex flex-col gap-10 items-center pt-5">
        <div className="bg-[#393E46] w-[1500px] h-[300px] rounded-3xl shadow-xl">
          { deli ? <>
          <h1 className="p-16 text-[#00ADB5] text-center text-3xl">  {joke} </h1>
          <h1 className="p-6 text-[#00ADB5] text-center text-3xl">  {deli}  </h1> </>
            : 
          <h1 className="p-16 text-[#00ADB5] text-center text-3xl">  {joke} </h1> }
          
        </div>

        <div className="flex gap-2 items-center text-xl">
          <label className="text-white text-3xl">Type of Joke:</label>
          <select className="p-2 rounded-xl text-white bg-[#00ADB5] text-xl" 
          id="dropdown" 
          name="type"
          value={type}
          onChange={handleTypeChange}>
            <option>Programming</option>
            <option>Miscellaneous</option>
            <option>Dark</option>
            <option>Pun</option>
            <option>Spooky</option>
            <option>Christmas</option>
          </select>
        </div>

        <div className="flex flex-col items-start">
            <h2 className="text-white text-3xl">Select Flags to Blacklist :</h2>
          { container.map( (cat) => ( 
            <label className="text-white text-xl" key={cat}>
            <input
            type="radio"
            name="category"
            value={cat}
            onChange={handleFlagsChange}
            /> 
            {cat}
            </label>
            ) ) }

            {/* {categories.map((cat) => (
                    <label key={cat}>
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={category === cat}
                            onChange={handleChange}
                        />
                        {cat}
                    </label>
                ))} */}
        </div>

        <button
          className="bg-[#00ADB5] text-white w-64 h-20 rounded-2xl border-t-4 text-xl"
          onClick={getjoke}
        >
          {" "}
          Get Joke{" "}
        </button>
      </div>
    </div>
  );
}

export default App;