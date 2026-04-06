const form = document.querySelector('form');
const input = form.elements.input;

form.onsubmit = (e) => {
  e.preventDefault();
  const li = document.createElement('li');
  const btn = document.createElement('button');
  const p = document.createElement('p');

  const context = input.value.trim();
  p.innerText = context;
  btn.innerText = '완료';

  li.appendChild(p);
  li.appendChild(btn);
  document.querySelector('#todo').appendChild(li);
  input.value = '';
  btn.addEventListener('click', (e) => {
    if (btn.innerText === '완료') {
      btn.innerText = '삭제';
      document.querySelector('#done').appendChild(li);
    } else {
      li.remove();
    }
  });
};
