import tmi from "tmi.js";

const CHANNEL = "manzdev";

export class TwitchClient {
  client;
  events = [];

  constructor() {
    this.client = new tmi.Client({ channels: [CHANNEL] });
    this.client.connect();

    this.client.on("message", (channel, tags, message, self) => {
      const username = tags.username;
      const nickname = tags["display-name"];
      const command = message.trim().toLowerCase().split(" ")[0];

      const isAnimateCommand = command === "!animar";

      if (isAnimateCommand) {
        const animateEvents = this.events
          .filter(event => event.name === "animate");

        animateEvents.forEach(events => events.fx(username));
      }
    });
  }

  on(name, fx) {
    this.events.push({ name, fx });
  }
}
