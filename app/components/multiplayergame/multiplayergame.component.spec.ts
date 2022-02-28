import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayergameComponent } from './multiplayergame.component';

describe('MultiplayergameComponent', () => {
  let component: MultiplayergameComponent;
  let fixture: ComponentFixture<MultiplayergameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayergameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
