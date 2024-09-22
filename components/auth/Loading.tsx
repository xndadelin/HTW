import React from "react";

const WaveLoading = () => {
  const appName = ["Hack", "The", "Way"];
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl font-bold flex space-x-4">
        {appName.map((word, wordIndex) => (
          <div key={wordIndex} className="flex">
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block animation-wave"
                style={{ 
                  animationDelay: `${wordIndex * 0.3 + letterIndex * 0.1}s`
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaveLoading;