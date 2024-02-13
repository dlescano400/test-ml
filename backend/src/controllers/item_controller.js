import dotenv from "dotenv";
dotenv.config();
const ML_API = process.env.URL_API_ML;
import axios from "axios";

const listsItem = async (req, res) => {
  try {
    const { q, limit = 4, offset = 0 } = req.query;

    const result_query = await axios
      .get(`${ML_API}/sites/MLA/search?q=${q}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    const data_author = {
      author: {
        name: "Jual",
        lastname: "Perez",
      },
    };

    const category = result_query.filters.find(
      (filter) => filter.id === "category"
    );

    const categories = category
      ? category.values.map((value) => {
          const { path_from_root } = value;
          return path_from_root.map((item) => item.name);
        })
      : [];
    const full_categories = [].concat.apply([], categories);

    const items = result_query.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: item.decimals,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });
    const result = {
      ...data_author,
      categories: full_categories,
      items,
    };
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item_query = await axios
      .get(`${ML_API}/items/${id}`)
      .then((res) => {
        const item = res.data;

        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: item.decimals,
          },
          picture: item.pictures,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          sold_quantity: item.sold_quantity,
        };
      })
      .catch((err) => {
        console.error(err);
      });

    const description = await axios
      .get(`${ML_API}/items/${id}/description`)
      .then((res) => {
        return res.data.plain_text;
      })
      .catch((err) => {
        console.error(err);
      });
    const data_author = { author: { name: "Jual", lastname: "Perez" } };
    const full_item = { ...item_query, description };
    const result = { ...data_author, item: full_item };
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

export { listsItem, getItem };
