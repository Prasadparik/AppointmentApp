// API BASE URL
let APICode = "ec5aedc3dc1a41e89106f8430f3d673a";
// const BaseUrl = `https://crudcrud.com/api/${APICode}/AppointmentData`;

// -------------------------------------------------------
const BaseUrl = `http://localhost:8000/api/users`;
axios
  .get(BaseUrl)
  .then((res) => {
    console.log("LOCAL API::", res);
  })
  .catch((err) => console.log("ERROR::", err));

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

  //   let EditBtn = document.createElement("edit");
  //   EditBtn.className = "float-end btn bg-dark text-white me-1 edit";
  //   EditBtn.appendChild(document.createTextNode("Edit"));
  //   li.appendChild(EditBtn);

  List.appendChild(li);

  //   Adding user to localStorage
  let name = userName;
  let email = userEmail;
  let userObj = { name, email };

  let Json_UserObj = JSON.stringify(userObj);
  localStorage.setItem(userEmail, Json_UserObj);

  console.log("POST OBJ => ", userObj);
  console.log("POST JSON OBJ => ", Json_UserObj);

  //   Add to CRUD CRUD API
  axios
    .post(BaseUrl, Json_UserObj)
    .then((resolve) => console.log(resolve))
    .then((resolve) => window.location.reload())
    .catch((err) => console.log(err));

  //   Clear input fields
  form.userName.value = "";
  form.userEmail.value = "";
}

// Get Users From API ========================

let Data;
axios
  .get(BaseUrl)
  .then((resolve) => {
    console.log("CRUD API::", resolve);
    ShowData(resolve);
  })
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

  //   let obj = JSON.parse(localStorage.getItem(li.childNodes[2].innerText));
  console.log("OBJ:", li.childNodes);

  // get user from API ================================

  axios
    .get(BaseUrl + "/" + li.childNodes[4].innerText)
    .then((resolve) => {
      // filling input values
      form.userName.value = resolve.data.name;
      form.userEmail.value = resolve.data.email;
    })
    .catch((err) => console.log(err));

  // Deleting user from api
  //   remove user from API

  axios.delete(`${BaseUrl}/${li.childNodes[4].innerText}`);

  List.removeChild(li);

  //   removing item from local storage

  localStorage.removeItem(li.childNodes[2].innerText);
}
