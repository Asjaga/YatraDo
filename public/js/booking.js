let msgDays = document.querySelector("#dayCount");
let fromInput = document.querySelector("#fromdate");
let toInput = document.querySelector("#todate");
let days;
let dayCharge;

const today = new Date();
const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
fromInput.min = localDate;

let calcDays = ()=>{
    let fromDate = new Date(fromInput.value);
    let toDate= new Date(toInput.value);



    if(!isNaN(fromDate)){
        const nextDay = new Date(fromDate);
        nextDay.setDate(fromDate.getDate()+1);

        const minToDate  = nextDay.toISOString().split("T")[0];
        toInput.min = minToDate;
    }

    let diffTime = toDate - fromDate ; // ms tym

    days = Math.ceil(diffTime/(24*60*60*1000));

    msgDays.innerHTML = `Total Days: ${days} `;
    return days;
};

toInput.addEventListener("change",calcDays);
fromInput.addEventListener("change",calcDays);


let totalPrice = document.querySelector("#totalPrice");
let no_of_rooms = document.querySelector("#no-of-rooms");



console.log(no_of_rooms);


let calcPrice = ()=>{
    totalPrice.innerHTML = `₹${dayCharge * no_of_rooms.value}`;
}
let calcPriceDays = ()=>{
    totalPrice.innerHTML = `₹${price * days}`;

    dayCharge = price * days;
    console.log(dayCharge)
}

no_of_rooms.addEventListener("change",calcPrice);
fromInput.addEventListener("change",calcPriceDays);
toInput.addEventListener("change",calcPriceDays);

  const fromDate = document.getElementById('fromdate');
  const toDate = document.getElementById('todate');

toDate.disabled = true;

  fromDate.addEventListener('change', () => {
    if (fromDate.value) {
      toDate.disabled = false;
      toDate.min = fromDate.value; // 👈 prevents selecting an earlier 'To' date
    } else {
      toDate.disabled = true;
      toDate.value = '';
    }
  });
