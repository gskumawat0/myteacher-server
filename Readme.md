# MyTeacher Server
<<<<<<< HEAD

you can fetch all questionset available at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset)

fetch a single questionset by Id at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset/:questionSetId](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset/:questionSetId)

to post a new questionset, make a post request at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset)

your `req.body` must comply to below data format while making post request
=======
----
you can get all questionpapers available at [/api/questionpapers](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers)

get a single questionpaper by Id at [/api/questionpapers/:questionPaperId](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers/:questionPaperId)

to post a new questionpaper, make a post request at [/api/questionpapers](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers)

get all the responses [/api/responses](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/responses)

your req.body must comply to below schema while making post request
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769

```
    standard: String,
    subject: String,
    totalMarks: Number,
    totalQuestions: Number,
    questions: [{
        question: String,
        questionType: String,
        options: [String],
        answers: [String]
    }]
```
you can view it at (http://myteacher-server.ap-south-1.elasticbeanstalk.com)

made with love by [Gouri Shankar Kumawat](http://gskumawat.me)
