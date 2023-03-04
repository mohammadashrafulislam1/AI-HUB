const loadCards = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url).then((res) => res.json()).then(data => displayCards(data.data.tools, dataLimit));
};

const displayCards = (cards, dataLimit) => {
  // log the cards array to the console
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.textContent = '';
  
  // display 6 cards only 
  const showAll = document.getElementById('show-all');
  if(dataLimit && cards.length > 6) {
      cards = cards.slice(0, 6);
      showAll.classList.remove('d-none');
  }
  else{
      showAll.classList.add('d-none');
  }

  // Show All Element by forEach
  cards.forEach(element => {
    const cardDiv  = document.createElement('div');
      cardDiv.classList.add('col');
     cardDiv.innerHTML = `
      <div class="card p-3">
          <img src="${element.image}" class="card-img-top rounded" style="width:100%; height:200px;" alt="...">
          <div class="card-body">
              <h5 class="card-title">Features:</h5>
              <ol class="card-text">
              <li> ${element.features[0]}</li>
              <li> ${element.features[1]}</li>
              <li id="3rd-element-f"> ${element.features[2] ? element.features[2] : ''}</li>
              <li id="4th-element-f"> ${element.features[3] ? element.features[3] :''}</li>
              </ol>
              <hr>
              <h5>${element.name}</h5>
              <div class="d-flex justify-content-between">
              <div><p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p></div>
              
              <div class="bg-warning-subtle p-2 px-3 rounded-5 text-danger"  type="button"  data-bs-target="#detailsModal" data-bs-toggle="modal" onclick="showDetails('${element.id}')"><i class="fa-solid fa-chevron-right"></i></div>
              </div>
              
          </div>
      </div>
      `
      cardsContainer.appendChild(cardDiv);
    // Card Feature Undefine none
  const fourthElementFeature =document.getElementById('4th-element-f');
  
  if(element.features[3] === undefined){
   fourthElementFeature.classList.add('d-none');
  }
  else{
    fourthElementFeature.classList.remove('d-none')
  };

  const idElementFeature = document.getElementById('3rd-element-f')
  if(element.features[2] === undefined){
    idElementFeature.classList.add('d-none')
  }
  else{
    idElementFeature.classList.remove('d-none')
  }
  });

// Sort By Date
const sorting =(a, b) =>{
  const DateA = new Date(a.published_in);
  const DateB = new Date(b.published_in);
  if(DateA > DateB){
    return 1;
  }
  else if(DateA < DateB){
    return -1;
  }
  else{
    return 0;
  }
};
document.getElementById('sort').addEventListener('click', function(){
  displayCards(cards.sort(sorting));
})
   // stop spinner or loader
   toggleSpinner(false);
  
  
};
const showDetails = id =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url).then(res => res.json()).then(data => displayCardsDetails(data.data));
  // console.log(url)
}
const displayCardsDetails = card =>{
  // console.log(card.features[4].feature_name)

  const cardsDetailsLeft = document.getElementById('left-section');
  cardsDetailsLeft.innerHTML=`
  <h4>${card.description}</h4>
  <div class="d-flex gap-2 text-center flex-column flex-md-row flex-lg-row" id="pricing">
  <div class="bg-white p-4 rounded-4 text-success" id="Basic-plan"><h5>${card.pricing ? card.pricing[0].price : 'Free of Cost'}</h5><h5>${card.pricing ? card.pricing[0].plan:'free'}</h5></div>
  <div class="bg-white p-4 rounded-4 text-warning" id="Pro-plan"><h5>${card.pricing ? card.pricing[1].price : 'free of Cost'}</h5><h5>${card.pricing ? card.pricing[1].plan : 'Pro'}</h5></div>
  <div class="bg-white p-4 rounded-4 text-danger" id="Pla-plan"><h5>${card.pricing ? card.pricing[2].price:'free of cost'}</h5><h5>${card.pricing ? card.pricing[2].plan :'Enterprise'}</h5></div>
</div>

 <div class="mt-5 d-flex gap-5">
 <div>
 <h5>Features</h5>
 <ul>
 <li>${card.features ? card.features[1].feature_name :'No Feature'}</li>
 <li>${card.features ? card.features[2].feature_name :'No Feature'}</li>
 <li>${card.features ? card.features[3].feature_name :'No Feature'}</li>
 <li id="4th-feature">${card.features[4] ? card.features[4].feature_name :''}</li>
 </ul>
 </div>

 <div>
 <h5>Integrations</h5>
 <ul  id="integrations">
 <li>${card.integrations ? card.integrations[0] : ''}</li>
 <li id="2nd-integration">${card.integrations ? card.integrations[1] : ''}</li>
 <li id="3rd-integration">${card.integrations ? card.integrations[2] : ''}</li>
 <li id="4th-integration">${card.integrations ? card.integrations[3] : ''}</li>

 </ul>
 </div>
 </div>
  `;

  const cardsDetailsRight = document.getElementById('right-section');
  cardsDetailsRight.innerHTML =`
  <div class="card p-3">
      <div class="position-relative">
      <img src="${card.image_link[0]}" class="card-img-top rounded" style="width:350px;height:300px;" alt="...">
      <div class="bg-danger text-white px-2 rounded position-absolute end-0 top-0 mt-2 me-2" id="accuracy">${card.accuracy.score*100}% accuracy</div>
      </div>
      <div class="card-body">
          <h5>${card.input_output_examples ? card.input_output_examples[0].input : ''}</h5>
          <p>${card.input_output_examples ? card.input_output_examples[0].output :''}</p>
          
      </div>
  </div>
  `;
  // Acuracy Score Null none
  const accuracy = document.getElementById('accuracy')
  if( card.accuracy.score === null){
    accuracy.classList.add('d-none');
  }
  else{
    accuracy.classList.remove('d-none');
  };
  // Integration
  const integrations =document.getElementById('integrations');
  if(card.integrations === null){
   integrations.innerHTML= `<h4 class="text-danger">No Data</h4>`;
  }
  const fourthIntegration = document.getElementById('4th-integration');
  if(card.integrations[3] === undefined){
   fourthIntegration.classList.add('d-none');
  }
  const thridIntegration = document.getElementById('3rd-integration');
  if(card.integrations[2] === undefined){
    thridIntegration.classList.add('d-none');
   }
   const secondIntegration = document.getElementById('2nd -integration');
  if(card.integrations[1] === undefined){
    secondIntegration.classList.add('d-none');
   };
  // Feature Undefine Display None
  const fourthFeature = document.getElementById('4th-feature');
  if(card.integrations[3] === undefined){
   fourthFeature.classList.add('d-none');
  };
  // Price No cost Changed to Free of Cost
  const basicPlan = document.getElementById('Basic-plan');
  const proPlan = document.getElementById('Pro-plan');
  const plaPlan = document.getElementById('Pla-plan');
  if(card.pricing[0].price === '0' || card.pricing[0] === 'No cost' ){
   basicPlan.innerHTML=`
   <h5>Free Of Cost</h5>
   `}
   else if(card.pricing[1].price === '0' || card.pricing[1].price === 'No cost' ){
   proPlan.innerHTML=`
   <h5>Free Of Cost</h5>
   `}
   else if(card.pricing[2] === 'No cost'||  card.pricing[2] === '0'){
   plaPlan.innerHTML=`
   <h5>Free Of Cost</h5>
   `
  }
  else{
    return;
  };

 
};

// load show All
document.getElementById('btn-show-all').addEventListener('click', function(){
  loadCards();
  
});


// Spinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}
toggleSpinner(true);
showDetails();
loadCards(6);
