import React from "react";

function Navbar(props) {
  const { onChange, data } = props;
  return (
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
  );
}

export default Navbar;
