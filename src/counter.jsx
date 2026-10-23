import React, { useState, useEffect } from 'react';
import './counter.css';
import christmasTreeImage from './assets/christmas-tree.png';



const Counter = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isCompleted, setIsCompleted] = useState(false);

  // Задаем целевую дату и время здесь 
  const targetDate = '2027-01-01T00:00:00'; // Формат: YYYY-MM-DDTHH:mm:ss

  // Функция для вычисления оставшегося времени
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      setIsCompleted(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  // Функция для форматирования чисел с ведущим нулем
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  useEffect(() => {
    // Устанавливаем начальное значение
    setTimeLeft(calculateTimeLeft());

    // Запускаем таймер
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Очищаем интервал при размонтировании
    return () => clearInterval(timer);
  }, []);

  // Если время вышло, показываем анимацию
  if (isCompleted) {
    return (
      <div className="completion-animation">
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        
        <div className="celebration-text">
          <h1>🎉 С Новым Годом! 🎉</h1>
          <p>Пусть сбудутся все ваши мечты!</p>
        </div>
        
        <div className="fireworks">
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>

        
        <div className="tree-image-container">
          <img 
            src={christmasTreeImage} 
            alt="Новогодняя ёлка" 
            className="christmas-tree-image"
          />
         
        </div>
      </div>
    );
  }

  // Показываем таймер с изображением ёлки
  return (
    <div className="counter">
      <div className="counter__title">
        <h2>До Нового Года осталось:</h2>
      </div>

      <div className="timer">
        <div className="timer__item timer__days">
          {formatTime(timeLeft.days)}
          <span className="timer__label">дней</span>
        </div>
        <div className="separator">:</div>
        <div className="timer__item timer__hours">
          {formatTime(timeLeft.hours)}
          <span className="timer__label">часов</span>
        </div>
        <div className="separator">:</div>
        <div className="timer__item timer__minutes">
          {formatTime(timeLeft.minutes)}
          <span className="timer__label">минут</span>
        </div>
        <div className="separator">:</div>
        <div className="timer__item timer__seconds">
          {formatTime(timeLeft.seconds)}
          <span className="timer__label">секунд</span>
        </div>
      </div>


      <div className="tree-image-container">
        <img 
          src={christmasTreeImage} 
          alt="Новогодняя ёлка" 
          className="christmas-tree-image"
        />
       
      </div>
    </div>
  );
};

export default Counter;