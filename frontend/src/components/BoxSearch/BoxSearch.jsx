import "./BoxSearch.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidFormat } from "../../utils/isValidFormat";

const BoxSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      console.log(isValidFormat(searchTerm));
      if (isValidFormat(searchTerm)) {
        navigate(`/items/${searchTerm}`);
      } else {
        navigate(`/items?search=${searchTerm}`);
      }
    }
  };

  return (
    <header>
      <div className="nav_var">
        <Link to="/">
          <img
            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.15/mercadolibre/logo__small@2x.png"
            alt="logo.jpg"
          />
        </Link>
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            name="search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
    </header>
  );
};

export default BoxSearch;
