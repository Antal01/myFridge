import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  ingredients: string = '';
  recipes: any[] = [];
  fridgeItems: any[] = [];
  sortCriteria: string = 'usedIngredientCount';
  sortOrder: string = 'asc';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchFridgeItems();
  }

  fetchFridgeItems(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('/api/fridgeItems', { headers })
      .subscribe((data: any) => {
        this.fridgeItems = data;
        const defaultSearchIngredients = this.fridgeItems.map(item => item.name).join(',');
        this.handleSearch(defaultSearchIngredients);
      }, error => {
        console.error(error);
      });
  }

  handleSort(sortOption: string): void {
    const [criteria, order] = sortOption.split('-');
    this.sortCriteria = criteria;
    this.sortOrder = order;
    this.sortRecipes();
  }

  sortRecipes(): void {
    this.recipes.sort((a, b) => {
      const aValue = a[this.sortCriteria];
      const bValue = b[this.sortCriteria];

      if (this.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  handleSearch(searchIngredients: string): void {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'ebc16a25f3mshed55b0ebde53939p1c4784jsnb35adfafdb2e',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    });

    const params = new HttpParams()
      .set('ingredients', searchIngredients)
      .set('number', '25')
      .set('ignorePantry', 'true')
      .set('ranking', '1');

    this.http.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', { headers, params })
      .subscribe((data: any) => {
        this.recipes = data;
        this.sortRecipes();
      }, error => {
        console.error(error);
      });
  }
}
