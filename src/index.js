let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  function getAll() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(data => {
          let toyCollection = document.getElementById('toy-collection')
          console.log(data);
        toyCollection.innerHTML=''

        data.forEach(toy => {
          let newDiv = document.createElement('div')
          newDiv.classList.add("card")
          toyCollection.appendChild(newDiv)
          let hTwoName = document.createElement('h2')
          let image = document.createElement('img')
          let paragraph = document.createElement('p')
          let button = document.createElement('button')

          hTwoName.innerHTML = toy.name
          image.classList.add('toy-avatar')
          paragraph.innerHTML = toy.likes
          button.classList.add('like-btn')
          button.innerHTML = 'like <3'
          image.src = toy.image
          button.id = toy.id
          newDiv.append(hTwoName)
          newDiv.append(image)
          newDiv.append(paragraph)
          newDiv.append(button)


          button.addEventListener('click', howManyLikes)
          function howManyLikes() {
        
            fetch("http://localhost:3000/toys/" + button.id, {
              method: "PATCH",
              headers:
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
        
              body: JSON.stringify({
                "likes": parseInt(paragraph.innerText)+1
              })
            })
              .then(() => {
                getAll()
        
              })
        
          }

        })
      });
  }
  getAll()

  let newForm = document.querySelector(".add-toy-form")
  newForm.addEventListener('submit', addNewToy)

  function addNewToy(event) {
    event.preventDefault()
    let inputText = document.querySelectorAll('.input-text')
    console.log(inputText[0].innerText)

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": inputText[0].value,
        "image": inputText[1].value,
        "likes": 0
      })
    })
      .then(() => {
        getAll()
      })


  }



  addBtn.addEventListener("click",()=>{
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  // hide & seek with the form















});
