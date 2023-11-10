export interface PublisherPage {
    items: Editoras[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
}

export interface Editoras {
    id: number;
    nome: string;
    uriFoto: string;
}