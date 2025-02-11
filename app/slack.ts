class Slack {
    token!: string; // The API token for the Slack API.

    constructor() {
      this.token = env("SGRC_SLACK_BOT_TOKEN") ?? "";
    }

    getMessage() {
        let url = "https://slack.com/api/conversations.history";
        let params = {
            headers: {
                Authorization: `Bearer ${this.token}`

            }
        };
    }
}