// Path: client\src\components\Order Metrics\PieChartCard.tsx

import { EllipsisVertical } from "lucide-react";
import PieChart from "./PieChart";
import styled from "styled-components";

function PieChartCard() {
  return (
    <div className="bg-white mt-10 p-3 rounded-xl">
      <div className="flex flex-row items-center justify-between pe-4 ps-4">
        <div className="font-bold px-2">Pie Chart</div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-4">
            <label className="cursor-pointer flex gap-2 items-center">
              <Checkbox type="radio" name="payment" />
              <h2 className="text-lg">Chart</h2>
            </label>
            <label className="cursor-pointer flex gap-2 items-center">
              <Checkbox type="radio" name="payment" />
              <h2 className="text-lg">Chart</h2>
            </label>
          </div>
          <EllipsisVertical size={20} />
        </div>
      </div>
      <div className="flex justify-between pt-3">
        <PieChart percentage={81} stroke="#fd5b59" />
        <PieChart percentage={22} stroke="#00b072" />
        <PieChart percentage={62} stroke="#2B9BDA" />
      </div>
    </div>
  );
}

const Checkbox = styled.input`
  height: 20px;
  width: 20px;
  border: 2px solid #fd5b59;
  border-radius: 4px; 
  appearance: none;
  cursor: pointer;
  position: relative;
  
  &:checked {
    background-color: #fd5b59;
    border-color: #fd5b59;
  }

  &:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 3px; 
  }

  &:hover {
    border-radius: 6px;
    border-color: #fd5b59;
  }
`;

export default PieChartCard;
