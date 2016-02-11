'use strict';

const mandrill = require('mandrill-api/mandrill');

if (!process.env.MANDRILL_API_KEY) {
    const env = require('./env.js');
}

const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);
const Mongoose = require('mongoose');
const Group = require('./models/group');
const MONGO_URI = process.env.MONGOLAB_URI;

Mongoose.connect(MONGO_URI + '/devil', (err) => {
    if (err) {
        console.log(err);
        throw err;
    }

    Group.find({
        sendEmail: true
    }, (err, groups) => {
        if (err) {
            console.log(err);
            throw err;
        }

        groups.forEach((group) => {
            let emailAddresses = group.members;
            let randomEmail = emailAddresses[Math.floor(Math.random() * emailAddresses.length)];

            console.log(randomEmail);
        });

        Mongoose.connection.close();
    });
});
// var randomEmail = emailAddresses[Math.floor(Math.random() * emailAddresses.length)];
//
// var message = {
//     'text': 'Lucky you!\n\n' +
//             'You have been randomly selected to be the devil\'s advocate for your group\'s team meeting this week.\n\n' +
//             'If you need some help with playing the role, here\'s a resource to guide you:\n' +
//             'http://www.readwritethink.org/files/resources/lesson-docs/HowtoPlay_Devils_Advocate.pdf',
//     'subject': 'You\'re the Devil\'s Advocate This Week',
//     'from_email': 'Kyle_Buchanan@kenan-flagler.unc.edu',
//     'from_name': 'Kyle Buchanan',
//     'to': [
//         {
//             'email': randomEmail,
//             'type': 'to'
//         }
//     ]
// };

//var j = schedule.scheduleJob('* * * * * 7', () => {
//var j = schedule.scheduleJob('5 * * * * *', () => {
    // mandrillClient.messages.send({
    //     'message': message
    // }, (result) => {
    //     console.log(result);
    // });
//});
