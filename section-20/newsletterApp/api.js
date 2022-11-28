import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser'
import client from "@mailchimp/mailchimp_marketing";


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
 res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) =>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    client.setConfig({
        apiKey: process.env.apiKey,
        server: process.env.urlPrefix,
    });
    
    const run = async () => {
        try{
                const response = await client.lists.batchListMembers(process.env.listId, {
                    members: [
                      {
                          "email_address": email,
                          "status": 'subscribed',
                          "merge_fields": {
                              "FNAME": firstName,
                              "LNAME": lastName,
                          }
                      }
                            ],
                  });
                  
                  console.log(response);
            }

        catch{
                res.send('error 404')
            }
    };
    run();
    res.send('subscribed');  
});   

app.listen(process.env.PORT || 3000 , () => console.log('3000'));






