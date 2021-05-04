const stories = document.querySelector('.stories');

const median = stories.offsetLeft + stories.clientWidth / 2;

const state = {
  current_story: stories.firstElementChild.lastElementChild,
};

const navigateStories = (direction) => {
  const story = state.current_story;
  const lastItemInUserStory = story.parentNode.firstElementChild;
  const firstItemInUserStory = story.parentNode.lastElementChild;
  const hasNextUserStory = story.parentElement.nextElementSibling;
  const hasPrevUserStory = story.parentElement.previousElementSibling;

  console.log(lastItemInUserStory === story);

  if (direction === 'next') {
    if (lastItemInUserStory === story && !hasNextUserStory) {
      console.log('bringin in new story');
      return;
    } else if (lastItemInUserStory === story && hasNextUserStory) {
      state.current_story =
        story.parentElement.nextElementSibling.lastElementChild;
      console.log('bringin in new story');
      story.parentElement.nextElementSibling.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      console.log('bringin in new story');
      story.classList.add('seen');
      state.current_story = story.previousElementSibling;
    }
  } else if ((direction = 'prev')) {
    if (firstItemInUserStory === story && !hasPrevUserStory) {
      return;
    } else if (firstItemInUserStory === story && hasPrevUserStory) {
      state.current_story =
        story.parentElement.previousElementSibling.firstElementChild;
      story.parentElement.previousElementSibling.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      story.nextElementSibling.classList.remove('seen');
      state.current_story = story.nextElementSibling;
    }
  }
};

stories.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'ARTICLE') {
    return;
  }

  navigateStories(e.clientX > median ? 'next' : 'prev');
});

document.addEventListener('keydown', ({ key }) => {
  if (key !== 'ArrowDown' || key !== 'ArrowUp')
    navigateStories(key === 'ArrowDown' ? 'next' : 'prev');
});
