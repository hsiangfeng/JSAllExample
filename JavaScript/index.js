const selectArea = document.getElementById('selectArea');
const btnArea = document.getElementById('btnArea');
const listTitle = document.querySelector('#listTitle');
const list = document.querySelector('#list');
let data = [];

function getData() {
  const url = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

  axios.get(url).then((res) => {
    const cacheData = JSON.parse(res.request.response);
    data = cacheData.result.records;
    selectFilter(data);
  })
}

function selectFilter(data) {
  const cacheArr = data.map(item => item.Zone);
  const set = new Set(cacheArr);

  select.forEach((item) => {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    selectArea.append(option);
  })
}

function render(event) {
  listTitle.textContent = event.target.value;

  let str ='';

  data.forEach((item) => {
    if(item.Zone !== event.target.value) return;

    str += `<div class="col-md-6 py-2 px-1">
      <div class="card">
        <div class="card bg-dark text-white text-left">
          <img class="card-img-top bg-cover" height="155px" src="${ item.Picture1 }">
          <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .2)">
            <h5 class="card-img-title-lg">${ item.Name }</h5>
            <h5 class="card-img-title-sm">${ item.Zone }</h5>
            </div>
          </div>
          <div class="card-body text-left">
            <p class="card-p-text">
              <i class="far fa-clock fa-clock-time"></i>&nbsp;${ item.Opentime }</p>
            <p class="card-p-text">
            <i class="fas fa-map-marker-alt fa-map-gps"></i>&nbsp;${ item.Add }</p>
          <div class="d-flex justify-content-between align-items-end">
              <p class="card-p-text">
              <i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;${ item.Tel }</p>
              <p class="card-p-text"><i class="fas fa-tags text-warning"></i>&nbsp;${ item.Ticketinfo }</p>
          </div>
        </div>
      </div>
    </div>`
  })
  list.innerHTML = str;
}

getData();

selectArea.addEventListener('change', render);
btnArea.addEventListener('click', render);
