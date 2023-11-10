export interface CategoryPage {
    items: Categorias[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
}

export interface Categorias {
    id: number;
    nome: string;
}