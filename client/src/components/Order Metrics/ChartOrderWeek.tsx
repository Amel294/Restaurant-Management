// Path: client\src\components\Order Metrics\ChartOrderWeek.tsx
import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Sun', value: 10 },
  { name: 'Mon', value: 15 },
  { name: 'Tue', value: 25 },
  { name: 'Wed', value: 18 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 12 },
  { name: 'Sat', value: 30 },
];

function ChartOrderWeek() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add event listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Set to true if window width is smaller than 640px (mobile screen)
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on first render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const abbreviatedData = data.map(item => ({
    ...item,
    name: item.name.slice(0, 1), // Abbreviate the day name to the first letter
  }));

  return (
    <div className="bg-white mt-10 p-3 rounded-xl ">
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

      <div className='flex items-center w-full pe-10'>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={isMobile ? abbreviatedData : data} // Use abbreviated data on small screens
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 10,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: '#ccc' }}
            contentStyle={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '8px', padding: '10px' }}
            />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2B9BDA"
            strokeWidth={4}
            dot={false}
            activeDot={false}
            style={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))',
            }}
            />
        </LineChart>
      </ResponsiveContainer>
            </div>
    </div>
  );
}

export default ChartOrderWeek;
