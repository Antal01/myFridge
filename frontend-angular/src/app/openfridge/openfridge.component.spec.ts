import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenFridgeComponent } from './openfridge.component';

describe('OpenFridgeComponent', () => {
  let component: OpenFridgeComponent;
  let fixture: ComponentFixture<OpenFridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenFridgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
