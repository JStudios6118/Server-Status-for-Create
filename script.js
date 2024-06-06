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

    let playerList = data.players.list

    let new_html = ''

    for (const [key, value] of Object.entries(playerList)) {
      // Do something with 'key' and 'value'
      console.log(key, "OOOOOO", value)
      var new_el = document.createElement('p')
      new_el.innerText = value.name_raw
      document.getElementById("players-list").appendChild(new_el)

    }

    playerList.innerHTML = new_html

  } else {
    outputElement.innerText = "Server is offline!"
    document.getElementById("other-content").style.display = 'none'
  }
}

getStatus()

const data_int = setInterval(getStatus, 10000)