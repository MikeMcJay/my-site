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
const collectACardDiv = document.getElementById("collectACard");
const collectACardRef = ref(storage, "images/common/collect-a-card.gif");
getDownloadURL(collectACardRef).then((url) => {
    collectACardDiv.style.backgroundImage = `url(${url})`;
});

const linkedIn = document.getElementById("linkedIn");
const linkedInRef = ref(storage, "images/icons/linkedIn.png");
getDownloadURL(linkedInRef).then((url) => {
    linkedIn.src = url;
});

const gitlab = document.getElementById("gitlab");
const gitlabRef = ref(storage, "images/icons/gitlab.png");
getDownloadURL(gitlabRef).then((url) => {
    gitlab.src = url;
});

const github = document.getElementById("github");
const githubRef = ref(storage, "images/icons/github.svg");
getDownloadURL(githubRef).then((url) => {
    github.src = url;
});

if (this.document.documentElement.clientWidth < 800) {

} else {
    window.addEventListener('resize', function(event) {
        /* Remove button */
        if (this.document.documentElement.clientWidth < 800) {
            
        }
    }, true);
}