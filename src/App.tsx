import PieChart, { PieChartDataType } from "./components/PieChart";
import BarChart from "./components/BarChart";

import "./styles.css";

const pieChartData: PieChartDataType[] = [
  { name: "Client expenses", value: 5000 },
  { name: "Travel budget", value: 100000 },
  { name: "Dinners", value: 1000 },
  { name: "Mail", value: 500 },
  { name: "Organization", value: 2000 }
];

const barChartData = [
  { date: +new Date(2021, 0, 14), value: 5000 },
  { date: +new Date(2021, 2, 15), value: 10000 },
  { date: +new Date(2021, 4, 16), value: 1000 },
  { date: +new Date(2021, 6, 18), value: 500 },
  { date: +new Date(2021, 8, 20), value: 2000 }
];

export default function App() {
  return (
    <div className="App">
      <h1>Recharts example:</h1>
      <PieChart data={pieChartData} />
      <br />
      <BarChart data={barChartData} />
    </div>
  );
}
