import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEditoraComponent } from './editar-editora.component';

describe('EditarEditoraComponent', () => {
  let component: EditarEditoraComponent;
  let fixture: ComponentFixture<EditarEditoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEditoraComponent]
    });
    fixture = TestBed.createComponent(EditarEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
