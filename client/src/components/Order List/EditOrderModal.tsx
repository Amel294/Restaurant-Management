// Path: client\src\components\Order List\EditOrderModal.tsx

import { Modal, Form, Input, Button, Select } from 'antd';

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

interface EditOrderModalProps {
    isVisible: boolean;
    onClose: () => void;
    order: Order | null;
    onEditOrder: ( order: Order ) => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ( { isVisible, onClose, order, onEditOrder } ) => {
    const [form] = Form.useForm();

    const handleFinish = ( values: Partial<Order> ) => {
        if ( order ) {
            onEditOrder( { ...order, ...values } );
        }
    };

    return (
        <Modal title="Edit Order" open={isVisible} onCancel={onClose} footer={null}>
            <Form
                form={form}
                layout="vertical"
                initialValues={order ?? {}}
                onFinish={handleFinish}
            >
                <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: 'Please enter the customer name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="location" label="Location">
                    <Input />
                </Form.Item>
                { }
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select a status' }]}>
                    <Select>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="approved">Approved</Select.Option>
                        <Select.Option value="delivered">Delivered</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditOrderModal;
