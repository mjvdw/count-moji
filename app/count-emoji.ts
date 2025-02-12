function receiveMessage(e: { [key: string]: any }) {
    countReactions(e);

}


function countReactions(message: { [key: string]: any }) {
    console.log("Counting emoji");
    console.log("Testing!");


    let slack = new Slack();
    let response = slack.getReactions(message);

    if (response.getResponseCode() == 200) {
        console.log("Response code: " + response.getResponseCode());
        let data = JSON.parse(response.getContentText());
        let reactions = data.message.reactions;
        let count = 0;

        for (let i = 0; i < reactions.length; i++) {
            count += reactions[i].count;
        }

        let text = "Total reactions: " + count;
        let url = message.response_url;

        let options: object = {
            method: "post",
            payload: {
                text: text,
            },
        };

        let postResponse = UrlFetchApp.fetch(url, options);
        return postResponse;
    }
};