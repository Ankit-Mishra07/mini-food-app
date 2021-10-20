
     import {navbar} from "./components/foodnavbar.js"

     let navbar_div = document.getElementById("navbar")
     navbar_div.innerHTML = navbar();
     
  
  
  let searchbtn = document.getElementById("search_btn")
  
  searchbtn.addEventListener("click" , Showin)
  
  let flag = true
  
  function Showin() {
      let result_div = document.getElementById("showfood")
      let search_input = document.getElementById("search_input")
      if(flag == true) {
          search_input.style.display = "block"
          
          flag = false
      }else {
          search_input.style.display = "none"
          result_div.style.display = "none"
          flag = true
      }
  }
  
  
  
  
  
  
  let result_div = document.getElementById("showfood")
     let timerId;
  
   async function ShowsearchResult(query) {
  
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      let data = await res.json()
      return data
   }
  
   function appendfood(food) {
  
      food.forEach(({strMeal,strMealThumb,strArea,strInstructions, strYoutube}) => {
  
          let div = document.createElement("div")
          div.setAttribute("id" , "search_div")
  
          div.onclick = function() {
              getdata({strMeal,strMealThumb,strArea,strInstructions, strYoutube})
          }
  
          let img = document.createElement("img")
          img.src = strMealThumb
  
          let text_div = document.createElement("div")
          text_div.style.marginLeft = "15px"
          let foodname = document.createElement("p")
          foodname.setAttribute("class" , "foodname")
           foodname.innerText = strMeal
  
           let foodorigin = document.createElement("p")
           foodorigin.setAttribute("class", "foodorigin")
           foodorigin.innerText = strArea
  
           text_div.append(foodname,foodorigin)
           div.append(img,text_div)
  
          result_div.append(div)
      })
   }
  
   async function main () {
       let name = document.getElementById("search_input").value
  
       let res = await ShowsearchResult(name)
  
       appendfood(res.meals)
  
   }
  
   let search_input = document.getElementById("search_input")
   search_input.addEventListener("input" , debounce)
  
  function debounce() {
      result_div.innerHTML = null
      result_div.style.display = "block"
      if(timerId) {
          clearTimeout(timerId)
      }
  
     timerId =  setTimeout(() => {
          main()
      },1000)
  
  }
  
  
  
  if(localStorage.getItem("freshmenu") === null) {
      localStorage.setItem("freshmenu" , JSON.stringify([]))
  }
  
  function getdata(food) {
  
      let set = JSON.parse(localStorage.getItem("freshmenu"))
  
      set.push(food)
  
      localStorage.setItem("freshmenu" , JSON.stringify(set))

      setTimeout(() => {
          window.location.href = "search_result.html"
      },1500)
  }
  
  