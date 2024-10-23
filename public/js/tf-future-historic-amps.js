var futureDatedCheckbox = document.getElementById('future-dated');
var historicCheckbox = document.getElementById('historic');
var futureRecords = document.getElementsByClassName('future-record');
var historicRecords = document.getElementsByClassName('historic-record');


function displaySelectedCriteria() {
    conditionalDisplay(futureRecords, futureDatedCheckbox.checked);
    conditionalDisplay(historicRecords, historicCheckbox.checked);
}

function conditionalDisplay(records, isDisplayed) {
    for (let record of records) {
        record.style.display = isDisplayed === true ? '' : 'none';
    }
}