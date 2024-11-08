// Path: client\src\components\Order Metrics\PieChartCard.tsx

import { EllipsisVertical } from "lucide-react";
import PieChart from "./PieChart";
import styled from "styled-components";

function PieChartCard() {
  return (
    <div className="bg-white mt-10 p-4 rounded-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <div className="font-bold">Pie Chart</div>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex gap-4">
            <label className="cursor-pointer flex gap-2 items-center">
              <Checkbox type="radio" name="payment" />
              <h2 className="text-lg">Chart 1</h2>
            </label>
            <label className="cursor-pointer flex gap-2 items-center">
              <Checkbox type="radio" name="payment" />
              <h2 className="text-lg">Chart 2</h2>
            </label>
          </div>
          <EllipsisVertical size={20} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center md:justify-between  px-10 gap-4 pt-5 w-full">
      <PieChart percentage={81} stroke="#fd5b59" label="Total Orders" />  {/* Add label prop */}
        <PieChart percentage={22} stroke="#00b072" label="Order Growth" />  {/* Add label prop */}
        <PieChart percentage={62} stroke="#2B9BDA" label="Total Revenue" /> 
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
    content: '';
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
    border-color: #fd5b59;
  }
`;

export default PieChartCard;
