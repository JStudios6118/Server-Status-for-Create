const url = "https://api.mcstatus.io/v2/status/java/98.37.110.55:57099"

var outputElement = document.getElementById("status")
var playersElement = document.getElementById("players")
var playerList = document.getElementById("players-list")

function getStatus() {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Display data in an HTML element
      updateStatus(data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function updateStatus(data) {
  if (data.online) {
    outputElement.innerText = "Server is online!"

    playersElement.innerText = "Players Online: " + data.players.online + "/" + data.players.max

    document.getElementById("players-list").innerHTML = "<h3>Players Online</h3>"

    if (data.players.online === 0) {
      var new_el = document.createElement('p')
      new_el.innerText = "There is no one online right now!"
      document.getElementById("players-list").appendChild(new_el)
    } else {

      let playerList = data.players.list

      for (const [key, value] of Object.entries(playerList)) {
        if (value.name_raw != "Anonymous Player") {
          var new_el = document.createElement('p')
          new_el.innerText = value.name_raw
          document.getElementById("players-list").appendChild(new_el)
        }
      }
    }
  } else {
    outputElement.innerText = "Server is offline!"
    document.getElementById("other-content").style.display = 'none'
  }
}

getStatus()

const data_int = setInterval(getStatus, 10000)