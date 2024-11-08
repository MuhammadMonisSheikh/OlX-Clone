
import React from "react";
import { Link } from "react-router-dom";
import applebtn from './images/applebtn.svg';
import googlebtn from './images/googlbtn.svg';
import appbtn from './images/appbtn.svg';
import './css/footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer__section">
                <div className="footer__links">
                <div className="footer__links-sub">
                        <p>POPULAR CATEGORIES</p>
                        <ul>
                            <li><Link className="footer__link">Cars</Link></li>
                            <li><Link className="footer__link">Flats for rent</Link></li>
                            <li><Link className="footer__link">Mobile Phones</Link></li>
                            <li><Link className="footer__link">Jobs</Link></li>
                        </ul>
                    </div>
                <div className="footer__links-sub">
                    <p>TRENDING SEARCHES</p>
                        <ul>
                            <li><Link className="footer__link">Cars</Link></li>
                            <li><Link className="footer__link">Flats for rent</Link></li>
                            <li><Link className="footer__link">Mobile Phones</Link></li>
                            <li><Link className="footer__link">Jobs</Link></li>
                        </ul>
                    </div>
                <div className="footer__links-sub">
                    <p>ABOUT US</p>
                        <ul>
                            <li><Link className="footer__link">Cars</Link></li>
                            <li><Link className="footer__link">Flats for rent</Link></li>
                            <li><Link className="footer__link">Mobile Phones</Link></li>
                            <li><Link className="footer__link">Jobs</Link></li>
                        </ul>
                    </div>
                <div className="footer__links-sub">
                    <p>OLX</p>
                        <ul>
                            <li><Link className="footer__link">Help</Link></li>
                            <li><Link className="footer__link">Sitemap</Link></li>
                            <li><Link className="footer__link">Terms of use</Link></li>
                            <li><Link className="footer__link">Privacy Policy</Link></li>
                        </ul>
                    </div>
                   

                    <div className="footer__social">
                    <div className="social__links">
                    <p>FOLLOW US</p>
                    <div className="social__png">
                    <i class="fa-brands fa-twitter twit__icon social__icon"></i>
                    <i class="fa-brands fa-facebook-f fb__icon social__icon"></i>
                    <i class="fa-brands fa-youtube you__icon social__icon"></i>
                    <i class="fa-brands fa-instagram inst__icon social__icon"></i>
                    </div>
                    </div>
                    <div className="apple__buttons">
                        <img src={applebtn} alt={applebtn} className="apple__btn"/>
                        <img src={googlebtn} alt={googlebtn} className="apple__btn"/>
                        <img src={appbtn} alt={appbtn} className="apple__btn"/>
                    </div>
                    </div>

                </div>
                <div className="footer__last">
                    <h4>Free Classifieds in Pakistan . © 2006-2024 OLX</h4>
                </div>
            </div>
        </>
    )
}

export default Footer;