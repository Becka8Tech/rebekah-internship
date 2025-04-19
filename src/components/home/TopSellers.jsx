import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const TopSellers = () => {
  const { authorId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const resultData = response.data;

        if (Array.isArray(resultData) && resultData.length > 0) {
          setData(resultData);
        } else {
          console.error("Error: No valid data returned.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authorId]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12 wow fadeIn" style={{ visibility: "visible" }}>
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton
                        width="100%"
                        height="260px"
                        borderRadius="10px"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="5px"
                          style={{ margin: "0 auto" }}
                        />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                data.map((item) => (
                  <div key={item.authorId}>
                    {item.id}.
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </div>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;