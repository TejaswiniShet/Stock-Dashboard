from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/stock/<symbol>')
def stock(symbol):
    try:
        period = request.args.get('period', '1mo')
        valid_periods = ['1mo', '6mo', '1y', '5y']
        if period not in valid_periods:
            return jsonify({"error": "Invalid period. Use: 1mo, 6mo, 1y, 5y"}), 400

        ticker = yf.Ticker(symbol)
        info = ticker.info
        balance_sheet = ticker.balance_sheet
        latest_balance = balance_sheet.iloc[:, 0] if not balance_sheet.empty else {}

        hist = ticker.history(period=period, interval="1d")
        chart_data = [
            {"date": str(date.date()), "price": float(row['Close'])}
            for date, row in hist.iterrows()
        ]

        data = {
            "name": info.get("shortName", "N/A"),
            "symbol": info.get("symbol", "N/A"),
            "price": info.get("regularMarketPrice", "N/A"),
            "change": f"{info.get('regularMarketChange', 'N/A')} ({info.get('regularMarketChangePercent', 'N/A')}%)",
            "volume": info.get("volume", "N/A"),
            "marketCap": info.get("marketCap", "N/A"),
            "sector": info.get("sector", "N/A"),
            "peRatio": info.get("trailingPE", "N/A"),
            "dividendYield": info.get("dividendYield", "N/A"),
            "beta": info.get("beta", "N/A"),
            "totalRevenue": info.get("totalRevenue", "N/A"),
            "grossProfit": info.get("grossProfits", "N/A"),
            "operatingIncome": info.get("operatingIncome", "N/A"),
            "netIncome": info.get("netIncomeToCommon", "N/A"),
            "totalAssets": latest_balance.get("Total Assets", "N/A"),
            "totalLiabilities": latest_balance.get("Total Liabilities Net Minority Interest", "N/A"),
            "totalEquity": latest_balance.get("Stockholders Equity", "N/A"),
            "cash": latest_balance.get("Cash And Cash Equivalents", "N/A"),
            "chartData": chart_data
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
