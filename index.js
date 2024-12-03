let count = 0;
function handleFormSubmit(e){
    e.preventDefault()
    const obj = {
        name: e.target.name.value,
        mobile: e.target.mobile.value,
        address: e.target.address.value,
    }
    axios.post("https://crudcrud.com/api/6bb53808a083439689645531e073f4ff/student",obj).then((res)=>{
        displayUserOnScreen(res.data)
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.name} - ${userDetails.mobile} - ${userDetails.address}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
    count++;
  
    deleteBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        console.log(userDetails)
        axios
            .delete(
                `https://crudcrud.com/api/6bb53808a083439689645531e073f4ff/student/${userDetails._id}`
            )
            .then((response) =>{
                count--;
                const p = document.getElementById("count")
                count = response.data.length
                p.textContent = "All Students: "+ count
                console.log(response,count)
            })
            .catch((error) => console.log(error));
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
        axios
            .delete(
                `https://crudcrud.com/api/6bb53808a083439689645531e073f4ff/student/${userDetails._id}`
            )
            .then((response) => {
                count--;
                const p = document.getElementById("count")
                count = response.data.length
                p.textContent = "All Students: "+ count
                console.log(response,count)
            })
            .catch((error) => console.log(error));
      document.getElementById("name").value = userDetails.name;
      document.getElementById("mobile").value = userDetails.mobile;
      document.getElementById("address").value = userDetails.address;
    });
  }
  
  window.addEventListener("DOMContentLoaded", function (e) {
      e.preventDefault();
      axios
      .get(
        "https://crudcrud.com/api/6bb53808a083439689645531e073f4ff/student"
      )
          .then((response) => {
            const p = document.getElementById("count")
            count = response.data.length
            p.textContent = "All Students: "+ count
              for (let i = 0; i < response.data.length; i++){
                 displayUserOnScreen(response.data[i]) 
              }
      })
      .catch((error) => console.log(error));
  })