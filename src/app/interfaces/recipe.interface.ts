import { RecipesDTO } from "../dtos";

export interface IRECIPE {
    newRecipe(body: any): Promise<RecipesDTO>;
    getRecipe(body: any): Promise<any>;
    removeRecipe(body: any): Promise<any>;
    updateRecipe(body: any): Promise<any>;
}