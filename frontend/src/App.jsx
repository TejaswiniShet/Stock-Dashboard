import React, { useState, useEffect } from 'react';
import { fetchStockData } from './api.js';
import Dashboard from './components/Dashboard';
import PriceChart from './components/PriceChart';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1mo');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [exchangeRate, setExchangeRate] = useState(83); // Default to 83 if API fails

  // Fetch exchange rate on mount and refresh every hour
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        setExchangeRate(data.rates.INR);
      } catch (err) {
        console.error('Failed to fetch exchange rate:', err);
        // Fallback to 83 if API fails
      }
    };
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!symbol) return;
    const load = async () => {
      try {
        setError(null);
        const res = await fetchStockData(symbol, period);
        setData(res);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };
    load();
  }, [symbol, period]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
        color: theme === 'light' ? '#333' : '#e0e0e0',
        fontFamily: 'Arial',
        padding: '2rem',
        transition: 'all 0.3s',
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: theme === 'light' ? '#007bff' : '#4da8ff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
        }}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const val = e.target.elements.symbol.value.toUpperCase();
            setSymbol(val);
          }}
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <input
            name="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock Symbol"
            style={{
              padding: '0.5rem',
              width: '300px',
              border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
              backgroundColor: theme === 'light' ? '#fff' : '#333',
              color: theme === 'light' ? '#333' : '#e0e0e0',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>
      </div>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}
      {data && (
        <Dashboard
          data={data}
          chart={<PriceChart data={data.chartData} period={period} setPeriod={setPeriod} theme={theme} exchangeRate={exchangeRate} />}
          theme={theme}
          exchangeRate={exchangeRate}
        />
      )}
    </div>
  );
};

export default App;