import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const PriceChart = ({ data, period, setPeriod, theme, exchangeRate }) => {
  if (!data || data.length === 0) return <p>No chart data available</p>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatPrice = (value) => {
    const inr = value * exchangeRate; // Convert USD to INR using dynamic rate
    return `₹${inr.toFixed(2)}`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
        }}
      >
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#333' : '#e0e0e0',
            borderRadius: '4px',
          }}
        >
          <option value="1mo">1 Month</option>
          <option value="6mo">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="5y">5 Years</option>
        </select>
      </div>
      <h4 style={{ marginBottom: '1rem', color: theme === 'light' ? '#333' : '#e0e0e0' }}>
        Price Chart
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            stroke={theme === 'light' ? '#e0e0e0' : '#444'}
            strokeDasharray="5 5"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke={theme === 'light' ? '#333' : '#e0e0e0'}
            tick={{ fontSize: 12, fill: theme === 'light' ? '#333' : '#e0e0e0' }}
          />
          <YAxis
            domain={['dataMin - 5', 'dataMax + 5']}
            stroke={theme === 'light' ? '#333' : '#e0e0e0'}
            tick={{ fontSize: 12, fill: theme === 'light' ? '#333' : '#e0e0e0' }}
            tickFormatter={formatPrice}
          />
          <Tooltip
            formatter={(value) => [formatPrice(value), 'Price']}
            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US')}
            contentStyle={{
              backgroundColor: theme === 'light' ? '#fff' : '#333',
              border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
              color: theme === 'light' ? '#333' : '#e0e0e0',
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#007bff"
            strokeWidth={2}
            dot={false}
            name="Closing Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;