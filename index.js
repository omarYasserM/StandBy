const btn = document.getElementById("btn1");
const name1 = document.getElementById("text1");
var list1 = [
  {
    url: "https://assets.mspimages.in/wp-content/uploads/2020/12/Google-Photos.jpg",
    name: "Test",
  },
  {
    url: "https://assets.mspimages.in/wp-content/uploads/2020/12/Google-Photos.jpg",
    name: "Test",
  },
  {
    url: "https://assets.mspimages.in/wp-content/uploads/2020/12/Google-Photos.jpg",
    name: "Test",
  },
];

btn.onclick = () => {
  const myList = document.getElementById("myList");
  list1.push(name1.value);

  var html = "";

  list1.map((name) => {
    html += `<li><img src="${name}" alt="test"></li>`;
  });

  myList.innerHTML = html;
};
