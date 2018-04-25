/*User Experience
1. On click has to get data through an APi
2. it has to looks similar to the pic
3. Rows have to open to show the data
4. When rows are closed not show data
*/

var boxContainer = document.getElementsByClassName("box-container")[0];
var rows = boxContainer.getElementsByClassName("row");
var rowInner = boxContainer.getElementsByClassName("row--inner");
span = boxContainer.getElementsByTagName("span");


function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
      if (xmlhttp.status == 200) {
        var dataResponse = JSON.parse(xmlhttp.responseText);
        dataResponse.blocks.forEach(function(v, i) {
            rows[i].innerHTML = v.heading;
            span[i].innerHTML = v.content;
        });
      } else if (xmlhttp.status == 400) {
          alert('There was an error 400');
      } else {
          alert('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open("GET", "http://design.propcom.co.uk/buildtest/accordion-data.json", true);
  xmlhttp.send();
}

for (var i = 0; i < rows.length; i++) {
  rows[i].onclick = function() {
    var rowInner = this.nextElementSibling;
    if (this.className === "row"){
      this.className += " active";
      rowInner.style.display = "block";
    } else {
      this.className = "row";
      rowInner.style.display = "none";  
    }
    loadXMLDoc();
  }
}
