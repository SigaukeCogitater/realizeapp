const { db } = require('../util/admin');

exports.getAllIdeas = (req, res) => {
    db.collection('ideas')
    .orderBy('createdAt', 'desc')
    .get()
        .then(data => {
            let ideas = [];
            data.forEach(doc => {
                ideas.push({
                    
                    ideaId: doc.id,                    
                    body: doc.data(),
                    createdAt: doc.data().createdAt,
                    likesCount: doc.data().likes,
                    commentsCount: doc.data().commentsCount,
                    userName: doc.data().userName

                });
            });
            return res.json(ideas);

        })
        .catch((err) => {
        
            console.error(err)
            res.status(500).json({error: err.code});
        });

}

exports.postIdea = (req, res) => {

    const newIdea = {
        body: req.body.body,
        userName: req.user.userName,
        likesCount: 0,
        commentsCount: 0,
        createdAt: new Date().toDateString()
        
    };

    db.collection('ideas')
        .add(newIdea)
        .then((doc) => {
            res.json({message: 'document ${doc.id} created successfully'});
     
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
}