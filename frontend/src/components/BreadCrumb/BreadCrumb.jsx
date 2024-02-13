import "./BreadCrumb.css";
import PropTypes from "prop-types";

const BreadCrumb = ({ categories = [] }) => {
  return (
    categories.length > 0 && (
      <ol className="breadcrumb">
        {categories.map((category, index) => (
          <li key={index}>
            <a to={category}>{category}</a>
            {index < categories.length - 1 && <span>{">"}</span>}
          </li>
        ))}
      </ol>
    )
  );
};

BreadCrumb.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default BreadCrumb;
