window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyCIboAfGakfA_jLU6Of86vxJNIB74nbTbA',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let photoDiv = document.querySelector('#friendDiv');
            let returnedContacts = data.memberResourceNames;
            for (let i = 0; i < returnedContacts.length; i++) {
              fetch(
                  'https://people.googleapis.com/v1/' + returnedContacts[i] +
                      '?person=locations&key=AIzaSyCIboAfGakfA_jLU6Of86vxJNIB74nbTbA',
                  init)
                  .then((response) => response.json())
                  .then(function(data) {
                    let profileImg = document.createElement('p');
                    profileImg.innerText = data;
                    console.log(data)
                    photoDiv.appendChild(profileImg);
                  });
            };
          });
    });
  });
};


//AIzaSyCIboAfGakfA_jLU6Of86vxJNIB74nbTbA     GoogleApiKey

//  /https://people.googleapis.com/v1/{resourceName=people/*}