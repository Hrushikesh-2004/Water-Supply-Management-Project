import React from "react";
import "../../CSS/style.css";

/** IMAGES **/
import water_resouce2 from "../../images/water_resource2.png";
import location from "../../images/location.png";
import repair from "../../images/repair.jpeg";
import house from "../../images/house_img.png";

const Home = () => {
  return (
    <div className="home-section">

      {/* MAIN SECTION BEGIN */}

      <div className="container main-section grid grid-two-cols">

        <div className="main-content">
          <h1 className="main-heading">What is water supply network</h1>
          <p>
            A water supply network, or water supply system, is an integrated
            infrastructure that extracts, treats, and distributes clean, safe
            water for domestic, industrial, and agricultural use. It includes
            water sources such as reservoirs or aquifers, treatment facilities
            to purify water, and a network of pipelines that deliver water to
            end-users with sufficient pressure and quality. The system extends
            to individual households through service lines and water meters,
            ensuring reliable access to potable water essential for public
            health and daily activities.
          </p>
        </div>

        <div className="main-img">
          <figure>
            <img src={water_resouce2} alt="Water resouce image" />
            {/* <img src="https://pin.it/51Ckd9yVU" alt="water resouce image" /> */}
            {/* <iframe src="https://assets.pinterest.com/ext/embed.html?id=881931539521298981" height="316" width="345" frameborder="0" scrolling="no" ></iframe> */}
          </figure>
        </div>

      </div>

      {/* MAIN SECTION END */}

      {/* SECTION DIVIDER BEGINS */}

      <div className="section-divider-header">

        <div>
          <svg
            className="section-divider-waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="section-divider-parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      {/* SECTION DIVIDER ENDS */}

      {/* MID SECTION STARTS */}

      <div className="container mid-section">

        <h1 className="mid-heading">Our services</h1>

        <div className="container grid grid-auto mid-section-content">

          <div className="grid-item">

            <div className="grid-img">
              <img src={location} alt="an image of location"  />
            </div>
              <h2 className="common-subheading">Water Source Identification</h2>
              <p className="common-para">We identify and evaluate water sources like rivers, lakes, reservoirs, and groundwater to ensure a consistent and reliable starting point for the supply network.
              </p>
        
          </div>

          <div className="grid-item">

            <div className="grid-img">
              <img src={house} alt="an image of location" />
            </div>
              <h2 className="common-subheading">Connection to Household</h2>
              <p className="common-para">Designing and maintaining an efficient system of pipes and pumps to transport treated water to households.</p>
           
            
          </div>

          <div className="grid-item">

            <div className="grid-img">
              <img src={repair} alt="an image of location"  />
            </div>
              <h2 className="common-subheading">Emergency response</h2>
              <p className="common-para">We provide rapid emergency response with trained workers and strategically placed valves for quick action. Additionally, we monitor the system in real-time to ensure optimal performance and immediate issue resolution.</p>
            
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
