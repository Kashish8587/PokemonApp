import React from "react";
import Modal from "react-modal";
function Card(props) {
  const { data } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
        className="card-img-top img-fluid d-flex justify-content-center align-items-center"
        style={{ height: "200px", width: "200px" }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title"> {data.types[0].type.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{data.id}</li>
        <li className="list-group-item">{data.name}</li>
      </ul>
      <div className="card-body">
        <button className="btn btn-primary" onClick={openModal}>
          Open Modal
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
            className="card-img-top img-fluid d-flex justify-content-center align-items-center"
            style={{ height: "80px", width: "100px" }}
            alt="..."
          />
          <h2>Name:{data.name}</h2>
          <h3>Id:{data.id}</h3>
          <p>weight: {data.weight}</p>
          <p>base_experience: {data.base_experience}</p>

          <button className="btn btn-danger btn-sm" onClick={closeModal}>
            close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Card;
