import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = id => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  queryClient =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
    const product = response.data.data;
    return { product };
  };
const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, description, price, colors, company } = product.attributes;
  const dollarsAmount = formatPrice(price);

  const [productColour, setProductColour] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = e => {
    setAmount(Number(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColour,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColour,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img src={image} alt={title} className="rounded-lg h-96 w-96 lg:w-full object-cover" />
        <div>
          {/* TITLE */}
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          {/* COMPANY */}
          <h4 className="text-xl mt-4 font-bold text-neutral-content">{company}</h4>
          {/* PRICE */}
          <p className="mt-3 text-xl ">{dollarsAmount}</p>
          {/* DESCRIPTION */}
          <p className="mt-6 leading-8">{description}</p>
          {/* COLOURS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">colours</h4>
          </div>
          <div className="mt-2">
            {colors.map((colour, index) => {
              return (
                <button
                  key={index}
                  className={`badge h-6 w-6 mr-2 ${colour === productColour && "border-2 border-secondary"}`}
                  style={{ backgroundColor: colour }}
                  onClick={() => setProductColour(colour)}
                ></button>
              );
            })}
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">amount</h4>
            </label>
            <select
              value={amount}
              id="amount"
              onChange={handleAmount}
              className="select select-secondary select-bordered select-md"
            >
              {generateAmountOptions(20)}
            </select>
          </div>
          {/* CART BTN */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md uppercase" onClick={addToCart}>
              add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
