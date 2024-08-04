console.log(window.location.hash);
console.log(window.location.port);
console.log(window.location.host);
console.log(window.location.hostname);


const hashLiinks = document.querySelectorAll('.hash-route-link')

const app = document.querySelector('#app');

const routes = {
    "": {
        title: "Ana Sayfa",
        data: "home.html",
        isApi: false,
    },
    "#todos": {
        title: "Todo List",
        isApi: true,

        data: "https://jsonplaceholder.typicode.com/todos/",
    },
    "#about": {
        title: "About Us",
        data: "about-us.html",
        isApi: false,
    },
    "#contact": {
        title: "Contact",
        data: "contact.html",
        isApi: false,
    },

}

hashLiinks.forEach(item => item.addEventListener("click", (event) => {
    // console.log(item.hash)
    // console.log(event)
    checkRoute(item.hash)
}))

function checkRoute(hash = window.location.hash) {
    // console.log( routes[hash])
    document.title = routes[hash].title
    const dataUrl = routes[hash].data
    isApi = routes[hash].isApi
    if (isApi) {
        app.innerHTML = ""
     const createUl = document.createElement('ul')
        app.append(createUl)
      fetch(dataUrl).then(response => response.json()).then(data => {
          data.forEach(item => {
              const createLi = document.createElement('li')
              createLi.innerHTML = item.title
              createUl.append(createLi)
          })
      })
    } 
    else if (!isApi) {
        fetch(dataUrl).then(response => response.text()).then(data => app.innerHTML = data)
    }
}

checkRoute();