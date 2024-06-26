import users from "@/assets/streamers.json";
import items from "@/assets/items.json";

export const WIDTH = 800;
export const HEIGHT = 600;
export const IMAGE_SIZE = 18;
export const SCALE = 4;
export const ZOOM = 1;
export const STREAMERS = users.map(streamer => streamer.name);
export const ITEMS = items.map(item => item.name);
