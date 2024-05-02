import './styles/pages/homepage.css';
import './styles/navigation/homepage-navbar.css';

import configuration from './config.js';
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth";
import showPopup from './scripts/popup.js';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import anime from 'animejs';

const storage = getStorage();
const auth = getAuth();

configuration();

onAuthStateChanged(auth, (currentUser) => {

});

/* Type out username functionality */
function typeUsername(index, nameToTypeOut) {
    const mikemcjayDiv = document.getElementById("mikemcjay");

    function typeText(index, text) {
        return new Promise(function(resolve, reject) {
            for (let i = index; i < text.length; i++) {
                setTimeout(function() {
                    mikemcjayDiv.innerText += text.charAt(i)
                }, i * anime.random(300, 330));
            }
            setInterval(function() {
                if (mikemcjayDiv.innerText.length == text.length) {
                    if (mikemcjayDiv.innerText == text) {
                        resolve("typed");
                    } else {
                        reject(mikemcjayDiv.innerText);
                    }
                }
            }, 500);
        });
    }

    typeText(index, nameToTypeOut).then(
        (value) => { 
            const underline = document.getElementById("_")
            setInterval(() => {
                let opacity = underline.style.opacity;
                if (opacity == "0") {
                    underline.style.opacity = "1";
                }
                if (opacity == "1") {
                    underline.style.opacity = "0";
                }
            }, 1000);
         },
        (errorText) => {}
    );
}
typeUsername(0, "MikeMcJay");

/* Insert images */
const infoRef = ref(storage, "icons/common/info.svg");
Array.from(document.getElementsByClassName("moreInfo")).forEach(
    function(element, index, array) {
        getDownloadURL(infoRef).then((url) => {
            element.src = url;
        });
    }
)

const closeRef = ref(storage, "icons/common/close.svg");
Array.from(document.getElementsByClassName("closeAboutPage")).forEach(
    function(element, index, array) {
        getDownloadURL(closeRef).then((url) => {
            element.src = url;
        });
    }
)

const collectACardRef = ref(storage, "images/common/collect-a-card.gif");
Array.from(document.getElementsByClassName("projectBanner")).forEach(
    function(projectBanner, index, array) {
        if (projectBanner.id == "collectACard") {
            getDownloadURL(collectACardRef).then((url) => {
                projectBanner.style.backgroundImage = `url(${url})`;
            });
        }
    }
)

const linkedIn = document.getElementById("linkedIn");
const linkedInRef = ref(storage, "icons/common/linkedIn.png");
getDownloadURL(linkedInRef).then((url) => {
    linkedIn.src = url;
});

const gitlab = document.getElementById("gitlab");
const gitlabRef = ref(storage, "icons/common/gitlab.png");
getDownloadURL(gitlabRef).then((url) => {
    gitlab.src = url;
});

const github = document.getElementById("github");
const githubRef = ref(storage, "icons/common/github.svg");
getDownloadURL(githubRef).then((url) => {
    github.src = url;
});

/* Remove project about icons */ 
function hideInfoButtons() {
    Array.from(document.getElementsByClassName("moreInfo")).forEach(
        function(element, index, array) {
            element.style.display = "none";
        }
    )
}
function showInfoButtons() {
    Array.from(document.getElementsByClassName("moreInfo")).forEach(
        function(element, index, array) {
            element.setAttribute('style', 'display:inline !important');
        }
    )
}
function addShowInfoHandler(projectBannerElement) {
    Array.from(document.getElementsByClassName("projectInfo")).forEach(
        function(projectInfoElement, index, array) {
            if (projectBannerElement.id == projectInfoElement.id) {
                showProjectInfo(projectInfoElement);
            }
        }
    );
}
if (document.documentElement.clientWidth < 800) {
    hideInfoButtons();
} else {
    window.addEventListener('resize', function(event) {
        /* Remove button */
        if (this.document.documentElement.clientWidth < 800) {
            hideInfoButtons();
        } else {
            showInfoButtons();
        }
    }, true);
}

/* Document listeners */
// Closes the project info div
Array.from(document.getElementsByClassName("closeAboutPage")).forEach(
    function(closeButtonElement, index, array) {
        closeButtonElement.addEventListener("click", function() {
            Array.from(document.getElementsByClassName("projectInfo show")).forEach(
                function(projectInfoElement, index, array) {
                    if (projectInfoElement.id == closeButtonElement.id) {
                        projectInfoElement.className = projectInfoElement.className.replace("projectInfo show", "projectInfo");
                        const content = document.getElementById("outerContent");
                        content.className = content.className.replace("blur", "");
                        const body = document.body;
                        body.className = body.className.replace("blur", "");
                    }
                }
            )
        });
    }
)

function showProjectInfo(projectInfoElement) {
    projectInfoElement.className = projectInfoElement.className.replace("projectInfo", "projectInfo show");
    const content = document.getElementById("outerContent");
    content.className = content.className.replace("", "blur");
    const body = document.body;
    body.className = body.className.replace("", "blur");
}

// Opens the project info div
Array.from(document.getElementsByClassName("projectBanner")).forEach(
    function(projectBanner, index, array) {
        projectBanner.addEventListener("click", function() {
            Array.from(document.getElementsByClassName("projectInfo")).forEach(
                function(projectInfoElement, index, array) {
                    if (projectInfoElement.id == projectBanner.id) {
                        showProjectInfo(projectInfoElement);
                    }
                }
            )
        });
    }
)