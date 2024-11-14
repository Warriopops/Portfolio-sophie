// Data 

const ApiUrl = "http://localhost:5678/api/";

// Elements

const containerGallery = document.querySelector('.gallery');
const containerCategory = document.querySelector('.category-container');

// FETCH works data from API

fetch(`${ApiUrl}works`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(fetchedData => {
    data = fetchedData;
    console.log('Données récupérées :', data);
    data.forEach(work => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      containerGallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error('Il y a eu un problème avec la requête fetch :', error);
  });

  // FETCH category data from API

  fetch(`${ApiUrl}categories`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(fetchedData => {
    const data = fetchedData;
    console.log('Données récupérées :', data);
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category-element');
    categoryElement.textContent = "Tous";
    categoryElement.addEventListener('click', () => {
        fetchWorks(); 
      });
    containerCategory.appendChild(categoryElement);
    data.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category-element');
      categoryElement.textContent = category.name;
      categoryElement.addEventListener('click', () => {
        fetchWorks(category.id);
      });
      containerCategory.appendChild(categoryElement);
    });
  })
  .catch(error => {
    console.error('Il y a eu un problème avec la requête fetch :', error);
  });


// Filtrage par category

  function fetchWorks(categoryId = null) {
    console.log(categoryId)
    let url = `${ApiUrl}works`;

    if (categoryId) {
      url = `${ApiUrl}works`;
      console.log(url)
    }
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(worksData => {
        const containerGallery = document.querySelector('.gallery');
        containerGallery.innerHTML = '';
        worksData.forEach(work => {
            if ( categoryId === work.categoryId){
                console.log(work)
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const figcaption = document.createElement('figcaption');
                img.src = work.imageUrl;
                img.alt = work.title;
                figcaption.textContent = work.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                containerGallery.appendChild(figure);
            }
            else if (categoryId == null) {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const figcaption = document.createElement('figcaption');
                img.src = work.imageUrl;
                img.alt = work.title;
                figcaption.textContent = work.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                containerGallery.appendChild(figure);
            }
        });
      })
      .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch pour les works :', error);
      });
  }