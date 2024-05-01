export interface RecipesDTO {
    id?: number;
    name: string;
    cooking_time: string;
    cooking_time_type: number;
    description: string;
    preparation_time?: string;
    preparation_time_type?: number;
    difficulty_field:number;
    photo?: any;
}