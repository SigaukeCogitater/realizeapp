const { db } = require('../util/admin');

exports.getAllCompetitions = (req, res) => {
    db.collection('competions')
    .orderBy('createdAt', 'desc')
    .get()
        .then(data => {
            let competions = [];
            data.forEach(doc => {
                competions.push({
                    
                    title: doc.data().title,
                    description: doc.data().description,
                    category: doc.data().category,
                    author: doc.data().author,
                    dueDate: doc.data().dueDate,
                    userName: doc.data().userName,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    competionId: doc.id,

                });
            });
            return res.json(competions);

        })
        .catch((err) => {
        
            console.error(err)
            res.status(500).json({error: err.code});
        });

}

exports.postCompetition = (req, res) => {

    const newCompetition = {

        title: req.body.title,
        description: req.body.description,
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
            resNewCompetition.competionId = doc.id;
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


exports.postCommentOnCompetition = (req, res) => {

    if(req.body.body.trim() === ''){
        return res.status(400).json({error: "Must not be empty"});
    }
    const newComment = {
        userName: req.user.userName,
        competitionId: req.params.competitionId,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        userImage: req.user.imageUrl
    };
    
    db.doc(`/competitions/${req.params.competitionId}`).get()
        .then(doc => {
            if(!doc.exists){
                console.log("----------visited----------")
                return res.status(404).json({error: "competition not found"});
            }
            return db.collection('comments').add(newComment);

        }).then(() => {
            res.json(newComment);
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: 'Something went wrong'});
        }); 
}

