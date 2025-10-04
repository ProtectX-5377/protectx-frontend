import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of categories.
 */
export interface UsersResponse extends BaseResponse {
  /**
   * The list of categories returned by the API.
   */
  users: UserResource[];
}

/**
 * Represents the API resource/DTO for a category.
 */
export interface UserResource extends BaseResource {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  
}

