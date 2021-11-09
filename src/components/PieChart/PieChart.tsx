import { useMemo } from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from "recharts";

import "./styles.css";

export type PieChartDataType = { name: string; value: number };
type TooltipPropsType = {
  active?: boolean;
  payload?: any;
};

const COLORS = ["#5501FF", "#7734FF", "#9967FF", "#BB99FF", "#DDCCFF"];
const numberFormatter = new Intl.NumberFormat("en-US");

const CustomLegend = ({ data }: { data: PieChartDataType[] }) => (
  <ul className="custom-legend">
    {data.map(({ name, value }, index) => (
      <li key={`item-${index}`}>
        {name}: <b>${numberFormatter.format(value)}</b>
      </li>
    ))}
  </ul>
);

const CustomTooltip = ({ active, payload }: TooltipPropsType) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];

    return (
      <div className="custom-tooltip">
        <p>
          <i>Item name</i>: {name}
        </p>
        <p>
          <i>Item value</i>: <b>${numberFormatter.format(value)}</b>
        </p>
      </div>
    );
  }

  return null;
};

export default function PieChart({ data }: { data: PieChartDataType[] }) {
  const sortedData = useMemo(
    () => [...data].sort((a, b) => b.value - a.value),
    [data]
  );
  return (
    <div className="chart-wrapper">
      <h3>Pie chart:</h3>
      <div className="container">
        <RechartsPieChart className="chart" height={300} width={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={sortedData}
            cx="50%"
            cy="50%"
            fill="coral"
            outerRadius="90%"
            innerRadius="75%"
            paddingAngle={6}
            minAngle={10}
            cornerRadius={10}
          >
            {sortedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </RechartsPieChart>
        <CustomLegend data={sortedData} />
      </div>
    </div>
  );
}
