// Login
import { LoginDTO } from "./request/login.dto";
import { RegisterParamsDTO } from './request/register.dto';

// Auth
import {
    CheckPermissionDTO
} from './request/auth.dto';

// Profile
import {
    UpdateUserDTO
} from './request/profile.dto';

// New Recipe

import { 
    RecipesDTO
} from './request/new-recipe.dto';


// Resources 

// Auth
import {
    User,
    GetUserDTO,
    ResetParamsDTO,
    GetAssociatedDTO,
    Associated,
    SelectDTO
} from './resources/auth.dto';


import {
    PaginationDTO,
    DataTableDTO
} from './resources/general.dto';

export {
    // Request
    LoginDTO,
    RegisterParamsDTO,
    CheckPermissionDTO,
    RecipesDTO,

    // Resources
    User,
    GetUserDTO,
    ResetParamsDTO,
    UpdateUserDTO,
    GetAssociatedDTO,
    Associated,
    SelectDTO,
    PaginationDTO,
    DataTableDTO,
};