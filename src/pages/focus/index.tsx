import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ArrowSVG from '../../resources/images/icon-arrow.svg';
import CloudSVG from '../../resources/images/icon-cloud.svg';
import FaceSVG from '../../resources/images/icon-face.svg';
import StiffuleSVG from '../../resources/images/icon-siffule.svg';
import StarSVG from '../../resources/images/icon-star.svg';
import Icon100SVG from '../../resources/images/icon100.svg';

import './index.css';
import '../../resources/styles/common.css'

const Focus = () => {
  const [openTimes, setOpenTimes] = useState(1);

  return (
    <>
      <section className="flex justify-center items-center w-screen h-screen bg-primary_bg">
        <div className="relative bg-oriange_bg lg:w-3/4 sm:w-2/3 md:py-100 sm:py-12 border-8 border-black border-solid">
          <ArrowSVG className="absolute w-[200px] h-[200px] -bottom-1/3"/>
          <CloudSVG className="absolute w-[200px] h-[200px] left-1/2 -bottom-1/3"/>
          <FaceSVG className="absolute w-[200px] h-[200px] left-[-100px]"/>
          <StiffuleSVG className="absolute w-[200px] h-[200px] right-[-50px] -bottom-1/3"/>
          <StarSVG className="absolute w-[200px] h-[200px] top-[-100px] rotate-[-20deg]"/>
          <Icon100SVG className="absolute w-[200px] h-[200px] top-[-100px] left-1/2"/>
          <p className="font-glass-antiqua text-center text-9xl">Deep Work</p>
          <p className="font-glass-antiqua text-center text-xl mt-6">You have opened this page <b>{ openTimes }</b> times today. Keep Focus!</p>
        </div>
      </section>
      <section className="flex justify-center items-center  w-screen h-screen bg-secondary_bg">
        <div className="relative">
          <p className="font-glass-antiqua text-center text-9xl text-white">🚧 Work in Progress.</p>
        </div>
      </section>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Focus />
  </React.StrictMode>
);
