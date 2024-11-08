// Path: client\src\components\Order List\AddOrderModel.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, message, DatePicker, InputNumber, Select } from 'antd';
import axiosInstance from '../../api/axiosInstance';

const { Option } = Select;

interface AddOrderModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddOrder: (orderData: any) => void;  
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ isVisible, onClose, onAddOrder }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      
      const payload = {
        customerName: values.customerName,
        productName: values.productName,
        date: values.date.toISOString(),
        quantity: values.quantity,
        price: values.price,
        location: values.location,
        status: values.status || 'pending'
      };

      const response = await axiosInstance.post('/orders', payload); 
      message.success('Order added successfully');
      onAddOrder(response.data.order);  
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding order:', error);
      message.error('Failed to add order, please check the form');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Order"
      open={isVisible} // Change 'visible' to 'open'
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText="Add Order"
      cancelText="Cancel"
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: 'Please enter the customer name' }]}>
          <Input placeholder="Enter customer name" />
        </Form.Item>
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Order Date"
          rules={[{ required: true, message: 'Please select the order date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter the quantity' }]}>
          <InputNumber style={{ width: '100%' }} min={1} placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter the price' }]}>
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter the location' }]}>
          <Input placeholder="Enter location" />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select placeholder="Select status">
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="delivered">Delivered</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrderModal;
