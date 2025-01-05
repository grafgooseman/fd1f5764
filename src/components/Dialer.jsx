import React, { useState, useRef } from 'react';
import { PhoneIcon, BackspaceIcon } from '@heroicons/react/24/outline';

// Sound effects URLs for each button
const BUTTON_SOUNDS = {
  '1': 'https://onlinesound.net/_ld/71/7195_button_1.mp3',
  '2': 'https://onlinesound.net/_ld/71/7196_button_2.mp3',
  '3': 'https://onlinesound.net/_ld/71/7197_button_3.mp3',
  '4': 'https://onlinesound.net/_ld/71/7198_button_4.mp3',
  '5': 'https://onlinesound.net/_ld/71/7199_button_5.mp3',
  '6': 'https://onlinesound.net/_ld/72/7200_button_6.mp3',
  '7': 'https://onlinesound.net/_ld/72/7201_button_7.mp3',
  '8': 'https://onlinesound.net/_ld/72/7202_button_8.mp3',
  '9': 'https://onlinesound.net/_ld/72/7203_button_9.mp3',
  '0': 'https://onlinesound.net/_ld/71/7195_button_1.mp3',
  '*': 'https://onlinesound.net/_ld/71/7195_button_1.mp3', // Using 0 sound for * and #
  '#': 'https://onlinesound.net/_ld/71/7195_button_1.mp3'
};

const CALLING_SOUND = 'https://www.telephonering.com/assets/tones/ringback/us.mp3';

const DialerButton = ({ children, onClick, className = '' }) => {
  const buttonAudio = useRef(new Audio(BUTTON_SOUNDS[children]));

  const handleMouseDown = () => {
    try {
      buttonAudio.current.currentTime = 0;
      const playPromise = buttonAudio.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed:", error);
        });
      }
      onClick(children);
    } catch (error) {
      console.log("Error playing sound:", error);
      onClick(children);
    }
  };

  const handleMouseUp = () => {
    try {
      buttonAudio.current.pause();
      buttonAudio.current.currentTime = 0;
    } catch (error) {
      console.log("Error stopping sound:", error);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    handleMouseDown();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleMouseUp();
  };

  return (
    <button 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        w-20 h-16 rounded-full 
        flex items-center justify-center
        text-2xl font-medium
        bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary
        text-theme-light-text-primary dark:text-theme-dark-text-primary
        hover:bg-theme-light-bg-tertiary dark:hover:bg-theme-dark-bg-tertiary
        transition-colors
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialing, setIsDialing] = useState(false);
  const callingAudio = useRef(new Audio(CALLING_SOUND));

  const handleNumberClick = (number) => {
    setPhoneNumber(prev => prev + number);
  };

  const handleDelete = () => {
    if (phoneNumber.length > 0) {
      setPhoneNumber(prev => prev.slice(0, -1));
    }
  };

  const handleCall = () => {
    if (phoneNumber.length > 0 && !isDialing) {
      setIsDialing(true);
      try {
        callingAudio.current.loop = true;
        const playPromise = callingAudio.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Calling sound failed:", error);
          });
        }

        // Simulate call end after 5 seconds
        setTimeout(() => {
          setIsDialing(false);
          callingAudio.current.pause();
          callingAudio.current.currentTime = 0;
        }, 5000);
      } catch (error) {
        console.log("Error playing calling sound:", error);
      }
    }
  };

  return (
    <div className="p-8 flex flex-col items-center h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Phone number display */}
        <input
          type="tel"
          value={phoneNumber}
          className="w-full px-4 py-3 text-2xl text-center 
            bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary
            text-theme-light-text-primary dark:text-theme-dark-text-primary
            border border-theme-light-border-primary dark:border-theme-dark-border-primary
            rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          readOnly
        />
        
        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 justify-items-center">
          <DialerButton onClick={handleNumberClick}>1</DialerButton>
          <DialerButton onClick={handleNumberClick}>2</DialerButton>
          <DialerButton onClick={handleNumberClick}>3</DialerButton>
          <DialerButton onClick={handleNumberClick}>4</DialerButton>
          <DialerButton onClick={handleNumberClick}>5</DialerButton>
          <DialerButton onClick={handleNumberClick}>6</DialerButton>
          <DialerButton onClick={handleNumberClick}>7</DialerButton>
          <DialerButton onClick={handleNumberClick}>8</DialerButton>
          <DialerButton onClick={handleNumberClick}>9</DialerButton>
          <DialerButton onClick={handleNumberClick}>*</DialerButton>
          <DialerButton onClick={handleNumberClick}>0</DialerButton>
          <DialerButton onClick={handleNumberClick}>#</DialerButton>
        </div>

        {/* Action buttons */}
        <div className="relative h-14">
          {/* Delete button - positioned left */}
          <button 
            onClick={handleDelete}
            className="absolute left-5 
              w-20 h-16 rounded-full 
              flex items-center justify-center
              bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary
              text-theme-light-text-primary dark:text-theme-dark-text-primary
              hover:bg-theme-light-bg-tertiary dark:hover:bg-theme-dark-bg-tertiary
              transition-colors">
            <BackspaceIcon className="h-6 w-6" />
          </button>
          
          {/* Call button - centered */}
          <button 
            onClick={handleCall}
            disabled={phoneNumber.length === 0 || isDialing}
            className={`absolute left-1/2 -translate-x-1/2
              w-16 h-16 rounded-full 
              flex items-center justify-center
              ${isDialing 
                ? 'bg-red-500 hover:bg-red-600' 
                : phoneNumber.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark'
              }
              transition-colors`}>
            <PhoneIcon className={`h-7 w-7 text-white ${isDialing ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialer; 