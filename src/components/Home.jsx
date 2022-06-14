import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Navbar from "./Navbar";
function Home() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextData, setNextData] = useState();
  const [prevData, setprevData] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getApiData();
  }, [url]);

  const getApiData = async () => {
    const resp = await axios.get(`${url}`);
    if (resp.status == 200) {
      setNextData(resp.data.next);
      setprevData(resp.data.previous);
      getPokemon(resp.data.results);
    }
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setData((state) => {
        state = [...state, result.data];

        return state;
      });
    });
  };

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="container-fluid">
    <Navbar data={data} onChange={onChange}/>
      <div className="row d-flex justify-content-center align-item-center">
        {data.map((item) => {
          if (item.name.includes(searchValue))
            return (
              <div className="col">
                <Card data={item} />
              </div>
            );
        })}
        <div className="d-flex justify-content-start m-5 p-5">
          <button
            className="btn btn-success me-4"
            onClick={() => {
              setData([]);
              setUrl(prevData);
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              setData([]);
              setUrl(nextData);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
