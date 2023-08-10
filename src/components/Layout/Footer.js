import React from 'react';
import { Link } from 'react-router-dom';
import './FooterBlack.css';
import { AiFillLock } from 'react-icons/ai';
import { FaRupeeSign } from 'react-icons/fa';

function Footer() {
  return (
    <div id="black_footer">
      <div id="black_footer_box1">
        <div id="black_heading_of_footers1">
          <h1 id="black_contact_us" className="black_footer_components">
            Contact Us
          </h1>
        </div>
        <hr id="black_line_for_third" />
        <div
          id="black_contact_us_content"
          className="black_each_footer_content"
        >
          <p>
            {' '}
            <img
              className="black_contact_image"
              src="https://img.icons8.com/ios-filled/50/ffffff/mail.png"
              alt="contact_image"
            />
            <span id="black_email_text">
              {' '}
              <a href="mailto:saenitkurukshetra@gmail.com">
                saenitkurukshetra@gmail.com
              </a>
            </span>
          </p>

          <p>
            {' '}
            <img
              className="black_contact_image"
              src="https://img.icons8.com/ios-glyphs/30/ffffff/linkedin.png"
              alt="contact_image"
            />
            <span id="black_linkedin_text">
              <a
                href="https://in.linkedin.com/company/sae-nit-kkr"
                target="_blank"
              >
                linkedin
              </a>
            </span>
          </p>

          <p>
            {' '}
            <img
              className="black_contact_image"
              src="https://img.icons8.com/material-outlined/24/ffffff/add-contact-to-company.png"
              alt="contact_image"
            />
            <span id="black_email_text">
              {' '}
              <Link to="/contact">Contact Us</Link>
            </span>
          </p>
        </div>
      </div>
      <div id="black_footer_box4">
        <div id="black_heading_of_footers3">
          <h1 id="black_contact_us" className="black_footer_components">
            Guidelines
          </h1>
        </div>
        <hr id="black_line_for_third" />
        <div
          id="black_contact_us_content"
          className="black_each_footer_content"
        >
          <p>
            {' '}
            <img
              className="black_contact_image"
              src="https://img.icons8.com/ios-filled/50/ffffff/mail.png"
              alt="contact_image"
            />
            <span id="black_email_text">
              {' '}
              <Link to="/termsandconditions" target="_blank">
                Terms And Conditions
              </Link>
            </span>
          </p>

          <div className="horizontal">
            {' '}
            <div className="black_contact_icon">
              <AiFillLock />
            </div>
            <span id="black_linkedin_text">
              <Link to="/privacypolicy" target="_blank">
                Privacy Policy
              </Link>
            </span>
          </div>

          <div className="horizontal">
            {' '}
            <div className="black_contact_icon">
              <FaRupeeSign />
            </div>
            <span id="black_linkedin_text">
              <Link to="/refundandcancelpolicy" target="_blank">
                Refund and Cancel Policy
              </Link>
            </span>
          </div>
        </div>

        {/* <div id="black_heading_of_footers4">
          <h1 id="black_newsletter" className="black_footer_components">
            {" "}
            Join Our Newsletter
          </h1>
        </div>
        <hr id="black_line_for_fourth" />
        
        <div
          id="black_newsletter_content"
          className="black_each_footer_content"
         >
         
          <img id="coming_soon"src={Coming}/>
          <input
            id="black_getting_mail"
            type="text"
            placeholder="Enter your email..."
          />
          <button id="black_joinus"> Join</button>
          <br />
          <br />
          <input
            type="checkbox"
            id="black_select"
            name="select"
            value="got_it"
          />
          <span id="black_checkbox_disclaimer">
            Yes,I'd like to hear about updates on my mail
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
