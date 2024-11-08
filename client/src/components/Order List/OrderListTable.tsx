// Path: client\src\components\Order List\OrderListTable.tsx
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Table, Spin, message, Button, Space } from 'antd';
import { Edit, Trash } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch orders function to be reused
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
      
      console.log('Response:', response.data); // Log the full response to check structure

      if (response.status !== 200) {
        throw new Error('Failed to fetch orders: ' + response.statusText);
      }

      const responseData: OrderResponse = response.data;
      setOrders(responseData.orders); // Ensure responseData.orders is properly set
    } catch (err: any) {
      setError(err.message);
      message.error('Failed to load orders.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount and when page or limit changes
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleDelete = async (orderId: string) => {
  // Optimistic update: remove the order locally
  const updatedOrders = orders.filter(order => order.orderId !== orderId);
  setOrders(updatedOrders);

  try {
    await axiosInstance.delete(`/orders/${orderId}`);
    message.success('Order deleted successfully');

    // Update total results to reflect the deletion
    setTotalResults(prevTotal => prevTotal - 1);

    // Adjust the page if needed (e.g., if deleting the last item on a page)
    if (updatedOrders.length === 0 && page > 1) {
      setPage(page - 1); // Go to the previous page if no items remain on the current page
    }
  } catch (error) {
    message.error('Failed to delete order');
    // Revert the optimistic update if deletion fails
    setOrders(orders);
  }
};

  const handleEdit = (orderId: string) => {
    // You can navigate to an edit page or open a modal here
    console.log('Editing order:', orderId);
    // Navigate to the edit page (e.g., using React Router)
    // history.push(`/edit-order/${orderId}`);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => (
        <span style={{ fontWeight: 'bold' }}>
          {new Date(text).toLocaleDateString() || 'N/A'} {/* Fallback in case date is undefined */}
        </span>
      ),
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text: string) => text || 'N/A', // Fallback if orderId is undefined
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: string) => text || 'N/A', // Fallback if customerName is undefined
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => text || 'N/A', // Fallback if productName is undefined
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => text || 'N/A', // Fallback if price is undefined
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number) => text || 'N/A', // Fallback if quantity is undefined
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text: string) => text || 'N/A', // Fallback if location is undefined
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => text || 'N/A', // Fallback if status is undefined
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: Order) => (
        <Space size="middle">
          <Button
            icon={<Trash />}
            danger
            onClick={() => handleDelete(record.orderId)}
          />
          <Button
            icon={<Edit />}
            onClick={() => handleEdit(record.orderId)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className='p-10'>
      {isLoading ? (
        <Spin size="large" />
      ) : error ? (
        <p>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="orderId"
          loading={isLoading}
          bordered
          pagination={{
            current: page,
            total: orders.length,
            pageSize: limit,
            onChange: handlePageChange,
            onShowSizeChange: handleLimitChange,
          }}
        />
      )}
    </div>
  );
}

export default OrdersListTable;
