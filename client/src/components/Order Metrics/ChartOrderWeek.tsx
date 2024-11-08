// Path: client\src\components\Order Metrics\ChartOrderWeek.tsx

import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sunday', value: 10 },
  { name: 'Monday', value: 15 },
  { name: 'Tuesday', value: 25 },
  { name: 'Wednesday', value: 18 },
  { name: 'Thursday', value: 22 },
  { name: 'Friday', value: 12 },
  { name: 'Saturday', value: 30 },
];

function ChartOrderWeek() {
  return (
    <div className="bg-white mt-10 p-3 rounded-xl">
      <div className="flex flex-row items-center justify-between pe-4 ps-4">
        <div className="flex justify-between w-full">
          <div>
            <div className="font-bold px-2">Chart Order</div>
            <div className="font-light opacity-70 px-2">Shows Order for this Week</div>
          </div>
          <div className="flex items-center gap-2 text-blue-500 border-2 px-4 py-2 rounded-xl border-blue-500">
            <Download />
            <button className="font-bold">Save report</button>
          </div>
        </div>
        <div className="flex gap-8 items-center"></div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Remove the left and bottom lines */}
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          {/* Hide Y-axis labels and axis line */}
          <YAxis axisLine={false} tickLine={false} tick={false} />
          {/* Tooltip for showing data on hover */}
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: '#ccc' }} // Highlight with a dashed line
            contentStyle={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '8px', padding: '10px' }}
          />
          {/* Remove the legend */}
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2B9BDA" // Blue color
            strokeWidth={4} // Increase line thickness
            dot={false} // Disable dots entirely
            activeDot={false} // Disable active dot on hover
            style={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))', // Add shadow effect
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartOrderWeek;
