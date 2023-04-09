import React, { useEffect, useState } from "react";
import { Container } from "react-grid-system";

export const App = () => {
  const [content, setContent] = useState([]);

  const getData = async () => {
    fetch("https://lenodevapi-vpvf.onrender.com/api/productAll/?page=1/")
      .then((d) => d.json())
      .then((data) => setContent(data.data));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div>
        {content.map((item) => (
          <div className="item" style={{ margin: "20px" }}>
            <div>
              <a href={`/post/${item.slug}`} >{item.title}</a>
            </div>
            <img
              src={item.imageUrl}
              alt=""
              style={{ width: "200px", height: "150px" }}
            />
          </div>
        ))}
        {console.log("content:", content)}
        React Grid System
      </div>
    </Container>
  );
}

// export default App ;
