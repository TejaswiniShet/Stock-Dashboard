import React from 'react';

const formatNumber = (n, exchangeRate) => {
  if (!n || n === 'N/A') return 'N/A';
  if (typeof n !== 'number') return n;

  const inr = n * exchangeRate; // Convert USD to INR using dynamic rate
  if (inr >= 1_000_000_000) {
    return `₹${(inr / 1_000_000_000).toFixed(2)} B`;
  } else if (inr >= 1_000_000) {
    return `₹${(inr / 1_000_000).toFixed(2)} M`;
  }
  return `₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

const Dashboard = ({ data, chart, theme, exchangeRate }) => (
  <div
    style={{
      padding: '1rem',
      backgroundColor: theme === 'light' ? '#fff' : '#2a2a2a',
      borderRadius: '8px',
      boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.5)',
      color: theme === 'light' ? '#333' : '#e0e0e0',
      border: '1px solid #ccc',
    }}
  >
    <div style={{ textAlign: 'left', marginBottom: '1rem', padding: '0.5rem' }}>
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{data.name}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem 0' }}>{formatNumber(data.price, exchangeRate)}</p>
          <p style={{ margin: '0', color: data.change && data.change.includes('-') ? 'red' : 'green' }}>
            {data.change}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginLeft: '1rem' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>Volume</p>
            <p style={{ margin: '0' }}>{formatNumber(data.volume, exchangeRate)}</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>Market Cap</p>
            <p style={{ margin: '0' }}>{formatNumber(data.marketCap, exchangeRate)}</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>Sector</p>
            <p style={{ margin: '0' }}>{data.sector}</p>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
      <div
        style={{
          flex: 1,
          border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
          padding: '1rem',
          borderRadius: '4px',
          backgroundColor: theme === 'light' ? '#fafafa' : '#333',
        }}
      >
        <h4>Key Ratios</h4>
        <p>P/E Ratio: {data.peRatio || 'N/A'}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Dividend Yield: {data.dividendYield || 'N/A'}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Beta: {data.beta || 'N/A'}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
      </div>

      <div
        style={{
          flex: 2,
          border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
          padding: '1rem',
          borderRadius: '4px',
          backgroundColor: theme === 'light' ? '#fafafa' : '#333',
        }}
      >
        {chart}
      </div>
    </div>

    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      <div
        style={{
          flex: 1,
          border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
          padding: '1rem',
          borderRadius: '4px',
          backgroundColor: theme === 'light' ? '#fafafa' : '#333',
        }}
      >
        <h4>Income Statement</h4>
        <p>Total Revenue: {formatNumber(data.totalRevenue, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Gross Profit: {formatNumber(data.grossProfit, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Operating Income: {formatNumber(data.operatingIncome, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Net Income: {formatNumber(data.netIncome, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
      </div>
      <div
        style={{
          flex: 1,
          border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
          padding: '1rem',
          borderRadius: '4px',
          backgroundColor: theme === 'light' ? '#fafafa' : '#333',
        }}
      >
        <h4>Balance Sheet</h4>
        <p>Total Assets: {formatNumber(data.totalAssets, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Total Liabilities: {formatNumber(data.totalLiabilities, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Total Equity: {formatNumber(data.totalEquity, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
        <p>Cash and Equivalents: {formatNumber(data.cash, exchangeRate)}<hr style={{ margin: '0.5rem 0', borderColor: theme === 'light' ? '#ccc' : '#555' }} /></p>
      </div>
    </div>
  </div>
);

export default Dashboard;
