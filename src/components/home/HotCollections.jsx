import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
  </div>
);

const HotCollections = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
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
        setLoading(false); // Set loading to false after data fetch
        console.log('Loading finished');
      }
    };
    fetchData();
  }, [nftId]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            responsive={{
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 3 },
              1200: { items: 4 },
            }}
          >
            {loading ? ( // Show SkeletonLoader while loading
              <SkeletonLoader />
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <div className="px-1" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        {item.nftImage && (
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        )}
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No collections available.</p>
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};
export default HotCollections;
