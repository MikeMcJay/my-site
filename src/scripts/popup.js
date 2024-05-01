// Ensure the object id is called 'popup'
export default function showPopup(message, isError) {
    var popup = document.getElementById("popup");
    if (isError) {
        // Errors should be coloured appropriately
        popup.style.backgroundColor = "#ff3655";
    } else {
        popup.style.backgroundColor = '#414436';
    }
    popup.innerHTML = message;
    popup.className = "show";
    // Timeout => How long the popup is viewed
    setTimeout(function(){ popup.className = popup.className.replace("show", ""); }, 5000);
}