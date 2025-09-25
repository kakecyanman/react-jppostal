import React, { useState } from 'react';
import "./Postal.css";

const Postal = ({ postalCode }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedPostalCode = postalCode.replace('-', '');
    console.log(sanitizedPostalCode);
    const endpoint = `https://jp-postal-code-api.ttskch.com/api/v1/${sanitizedPostalCode}.json`;
    setEndpoint(endpoint);
    try {
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
        setError(null);
      } else if (res.status === 404) {
        setResponse(null);
        setError('該当する住所が見つかりませんでした。');
      } else {
        setResponse(null);
        setError('エラーが発生しました。');
      }
    } catch (err) {
      setResponse(null);
      setError('エラーが発生しました。');
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <button type="submit" className='serch-btn'>Serch</button>
      </form>
      <div id="result" className={response || error ? '' : 'd-none'}>
        <a id="endpoint" href={endpoint}>エンドポイント：{endpoint}</a>
        <pre id="response">{response || error}</pre>
      </div>
    </div>
  );
};

export default Postal;