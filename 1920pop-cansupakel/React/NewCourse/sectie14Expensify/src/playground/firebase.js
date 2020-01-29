import  *  as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBp-0i4bx_mDEnsbiT2o5HG7VZNFHhOUts",
    authDomain: "react-pop-1f895.firebaseapp.com",
    databaseURL: "https://react-pop-1f895.firebaseio.com",
    projectId: "react-pop-1f895",
    storageBucket: "react-pop-1f895.appspot.com",
    messagingSenderId: "668529991201",
    appId: "1:668529991201:web:99f589c07c488320740d60",
    measurementId: "G-BLZ6C3Z83T"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

database.ref('expenses')
  .once('value')
  .then((snapchot)=>{
    const expenses = [];
    snapchot.forEach((childSnap) => {
        expenses.push({
            id: childSnap.key,
            ...childSnap.val()
        });
    });
    console.log(expenses);
  })

database.ref('expenses').on('child_removed',(snapchot)=>{
    console.log(snapchot.key,snapchot.val()) //je zal niets zien tot je een expense verwijderd
})

database.ref('expenses').on('child_changed',(snapchot)=>{
    console.log(snapchot.key,snapchot.val()) //je zal niets zien tot je een wijzing aanbrengt om een expense te verwijderen
})

database.ref('expenses').on('child_added',(snapchot)=>{
    console.log(snapchot.key,snapchot.val()) //je zal direct output krijgen van wat je al in hebt
})


// database.ref('expenses').push({
//     description:'Rent',
//     note:'',
//     amount:10340,
//     createdAt:12324554343
// })


// database.ref('expenses').push({
//     description:'Phone bill',
//     note:'',
//     amount:5900,
//     createdAt:43436654
// })


// database.ref('expenses').push({
//     description:'Food',
//     note:'',
//     amount:4000,
//     createdAt:12324554343
// })

























// database.ref().set({
//     name:'Cansu Pakel',
//     age:21,
//     stressLevel:6,
//     job:{
//         title:'Web developer',
//     },
//     location:{
//         city:'Gent',
//         country:'Belgium'
//     }
// }).then(()=>{
//     console.log('Data is saved');
// }).catch((error)=>{
//     console.log('This failed', error)
// });

//run over en over again
//geen promise omdat promise een keer gebeurd
// database.ref().on('value',(snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} works as ${val.job.title}` );
// })

// database.ref('location')
//     .once('value')
//     .then((snapshot)=>{
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e)=>{
//         console.log(e)
//     })




// database.ref().update({
//    stressLevel:9,
//    'job/company':'Amazon',
//    'location/city':'Seattle'
// })

//database.ref('age').set(22);
//database.ref('location/city').set('Bergen');
//database.ref('age')
//    .remove()
//    .then(()=>{
//        console.log('data was removed')
//    }).catch(()=>{
//        console.log('data was not removed')
//    })

