const openNewWindow = async () => {
  const information = document.getElementById('input');
  if (!information.value) return;
  await window.electron.openNewWindow(information.value);
};

document.querySelector('button').addEventListener('click', openNewWindow);
