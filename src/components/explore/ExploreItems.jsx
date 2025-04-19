import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const ExploreItems = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeftList, setTimeLeftList] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  const convertMilliseconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const resultData = response.data;

        if (Array.isArray(resultData) && resultData.length > 0) {
          setData(resultData);
          const initialTimes = resultData.map(item => item.expiryDate ? item.expiryDate - Date.now() : null);
          setTimeLeftList(initialTimes);
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
  }, [nftId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftList(prevTimeLeft => prevTimeLeft.map((timeLeft, index) => {
        return data[index]?.expiryDate ? Math.max(timeLeft - 1000, 0) : null;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
        {loading ? (
          new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
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
              </div>
            </div>
          ))
        ) : (
          data.map((item) => (
            <div className="nft__item" key={item.nftId}>
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && (
                <div className="de_countdown">
                  {convertMilliseconds(item.expiryDate - Date.now())}
                </div>
              )}
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;