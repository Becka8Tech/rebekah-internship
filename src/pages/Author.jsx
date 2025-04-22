import React, { useState, useEffect } from "react"; 
import { Link, useParams } from "react-router-dom"; 
import axios from "axios"; 
import AuthorBanner from "../images/author_banner.jpg"; 
import AuthorItems from "../components/author/AuthorItems";  

const Author = () => {  
  const { authorId } = useParams();  
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);    

  useEffect(() => {     
    const fetchData = async () => {       
      setLoading(true);       
      setError(null);       
      try {         
        await new Promise((resolve) => setTimeout(resolve, 2000));         
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        const resultData = response.data;          
        if (Array.isArray(resultData) && resultData.length > 0) {           
          setData(resultData);         
        } else {           
          setError("Error: No valid data returned.");         
        }       
      } catch (error) {         
        setError("Error fetching data: " + error.message);       
      } finally {         
        setLoading(false);       
      }     
    };      
    fetchData();   
  }, [authorId]);    

  return (     
    <div id="wrapper">       
      <div className="no-bottom no-top" id="content">         
        <div id="top"></div>          
        <section           
          id="profile_banner"           
          aria-label="section"           
          className="text-light"           
          data-bgimage="url(images/author_banner.jpg) top"           
          style={{ background: `url(${AuthorBanner}) top` }}         
        ></section>          
        <section aria-label="section">           
          <div className="container">             
            <div className="row">               
              <div className="col-md-12">                 
                {loading ? (                   
                  <p>Loading...</p>                 
                ) : error ? (                   
                  <p>{error}</p>                 
                ) : data.length > 0 ? (                   
                  data.map((item) => (                     
                    <div className="d_profile de-flex" key={item.authorId}>
                      <div className="de-flex-col">                         
                        <div className="profile_avatar">                           
                          <img src={item.authorImage} alt="" />                           
                          <i className="fa fa-check"></i>                           
                          <div className="profile_name">                             
                            <h4>                               
                              {item.authorName}                               
                              <span className="profile_username">@{item.tag}</span>                               
                              <span id="wallet" className="profile_wallet">                                 
                                {item.address}                               
                              </span>                               
                              <button id="btn_copy" title="Copy Text">                                 
                                Copy                               
                              </button>                             
                            </h4>                           
                          </div>                         
                        </div>                       
                      </div>                       
                      <div className="profile_follow de-flex">                         
                        <div className="de-flex-col">                           
                          <div className="profile_follower">{item.followers} followers</div>                           
                          <Link to="#" className="btn-main">                             
                            Follow                           
                          </Link>                         
                        </div>                       
                      </div>                     
                    </div>                   
                  ))                 
                ) : (                  
                  <p>No author data available.</p>
                )}               
              </div>               
              <div className="col-md-12">                 
                <div className="de_tab tab_simple">                   
                  <AuthorItems />                 
                </div>               
              </div>             
            </div>           
          </div>         
        </section>       
      </div>     
    </div>   
  ); 
};  

export default Author;