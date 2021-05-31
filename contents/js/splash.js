animateHoverOn = element => {
  // element.classList.toggle('animate__animated');
  // element.classList.toggle('animate__shakeY');
  element.children[0].children[0].classList.remove('animate__repeat-2');
  element.children[0].children[0].classList.toggle('animate__infinite');
  // element.children[0].children[0].classList.add('animate__swing');
};

animateHoverOff = element => {
  // element.classList.toggle('animate__animated');
  // element.classList.toggle('animate__shakeY');
  element.children[0].children[0].classList.toggle('animate__infinite');
  // element.children[0].children[0].classList.toggle('animate__swing');
};
