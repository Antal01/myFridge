import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

    return (<div>
        <h2>Fridge Management</h2>

        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="item-list">
            <ul>
                {filteredFridgeItems.map((item) => (<li key={item.id}>
                    {item.name} - Quantity: {item.quantity}
                    <div className="action-buttons">
                        <button onClick={() => handleUpdateItem(item.id)}>
                            Update Item
                        </button>
                        <button onClick={() => handleDeleteItem(item.id)}>
                            Delete
                        </button>
                    </div>
                    {showUpdateField && selectedItemId === item.id && (<>
                        <input
                            type="text"
                            placeholder="New Name"
                            value={updatedItemName}
                            onChange={(e) => setUpdatedItemName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="New Quantity"
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(e.target.value)}
                        />
                        <button onClick={handleConfirmUpdate}>OK</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </>)}
                </li>))}
            </ul>
        </div>
        <div className="add-item">
            <h3>Add New Item</h3>
            <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
            />
            <button onClick={handleAddItem}>Add Item</button>
        </div>
    </div>);
};

export default OpenFridge;
