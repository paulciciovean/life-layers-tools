import React, {useState} from 'react'
import styled from "styled-components"
import Button from "./Button"
import { Cookies } from 'react-cookie';

const ModalContainer = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-color: rgba(0,0,0,0.5);
    z-index:999;
    display: flex;
    justify-content: center;
`
const ModalBody = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 40%;
    width: 40%;
    background-color: #fff;
    border-radius:10px;
    padding-top: 10vmin;
`
const ModalForm = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    label {

    }
    input {
        border: 0;
        border-bottom: 1px solid grey;
        border-radius:10px;
        height:6vmin;
    }
    textarea {
        outline: 0;
        resize: none;
        width: 20vmin;
        height:10vmin;
    }
`

const UpdateModal = ({setOpenUpdateModal,product,setProducts}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, price, description });
    fetch(`${process.env.REACT_APP_API_URL}/products/${product.id}`,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name,price,description})
      })
      .then((response)=> {
        response.json().then((data)=> {
            fetch(`${process.env.REACT_APP_API_URL}/products/all`).then((response) =>
                response.json().then((data) => {
                setProducts(data);
      })
      .catch((err)=> {
        console.log(err);
      })
    );
        })
        .catch((err)=> {
            console.log(err);
        })
      })
      setOpenUpdateModal(false);
  };
  return (
    <ModalContainer>
        <ModalBody>
            <ModalForm>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br /><br />

                <input type="submit" value="Submit" />
                <Button text="Close" onClick={()=> {setOpenUpdateModal(false)}}></Button>
              </form>
            </ModalForm>
        </ModalBody>
    </ModalContainer>
  )
}

export default UpdateModal