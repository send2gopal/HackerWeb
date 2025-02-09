/**
 * Interface representing a paged view model.
 * 
 * @template T - The type of the items in the results array.
 * 
 * @property {number} page - The current page number.
 * @property {number} size - The number of items per page.
 * @property {number} total - The total number of items.
 * @property {number} count - The number of items in the current page.
 * @property {T[]} results - The array of items in the current page.
 * @property {Record<string, unknown>} metadata - Additional metadata.
 * @property {any[]} errors - Array of errors.
 * @property {boolean} isPartialSuccess - Indicates if the operation was partially successful.
 */
export interface PagedViewModel<T> {
    page: number;
    size: number;
    total: number;
    count: number;
    results: T[];
    metadata: Record<string, unknown>;
    errors: any[];
    isPartialSuccess: boolean;
  }