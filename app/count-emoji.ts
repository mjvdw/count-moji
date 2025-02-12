function countEmoji(message) {
    console.log(message);
    console.log("Counting emoji.");

    let slack = new Slack();
    slack.getReactions(message);

};