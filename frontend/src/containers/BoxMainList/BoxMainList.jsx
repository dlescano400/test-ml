import BoxListItems from "../../components/BoxListItems/BoxListItems";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Loader } from "../../components/Loader/Loader";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./BoxMainList.css";

const BoxMainList = () => {
  const location = useLocation();

  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");
  const { data, loading, setUrl } = useFetch();

  useEffect(() => {
    if (location.search) {
      const search = new URLSearchParams(location.search);
      setSearch(search.get("search"));
    }
  }, [location.search]);

  useEffect(() => {
    if (search) {
      setUrl(`${import.meta.env.VITE_URL_API}/items?q=${search}`);
    }
  }, [search, setUrl]);

  useEffect(() => {
    if (data) {
      setResult(data);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="loader_main">
          <Loader />
        </div>
      ) : (
        <>
          {result && (
            <div>
              <BreadCrumb categories={result.categories} />
              <BoxListItems result={result} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BoxMainList;
