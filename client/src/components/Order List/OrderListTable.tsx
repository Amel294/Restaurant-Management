// Path: client\src\components\Order List\OrderListTable.tsx
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Table, Spin, message, Button, Space, DatePicker } from 'antd';
import { Edit, Trash } from 'lucide-react';
import EditOrderModal from './EditOrderModal';

const { RangePicker } = DatePicker;

interface Order {
  orderId: string;
  customerName: string;
  productName: string;
  date: string;
  quantity: number;
  price: number;
  location: string;
  status: string;
}

interface OrderResponse {
  orders: Order[];
  totalResults: number;
}

function OrdersListTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`/orders?page=${page}`, {
        params: { startDate, endDate },
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch orders: ' + response.statusText);
      }

      const responseData: OrderResponse = response.data;
      setOrders(responseData.orders);
      setTotalResults(responseData.totalResults);
    } catch (err: unknown) {
      if (err instanceof Error) {
        message.error(`Failed to load orders: ${err.message}`);
      } else {
        message.error('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, startDate, endDate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = async (orderId: string) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);

    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      message.success('Order deleted successfully');
      setTotalResults(prevTotal => prevTotal - 1);
      if (updatedOrders.length === 0 && page > 1) {
        setPage(page - 1);
      }
    } catch {
      message.error('Failed to delete order');
      setOrders(orders);
    }
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalVisible(true);
  };

  const handleEditOrder = async (updatedOrder: Order) => {
    try {
      await axiosInstance.put(`/orders/${updatedOrder.orderId}`, updatedOrder);
      message.success('Order updated successfully');
      setOrders(orders.map(order => (order.orderId === updatedOrder.orderId ? updatedOrder : order)));
    } catch {
      message.error('Failed to update order');
    }
    setIsEditModalVisible(false);
  };

  const onDateChange = (dates: any, dateStrings: [string, string]) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => (
        <span style={{ fontWeight: 'bold' }}>
          {new Date(text).toLocaleDateString() || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: unknown, record: Order) => (
        <Space size="middle">
          <Button icon={<Edit />} onClick={() => handleEdit(record)} />
          <Button icon={<Trash />} danger onClick={() => handleDelete(record.orderId)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-10">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="border-[1px] border-blue-500 p-2 inline-flex items-center gap-4 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Choose Date</span>
              <RangePicker onChange={onDateChange} />
            </div>
            <Button type="primary" className="ml-auto" onClick={() => fetchOrders()}>
              Search
            </Button>
          </div>

          <Table
            dataSource={orders}
            columns={columns}
            rowKey="orderId"
            pagination={{
              current: page,
              total: totalResults,
              pageSize: 10,
              onChange: handlePageChange,
            }}
          />
        </>
      )}
      <EditOrderModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        order={selectedOrder}
        onEditOrder={handleEditOrder}
      />
    </div>
  );
}

export default OrdersListTable;
