import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(" https://pokeapi.co/api/v2/pokemon/");
  const [nextData, setNextData] = useState();
  const [prevData, setprevData] = useState();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getApiData();
  }, [url]);
  useEffect(() => {}, []);
  const getApiData = async () => {
    const resp = await axios.get(url);
    if (resp.status == 200) {
      setNextData(resp.data.next);
      setprevData(resp.data.previous);
      getPokemon(resp.data.results);
      console.log(resp.data, ">>>>>>>>>>>>>>>>>>>>>>>>??????????????");
    }
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      console.log(item.url, "resukt");
      setData((state) => {
        state = [...state, result.data];

        return state;
      });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row  search_bar">
        <div className="col-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Value"
              aria-label="value"
              aria-describedby="basic-addon1"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="col-4">
          <button className="btn btn-success">click me</button>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-item-center">
        <div className="col">
          <Card pokemondata={data} />
        </div>
        <div className="col">
          <div className="searhdata">
            <img
              src={
                "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/35.svg"
              }
            />
            <p>name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
