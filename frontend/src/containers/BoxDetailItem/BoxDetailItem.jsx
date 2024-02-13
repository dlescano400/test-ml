import "./BoxDetailItem.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { currencyFormatter, decimalFormatter } from "../../utils/formatter";
import useFetch from "../../hooks/useFetch";
import { Loader } from "../../components/Loader/Loader";

const BoxDetailItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { data, loading, setUrl } = useFetch();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}items/${id}`;
    setUrl(url);
  }, [id, setUrl]);

  useEffect(() => {
    if (data) {
      const { item } = data;
      setItem(item);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="loader_detail">
          <Loader />
        </div>
      ) : (
        <div>
          {item && (
            <section className="section_details">
              <div className="images_item">
                {item.picture && (
                  <img
                    src={item.picture[0].secure_url}
                    alt={`${item.title}-1`}
                  />
                )}
              </div>
              <div className="info_item">
                <div className="box_item_info">
                  <div className="info_item__condition">
                    {item.condition === "used" ? "Usado" : "Nuevo"} - 120
                    vendidos
                  </div>
                  <div className="info_item__title">
                    <h1>{item.title}</h1>
                  </div>
                  <div className="price_item">
                    <h2 className="price_item__currency">
                      {currencyFormatter(item.price)}
                      <sup>
                        <small>{decimalFormatter(item.price)}</small>
                      </sup>
                    </h2>
                  </div>
                  <button>COMPRAR</button>
                </div>
              </div>
              <div className="description_item">
                <h2>Descripción del producto</h2>
                <p>{item.description}</p>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default BoxDetailItem;
