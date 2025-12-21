function handleClick(event) {
  if (event?.target?.tagName === "LI") {
    console.log("List item clicked:", event?.target?.textContent);
  }
}

// Attach event listener to the parent element
const list = document.getElementById("myList");
list.addEventListener("click", handleClick);
