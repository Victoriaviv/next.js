import React from 'react';
import data from '../data/personalInfo.json';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import '../styles/hero.css';
import profile from '../public/profile.png';

const iconsMap = {
  facebook: <FaFacebookF />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaTwitter />
};

const Hero = () => {
  return (
    <section id='Hero'>
    <section className="hero">
      <div className="hero-left">

        <h1 className="hero-heading">
          Hi I am <span className="highlight">{data.name}</span> {data.surname}
        </h1>
        <h2 className="hero-title">{data.title}</h2>
        <p className="hero-description">{data.description}</p>
        <div className="hero-cta">
          <a href="#ResumeSection" className="btn">{data.ctaText}</a>
          <div className="social-icons">
            {data.socials.map((item, index) => (
              <a href={item.link} key={index}>
                {iconsMap[item.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="image-container">
          <img src={data.image} alt="profile" className="profile-img" />
       
        </div>
      </div>
    </section>
    
    </section>
    
  );
};

export default Hero;
