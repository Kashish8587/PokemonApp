import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextData, setNextData] = useState();
  const [prevData, setprevData] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getApiData();
  }, [url]);
  useEffect(() => {}, []);
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
      <div className="row  search_bar">
        <div className="col-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              aria-label="value"
              aria-describedby="basic-addon1"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter Type
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {data.map((item) => {
                <li>
                  <button className="dropdown-item btn-success">
                    {item.types[0].type.name}
                  </button>
                  ;
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
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
