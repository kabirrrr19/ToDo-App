"use strict"
window.localStorage.setItem("id", 0);
const btnAdd = document.getElementById("btn-add");
const btnRem = document.getElementById("btn-rem");
// const btnUpd = document.getElementById("btn-upd");
const list = document.getElementById("list");
const input = document.getElementById("input");
const btnDel = document.querySelectorAll(".font-awesome");
const dateLabel = document.querySelectorAll(".date");



function createNewNode() {
  let dateData = getDate();
  const ele = document.createElement("li");
  const icon = document.createElement("i");
  const textContainer = document.createElement("span");
  const dateContainer = document.createElement("span");
  const delContainer = document.createElement("a");
  const dateAndDelContainer = document.createElement("span");

  const input = document.getElementById("input").value;
  const text = document.createTextNode(input);
  ele.className = "task";
  dateContainer.className = "date";
  ele.id = id + 1;
  icon.className = "fas fa-trash font-awesome";
  icon.id = "trash";
  delContainer.appendChild(icon);
  dateContainer.innerHTML = dateData;
  textContainer.className = "word";

  textContainer.appendChild(text);
  dateAndDelContainer.appendChild(dateContainer);
  dateAndDelContainer.appendChild(delContainer);
  ele.appendChild(textContainer);
  ele.appendChild(dateAndDelContainer);
  // ele.appendChild(dateContainer);
  // ele.appendChild(delContainer);
  console.log(ele);
  return ele;
}

const displayData = async function () {
  const data = await fetch("http://localhost:3000/dbData/getTask")
    .then(data => {
      return data.json();
    });
  // if (data.length !== 0) {
  //   list.appendChild(newListElement);
  //   document.getElementById("input").value = "";
  // } else {
    // );
    const arr = [];
    for (const element of data) {
      const ele = document.createElement("li");
      const icon = document.createElement("i");
      const textContainer = document.createElement("span");
      const dateContainer = document.createElement("span");
      const delContainer = document.createElement("a");
      const dateAndDelContainer = document.createElement("span");
      
      // let dateData = getDate();
    // const input = document.getElementById("input").value;
      const text = document.createTextNode(element.task);
      const date = new Date(element.date_time);
      // let dateData = date.toLocaleTimeString()+ " "+ date.toLocaleDateString();
      let dateData = date.toString().substring(0,11) + " " + date.toLocaleTimeString();
      ele.id = element.id;
      // const text = document.createTextNode(input);
      ele.className = "task card";
      dateContainer.className = "date";
      icon.className = "fas fa-trash font-awesome";
      icon.id = "trash";
      delContainer.appendChild(icon);
      dateContainer.innerHTML = dateData;
      textContainer.className = "word";
      textContainer.appendChild(text);
      dateAndDelContainer.appendChild(dateContainer);
      dateAndDelContainer.appendChild(delContainer);
      ele.appendChild(textContainer);
      ele.appendChild(dateAndDelContainer);
      
      arr.push(ele);
      // console.log(ele)
    

  }
  for (const ele of arr) {
    list.appendChild(ele);
  }
  // console.log(arr);
}


document.addEventListener('DOMContentLoaded', () => {
  displayData();
})


const addItem = async function () {
  const data = document.getElementById("input").value;
  if (data == "") alert("Please enter a valid Task")
  else {
    const id = Number(window.localStorage.getItem("id")) + 1;
    window.localStorage.setItem("id", id);
    console.log(id)
    const info = {
      id: id,
      task: data,
    };
  
    console.log(id)
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    };
  
    const url = "http://localhost:3000/dbData/addTask";
    try {
      const response = fetch(url, options)
        .then(data => {
        if (!data.ok) throw Error(data.status)
        return data.json() // converted data to json
      }).then(info => {
        console.log(info)
      }).catch(e => {
        console.log(e)
      });
      // console.log("Request Successfult!!!!");
    } catch (e) {
      console.log(e);
    }
  }
};

btnAdd.addEventListener("click", () => {
  addItem();
  document.location.reload();
  displayData();
  input.value = "";
});


const getData = async function () {
  const data = await fetch("http://localhost:3000/dbData/getTask")
    .then(data => {
      return data.json();
    });
  console.log(data);
}


// btnUpd.addEventListener("click", function () {
//   var firstElement = list.firstElementChild;
//   var newListElement = createNewNode();
//   list.replaceChild(newListElement, firstElement);
//   document.getElementById("input").value = "";
// });


document.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.id === "trash") {
    const anchor = e.target.closest(".task");
    let [date] = anchor.querySelectorAll(".date");
    const [task] = anchor.querySelectorAll(".word");
    const id = anchor.id;
    const info = {
      id: id,
      task: task.textContent,
      date_time: date.textContent,
    }
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    };
    const result = await fetch("http://localhost:3000/dbData/deleteTask", options)
      .then(res => res.json())
      .then(res => console.log(res));
    list.removeChild(anchor);
  }
});
