// Create a table localStorage
// const blogContent = JSON.parse(localStorage.getItem('content')) || [];

// create identifiant
let ident = Math.floor(Math.random() * (100)) + 1;
console.log(ident);


// Appelle des element html
let blog = document.querySelector("#blog");
const form = document.getElementById('form');
const formmodif = document.getElementById('m');
const contentmodif = document.getElementById('contentmodif');
const modifForm = document.getElementById('modifForm');
let titreBienv = document.querySelector('#titre');
const title = document.querySelector('#title');
const content = document.querySelector('#content');
let affplus = document.querySelector('.plus');
let text = document.querySelector('.text');
// Creation date
const dateform = new Date;
const dater = dateform.toLocaleDateString();