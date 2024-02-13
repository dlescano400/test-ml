import PropTypes from "prop-types";
import BoxItem from "../BoxItem/BoxItem";
import "./BoxListItems.css";

const BoxListItems = ({ result }) => {
  return (
    <ol className="container-items">
      {result &&
        result.items.map((item, index) => (
          <li key={index}>
            <BoxItem item={item} />
          </li>
        ))}
    </ol>
  );
};

BoxListItems.propTypes = {
  result: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string,
      lastname: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.shape({
          currency: PropTypes.string,
          amount: PropTypes.number,
        }),
        picture: PropTypes.string,
        condition: PropTypes.string,
        free_shipping: PropTypes.bool,
      })
    ),
  }),
};

export default BoxListItems;
