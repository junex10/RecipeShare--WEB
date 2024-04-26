import { NewRecipeDTO } from "../dtos";

export interface IRECIPE {
    newRecipe(body: any): Promise<NewRecipeDTO>;
}