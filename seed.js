conn = new Mongo();
db = conn.getDB("socialStories");

db.stories.drop();
db.students.drop();

// var stories = [
//     {title:"Brushing Your Teeth", description : "Description.", url : "http://placehold.it/320x150"},
//     {title:"Dealing with Bullies", description : "Description.", url : "http://placehold.it/320x150"},
//     {title:"Playtime", description : "Description.", url : "http://placehold.it/320x150"},
//     {title:"Money", description : "Description.", url : "http://placehold.it/320x150"},
//     {title:"Meeting New People", description : "Description.", url : "http://placehold.it/320x150"},
//     {title:"Asking Nicely", description : "Description.", url : "http://placehold.it/320x150"}
// ];

var sPanels = [];
for (var i = 0; i < 6; i++) {
    sPanels.push({caption: 'Blank caption', url: "http://placehold.it/320x150"});
}

var stories = 
[
    {
        "title" : "Brushing Your Teeth",
        "description" : "Description.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://vector-magz.com/wp-content/uploads/2013/08/bathroom-clipart1-300x210.png",
                "caption" : "Blank caption"
            },
            {
                "url" : "http://makingmountainsblog.files.wordpress.com/2013/07/toothpaste_c.gif",
                "caption" : "Blank caption"
            },
            {
                "url" : "http://www.clker.com/cliparts/r/d/k/j/0/D/green-toothbrush-md.png",
                "caption" : "Blank caption"
            },
            {
                "url" : "http://images.clipartpanda.com/kids-teeth-clipart-boy-brush-teeth-clipartbrushing-teeth-clipart-1139236-by-johnny-sajem-royalty-free-rf-tzdgtnao.jpg",
                "caption" : "Blank caption"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            }
        ]
    },
    {
        "title" : "Rules for Schools",
        "description" : "How to act in school.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://www.mypecs.com/ImageServer/ImageService.svc/GetPecsCardImage/60,387",
                "caption" : "Blank caption"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            }
        ]
    },
    {
        "title" : "Washing Hands",
        "description" : "Task analysis for washing hands.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://www.do2learn.com/picturecards/images/imageschedule/faucet_on_l.gif",
                "caption" : "Turn the water on."
            },
            {
                "url" : "http://turksandcaicosmission.org/do/wp-content/uploads/2013/03/Hand-washing.jpg",
                "caption" : "Hands wet."
            },
            {
                "url" : "http://4.bp.blogspot.com/-ZJR--Ojcxzg/TqsSTiPmZkI/AAAAAAAAABI/jlkNoDEtpYQ/s1600/SoapBarBubbles.png",
                "caption" : "Rub hands with soap."
            },
            {
                "url" : "http://www.clipartbest.com/cliparts/Rcd/nbX/RcdnbXzc9.png",
                "caption" : "Rinse hands."
            },
            {
                "url" : "http://www.engraversnetwork.com/files/placeholder.jpg",
                "caption" : "Turn the water off."
            },
            {
                "url" : "http://www.engraversnetwork.com/files/placeholder.jpg",
                "caption" : "Dry your hands."
            }
        ]
    },
    {
        "title" : "Fire Drill",
        "description" : "What to do in a fire drill.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://vector-magz.com/wp-content/uploads/2013/09/fire-drill-clip-art-300x291.jpg",
                "caption" : "Blank caption"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            }
        ]
    },
    {
        "title" : "Meeting New People",
        "description" : "How to meet new people.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://images.clipartpanda.com/computer-clipart-for-kids-82610_15845_0.gif",
                "caption" : "Blank caption"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            }
        ]
    },
    {
        "title" : "Asking Nicely",
        "description" : "How to ask for something you need.",
        "url" : "http://placehold.it/320x150",
        "panels" : [
            {
                "url" : "http://www.lessonpix.com/drawings/lori/3947/150x150/Raise%2520Hand.png",
                "caption" : "Blank caption"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            },
            {
                "caption" : "Blank caption",
                "url" : "http://placehold.it/320x150"
            }
        ]
    }
];

// [
//     {title:"Brushing Your Teeth", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels},
//     {title:"Dealing with Bullies", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels},
//     {title:"Playtime", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels},
//     {title:"Money", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels},
//     {title:"Meeting New People", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels},
//     {title:"Asking Nicely", description : "Description.", url : "http://placehold.it/320x150", panels : sPanels}
// ];

db.stories.insert(stories);

storyIds = [];
cursor = db.stories.find();
while ( cursor.hasNext() ) {
	var s = cursor.next();
	storyIds.push(s._id);
}

var students = [
    { name: "Roger Chen", stories: storyIds.slice(0, 2) },
    { name: "Sonia Sen", stories: storyIds.slice(2, 4) },
    { name: "Rachel Wang", stories: storyIds.slice(4, 6) }
];

db.students.insert(students);

//Insert sample time statistics
var timestats = [
    {name: "Roger Chen", story: "Brushing Your Teeth", panel1Time: "4.30702197551727", panel2Time: "0.696897029876709", panel3Time: "0.631983995437622", panel4Time: "0.650170981884003", panel5Time: "0.623313009738922", panel6Time: "5.24785000085831", totalTime: "12.1572369933128" },
    {name: "Roger Chen", story: "Brushing Your Teeth", panel1Time: "5.72493904829025", panel2Time: "0.795165956020355", panel3Time: "0.648622989654541", panel4Time: "1.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "14.0999930500984" },
    {name: "Roger Chen", story: "Brushing Your Teeth", panel1Time: "3.72493904829025", panel2Time: "1.795165956020355", panel3Time: "0.648622989654541", panel4Time: "1.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "12.0999930500984" },
    {name: "Sonia Sen", story: "Washing Hands", panel1Time: "3.72493904829025", panel2Time: "1.795165956020355", panel3Time: "0.648622989654541", panel4Time: "1.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "12.0999930500984" },
    {name: "Rachel Wang", story: "Asking Nicely", panel1Time: "3.72493904829025", panel2Time: "1.795165956020355", panel3Time: "0.648622989654541", panel4Time: "1.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "12.0999930500984" },
    {name: "Roger Chen", story: "Rules for Schools", panel1Time: "3.72493904829025", panel2Time: "3.795165956020355", panel3Time: "2.648622989654541", panel4Time: "3.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "18.0999930500984" 
    {name: "Roger Chen", story: "Brushing Your Teeth", panel1Time: "3.72493904829025", panel2Time: "3.795165956020355", panel3Time: "2.648622989654541", panel4Time: "3.79215705394745", panel5Time: "2.91204702854156", panel6Time: "2.22706097364426", totalTime: "18.0999930500984" },
];

db.timeStatistics.insert(timestats);

cursor = db.students.find();
while ( cursor.hasNext() ) {
	var s = cursor.next();
	printjson(s);
}