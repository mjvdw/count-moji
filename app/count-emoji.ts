
function receiveMessage(e: GoogleAppsScript.Events.DoPost) {
    console.log("Received message");
    // console.log(JSON.parse(e.parameter.payload).user);
    let message = JSON.parse(e.parameter.payload);

    let reactions = collectReactionsFromMessage(message);
    if (reactions == undefined) {
        console.log("Error: Could not collect reactions");
        return;
    }

    saveReactions(reactions);
    let me = "U01MWDNBTJP";
    let slack = new GASU.connectSlack();
    slack.sendMessage("Yay it worked!", me);

    console.log("Done");
}


function collectReactionsFromMessage(message: { [key: string]: any }): [{ [key: string]: any }] | undefined {
    let slack = new GASU.connectSlack();
    let response = slack.getReactions(message);

    if (response.getResponseCode() == 200) {
        let data = JSON.parse(response.getContentText());

        let reactions = data.message.reactions;

        reactions = reactions.map((reaction: { [key: string]: any }) => {
            let emoji = reaction.name;

            let people: Array<{ [key: string]: any }> = [];
            reaction.users.map((userId: string) => {
                let person = JSON.parse(slack.getUserById(userId).getContentText())
                people.push(person);
            });

            return {
                emoji: emoji,
                people: people
            }
        });

        return reactions;
    }
};


function saveReactions(reactions: [{ [key: string]: any }]) {


}