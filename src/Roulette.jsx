import React, { useState, useEffect } from "react";
import "./Roulette.css";

const Roulette = ({setPostalCode}) => {
  const [postalCodes, setPostalCodes] = useState([]);
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState([false, false, false, false, false, false, false]);

  useEffect(() => {
    const fetchPostalCodes = async () => {
      try {
        const response = await fetch('/postalCodes.json');
        const data = await response.json();
        setPostalCodes(data);
      } catch (error) {
        console.error('Error fetching postal codes:', error);
      }
    };

    fetchPostalCodes();
  }, []);

  useEffect(() => {
    const intervals = isSpinning.map((spin, index) => {
        if (!spin) {
          return null; // スピンが停止されたらnullを返す
        }
        return setInterval(() => {
          setNumbers((prevNumbers) =>
            prevNumbers.map((prevNumber, i) => (i === index ? (prevNumber + 1) % 10 : prevNumber))
          );
        }, 100); // 100msごとに数字を更新
    });
  
    return () => {
      intervals.forEach((interval) => interval && clearInterval(interval)); // インターバルをクリア
    };
  }, [isSpinning]);

  const startSpin = () => {
    if (postalCodes.length === 0) return;
    setIsSpinning([true, true, true, true, true, true, true]); // 全てのスロットのスピンを開始
  };

  const stopSpin = (index) => {
      setIsSpinning((prevIsSpinning) => {
          const newIsSpinning = [...prevIsSpinning];
          newIsSpinning[index] = false; // スピンを停止
          return newIsSpinning;
      });
  };

  const handleStop = (index) => {
    stopSpin(index);
    console.log(numbers)
    // すべてのスロットが停止したかどうかを確認
    if (isSpinning.every((spin, i) => !spin || i === index)) {
      const currentNumbers = numbers.map((num, i) => (i === index ? Math.floor(Math.random() * 10) : num));
      console.log("currentNumbers: ",currentNumbers);
      const possiblePostalCodes = postalCodes.filter(code => {
        return code.startsWith(currentNumbers.join('').slice(0, index + 1));
      });
      console.log(possiblePostalCodes);
      if (possiblePostalCodes.length > 0) {
        const selectedPostalCode = possiblePostalCodes[Math.floor(Math.random() * possiblePostalCodes.length)];
        setNumbers(selectedPostalCode.split('').map(Number));
        setPostalCode(selectedPostalCode);
      }
    }
  };

  return (
    <div className="warap">
      <div className="control-panel">
        <div className="roulette-mark">
          <div className="postal-mark">〒</div>
        </div>
        <button onClick={startSpin} className="btn start-btn">Start</button>
      </div>
      {numbers.map((number, index) => (
        <div key={index}>
          <div className="roulette">
            <div className="number">{number}</div>
          </div>
          <button onClick={() => handleStop(index)} className="btn stop-btn">Stop</button>
        </div>
      ))}
    </div>
  );
};

export default Roulette;
