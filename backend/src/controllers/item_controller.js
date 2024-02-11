const ML_API = "https://api.mercadolibre.com/";
import axios from "axios";

const listsItem = async (req, res) => {
  try {
    const { q } = req.query;
    const limit = 4;
    const offset = 0;

    const result_query = await axios
      .get(`${ML_API}sites/MLA/search?q=${q}&limit=${limit}&offset=${offset}`)
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
      ? category.values.map((value) => value.name)
      : [];

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
      categories,
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
      .get(`${ML_API}items/${id}`)
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
      .get(`${ML_API}${id}/description`)
      .then((res) => {
        res.plain_text;
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
