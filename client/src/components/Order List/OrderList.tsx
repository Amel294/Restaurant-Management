// Path: client\src\components\Order List\OrderList.tsx
import { ListPlus } from "lucide-react"
import OrdersListTable from "./OrderListTable"
import { useState } from "react";
import AddOrderModal from "./AddOrderModel";
function OrderList() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
  
    const handleAddOrder = (orderData: { customerName: string; orderDetails: string }) => {
      console.log('Order Data:', orderData);
      // Handle adding order to the backend or state here
    };
    return (
        <div className="bg-white py-5 mt-10  rounded-xl">
            <div className="flex justify-between pe-10 items-center pt-3">
                <div className="text-md font-bold ps-10">Order List</div>
                <button className="p-2 bg-green-100 rounded-lg text-green-700 flex gap-2" onClick={showModal}><ListPlus /> Add Orders</button>
                <AddOrderModal isVisible={isModalVisible} onClose={closeModal} onAddOrder={handleAddOrder} />

            </div>
            <OrdersListTable />
        </div>
    )
}
export default OrderList