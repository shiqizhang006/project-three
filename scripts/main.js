const list = document.querySelector('#item-list');

const CROSSED = "crossed";

var LIST = [];
var id = 0;

function addItem(newItem, id, completed, deleted) {
    if (deleted) {return;}
    const COMPLETED = completed ? CROSSED : "";
    const item =    `<li class="item">
                        <p class="item-text">
                            <span class="text ${COMPLETED}" job="cross-out" id="${id}">${newItem}</span>
                            <span class="circle" job="delete" id="${id}">
                                <span class="before"></span>
                                <span class="after"></span>
                            </span>
                        </p>
                    </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("click", clickToAdd());

function clickToAdd() {
    const newItem = input.value;
    if(newItem) {
        addItem(newItem, id, false, false);
        LIST.push({
            name: newItem,
            id: id,
            completed: false,
            deleted: false
        })
        id++;
    }
    input.value = "";
}

function completeItem(element) {
    element.parentNode.querySelector(".text").classList.toggle(CROSSED);
    LIST[element.id].completed = LIST[element.id].completed ? false : true;
}

function deleteItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].deleted = true;
}

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "cross-out") {
        completeItem(element);
    }
    else if(elementJob == "delete") {
        deleteItem(element);
    }
})

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Nutrient', 'Share'],
        ['Fat', 50],
        ['Carbs', 33],
        ['Protein', 17],
    ]);

    var options = {'title':'Nutrient Facts of Spaghetti & Meatballs', 'width':400, 'height':400};
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}