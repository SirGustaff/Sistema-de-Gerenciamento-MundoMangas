import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEditoraComponent } from './adicionar-editora.component';

describe('AdicionarEditoraComponent', () => {
  let component: AdicionarEditoraComponent;
  let fixture: ComponentFixture<AdicionarEditoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarEditoraComponent]
    });
    fixture = TestBed.createComponent(AdicionarEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
