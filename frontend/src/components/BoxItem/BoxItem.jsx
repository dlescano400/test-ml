import PropTypes from "prop-types";
import "./BoxItem.css";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../../utils/formatter";

const BoxItem = ({ item = null }) => {
  return (
    <Link to={`/items/${item.id}`}>
      <div className="box-item">
        <div className="image-item">
          <img src={item.picture} alt={item.title} />
        </div>
        <div className="information-item">
          <div className="price-item">
            <p className="price">{currencyFormatter(item.price)}</p>
            {item.free_shipping && (
              <div className="free-shipping">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>
            )}
          </div>
          <h3 className="item-title">
            {item.title} {item.condition === "new" ? "Nuevo" : "Usado"}
          </h3>
        </div>
      </div>
    </Link>
  );
};

BoxItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
    }),
    picture: PropTypes.string,
    condition: PropTypes.string,
    free_shipping: PropTypes.bool,
  }),
};

export default BoxItem;
