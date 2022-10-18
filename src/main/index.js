import "./index.css";
import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect( /* 통신 무한반복을 방지하기 위해. 1번만 렌더링 해준다. */
    function(){
      axios
      .get("https://d7d9f7b8-942d-483f-9318-d16882377829.mock.pstmn.io/products")
      .then(function(result){
        const products = result.data.products; /* ★★ 중요 */
        setProducts(products); /* 이 부분이 있어야 리스트가 보여짐 (데이터 받기) */
      }).catch(function(error){
        console.error("에러 발생: ", error);
      });
    }, []); 

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" alt="헤더"/>
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="배너"/>
        </div>
        <h1>판매되는 상품들</h1>

        <div id="product-list">
          {
            products.map(function(product, index){ /* product요소가 3개라면 3번 pop 됨. */
              return (
                <div className="product-card">
                  <Link className="product-link" to={`/products/${index}`}> 
                    <div>
                      <img className="product-img" src={product.imageUrl} alt={product.alt}/>
                    </div>
                    <div className="product-contents">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{product.price}원</span>
                      <div className="product-seller">
                        <img className="product-avatar" src="images/icons/avatar.png" alt="아바타"/>
                        <span>{product.seller}</span>
                      </div>
                    </div>
                  </Link>
                </div> 
              );
            })
          }
        </div>

      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPage;