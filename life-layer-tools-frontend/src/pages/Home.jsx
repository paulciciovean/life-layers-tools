import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Product from "../components/Product";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`).then((response) =>
      response.json().then((data) => {
        setProducts(data);
      })
      .catch((err)=> {
        console.log(err);
      })
    );
  }, []);

  return (
    <Layout>
      <ProductsContainer>
      {products.map((product) => (
        <Product key={product.id} product={product} setProducts={setProducts} productsList={products}>
          {" "}
        </Product>
      ))}
    </ProductsContainer>
    </Layout>
  );
};

export default Home;
