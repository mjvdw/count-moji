function testPayload() {
    let testPayload: GoogleAppsScript.Events.DoPost = {
        "contentLength": 0,
        "contextPath": "",
        "parameter": {},
        "parameters": {},
        "pathInfo": "",
        "queryString": "",
        "postData": {
            "length": 0,
            "type": "",
            "name": "",
            "contents": JSON.stringify({
                "token": "Nj2rfC2hU8mAfgaJLemZgO7H",
                "callback_id": "chirp_message",
                "type": "message_action",
                "trigger_id": "13345224609.8534564800.6f8ab1f53e13d0cd15f96106292d5536",
                "response_url": "https://hooks.slack.com/app-actions/T0MJR11A4/21974584944/yk1S9ndf35Q1flupVG5JbpM6",
                "team": {
                    "id": "T0MJRM1A7",
                    "domain": "pandamonium",
                },
                "channel": {
                    "id": "D0LFFBKLZ",
                    "name": "cats"
                },
                "user": {
                    "id": "U0D15K92L",
                    "name": "dr_maomao"
                },
                "message": {
                    "type": "message",
                    "user": "U0MJRG1AL",
                    "ts": "1516229207.000133",
                    "text": "World's smallest big cat! <https://youtube.com/watch?v=W86cTIoMv2U>"
                },
            })
        }
    }

    doPost(testPayload);

}