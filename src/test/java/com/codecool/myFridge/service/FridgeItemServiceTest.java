package com.codecool.myFridge.service;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.repository.FridgeItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FridgeItemServiceTest {

    @Mock
    private FridgeItemRepository repository;

    @InjectMocks
    private FridgeItemService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveFridgeItem() {
        FridgeItem fridgeItem = new FridgeItem("Test Item", 5);
        when(repository.save(fridgeItem)).thenReturn(fridgeItem);

        FridgeItem savedItem = service.saveFridgeItem(fridgeItem);

        assertNotNull(savedItem);
        assertEquals("Test Item", savedItem.getName());
        assertEquals(5, savedItem.getQuantity());
        verify(repository, times(1)).save(fridgeItem);
    }

    @Test
    void saveFridgeItems() {
        List<FridgeItem> fridgeItems = new ArrayList<>();
        fridgeItems.add(new FridgeItem("Item 1", 3));
        fridgeItems.add(new FridgeItem("Item 2", 2));

        when(repository.saveAll(fridgeItems)).thenReturn(fridgeItems);

        List<FridgeItem> savedItems = service.saveFridgeItems(fridgeItems);

        assertNotNull(savedItems);
        assertEquals(2, savedItems.size());
        verify(repository, times(1)).saveAll(fridgeItems);
    }

    @Test
    void getFridgeItems() {
        List<FridgeItem> fridgeItems = new ArrayList<>();
        fridgeItems.add(new FridgeItem("Item 1", 3));
        fridgeItems.add(new FridgeItem("Item 2", 2));

        when(repository.findAll()).thenReturn(fridgeItems);

        List<FridgeItem> retrievedItems = service.getFridgeItems();

        assertNotNull(retrievedItems);
        assertEquals(2, retrievedItems.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void getFridgeItemById() {
        FridgeItem fridgeItem = new FridgeItem("Test Item", 5);
        when(repository.findById(1)).thenReturn(Optional.of(fridgeItem));

        FridgeItem retrievedItem = service.getFridgeItemById(1);

        assertNotNull(retrievedItem);
        assertEquals("Test Item", retrievedItem.getName());
        assertEquals(5, retrievedItem.getQuantity());
        verify(repository, times(1)).findById(1);
    }

    @Test
    void getFridgeItemByName() {
        FridgeItem fridgeItem = new FridgeItem("Test Item", 5);
        when(repository.findByName("Test Item")).thenReturn(fridgeItem);

        FridgeItem retrievedItem = service.getFridgeItemByName("Test Item");

        assertNotNull(retrievedItem);
        assertEquals("Test Item", retrievedItem.getName());
        assertEquals(5, retrievedItem.getQuantity());
        verify(repository, times(1)).findByName("Test Item");
    }

    @Test
    void deleteFridgeItem() {
        service.deleteFridgeItem(1);

        verify(repository, times(1)).deleteById(1);
    }

    @Test
    void updateFridgeItem() {
        FridgeItem fridgeItem = new FridgeItem("Test Item", 5);
        when(repository.findById(1)).thenReturn(Optional.of(fridgeItem));

        FridgeItem updatedItem = new FridgeItem("Updated Item", 10);
        updatedItem.setId(1);

        when(repository.save(fridgeItem)).thenReturn(updatedItem);

        FridgeItem result = service.updateFridgeItem(updatedItem);

        assertNotNull(result);
        assertEquals("Updated Item", result.getName());
        assertEquals(10, result.getQuantity());
        verify(repository, times(1)).save(fridgeItem);
    }

    @Test
    void getAllFridgeItems() {
        List<FridgeItem> fridgeItems = new ArrayList<>();
        fridgeItems.add(new FridgeItem("Item 1", 3));
        fridgeItems.add(new FridgeItem("Item 2", 2));

        when(repository.findAll()).thenReturn(fridgeItems);

        List<FridgeItem> retrievedItems = service.getAllFridgeItems();

        assertNotNull(retrievedItems);
        assertEquals(2, retrievedItems.size());
        verify(repository, times(1)).findAll();
    }
}
