const temp_list = [
  {
    thumbnail: "https://img.youtube.com/vi/YqQx75OPRa0/0.jpg",
    name: "Beginning Graphic Design: Fundamentals",
    link: "https://www.youtube.com/watch?v=YqQx75OPRa0",
    level: 0,
  },
  {
    thumbnail: "https://img.youtube.com/vi/sByzHoiYFX0/0.jpg",
    name: "Beginning Graphic Design: Typography",
    link: "https://www.youtube.com/watch?v=sByzHoiYFX0",
    level: 0,
  },
  {
    thumbnail: "https://img.youtube.com/vi/_2LLXnUdUIc/0.jpg",
    name: "Beginning Graphic Design: Color",
    link: "https://www.youtube.com/watch?v=_2LLXnUdUIc",
    level: 0,
  },
  {
    thumbnail: "https://img.youtube.com/vi/0fvEFIkT7pM/0.jpg",
    name: "Improve Your Typography: Poster Design Critique",
    link: "https://www.youtube.com/watch?v=0fvEFIkT7pM",
    level: 1,
  },
  {
    thumbnail: "https://img.youtube.com/vi/wbMQP6lYBHM/0.jpg",
    name: "Rethinking the Client Dynamic— Improve the process for a better experience",
    link: "https://www.youtube.com/watch?v=wbMQP6lYBHM",
    level: 1,
  },
];
const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

temp_list.map((item) => {
  const courses = document.getElementsByClassName("courses");
  const course = document.createElement("div");
  course.innerHTML = `<img src="${item.thumbnail}" alt="${item.name}"><span>${item.name}</span>`;
  if (item.level == 0) insertAfter(document.getElementById("level-0"), course);
  else insertAfter(document.getElementById("level-1"), course);
});
