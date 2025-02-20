
function receiveMessage(e: GoogleAppsScript.Events.DoPost) {
    let message = JSON.parse(e.parameter.payload);

    let reactions = collectReactionsFromMessage(message);
    if (reactions == undefined) {
        console.error("Error: Could not collect reactions");
        return;
    }

    let sheet = saveReactionsToSheet(reactions);
    let me = "U01MWDNBTJP";
    let slack = new GASU.connectSlack();
    let slackMessage = GASU.blockComponents().markdown("I counted your 'moji! <" + sheet.getUrl() + "|Here's> a link to your spreadsheet. :tada:");
    slack.sendMessage([slackMessage], me);
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


function saveReactionsToSheet(reactions: [{ [key: string]: any }]) {
    let d = new Date();
    let seconds = Math.round(d.getTime() / 1000);
    let sheetName = "Count Moji - " + seconds;
    let sheet = SpreadsheetApp.create(sheetName);

    let header = ["Emoji", "Slack Handle", "Name", "Email"];
    sheet.appendRow(header);

    reactions.forEach((reaction: any) => {
        let emoji = reaction.emoji;
        let people = reaction.people;

        people.forEach((person: any) => {
            let row = [emoji, person.profile.display_name, person.profile.real_name, person.profile.email];
            sheet.appendRow(row);
        });
    });

    return sheet
}