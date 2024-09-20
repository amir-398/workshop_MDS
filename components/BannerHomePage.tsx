
// import Image from 'next/image';
// import Link from 'next/link';
import '../public/styles/bannerStyles.css';  
import React from 'react';
import Image from 'next/image';

const BannerSplit = () => {
  return (
    <div className="wrapper">
      {/* NDS Lite Image */}
      <div className="image-container left-image">
        <Image
          src="/images/nds.jpg"
          alt="NDS Lite"
          layout="fill"
          objectFit="cover"
          className="split-image"
        />
        <div className="caption">
          <h3 className="subtitle black-text">De nouveaux horizons</h3>
          <h2 className="title black-text">NDS LITE</h2>
          <button className="discover-btn blue-btn">Découvrir</button>
        </div>
      </div>

      {/* PS Vita Image */}
      <div className="image-container right-image">
        <Image
          src="/images/psvita.jpg"
          alt="PS Vita"
          layout="fill"
          objectFit="cover"
          className="split-image"
        />
        <div className="caption">
          <h3 className="subtitle white-text">De nouvelles possibilités</h3>
          <h2 className="title white-text">PS VITA</h2>
          <button className="discover-btn blue-btn">Découvrir</button>
        </div>
      </div>
    </div>
  );
};

export default BannerSplit;
