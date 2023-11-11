import React from "react";
import "./contact.css";

const JobApplication = () => {
  const map =
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19883.041458373074!2d36.41137034960495!3d34.19235850945503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15226f003988a867%3A0x8763d92c1bc607a5!2z2YXYr9ix2LPYqSDYp9mE2KfZhdmE!5e0!3m2!1sen!2slb!4v1699732619005!5m2!1sen!2slb" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ';
  return (
    <>
      <section className="contacts padding">
        <div className="container shadow flexSB">
          <div className="left row">
            <iframe src={map}></iframe>
          </div>
          <div className="right row">
            <h1>Express Your Interest!</h1>
            <p>
              Apply to Our School Community If You Believe You're a Perfect
              Match
            </p>

            {/* just additional info about the school */}
            {/* <div className="items grid2">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>Aarsal, Lebanon</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p> LOREM IPSUM</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p> LOREM IPSUM</p>
              </div>
            </div> */}

            <form action="">
              <div className="flexSB">
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
              </div>
              <div className="flexSB">
                <input type="text" placeholder="Nationality" />
                <input type="text" placeholder="Address" />
              </div>
              <input type="text" placeholder="Position" />
              <h2>Experience:</h2>
              <textarea
                cols="30"
                rows="3"
                placeholder="Kindly provide a list of your professional experiences, including dates and brief descriptions."
              ></textarea>
              <button className="primary-btn">APPLY NOW</button>
            </form>

            {/* If you like to include we can */}
            {/* <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobApplication;
