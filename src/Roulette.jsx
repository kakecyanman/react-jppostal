import React, { useState, useEffect } from "react";
import "./Roulette.css";

const Roulette = ({setPostalCode}) => {
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState([false, false, false, false, false, false, false]);

  useEffect(() => {
    const intervals = isSpinning.map((spin, index) => {
        if (!spin) {
          return null; // スピンが停止されたらnullを返す
        }
        return setInterval(() => {
          setNumbers((prevNumbers) =>
            prevNumbers.map((prevNumber, i) => (i === index ? (prevNumber + 1) % 10 : prevNumber))
          );
        }, 500); // 100msごとに数字を更新
    });
  
    return () => {
      intervals.forEach((interval) => interval && clearInterval(interval)); // インターバルをクリア
    };
  }, [isSpinning]);

  const startSpin = () => {
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
    if (numbers.length === 7) {
      setPostalCode(numbers.join(''));
      console.log(setPostalCode);
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
