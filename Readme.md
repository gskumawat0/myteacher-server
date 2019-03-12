# MyTeacher Server

you can fetch all questionset available at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset)

fetch a single questionset by Id at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset/:questionSetId](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset/:questionSetId)

to post a new questionset, make a post request at [http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionset)

your `req.body` must comply to below data format while making post request

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
