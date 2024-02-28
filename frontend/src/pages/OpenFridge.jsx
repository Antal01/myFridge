import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../design/OpenFridgeStyle.css';
import Button from 'react-bootstrap/Button';

const OpenFridge = () => {
    const [fridgeItems, setFridgeItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [showUpdateField, setShowUpdateField] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);

    useEffect(() => {
        fetchAllFridgeItems();
    }, []);

    const fetchAllFridgeItems = () => {
        axios
            .get('http://localhost:8080/api/fridgeitems')
            .then((response) => setFridgeItems(response.data))
            .catch((error) => console.error('Error fetching fridge items', error));
    };

    const handleAddItem = () => {
        axios
            .post('http://localhost:8080/api/addFridgeItem', {
                name: newItemName, quantity: newItemQuantity,
            })
            .then((response) => {
                setNewItemName('');
                setNewItemQuantity(1); // Reset quantity to 1 after adding the item
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

            axios
                .put('http://localhost:8080/api/update', updatedItem)
                .then((response) => {
                    setUpdatedItemName('');
                    setNewItemQuantity(1); // Reset quantity to 1 after updating the item
                    setShowUpdateField(false); // Hide the update field after confirmation
                    fetchAllFridgeItems();
                })
                .catch((error) => console.error('Error updating fridge item', error));
        } else {
            console.error('Selected item not found');
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdateField(false); // Hide the update field on cancel
    };

    const handleDeleteItem = (id) => {
        axios
            .delete(`http://localhost:8080/api/delete/${id}`)
            .then((response) => fetchAllFridgeItems())
            .catch((error) => console.error('Error deleting fridge item', error));
    };

    const filteredFridgeItems = fridgeItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="centered-card-container">
        <div className="centered-card">
            <h2 className="text-white">Fridge Management</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Item"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="item-list">
                <ul>
                    {filteredFridgeItems.map((item) => (<li key={item.id}>
                        {item.name} - Quantity: {item.quantity}
                        <div className="action-buttons">
                            <Button
                                variant="outline-info"
                                onClick={() => handleUpdateItem(item.id)}
                            >
                                Update Item
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                Delete
                            </Button>
                        </div>
                        {showUpdateField && selectedItemId === item.id && (<>
                            <input
                                type="text"
                                placeholder="New Name"
                                value={updatedItemName}
                                onChange={(e) => setUpdatedItemName(e.target.value)}
                                className="form-control"
                            />
                            <input
                                type="number"
                                placeholder="New Quantity"
                                value={newItemQuantity}
                                onChange={(e) => setNewItemQuantity(e.target.value)}
                                className="form-control"
                            />
                            <Button
                                variant="outline-success"
                                onClick={handleConfirmUpdate}
                            >
                                OK
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={handleCancelUpdate}
                            >
                                Cancel
                            </Button>
                        </>)}
                    </li>))}
                </ul>
            </div>
            <div className="add-item">
                <h3 className="text-white">Add New Item</h3>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="form-control"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    className="form-control"
                />
                <Button variant="outline-info" onClick={handleAddItem}>
                    Add Item
                </Button>
            </div>
        </div>
        </div>);
};

export default OpenFridge;
