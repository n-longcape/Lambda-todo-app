/**
 * example:
 * [object Object]
 */
export interface InternalServerErrorResponse {
    message: string;
}
/**
 * example:
 * [object Object]
 */
export interface NotFoundResponse {
    message: string;
}
/**
 * example:
 * [object Object]
 */
export interface Todo {
    content: string;
    created_at?: number; // int64
    id: number; // int64
    title: string;
}
/**
 * example:
 * [object Object]
 */
export interface TodoRequest {
    content: string;
    title: string;
}
