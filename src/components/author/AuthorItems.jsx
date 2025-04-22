import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const AuthorItems = ({ authorInfo }) => {

  const { authorId } = useParams();
  const [nftDetails, setNftDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorNftCollection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
      const resultData = response.data;
      setNftDetails(resultData.nftCollection || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorNftCollection();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        {loading ? (
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="260px" borderRadius="10px" />
                    </div>
                    <div className="nft_coll_pp" style={{ marginTop: "10px" }}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info" style={{ marginTop: "10px", textAlign: "center" }}>
                      <Skeleton width="70%" height="24px" borderRadius="5px" style={{ margin: "0 auto 8px auto" }} />
                      <Skeleton width="40%" height="18px" borderRadius="5px" style={{ margin: "0 auto" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : nftDetails.length > 0 ? (
          <div className="row">
            {nftDetails.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img className="lazy" src={authorInfo.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                          <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                          <a href=""><i className="fa fa-envelope fa-lg"></i></a>
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