// API BASE URL
let APICode = "a86ef64adc2e41488d520658dd17ce7a";
const BaseUrl = `https://crudcrud.com/api/${APICode}/AppointmentData`;

// ===========================================

let form = document.getElementById("AddForm");
let List = document.getElementById("List");

// Form submit event
form.addEventListener("submit", AddNewUser);

// Delete Event
List.addEventListener("click", deleteItem);

// Edit Event
List.addEventListener("click", editItem);

// AddNewUser funct.. =====================================

function AddNewUser(e) {
  e.preventDefault();

  // Get input values
  var userName = document.getElementById("userName").value;
  var userEmail = document.getElementById("userEmail").value;

  let li = document.createElement("li");
  li.className = "list-group-item p-2";

  li.appendChild(document.createTextNode(`${userName} `));
  li.appendChild(document.createTextNode(`${userEmail}`));

  //   Add UID to user =====================================

  //   let UID = document.createElement("id");
  //   UID.style.display = "none";
  //   UID.appendChild(document.createTextNode(userEmail));
  //   li.appendChild(UID);

  //   create Delete btn =================================

  let deleteBtn = document.createElement("delete");
  deleteBtn.className = "float-end btn bg-danger text-white delete";
  deleteBtn.appendChild(document.createTextNode("Delete"));
  li.appendChild(deleteBtn);

  //   create Edit btn =================================

  let EditBtn = document.createElement("edit");
  EditBtn.className = "float-end btn bg-dark text-white me-1 edit";
  EditBtn.appendChild(document.createTextNode("Edit"));
  li.appendChild(EditBtn);

  List.appendChild(li);

  //   Adding user to localStorage

  let userObj = {
    name: userName,
    email: userEmail,
  };

  let Json_UserObj = JSON.stringify(userObj);
  localStorage.setItem(userEmail, Json_UserObj);

  //   Add to CRUD CRUD API
  axios
    .post(BaseUrl, userObj)
    .then((resolve) => console.log(resolve))
    .catch((err) => console.log(err));

  //   Clear input fields
  form.userName.value = "";
  form.userEmail.value = "";
}

// Get Users From API ========================

let Data;
axios
  .get(BaseUrl)
  .then((resolve) => ShowData(resolve))
  .catch((err) => console.log(err));

function ShowData(APIData) {
  let data = APIData.data;

  //   for Loop

  data.forEach((user) => {
    console.log(user);
    let li = document.createElement("li");
    li.className = "list-group-item p-2";

    li.appendChild(document.createTextNode(`${user.name} `));
    li.appendChild(document.createTextNode(`${user.email}`));

    //   create Delete btn =================================

    let deleteBtn = document.createElement("delete");
    deleteBtn.className = "float-end btn bg-danger text-white delete";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deleteBtn);

    //   create Edit btn =================================

    let EditBtn = document.createElement("edit");
    EditBtn.className = "float-end btn bg-dark text-white me-1 edit";
    EditBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(EditBtn);

    //   Add UID to user =====================================

    let UID = document.createElement("id");
    UID.style.display = "none";
    UID.appendChild(document.createTextNode(user._id));
    li.appendChild(UID);

    List.appendChild(li);
  });
}

// Delete Item ===============================

function deleteItem(e) {
  if (e.target.classList.contains("delete"))
    if (confirm("Are you sure you want to delete ?"))
      var li = e.target.parentElement;

  //   remove user from API

  axios.delete(`${BaseUrl}/${li.childNodes[4].innerText}`);

  List.removeChild(li);

  //   removing item from local storage

  localStorage.removeItem(li.childNodes[2].innerText);
}

// Edit Item ===============================

function editItem(e) {
  if (e.target.classList.contains("edit"))
    if (confirm("Are you sure you want to edit ?"))
      var li = e.target.parentElement;

  //   getting user from local storage

  let obj = JSON.parse(localStorage.getItem(li.childNodes[2].innerText));
  console.log("OBJ:", obj);

  //   filling input values
  form.userName.value = obj.name;
  form.userEmail.value = obj.email;

  List.removeChild(li);

  //   removing item from local storage

  localStorage.removeItem(li.childNodes[2].innerText);
}
