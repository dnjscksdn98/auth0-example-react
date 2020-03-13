import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getItems } from "../modules/items";

const ExternalAPI = () => {
  // const [showResult, setShowResult] = useState(false);
  // const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const { loading, items, error } = useSelector(
    state => ({
      loading: state.items.loading,
      items: state.items.items,
      error: state.items.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // const callApi = async () => {
  //   try {
  //     const token = await getTokenSilently();

  //     const response = await axios.get("http://localhost:8000/api/items", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       token
  //     });
  //     console.log(token);

  //     const responseData = await response.message;

  //     setShowResult(true);
  //     setApiMessage(responseData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleClick = async () => {
    const token = await getTokenSilently();
    dispatch(getItems(token));
  };

  if (loading) return <h2>Loading...</h2>;
  // if (!items) return <h2>No items.</h2>;
  if (error) return <h2>There was an error.</h2>;

  return (
    <>
      <h1>External API</h1>
      <button onClick={handleClick}>Ping API</button>
    </>
  );
};

export default ExternalAPI;
