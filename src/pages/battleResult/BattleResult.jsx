import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BattleResult.css';

function BattleResult() {
  const { battleId } = useParams();
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`/battles/${battleId}/process`);
        setResult(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [battleId]);

  return (
    <div className='battleResultContainer'>
      <h2>バトル結果</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default BattleResult;