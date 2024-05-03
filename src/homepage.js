import './styles/pages/homepage.css';
import './styles/navigation/homepage-navbar.css';

import configuration, { db } from './config.js';
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth";
import showPopup from './scripts/popup.js';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import anime from 'animejs';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const storage = getStorage();
const auth = getAuth();

configuration();

onAuthStateChanged(auth, (currentUser) => {

});

function createProjectInfo(doc) {
    const parentProjectInfoDiv = document.getElementById("projectInfo");
    const projectInfoDiv = document.createElement("div");
    projectInfoDiv.id = doc.id;
    projectInfoDiv.className = "projectInfo";
    parentProjectInfoDiv.appendChild(projectInfoDiv);
    // Close project info
    const closeAboutPage = document.createElement("img");
    closeAboutPage.id = doc.id;
    closeAboutPage.className = "closeAboutPage";
    projectInfoDiv.appendChild(closeAboutPage);
    // Project info title
    const projectInfoTitle = document.createElement("h2");
    projectInfoTitle.innerText = doc.data().title;
    projectInfoDiv.appendChild(projectInfoTitle);
    // Project info links
    const projectLinksDiv = document.createElement("div");
    projectLinksDiv.className = "projectLinks";
    projectInfoDiv.appendChild(projectLinksDiv);
    // Iterate each map element
    if (doc.data().links != null) {
        const links = new Map(Object.entries(doc.data().links));
        links.forEach((buttonText, link) => {
            console.log(buttonText);
            const projectLink = document.createElement("a");
            projectLink.href = link;
            projectLink.target = "_blank";
            projectLinksDiv.appendChild(projectLink);
            // Append the button inside the link
            const projectLinkButton = document.createElement("button");
            projectLinkButton.className = "btn-alternative";
            projectLinkButton.innerText = buttonText;
            projectLink.appendChild(projectLinkButton);
        });
    }
    // Project details
    const projectDetailsDiv = document.createElement("div");
    projectDetailsDiv.className = "projectInfoDetails";
    projectInfoDiv.appendChild(projectDetailsDiv);
    // Details
    const details = document.createElement("p");
    details.innerText = doc.data().details;
    projectDetailsDiv.appendChild(details);
    // Labels
    const labelDiv = document.createElement("div");
    labelDiv.id = "languages"; 
    labelDiv.setAttribute('style', 'text-align: center;');
    projectDetailsDiv.appendChild(labelDiv);
    // Add each label
    if (doc.data().labels != null) {
        const labels = new Map(Object.entries(doc.data().labels));
        labels.forEach((labelName, labelID) => {
            const label = document.createElement("div");
            label.id = labelID;
            label.className = "languageLabel";
            labelDiv.appendChild(label);
            // Label name
            const name = document.createElement("p");
            name.setAttribute('style', 'padding: 0px 20px; font-size: large; font-weight: bold;');
            name.innerText = labelName;
            label.appendChild(name);
        });
    }   
}

/* Load project highlights */
async function getProjectHighlights() {
    const q = query(collection(db, "projects"), where("isHighlight", "==", true), orderBy("started", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // Project banner
        const projectHighlightsDiv = document.getElementById("projectHighlights");
        const projectBannerDiv = document.createElement("div");
        projectBannerDiv.id = doc.id;
        projectBannerDiv.className = "projectBanner";
        projectHighlightsDiv.appendChild(projectBannerDiv);
        // Project text
        const projectTextDiv = document.createElement("div");
        projectTextDiv.id = doc.id;
        projectTextDiv.className = "projectText";
        // Project text title
        const projectTitle = document.createElement("h2");
        projectTitle.innerText = doc.data().title;
        projectTitle.id = doc.id;
        projectTitle.className = "projectTitle";
        projectTextDiv.appendChild(projectTitle);
        // Project text subtitle
        const projectSubtitle = document.createElement("p");
        projectSubtitle.innerText = doc.data().subtitle;
        projectSubtitle.id = doc.id;
        projectSubtitle.className = "projectSubtitle";
        projectTextDiv.appendChild(projectSubtitle);
        // Project button
        const projectButtonDiv = document.createElement("div");
        projectButtonDiv.id = doc.id;
        projectButtonDiv.className = "projectButton";
        // Project button image
        const moreInfo = document.createElement("img");
        moreInfo.id = doc.id;
        moreInfo.className = "moreInfo";
        projectButtonDiv.appendChild(moreInfo);
        // Depending on whether the text is on the left or right, it has to be appended differently
        if (doc.data().alignLeft) {
            projectBannerDiv.appendChild(projectTextDiv);
            projectBannerDiv.appendChild(projectButtonDiv);
        } else {
            projectBannerDiv.appendChild(projectButtonDiv);
            projectBannerDiv.appendChild(projectTextDiv);
        }
        // Project info
        createProjectInfo(doc);
    });
}
getProjectHighlights().then(() => {
    // Only add the images after loading the content
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

    // Remove project about icons
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

    if (document.documentElement.clientWidth < 800) {
        hideInfoButtons();
    } else {
        window.addEventListener('resize', function(event) {
            if (this.document.documentElement.clientWidth < 800) {
                hideInfoButtons();
            } else {
                showInfoButtons();
            }
        }, true);
    }
});

/* Load project */
async function getProjects() {
    const q = query(collection(db, "projects"), where("isHighlight", "==", false), orderBy("started", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // Project
        const projectsDiv = document.getElementById("projects");
        const project = document.createElement("project");
        project.id = doc.id;
        project.className = "project";
        projectsDiv.appendChild(project);
        // Title
        const title = document.createElement("h3");
        title.innerText = doc.data().title;
        project.appendChild(title);
        // Subtitle
        const subtitle = document.createElement("p");
        subtitle.setAttribute("style", "text-overflow: ellipsis;");
        subtitle.innerText = doc.data().subtitle;
        project.appendChild(subtitle);
        doc.data()
        // Project 
        createProjectInfo(doc);
    });
}
getProjects().then(() => {
    const closeRef = ref(storage, "icons/common/close.svg");
    Array.from(document.getElementsByClassName("closeAboutPage")).forEach(
        function(element, index, array) {
            getDownloadURL(closeRef).then((url) => {
                element.src = url;
            });
        }
    )

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
    Array.from(document.getElementsByClassName("project")).forEach(
        function(project, index, array) {
            project.addEventListener("click", function() {
                Array.from(document.getElementsByClassName("projectInfo")).forEach(
                    function(projectInfoElement, index, array) {
                        if (projectInfoElement.id == project.id) {
                            showProjectInfo(projectInfoElement);
                        }
                    }
                )
            });
        }
    )
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