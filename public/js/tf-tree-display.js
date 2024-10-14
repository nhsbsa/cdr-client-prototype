var tfg = document.getElementById("tfg-expander");
var tf1_div = document.getElementById("tf1-div");
var tf2_div = document.getElementById("tf2-div");
var tf3_div = document.getElementById("tf3-div");

var tf1_expander = document.getElementById("tf1-expander");
var tf1_amps_div = document.getElementById("tf1-amps-div");
var tf2_expander = document.getElementById("tf2-expander");
var tf2_amps_div = document.getElementById("tf2-amps-div");
var tf3_expander = document.getElementById("tf3-expander");
var tf3_amps_div = document.getElementById("tf3-amps-div");


tfg.addEventListener("toggle", function() {
    toggleDisplay(tf1_div, tf1_expander);
    toggleDisplay(tf2_div, tf2_expander);
    toggleDisplay(tf3_div, tf3_expander);
})

tf1_expander.addEventListener("toggle", function() {
    toggleDisplay(tf1_amps_div);
})

tf2_expander.addEventListener("toggle", function() {
    toggleDisplay(tf2_amps_div);
})

tf3_expander.addEventListener("toggle", function() {
    toggleDisplay(tf3_amps_div);
})

function toggleDisplay(element, child) {
    if (element.style.display === 'none')
        element.style.display = 'block'
    else {
        element.style.display = 'none';

        if (typeof child !== 'undefined') {
            child.removeAttribute("open");
        }
    }
}