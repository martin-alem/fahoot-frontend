import React from 'react';

interface CardProps {
  imageSrc: string;
  text: string;
  onClick: () => void;
}

const GameMode: React.FC<CardProps> = ({ imageSrc, text, onClick }) => {
  return (
    <div className="bg-cover bg-center h-80 w-80 cursor-pointer transition-transform transform hover:scale-110" style={{ backgroundImage: `url(${imageSrc})` }} onClick={onClick}>
      <div className="h-full w-full bg-primary-500 bg-opacity-50 flex items-end p-4">
        <span className="text-white">{text}</span>
      </div>
    </div>
  );
};

export default GameMode;
