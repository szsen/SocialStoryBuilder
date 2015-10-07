[![Circle CI](https://circleci.com/gh/szsen/ssbuilder.svg?style=shield&circle-token=6dcc69c259a452d1e6aaf71ab9fe18a0aec168bd)](https://circleci.com/gh/szsen/ssbuilder)

Social Story Builder
-----------------------

### Background

Social stories are an educational tool used by teachers of developmentally disabled individuals. They are visual guides that describe social situations and behaviors. Social stories can be used to teach autistic individuals about social cues and how to react to various situations. They are a common intervention option for children and can explain social situations in a manner that is easily understood by its audience. Currently, social stories are generally created in a Word document and printed out.

### Challenge

Create a web application that would allow teachers, therapists, or parents to create social stories for a student. This would include an editor for uploading pictures and adding text. We also want to create a way for teachers to upload their social stories to a global community so that others could download their stories and edit it for their own students. There would also be a mobile component where a teacher could bring up the social story on a tablet and go through it with the student.

### Web App

To get started, navigate to ssbuilder-web and run:

```
npm install
```

That will install all the dependencies we need. To start the web server, run:

```
grunt
```

To run MongoDB, run in another tab:

```
mongod
```

The website will be at localhost:3000

### Testing

Testing is done of the web server API using Mocha. Test files are under ssbuilder-web/test. To install Mocha, run:

```
npm install -g mocha
```

To run tests enter the commands:

```
mocha
```

### Continuous Integration

For the web app, we use CircleCI to run build tests on each commit.

### Continuous Deployment

For the web app, we use CircleCI for continuous delivery via Docker Hub. We then set up [Tutum](https://www.tutum.co/) to automatically deploy our applicaiton service whenever there is a new image available on Docker Hub. 

### Team Members

Roger Chen, Ruiheng Wang, Sonia Sen