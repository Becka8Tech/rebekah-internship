import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton.jsx";

const NewItems = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
      1200: { items: 4 },
    },
  };

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
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        const resultData = response.data;

        console.log(resultData);

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
  }, [nftId]); // This should remain if you need it to refetch on nftId change

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="row">
              {Array(4).fill(0).map((_, index) => (
                <div className="px-1" key={index}>
                  <div className="nft_coll">
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
              ))}
            </div>
          ) : data.length > 0 ? (
            <OwlCarousel className="owl-theme" {...options}>
              {data.map((item, index) => {
                const timeDifference = item.expiryDate - Date.now();
                const timeLeft = timeDifference >= 0 ? convertMilliseconds(timeDifference) : "Expired";

                return (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Creator: Monica Lucas">
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{timeLeft}</div>
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
                          {item.nftImage && <img src={item.nftImage} className="lazy nft__item_preview" alt="" />}
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
                );
              })}
            </OwlCarousel>
          ) : (
            <div>No items found!</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;