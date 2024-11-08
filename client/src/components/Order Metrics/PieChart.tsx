// Path: client\src\components\Order Metrics\PieChart.tsx

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

interface PieChartProps {
  percentage: number;
  stroke: string;
  label :string;
}

const PieChartComponent = ({ percentage, stroke,label }: PieChartProps) => {
  const data = [
    { name: 'Growth', value: percentage },
    { name: 'Potential', value: 100 - percentage },
  ];

  const COLORS = [stroke, '#ccc']; 

  return (
    <StyledPieChart>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80} 
            fill={stroke}
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="percentage">{percentage}%</div>
      <div className="label text-sm font-semibold">{label}</div>
    </StyledPieChart>
  );
};

const StyledPieChart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 160px; 
  height: auto;
  overflow: hidden;

  .percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.25rem;
    font-weight: bold;
    z-index: 1;
  }

  .label {
    margin-top: 10px;
    font-size: 0.875rem;
    text-align: center;
  }
`;

export default PieChartComponent;
