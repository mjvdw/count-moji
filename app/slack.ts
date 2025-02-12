class Slack {
	token!: string; // The API token for the Slack API.

	constructor() {
		this.token = env("SGRC_SLACK_BOT_TOKEN") ?? "";
	}

	handleInteractivity(event: GoogleAppsScript.Events.DoPost) {

		let payload = JSON.parse(event.parameter.payload);

		switch (payload.callback_id) {
			case "count_emoji":
				countEmoji(payload);
				break;
			default:
				return 200;
		}
	}

	getReactions(message: any) {
		let url: string = "https://slack.com/api/reactions.get";

		let params: { [key: string]: string } = ({
			channel: message.channel.id,
			timestamp: message.message_ts,
		});

		url += "?";
		for (let key in params) {
			url += "&" + key + "=" + params[key];
		}

		console.log(url);

		let options: object = {
			method: "post",
			headers: {
				Authorization: "Bearer " + this.token,
			},
		};

		let response = UrlFetchApp.fetch(url, options);
		console.log(response.getContentText());
		return response;
	}
}