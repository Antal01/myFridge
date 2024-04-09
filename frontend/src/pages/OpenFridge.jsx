import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';
import {useAuth} from "../components/AuthContext.jsx";

const OpenFridge = () => {
    const [fridgeItems, setFridgeItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [showUpdateField, setShowUpdateField] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const { logout } = useAuth();

    useEffect(() => {
        fetchAllFridgeItems();
    }, []);

    const fetchAllFridgeItems = () => {
        const token = localStorage.getItem('token');
        axios
            .get('/api/fridgeitems', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setFridgeItems(response.data))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                console.error('Error fetching fridge items', error);
            });
    };

    const handleAddItem = () => {
        const token = localStorage.getItem('token');
        axios
            .post(
                '/api/addFridgeItem',
                {
                    name: newItemName,
                    quantity: newItemQuantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setNewItemName('');
                setNewItemQuantity(1);
                fetchAllFridgeItems();
            })
            .catch((error) => console.error('Error adding fridge item', error));
    };

    const handleUpdateItem = (id) => {
        setSelectedItemId(id);
        setShowUpdateField(true);
    };

    const handleConfirmUpdate = () => {
        const selectedItem = fridgeItems.find((item) => item.id === selectedItemId);

        if (selectedItem) {
            const updatedItem = {
                id: selectedItem.id,
                name: updatedItemName || selectedItem.name,
                quantity: newItemQuantity || selectedItem.quantity,
            };

            const token = localStorage.getItem('token');
            axios
                .put('/api/update', updatedItem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUpdatedItemName('');
                    setNewItemQuantity(1);
                    setShowUpdateField(false);
                    fetchAllFridgeItems();
                })
                .catch((error) => console.error('Error updating fridge item', error));
        } else {
            console.error('Selected item not found');
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdateField(false);
    };

    const handleDeleteItem = (id) => {
        const token = localStorage.getItem('token');
        axios
            .delete(`/api/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => fetchAllFridgeItems())
            .catch((error) => console.error('Error deleting fridge item', error));
    };

    const filteredFridgeItems = fridgeItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="p-3 mt-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <h2 className="text-center mb-4" style={{ color: '#007bff' }}>
                Fridge Management
            </h2>

            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Search Item"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredFridgeItems.map((item) => (
                    <Col key={item.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <h5 style={{ color: '#343a40' }}>{item.name}</h5>
                                <p style={{ color: '#6c757d' }}>Quantity: {item.quantity}</p>
                                <div className="d-flex justify-content-between">
                                    <Button variant="info" onClick={() => handleUpdateItem(item.id)}>
                                        Update Item
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                        {showUpdateField && selectedItemId === item.id && (
                            <Card className="mt-2">
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="New Name"
                                            value={updatedItemName}
                                            onChange={(e) => setUpdatedItemName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="number"
                                            placeholder="New Quantity"
                                            value={newItemQuantity}
                                            onChange={(e) => setNewItemQuantity(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="success" onClick={handleConfirmUpdate}>
                                            OK
                                        </Button>
                                        <Button variant="secondary" className="ms-2" onClick={handleCancelUpdate}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                ))}
            </Row>

            <div className="mt-4">
                <h3 style={{ color: '#007bff' }}>Add New Item</h3>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Item Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        type="number"
                        placeholder="Quantity"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                    />
                </InputGroup>
                <Button variant="info" onClick={handleAddItem}>
                    Add Item
                </Button>
            </div>
        </Container>
    );
};

export default OpenFridge;
