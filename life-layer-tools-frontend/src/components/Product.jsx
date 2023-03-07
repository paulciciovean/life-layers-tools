import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from "./common/Button"
import { Cookies } from 'react-cookie';
import UpdateModal from "./common/UpdateModal";

const ProductContainer = styled.div`
    width: 35vmin;
    height: 35vmin;
    border-radius: 10%;
    border: 2px solid #1d1082;
    margin: 2vmin;
    background-color: #a9e6f5;
    & .button-container{
      display:flex;
      justify-content: space-around;
    }
`
const ProductName = styled.h3`
  text-align: center;
`
const ProductInfo = styled.p`
   text-align: center;
`
const ProductPrice = styled.h3`
  text-align: center;
`
const ProductUserInfo = styled.p`
    padding:10px;
    color: #fff;
    font-weight: 500;
`
const Product = ({product,setProducts,productsList}) => {
    const [openUpdateModal,setOpenUpdateModal] = useState(false);
    const [userProduct,setUserProduct] = useState({})
    const { name,description,price,id,user_id} = product;

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/user/${user_id}`).then((response) =>
        response.json().then((data) => {
          setUserProduct(data);
        })
        .catch((err)=> {
          console.log(err);
        })
      );
    }, []);

    const onClickDelete = ()=> {
      const cookies = new Cookies();
      const token = cookies.get('token');
      fetch(`${process.env.REACT_APP_API_URL}/products/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response)=> {
          setProducts(productsList.filter(product=> product.id !== id))
        })
        .catch((err)=> {
          console.log("error"+ err);
      })
   }
   const onClickUpdate = () => {
      setOpenUpdateModal(true);
   }
  return (
     <ProductContainer>
        <ProductName> { name } </ProductName>
        <ProductInfo>{ description }</ProductInfo>
        <ProductPrice> { price }$</ProductPrice>
        <div className="button-container">
          <Button color="#FF0000" text="Delete" onClick={onClickDelete}></Button>
          <Button text="Update" color="#2596be" onClick={()=> onClickUpdate(product)}></Button>
        </div>
        <ProductUserInfo>posted by {userProduct.email}</ProductUserInfo>
        {openUpdateModal ? <UpdateModal setOpenUpdateModal={setOpenUpdateModal} product={product} setProducts={setProducts}></UpdateModal> : ""}
    </ProductContainer>
  )
}

export default Product
