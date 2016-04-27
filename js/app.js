/*
  Please add all Javascript code to this file.
*/
// notes
// set up dom:
// click on mashable - show it in console
// event listener
// whenever you click on one, in addition to logging console, it also updates the text
// click on mashable, get the api url back

// will need to log console:
// title, url

// standardize incoming data: 
// ex: mashable and reddit call titles diff things - translate them to the same key name

var $main = $("#main")
var $popUp = $("#popUp")
var $mashable = $("#Mashable")
var $reddit = $("#Reddit")
var $digg = $("#Digg")

$mashable.on("click", function(e){
  e.preventDefault()

  $main.hide()

  $.ajax ({
    type: "GET",
    url: "http://feedr-api.wdidc.org/mashable.json",
    success: function(response){
      response.hot.forEach(function(i){
        content.articles.push(
          {title: i.display_title,
          topic: i.channel_label,
          impressions: i.shares.total,
          image: i.feature_image,
          url: i.link,
          description: i.excerpt}
          )
      })
    formatTemplate(content);
    }
  })
})

// $reddit.on("click", function(e){
//   e.preventDefault()
//   console.log("reddit clicked")

//   $main.hide()

//     type: "GET",
//     url: "https://www.reddit.com/top.json",
//     success: function(response){
//       response.hot.forEach(function(i){
//         content.articles.push(
//           {title: i.display_title,
//           topic: i.channel_label,
//           impressions: i.shares.total,
//           image: i.feature_image}
//           )
//       })
//     formatTemplate(content);
//     }
//   })
// })

$digg.on("click", function(e){
  e.preventDefault()
  console.log("digg clicked")

  $main.hide()

  $.ajax ({
    type: "GET",
    url: "http://feedr-api.wdidc.org/digg.json",
    success: function(response){
    console.log("got from digg")
    console.log(response)
    }
  })
})



var content = {articles: []}



var testContent = {articles: [
{  
  image: "#",
  title: "First Article Title",
  topic: "First Article Topic",
  impressions: 687
},
{
  image: "#",
  title: "Second Article Title",
  topic: "Second Article Topic",
  impressions: 967
}
]}

function formatTemplate(data) {
  var source = $("#article-template").html()
  var templater = Handlebars.compile(source)
  $main.append(templater(data))
  $main.css("display","inline");
}

function formatPopup(data) {
  var source = $("#popUp-template").html()
  var templater = Handlebars.compile(source)
  $popUp.html(templater(data))
  console.log(data)
}

$("body").on("click", ".article", function(e){
  e.preventDefault();
  formatPopup(content);
  console.log("clicked to open popup")
  console.log($(this).find("h3").text())

})






