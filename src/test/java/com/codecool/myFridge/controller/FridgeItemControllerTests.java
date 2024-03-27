/*
package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.service.FridgeItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class FridgeItemControllerTests {

    private MockMvc mockMvc;

    @Mock
    private FridgeItemService fridgeItemService;

    @InjectMocks
    private FridgeItemController fridgeItemController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(fridgeItemController).build();
    }

    @Test
    public void testAddFridgeItem() throws Exception {
        FridgeItem fridgeItem = new FridgeItem("Test Item", 10);
        when(fridgeItemService.saveFridgeItem(any())).thenReturn(fridgeItem);
        mockMvc.perform(post("/api/addFridgeItem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"Test Item\", \"quantity\": 10 }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Item"))
                .andExpect(jsonPath("$.quantity").value(10));
    }

    @Test
    public void testFindAllFridgeItems() throws Exception {
        List<FridgeItem> fridgeItems = Arrays.asList(new FridgeItem("Item1", 5), new FridgeItem("Item2", 3));
        when(fridgeItemService.getFridgeItems()).thenReturn(fridgeItems);
        mockMvc.perform(get("/api/fridgeitems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Item1"))
                .andExpect(jsonPath("$[1].name").value("Item2"));
    }

    // Similarly, write tests for other controller methods like addFridgeItems, findFridgeItemById, findFridgeItemByName, updateFridgeItem, deleteFridgeItem, and getAllFridgeItems
}
*/
