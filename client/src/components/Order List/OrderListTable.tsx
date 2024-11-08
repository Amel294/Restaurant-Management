// Path: client\src\components\Order List\OrderListTable.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Table, Spin, message, Button, Space, DatePicker, Select, Tag, Tooltip } from 'antd';
import { Edit, Trash } from 'lucide-react';
import EditOrderModal from './EditOrderModal';
import { useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
  
  const [orders, setOrders] = useState<Order[]>( [] );
  const [isLoading, setIsLoading] = useState( false );
  const [page, setPage] = useState( 1 );
  const [totalResults, setTotalResults] = useState( 0 );
  const [isEditModalVisible, setIsEditModalVisible] = useState( false );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>( null );

  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const searchQuery = searchParams.get('searchQuery') || ''; 
  const status = searchParams.get('status') || ''; 

  const fetchOrders = async () => {
    setIsLoading( true );
    try {
      const response = await axiosInstance.get( '/orders', {
        params: { page, startDate, endDate, searchText: searchQuery, status },
      });

      if ( response.status !== 200 ) {
        throw new Error( 'Failed to fetch orders: ' + response.statusText );
      }

      const responseData: OrderResponse = response.data;
      setOrders( responseData.orders );
      setTotalResults( responseData.totalResults );
    } catch ( err: unknown ) {
      if ( err instanceof Error ) {
        message.error( `Failed to load orders: ${ err.message }` );
      } else {
        message.error( 'An unknown error occurred.' );
      }
    } finally {
      setIsLoading( false );
    }
  };

  useEffect( () => {
    fetchOrders();
  }, [page, startDate, endDate, status]);

  const handlePageChange = ( newPage: number ) => {
    setPage( newPage );
  };

  const handleDelete = async ( orderId: string ) => {
    const updatedOrders = orders.filter( order => order.orderId !== orderId );
    setOrders( updatedOrders );

    try {
      await axiosInstance.delete( `/orders/${ orderId }` );
      message.success( 'Order deleted successfully' );
      setTotalResults( prevTotal => prevTotal - 1 );
      if ( updatedOrders.length === 0 && page > 1 ) {
        setPage( page - 1 );
      }
    } catch {
      message.error( 'Failed to delete order' );
      setOrders( orders ); 
    }
  };

  const handleEdit = ( order: Order ) => {
    setSelectedOrder( order );
    setIsEditModalVisible( true );
  };

  const handleEditOrder = async ( updatedOrder: Order ) => {
    try {
      await axiosInstance.put( `/orders/${ updatedOrder.orderId }`, updatedOrder );
      message.success( 'Order updated successfully' );
      setOrders( orders.map( order => ( order.orderId === updatedOrder.orderId ? updatedOrder : order ) ) );
    } catch {
      message.error( 'Failed to update order' );
    }
    setIsEditModalVisible( false );
  };

  const onDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if ( dates && dates[0] && dates[1] ) {
      const [start, end] = dateStrings;
      setSearchParams( { startDate: start, endDate: end } );
    } else {
      setSearchParams( {} );
    }
    setPage(1)
    fetchOrders();
  };

  const onSearchChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const query = e.target.value;
    setSearchParams( { searchQuery: query, startDate, endDate, status } );
  };

  const onSearchSubmit = () => {
    fetchOrders();
  };

  const onStatusChange = ( value: string ) => {
    setSearchParams( { searchQuery, startDate, endDate, status: value } );
    setPage( 1 )
    fetchOrders();
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: ( text: string ) => (
        <span style={{ fontWeight: 'bold' }} >
          {new Date( text ).toLocaleDateString() || 'N/A'}
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
      render: (status: string) => {
        let color = 'default'; 
        const displayStatus = status.charAt(0).toUpperCase() + status.slice(1); 
  
        if (status === 'approved') {
          color = 'green';
        } else if (status === 'delivered') {
          color = 'blue';
        } else if (status === 'pending') {
          color = 'orange';
        }
  
        return (
          <Tag color={color} key={status}>
            {displayStatus}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: ( _: unknown, record: Order ) => (
        <Space size="middle">
          <Button icon={<Edit />} onClick={() => handleEdit(record)} />
          <Button icon={<Trash />} danger onClick={() => handleDelete(record.orderId)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-10">
      {}
      <div className="flex items-center gap-1 md:gap-4 flex-col md:flex-row ">
        <div className="border-[1px] border-blue-500 p-3 inline-flex items-center gap-4 rounded-lg mb-4 max-w-72 lg:max-w-full">
          <span className="text-sm">Choose Date</span>
          <RangePicker
            value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
            onChange={onDateChange}
          />
        </div>
        <div className="border-[1px] border-blue-500 p-3 inline-flex items-center gap-4 rounded-lg mb-4 w-full md:w-min max-w-72">
          <div className='w-full'>Delivery Status</div>
          <Select
            value={status || 'any'}
            onChange={onStatusChange}
            style={{ width: 120 }}
          >
            <Option value="all">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="delivered">Delivered</Option>
          </Select>
        </div>
        <div className="border-[1px] border-blue-500 p-2 inline-flex items-center gap-4 rounded-lg mb-4 w-full max-w-72 ">
          <div className="flex items-center border-2 rounded-lg">
            <Tooltip placement="top" title='Search for customer name, product name, location, and order ID' className=''>

            <input
              type="text"
              className=" bg-white pl-2 text-base font-semibold outline-0"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search "
              />
            <input
              type="button"
              value="Search"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white hover:bg-blue-800 transition-colors"
              onClick={onSearchSubmit}
              />
              </Tooltip>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', overflowX: 'auto' }}>
        {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        <Table
          rowKey="orderId"
          columns={columns}
          dataSource={orders}
          pagination={{
            current: page,
            total: totalResults,
            pageSize: 10,
            onChange: handlePageChange,
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {}
      <EditOrderModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible( false )}
        order={selectedOrder}
        onEditOrder={handleEditOrder}
      />
    </div>
  );
}

export default OrdersListTable;
