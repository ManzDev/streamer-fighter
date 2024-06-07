import streamers from "../assets/streamers.json";

export class Constants {
  static width = 800;
  static height = 600;
  static imageSize = 18;
  static scale = 4;
  static zoom = 1;
  static streamers = streamers.map(streamer => streamer.name);
}
