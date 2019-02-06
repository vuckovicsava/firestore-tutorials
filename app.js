const db = firebase.firestore();

const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  cross.addEventListener('click', e => {
    e.stopPropagation();
    
    // deleting a document
    db.collection('cafes')
      .doc(doc.id)
      .delete();
  })
}

// getting data
// db.collection('cafes')
//   .orderBy('name')
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => renderCafe(doc));
//   })
//   .catch(err => console.log(err));

form.addEventListener('submit', e => {
  e.preventDefault();
  // saving data
  db.collection('cafes')
    .add({
      name: form.name.value,
      city: form.city.value
    })

  form.name.value = '';
  form.city.value = '';
});

// getting data real-time
db.collection('cafes')
  .orderBy('city')
  .onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === 'added') {
        renderCafe(change.doc);
      } else if (change.type === 'removed') {
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
      }
    })
  })