function checkClassName(inpuClass, infoMessage) {
  const className = window[inpuClass.value];

  if(!className || typeof className !== 'function'){
    inpuClass.classList.add('is-invalid');
    infoMessage.classList.add('invalid-feedback');
    return;
  }

  const listOfinheritances = document.createElement('ol');
  const containerList = document.getElementsByClassName('list-elems')[0];

  listOfinheritances.classList.add('list-group', 'list-group-numbered');

  containerList.append(listOfinheritances);
  createListOfinheritances(listOfinheritances, className);
}

function createListOfinheritances(list, elem) {
  const elementOfChain = document.createElement('li');
  const parrent = Object.getPrototypeOf(elem);
  const parrentName = Object.getPrototypeOf(elem).name;

  elementOfChain.classList.add('list-group-item');
  elementOfChain.textContent = elem.name;
  createListOfProperties(elementOfChain, elem);
  list.append(elementOfChain);

  if(parrent && parrentName)
    createListOfinheritances(list, parrent);
  if(parrent && !parrentName){
    const elementOfChainLast = document.createElement('li');
    const nameChild = elem.name;

    elementOfChainLast.classList.add('list-group-item');
    elementOfChainLast.textContent = Object.getPrototypeOf(nameChild).__proto__.constructor.name;
    createListOfProperties(elementOfChainLast,  Object.getPrototypeOf(nameChild).__proto__.constructor);
    list.append(elementOfChainLast);
  }
}

function createListOfProperties(elementOfChain, elem) {
  const listOfProperties = document.createElement('ol');
  const arrOfProperties = Object.getOwnPropertyNames(elem);

  for (let i = 0; i < arrOfProperties.length; i++) {
    const property = arrOfProperties[i];
    const propertyElem = document.createElement('li');
    propertyElem.textContent = `${property} : ${typeof globalThis[property]}`;
    listOfProperties.append(propertyElem);
  }
  elementOfChain.append(listOfProperties);
}

(function (){
  const form = document.getElementsByClassName('formClassName')[0];
  const inpuClass = document.getElementById('inputClassName');
  const infoMessage = document.getElementsByClassName('form-text')[0];

  inpuClass.addEventListener('input', () => {
    inpuClass.classList.remove('is-invalid');
    infoMessage.classList.remove('invalid-feedback');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const containerList = document.getElementsByClassName('list-elems')[0];
    containerList.replaceChildren();
    inpuClass.value = inpuClass.value.trim();
    checkClassName(inpuClass, infoMessage);
  });
})();
