import './style.css';
import kebabMenu from './kebab-menu.svg';
import enterIcon from './enter-icon.svg';
import refreshIcon from './Refresh_icon.svg';

const toDoLists = [
  {
    description: 'Go to Gym',
    completed: false,
    index: 1,
  },
  {
    description: 'Wash my Car',
    completed: false,
    index: 2,
  },
  {
    description: 'Go to Cinema',
    completed: false,
    index: 3,
  },
];

const listItems = document.querySelector('.list-items');

const refreshImg = document.querySelector('.refresh-icon');
refreshImg.src = refreshIcon;

const enterImg = document.querySelector('.enter-icon');
enterImg.src = enterIcon;

const populateLists = () => {
  toDoLists.forEach((list) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = ` <div>
        <input type="checkbox"></input>
        <p>${list.description}</p>
      </div>
      <img src="${kebabMenu}" alt="Kebab-menu" class="kebab-icon">
    `;
    listItems.appendChild(listItem);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  populateLists();
});
