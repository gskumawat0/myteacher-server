# MyTeacher Server
----
you can get all questionpapers available at [/api/questionpapers](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers)

get a single questionpaper by Id at [/api/questionpapers/:questionPaperId](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers/:questionPaperId)

to post a new questionpaper, make a post request at [/api/questionpapers](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/questionpapers)

get all the responses [/api/responses](http://myteacher-server.ap-south-1.elasticbeanstalk.com/api/responses)

your req.body must comply to below schema while making post request

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
