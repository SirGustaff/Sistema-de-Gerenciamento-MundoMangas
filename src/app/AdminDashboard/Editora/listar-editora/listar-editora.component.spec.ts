import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEditoraComponent } from './listar-editora.component';

describe('ListarEditoraComponent', () => {
  let component: ListarEditoraComponent;
  let fixture: ComponentFixture<ListarEditoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEditoraComponent]
    });
    fixture = TestBed.createComponent(ListarEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
