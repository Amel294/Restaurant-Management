// Path: client\src\components\Order Metrics\PieChart.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PieChartProps {
  percentage: number;
  stroke: string
}

const PieChart = ({ percentage,stroke }: PieChartProps) => {
  const [progress, setProgress] = useState(0);
  const percentageRef = useRef(percentage);
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    percentageRef.current = Math.min(percentage, 100);
  }, [percentage]);

  useEffect(() => {
    const animate = () => {
      if (progress < percentageRef.current) {
        setProgress((prev) => Math.min(prev + 1, percentageRef.current));
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [progress]);

  const radius = 70; // Increased radius for larger size
  const strokeWidth = 20; // Stroke width for the pie chart
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <StyledPieChart>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`} preserveAspectRatio="xMidYMid meet">
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#ccc"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="percentage">{progress}%</div>
      <div className="label text-sm font-semibold">Total Order</div>
    </StyledPieChart>
  );
};

const StyledPieChart = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;  // Explicit width to control size
  height: 200px; // Explicit height to control size
  overflow: hidden;  // Prevent overflow

  .percentage {
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    z-index: 1;  // Ensure it is above the SVG
  }

  .label {
    margin-top: 10px;
    font-size: 16px;
  }
`;

export default PieChart;
