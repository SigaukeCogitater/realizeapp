const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
//comment
const database = firebase.database();
const rootRef =database.ref('users');

addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const autoId = rootRef.push().key
    rootRef.child(autoId).set({
        first_name: firstName.value,
        last_name: lastName.value,
        age:age.value,

    })
});

updateBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const newData ={
        age: age.value,
        full_name: firstName.value,
        last_name: last_name.value
    }
    const updates = {};
    updates['/users/' + userId.value] = newData;
    updates['/Company-users/' + userId.value] = newData;
    database.ref().update(updates);
});

removeBtn.addEventListener('click',(e) => {
    e.preventDefault();
    rootRef.child(userId.value).remove()
    .then(()=> {
        window.alert('user removed from datebase!');
    })
    .catch(error => {
        console.error(error);
    });
    //database.ref('/Company-users').child(userId.value).remove();

});

// rootRef.on('child_added', snapshot => {
//     console.log('Child(s) added !');

// });

// rootRef.on('child_removed', snapshot => {
//     console.log('Child(s) removed !');

// });

// rootRef.on('child_changed', snapshot => {
//     console.log('Child(s) Changed !');

// });

// rootRef.on('value', snapshot => {
//     console.log('An event occured on the database !');

// });

// rootRef.on('child_removed', snapshot => {
//     console.log('Child(s) removed !');

// });

// rootRef.orderByChild('age').equalTo('PK').on('value', snapshot => {
//     console.log(snapshot.val())
// });


rootRef.orderByChild('age').equalTo('PK').on('value', snapshot => {
    console.log(snapshot.val());
});

database.ref('/comunities').orderByValue().on('value', snapshot => {
    console.log(snapsho.val());
})
