import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-open-fridge',
  templateUrl: './openfridge.component.html',
  styleUrls: ['./openfridge.component.css']
})
export class OpenFridgeComponent implements OnInit {
  fridgeItems: any[] = [];
  newItemName: string = '';
  newItemQuantity: number | null = null;
  selectedItemId: number | null = null;
  updatedItemName: string = '';
  showUpdateField: boolean = false;
  searchTerm: string = '';
  member: any = null;
  filteredFridgeItems: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.fetchAllFridgeItems();
      this.fetchMember();
    }
  }

  fetchMember(): void {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    this.http.get<any>(`/api/member/${name}/fridgeId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .subscribe(response => {
        this.member = response;
      }, error => {
        console.error('Error fetching member:', error);
      });
  }

  fetchAllFridgeItems(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('/api/fridgeItems', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .subscribe(response => {
        this.fridgeItems = response;
        this.filteredFridgeItems = response;
      }, error => {
        console.error('Error fetching fridge items:', error);
      });
  }

  addFridgeItem(): void {
    const token = localStorage.getItem('token');
    this.http.post<any>('/api/fridgeItem', {
      name: this.newItemName,
      quantity: this.newItemQuantity,
      fridge: this.member.fridge,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .subscribe(response => {
        this.newItemName = '';
        this.newItemQuantity = null;
        this.fetchAllFridgeItems();
      }, error => {
        console.error('Error adding fridge item:', error);
      });
  }

  updateItem(item: any): void {
    this.selectedItemId = item.id;
    this.showUpdateField = true;
    this.updatedItemName = item.name;
    this.newItemQuantity = item.quantity;
  }

  confirmUpdate(): void {
    const token = localStorage.getItem('token');
    const updatedItem = {
      id: this.selectedItemId,
      name: this.updatedItemName,
      quantity: this.newItemQuantity
    };
    this.http.put<any>('/api/update', updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .subscribe(response => {
        this.showUpdateField = false;
        this.fetchAllFridgeItems();
      }, error => {
        console.error('Error updating fridge item:', error);
      });
  }

  cancelUpdate(): void {
    this.showUpdateField = false;
  }

  deleteFridgeItem(id: number): void {
    const token = localStorage.getItem('token');
    this.http.delete(`/api/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'text'
    })
      .subscribe(response => {
        if (response === `Item removed !${id}`) {
          this.fetchAllFridgeItems();
        } else {
          console.error('Unexpected response when deleting fridge item:', response);
        }
      }, error => {
        console.error('Error deleting fridge item:', error);
        console.log('Full error object:', error);
      });
  }

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredFridgeItems = this.fridgeItems;
    } else {
      this.filteredFridgeItems = this.fridgeItems.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
