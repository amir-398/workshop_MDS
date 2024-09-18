"use client"; 

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import Image from 'next/image';

const NDSBanner = () => {
  return (
    <div className="relative w-full h-[600px]">
      {/* ShaderGradient Canvas */}
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23606080&color2=%238d7dca&color3=%23212121&envPreset=city&format=gif&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false"
        />
      </ShaderGradientCanvas>

      {/* Contenu au-dessus du ShaderGradient */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
      <h2 className="text-2xl mt-12 text-grey-300">DE NOUVEAUX HORIZONS</h2>
      <h1 className="text-8xl font-bold mb-8 mt-12">NDS LITE</h1>

        <Image
          src="/images/nds.png" // Remplace par le bon chemin de ton image NDS Lite
          alt="NDS Lite"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default NDSBanner;
