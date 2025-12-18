function highlightText() {
  let p_tags = document.getElementsByTagName("p");
  let q_tags = document.querySelectorAll("p.info");

  [...q_tags].forEach((q) => (q.style.fontWeight = "bold"));

  for (let p of p_tags) {
    p.style.backgroundColor = "yellow";
  }
}

function filterList() {
  const inputLm = document.getElementById("searchInput");
  const inputValue = inputLm.value.toLowerCase();
  const listItems = document.querySelectorAll("ul#suggestionsList li");

  listItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    item.style.backgroundColor = ""; // reset

    if (itemText.includes(inputValue)) {
      //   item.style.display = "";
      item.style.backgroundColor = "lightblue";
    } else {
      item.style.backgroundColor = ""; // reset
    }
  });
}
