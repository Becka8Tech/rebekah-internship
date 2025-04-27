import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingIntro = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="2000"
            >
              <div className="feature-box f-boxed style-3">
                <i className="bg-color-2 i-boxed icon_wallet"></i>
                <div className="text">
                  <h4>Set up your wallet</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                    accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
                <i className="wm icon_wallet"></i>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="2000"
              >
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div className="text">
                <h4>Add your NFTs</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
              </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div 
              data-aos="flip-left" 
              data-aos-easing="ease-out-cubic" 
              data-aos-duration="2000"
              >
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div className="text">
                <h4>Sell your NFTs</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_tags_alt"></i>
            </div>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;