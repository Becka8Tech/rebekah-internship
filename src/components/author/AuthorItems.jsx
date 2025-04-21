import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const AuthorItems = () => {
  const { id } = useParams(); // Use the id from params
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`); // Use id instead of authorId
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
  }, [id]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        {loading ? (
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <Skeleton width="100%" height="100%" borderRadius="10px" />
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="260px" borderRadius="10px" />
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <Skeleton width="70%" height="24px" borderRadius="5px" />
                    <Skeleton width="40%" height="18px" borderRadius="5px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="row">
            {data.map((nftCollection) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nftCollection.id}>
                <Link to="/item-details">
                  <div className="nft__item_info">
                    <img src={nftCollection.nftImage} className="lazy nft__item_preview" alt="" />
                    <h4>{nftCollection.title}</h4>
                    <div className="nft__item_price">{nftCollection.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nftCollection.likes}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default AuthorItems;