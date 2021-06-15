//Elementleri Seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearTodos=document.querySelector("#clear-todos");



eventListeners();

function eventListeners()
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteItem);
    filter.addEventListener("keyup",filterTodos);
    clearTodos.addEventListener("click",clearAllTodos);
}
//Her sayfa yüklendiğinde varolan todoların gösterilmesi.
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

//Tüm todoları temizleme işlemi

function clearAllTodos(){
    if (confirm("Bütün todoları silmek istediğinize emin misiniz?")) {
        while(todoList.firstElementChild!=null)
        {
            todoList.firstElementChild.remove();
        }
        localStorage.removeItem("todos");
    }
}

//Todoları güncelleme

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue)===-1){
            //bulamadı
            listItem.setAttribute("style","display:none !important");
        }

        else{
            listItem.setAttribute("style","display:flex !important");
        }
    });
}

//Todoları silme
function deleteItem(e){
    if (e.target.className=="fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim());
        showAlert("success","Todo başarıyla silindi.");
    }

    
}

function deleteTodoFromStorage(deletetodo){
    
    let todos=getTodosFromStorage();
    
    todos.forEach(function(todo,index){
       if (todo===deletetodo) {
           
        todos.splice(index,1);
      
       }
        
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    const newTodo=todoInput.value.trim();
//Trim() fonksiyonu metinlerin başı ile sonunda olan boşlukları siler.
    if (newTodo!=="") {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi."); 
    }
    else{
        showAlert("danger","Lütfen geçerli bir todo giriniz.");
    }
    
    e.preventDefault();
}

function getTodosFromStorage(){// Storage dan todoları almak.
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function () {
      alert.remove()
    }, 2000);
  

}

function addTodoToUI(newTodo){//String değerini list item olarak UI'ya ekledik.


    //List item oluşturma
    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between";
    //List item a textNode 
    listItem.appendChild(document.createTextNode(newTodo));
    
    //Link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML=" <i class = 'fa fa-remove'></i>";
    //List item a child olarak link ekleme
    listItem.appendChild(link); 
    //TodoList e child olarak list item ekleme
    todoList.appendChild(listItem);
    todoInput.value="";
   
}
