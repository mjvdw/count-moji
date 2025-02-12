function receiveMessage(e: GoogleAppsScript.Events.DoPost) {
    let message = e.parameter.payload;
    let reactions = collectReactionsFromMessage(message);
}


function collectReactionsFromMessage(message: { [key: string]: any }) {
    let slack = new GASU.connectSlack();
    let response = slack.getReactions(message);

    if (response.getResponseCode() == 200) {
        let data = JSON.parse(response.getContentText());

        console.log(data);

        let reactions = data.message.reactions;

        return reactions;
    }
};