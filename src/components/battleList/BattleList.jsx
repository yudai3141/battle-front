// src/components/battleList/BattleList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BattleList.css';
import { Link } from 'react-router-dom';

function BattleList() {
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const res = await axios.get('/battles');
        setBattles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBattles();
  }, []);

  return (
    <div className='battleList'>
      <h2>レスバトル一覧</h2>
      {battles.map((battle) => (
        <div className='battleItem' key={battle._id}>
          <Link to={`/battles/${battle._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='battleDetails'>
              <p>
                <strong>{battle.initiatorUsername}</strong> vs <strong>{battle.opponentUsername}</strong>
              </p>
              <p className='battleDate'>{new Date(battle.createdAt).toLocaleString()}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BattleList;