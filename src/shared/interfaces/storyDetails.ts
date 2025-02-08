/**
 * Interface representing the details of a story.
 * 
 * @property {number} id - The unique identifier of the story.
 * @property {string} by - The author of the story.
 * @property {number} descendants - The number of comments on the story.
 * @property {number} score - The score of the story.
 * @property {string} time - The time the story was created.
 * @property {string} title - The title of the story.
 * @property {string} type - The type of the story.
 * @property {string} url - The URL of the story.
 */
export interface StoryDetails {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: string;
  title: string;
  type: string;
  url: string;
}