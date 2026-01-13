export interface Category {
    _id?: string;
    name: string;
}

export function getCategoryByName(name: string): string {
    return name.toUpperCase().replace(/\s+/g, '_');
}