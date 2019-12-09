const { db } = require('../util/admin');

exports.getAllCompetitions = (req, res) => {
    db.collection('competitions')
    .get() 
        .then(data => {
            let competitions = [];

            data.forEach(doc => {
                console.log("-------------");
                console.log(doc.userName);
                competitions.push({
                    title: doc.data().title,
                    body: doc.data().body,
                    category: doc.data().category,
                    author: doc.data().author,
                    createdAt: doc.data().createdAt,
                    dueDate: doc.data().dueDate,
                    userName: doc.data().userName,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    competionId: doc.id,


                })




            })
            // console.log(data);
            // let comp = [];
            console.log(competitions);
            
            return res.json(competitions);

        })
        .catch((err) => {
        
            console.error(err)
            res.status(500).json({error: err.code});
        });

}



exports.postCompetition = (req, res) => {

    const newCompetition = {

        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        author: req.body.author,
        dueDate: req.body.dueDate,
        userName: req.user.userName,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString()
    };
    
    db.collection('competitions')
        .add(newCompetition)
        .then((doc) => {
            const resNewCompetition = newCompetition;
            resNewCompetition.competitionId = doc.id;
            res.json(resNewCompetition);
     
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });

}


exports.getCompetition = (req, res) => {
    let competitionData = {};
    db.doc(`/competitions/${req.params.competitionId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'competition not found'});
            }
            competitionData = doc.data();
            competitionData.competitionId = doc.id;
            return db.collection('comments')
                .where('competitionId', '==', req.params.competitionId)
                .orderBy('createdAt', 'desc')
                .get();
        }).then(data => {
            competitionData.comments = [];
            data.forEach(doc => {
                competitionData.comments.push(doc.data());

            })
            return res.json(competitionData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
            

           })

}