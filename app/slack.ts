class Slack {
    token!: string; // The API token for the Slack API.

    constructor() {
      this.token = env("SGRC_SLACK_BOT_TOKEN") ?? "";
    }

    handleInteractivity(event: GoogleAppsScript.Events.DoPost) {
        console.log(event.postData.contents);
    }
}