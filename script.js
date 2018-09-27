let menuBtn = document.getElementById('menu-btn')
let menu = document.querySelector('.navigation ul')
let menuModal = document.getElementById('menu-modal')

menuBtn.addEventListener('click', () => {
  if(menu.style.maxHeight == '600px'){
    menu.style.maxHeight = '0px'
    menu.style.overflow = 'hidden'
    menuModal.style.display = 'none'
  } else {
    menu.style.maxHeight = '600px'
    menu.style.overflow = 'none'
    menuModal.style.display = 'block'
  }
})

menuModal.addEventListener('click', closeMenu)

function closeMenu(){
   menu.style.maxHeight = '0px'
   menu.style.overflow = 'hidden'
   menuModal.style.display = 'none'
}

window.addEventListener("resize", function(){
  let width = window.innerWidth
  if(width > 1200){
    menu.style.maxHeight = '600px';
  } else if(width < 1200){
    menu.style.maxHeight = '0px';
  }
});




// Testing Fetching of newsroom posts
let newsroomContainer = document.getElementsByClassName('newsroom')[0]

let newsroomPosts = fetch('https://newsroom.ocfl.net/wp-json/wp/v2/posts?_embed')
.then(response => response.json())
.then(data => formatData(data))
.catch(err => console.log(err))

const formatData = (data) => {
  data.map((story,index) => {
    let newsroomContainerContainer = document.createElement('div');
    if(index === 0){
      newsroomContainerContainer.innerHTML = `<div class="newsroom-item highlight-item">
           <h5><a href="${story.link}" target="_blank">${story.title.rendered}</a></h5>
           <div class="newsroom-item-image-container">
            <img src="${story._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${story._embedded['wp:featuredmedia'][0].alt_text}" />
          </div>
            <div class="newsroom-excerpt-container">${story.excerpt.rendered} <span class="newsroom-item-learnmore"><a href="${story.link}" target="_blank">Learn more</a></span></div></div>`
    } else if(index < 3){
      newsroomContainerContainer.innerHTML = `<div class="newsroom-item">
        <h5><a href="${story.link}" target="_blank">${story.title.rendered}</a></h5>
           </div>`
    }else {
     return null; 
    }
    
    newsroomContainer.appendChild(newsroomContainerContainer); 
    
    console.log(story);
  })
  
}


// <div class="newsroom-item highlight-item">
//         <h5><a href="https://newsroom.ocfl.net/2018/09/orange-county-commissioner-jennifer-thompson-hosts-community-celebration-back-nature-wildlife-refuge/" target="_blank">Orange County Commissioner Jennifer Thompson Hosts Community Celebration at Back to Nature Wildlife Refuge</a></h5>
//            <div class="newsroom-item-image-container">
//             <img src="https://newsroom.ocfl.net/wp-content/uploads/2018/09/9-7-18-Back-to-Nature-Wildlife-Refuge-Newsroom-Story-1024x683.jpeg" alt="" />
//           </div>
//             <p>Community celebrations are meant to bring residents and officials together to acknowledge projects that have either already been completed or are about to start. On September 7, 2018, a community celebration highlighting future enhancements to the Back to Nature Wildlife Refuge took place at Eagles Roost Park. <span class="newsroom-item-learnmore"><a href="https://newsroom.ocfl.net/2018/09/orange-county-commissioner-jennifer-thompson-hosts-community-celebration-back-nature-wildlife-refuge/">Learn more</a></span></p>
            
         
//       </div>
