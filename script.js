var current=document.querySelector('#current');
var notCurrent=document.querySelector('#not-current');
var bottom=document.getElementById('bottom');

var dispUsr;

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function redirect_home(){
    window.location.href = './index.html';
}

var root=document.querySelector("#root");
if(root){
    var crypt=window.location.href.split('?')[1];
    dispUsr=localStorage.getItem(crypt);
    console.log(dispUsr)
    dispUsr=JSON.parse(localStorage.getItem(dispUsr));
    if(dispUsr!=null||dispUsr!=undefined){
        // document.title(dispUsr.username)
        var txt=`<div id="db-head"><h1>Your Dashboard</h1>
        <button onClick="redirect_home()">LogOut</button></div>`;
        txt+=`<div>`
        txt+=`<h2 id="intro">Hello ${dispUsr.fname}  ${dispUsr.lname}</h2>
        
        <h2>Your Secret Content is </h2><h3>${dispUsr.content}</h3>`
        txt+=`</div>`
        root.innerHTML=txt;
        ;
        localStorage.removeItem(crypt);
    }
    else{
        alert("error occured Login Again");
        window.location.href = './index.html';
    }
}



const loginState=`<input type="text" id="username" placeholder="Username">
<input type="password" id="password" placeholder="Password">
<button id="login" onClick="handleLogin()">Login</button>`

const registerState=`<input type="text" id="fname" placeholder="First Name">
<input type="text" id="lname" placeholder="Last Name">
<input type="text" id="content" placeholder="Your Secret Content">
<input type="text" id="username" placeholder="Username">
<input type="password" id="password" placeholder="Password">
<input type="password" id="confirm-password" placeholder="Confirm Password">
<button id="register" onClick="handleRegister()">Register</button>`

function swap(){
    current.removeAttribute('id');
    current.setAttribute('id','not-current');
    notCurrent.removeAttribute('id');
    notCurrent.setAttribute('id','current');
    current=document.querySelector('#current');
    notCurrent=document.querySelector('#not-current');
}


function handleLogin(){
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var usr=localStorage.getItem(username);
    if(usr){
        usr=JSON.parse(usr)
        if(usr.password===password){
            dispUsr=username;
            var crypt=generateString(8);
            localStorage.setItem(crypt,username);
            window.location.href = './dashboard.html?'+crypt;
        } else {
            alert('Incorrect Password')
        }
    } else {
        alert('User does not exist')
    }
}

function handleRegister(){
    console.log("registration started")
    var fname=document.getElementById('fname').value;
    var lname=document.getElementById('lname').value;
    var content=document.getElementById('content').value;
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var confirm=document.getElementById('confirm-password').value;
    if(password===confirm){

        var usr=localStorage.getItem(username);
        if(usr){
            alert('Username already exists')
        }
        else{
            var user={
                fname:fname,
                lname:lname,
                content:content,
                username:username,
                password:password
            }
            localStorage.setItem(username,JSON.stringify(user))
            alert('Registration Successful !! Proceed to Login')
            bottom.innerHTML=loginState;
            swap()
        }
    } else {
        alert('Passwords do not match')
    }
}


if(bottom)
    bottom.innerHTML=loginState;

document.addEventListener('click', function(e) {
  if (e.target.id === 'not-current') {
    if(e.target.innerText === 'Register') {
        bottom.innerHTML=registerState;
        swap()
    } else {      
        bottom.innerHTML=loginState;
        swap()
    }
  }
});