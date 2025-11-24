import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 5 ? prevDots + '.' : ''));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(false);
    }, 1400);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
                  bg-gray-900 bg-opacity-80 transition-opacity duration-500 
                  ${fade ? 'opacity-100' : 'opacity-0'}`}
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-fast {
            animation: spin 0.7s linear infinite;
          }
          .logo {
            position: relative;
            width: 30px;
            height: 30px;
          }
          .box {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            opacity: 0.8;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .red { background-color: #f90c04; transform: translate(-50%, -50%) translateX(-12px); }
          .green { background-color: #00ff00; transform: translate(-50%, -50%) translateX(12px); }
          .blue { background-color: #137ad3; transform: translate(-50%, -50%) translateY(-12px); }
          .yellow { background-color: #fce303; transform: translate(-50%, -50%) translateY(12px); }
        `}
      </style>
      <div className="flex flex-col items-center">
        <div className="logo animate-spin-fast">
          <div className="box red"></div>
          <div className="box green"></div>
          <div className="box blue"></div>
          <div className="box yellow"></div>
        </div>
        <p className="mt-4 text-white text-lg font-medium">Loading{dots}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
