import React from 'react';
import { FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';


const Footer = () => {
  return (
    <div className='footer container'>
        <div className="footer-content container flex">

            <div className="footer-1">
                <h1 className="common-subheading">Services</h1>
                <p className="common-para">Contact: +123 745 632</p>
                <p className="common-para">Email: KMSWD@gmail.com</p>
                <p className="common-para">Address: Keshav Memorial Institute Of Technology, Hyderabad, Telangana</p>
            </div>

            <div className="footer-2">
                <h1 className="common-subheading">Social Media</h1>
                <div className="social-footer--icons">
                    <div className="fa-brands">
                        <FaInstagram className="fa-brands-icon"/>
                    </div>
                    <div className="fa-brands">
                        <FaDiscord className="fa-brands-icon"/>
                    </div>
                    <div className="fa-brands">
                        <FaYoutube className="fa-brands-icon"/>
                    </div>
                </div>
            </div>
        </div>    

        <h1 className="footer-copyright">© 2024 KMWSD All rights reserved.</h1>

    </div>
  )
}

export default Footer;
