import React, { useState, useEffect } from "react";
import "./Roulette.css";

const Roulette = () => {
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState([true, true, true, true, true, true, true]);

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

    const stopSpin = (index) => {
        setIsSpinning((prevIsSpinning) => {
            const newIsSpinning = [...prevIsSpinning];
            newIsSpinning[index] = false; // スピンを停止
            return newIsSpinning;
        });
  };

  return (
    <div class="warap">
      <div class="roulette-mark">
        <div class="postal-mark">〒</div>
      </div>
      {numbers.map((number, index) => (
            <div key={index} class="roulette">
                <div class="number">{number}</div>
                <button onClick={() => stopSpin(index)}>Stop</button>
            </div>
        ))}
    </div>
  );
};

export default Roulette;
