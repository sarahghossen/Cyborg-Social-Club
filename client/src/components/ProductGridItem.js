import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import { addCartProduct } from "../actions";

const ProductGridItem = ({ id, name, price, imageSrc, numInStock }) => {
  const dispatch = useDispatch();
  const productFound = true;
  const userState = useSelector((state) => state.signin);
  //should we remove this and just disable button?
  const handleAddToCart = () => {
    if (numInStock > 0) {
      if (userState.isSignedIn) {
        let email = userState.email;
        let cartItem = { id, name, price, imageSrc };
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({ email, cartItem }),
          headers: { "Content-Type": "application/json" },
        };
        fetch("/updateusercart", requestOptions)
          .then((res) => res.json())
          .then((json) => {
            if (json.status === 200) {
              console.log("hello");
              dispatch(addCartProduct(cartItem));
              return;
            } else if (json.status === 404) {
              return window.alert("user does not exist");
            }
          });
      } else {
        console.log("disptaching");
        dispatch(addCartProduct({ id, name, price, imageSrc }));
      }
    }
  };

  return (
    <>
      {productFound ? (
        <ItemWrapper>
          <StyledLink to={`/item/${id}`}>
            <ImgDiv>
              <ItemImg src={imageSrc} />
            </ImgDiv>
            <ItemName>{name}</ItemName>
            <ItemPrice>{price}</ItemPrice>
          </StyledLink>
          <Button disabled={numInStock <= 0} onClick={handleAddToCart}>
            {numInStock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </ItemWrapper>
      ) : (
        <p>Product Not Found</p>
      )}
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 50vh;
`;

const ItemWrapper = styled.div`
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 20px;
  border: solid 1px lightgrey;
`;

const ImgDiv = styled.div`
  /* border: solid 1px var(--primary-color); */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50%;
  overflow: hidden;
`;

const ItemImg = styled.img`
  /* padding: 20px; */
`;
const ItemName = styled.h1`
  color: var(--primary-color);
  text-align: center;
  width: 250px;
  margin-top: 10px;
`;

const ItemPrice = styled.p`
  color: var(--secondary-color);
  font-size: 15px;
  margin-top: 10px;
`;

export default ProductGridItem;
