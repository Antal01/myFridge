package com.codecool.myFridge.controller;
import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.service.FridgeItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@WebMvcTest(FridgeItemController.class)
public class FridgeItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private FridgeItemService fridgeItemService;

    @InjectMocks
    private FridgeItemController fridgeItemController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddFridgeItem() throws Exception {
        FridgeItem fridgeItem = new FridgeItem(1, "Milk", 2, null);

        when(fridgeItemService.saveFridgeItem(any(FridgeItem.class))).thenReturn(fridgeItem);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/addFridgeItem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Milk\",\"quantity\":2}")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testFindAllFridgeItems() throws Exception {
        List<FridgeItem> fridgeItems = new ArrayList<>();
        fridgeItems.add(new FridgeItem(1, "Milk", 2, null));
        fridgeItems.add(new FridgeItem(2, "Eggs", 6, null));

        when(fridgeItemService.getFridgeItems()).thenReturn(fridgeItems);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/fridgeitems")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Milk"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Eggs"));
    }

}
