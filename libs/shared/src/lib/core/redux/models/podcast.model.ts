import { EpisodeModel } from './episode.model';

export interface PodcastModel {
  id: string;
  name: string;
  identifier: string;
  episodes: EpisodeModel[];
}
