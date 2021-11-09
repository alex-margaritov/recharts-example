import {
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar
} from "recharts";

const numberFormatter = new Intl.NumberFormat("en-US");

type BarChartDataType = { date: number; value: number };
type CustomTickPropsType = {
  x?: number;
  y?: number;
  payload?: any;
};
type TooltipPropsType = {
  active?: boolean;
  payload?: any;
};

const CustomLabel = ({ x, y, payload }: CustomTickPropsType) => {
  const date = new Date(payload?.value).toLocaleString("en-US", {
    month: "short",
    year: "2-digit"
  });

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        dx={-20}
        fill="#999999"
        fontSize={12}
        textRendering="uppercase"
      >
        {date.toUpperCase()}
      </text>
    </g>
  );
};

const CustomLegend = ({ data }: { data: BarChartDataType[] }) => (
  <ul className="custom-legend">
    {data.map(({ date, value }, index) => (
      <li key={`item-${index}`}>
        {new Date(date).toLocaleString("en-US", {
          month: "short",
          year: "2-digit"
        })}
        : <b>${numberFormatter.format(value)}</b>
      </li>
    ))}
  </ul>
);

const CustomTooltip = ({ active, payload }: TooltipPropsType) => {
  if (active && payload && payload.length) {
    const {
      payload: { date },
      value
    } = payload[0];

    return (
      <div className="custom-tooltip">
        <p>
          <i>Item name</i>:{" "}
          {new Date(date).toLocaleString("en-US", {
            month: "short",
            year: "2-digit"
          })}
        </p>
        <p>
          <i>Item value</i>: <b>${numberFormatter.format(value)}</b>
        </p>
      </div>
    );
  }

  return null;
};

export default function BarChart({ data }: { data: BarChartDataType[] }) {
  return (
    <div className="chart-wrapper">
      <h3>Bar chart:</h3>
      <div className="container">
        <RechartsBarChart
          width={800}
          height={336}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          barSize={12}
        >
          <XAxis
            tick={<CustomLabel />}
            dataKey="date"
            scale="point"
            padding={{ left: 6, right: 6 }}
            height={60}
          />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid vertical={false} stroke="#C4C4C4" />
          <Bar dataKey="value" fill="#5501FF" radius={3} />
        </RechartsBarChart>
        <CustomLegend data={data} />
      </div>
    </div>
  );
}
