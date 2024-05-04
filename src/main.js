import * as despcriptions from "./descriptions.js";
const projects = document.getElementsByClassName("project");
const folders = document.getElementsByClassName("folder");

makeButton(projects);
makeButton(folders);

function makeButton(element){
    for(var i=0; i<element.length; i++){
        element[i].addEventListener("click", function(){
            if(!this.classList.contains("active")){
                this.classList.add("active");
                if(this.classList.contains("project")){
                    createActiveDisplayProject(this);
                    removeActiveAllButCurrent(this, projects);
                    removeActiveAllButCurrent(this, folders);
                }else if(this.classList.contains("folder")){
                    createActiveDisplayFolder(this);
                    removeActiveAllButCurrent(this, projects);
                    removeActiveAllButCurrent(this, folders);
                }
            }
        })
    }
}

//taking all the child elements and putting them in a div so that it gets styled properly
function createActiveDisplayProject(parent){
    const holder = document.createElement("div");
    const header = document.createElement("div");
    const sourceLink = document.createElement("a");
    const projectGif = document.createElement("img");

    parent.children[1].innerHTML = getProjectFullDescription(parent.id);
    
    projectGif.src = getGifSource(parent.id);
    projectGif.classList.add("project-gif");
    holder.classList.add("holder");
    header.classList.add("header");

    
    sourceLink.classList.add("source");
    sourceLink.innerHTML = "Source";
    //Don't forget to make it scalable :)
    sourceLink.setAttribute("href", "https://github.com/WigglyGull/Map-Maker");
    sourceLink.setAttribute("target", "_blank");

    header.appendChild(parent.children[0]);
    header.appendChild(sourceLink);
    holder.appendChild(header);

    changeParents(parent, holder);
    parent.appendChild(projectGif);
    parent.appendChild(holder);
    
    toggleActiveChildren(holder.children);
    toggleActiveChildren(header.children);
}

function removeActiveDisplayProject(parent){
    const holder = parent.getElementsByClassName("holder");
    const projectGif = parent.getElementsByClassName("project-gif");
    const header = holder[0].getElementsByClassName("header");

    parent.classList.remove("active");

    parent.appendChild(header[0].children[0]);
    holder[0].removeChild(header[0]);
    changeParents(holder[0], parent);

    parent.removeChild(projectGif[0]);
    parent.removeChild(holder[0]);
    
    parent.children[1].innerHTML = getProjectDescription(parent.id);
    toggleActiveChildren(parent.children);
}

function createActiveDisplayFolder(parent){
    const holder = document.createElement("div");
    const length = getFolderLength(parent.id);
    const img = parent.getElementsByClassName("folder-image");

    parent.children[1].children[1].innerHTML = getProjectFullDescription(parent.id);
    toggleActiveChildren(parent.children[1].children);
    
    holder.classList.add("folder-holder");

    for (var i = 0; i < length; i++) {
        const link = document.createElement("a");
        const newItem =  document.createElement("div");
        newItem.classList.add("folder-item");
        newItem.innerHTML = getFolderProjectName(parent.id, i);

        link.setAttribute("href", getFolderProjectLink(parent.id, i));
        link.setAttribute("target", "_blank");
        link.appendChild(newItem);
        holder.appendChild(link);
    }
    parent.removeChild(img[0]);
    parent.insertBefore(holder, parent.firstChild);
}

function removeActiveDisplayFolder(parent){
    const holder = parent.getElementsByClassName("folder-holder");
    const folderImg = document.createElement("img");

    parent.classList.remove("active");

    folderImg.src = getGifSource(parent.id);
    folderImg.classList.add("folder-image");

    parent.removeChild(holder[0]);
    parent.insertBefore(folderImg, parent.firstChild);
    
    parent.children[1].children[1].innerHTML = getProjectDescription(parent.id);
    toggleActiveChildren(parent.children[1].children);
}

function removeActiveAllButCurrent(current, projects){
    for(var i=0; i<projects.length; i++){
        if(projects[i].classList.contains("active") && projects[i] != current){
            if(projects[i].classList.contains("project")) removeActiveDisplayProject(projects[i]);
            else removeActiveDisplayFolder(projects[i]);
        }
    }
}

function toggleActiveChildren(projectChildren){
    for (var i = 0; i < projectChildren.length; i++) {
        var child = projectChildren[i];
        toggleActive(child);
    }
}

function toggleActive(project){
    if(project.classList.contains("active")) project.classList.remove("active");
    else project.classList.add("active");
}

//All of these are sperate functions to make scalability easier when adding more projects :)
function getGifSource(projectId){
    if(projectId == "MapMaker") return "./assets/gifs/MapMaker.gif";
    else if(projectId == "Prototypes") return "./assets/svgs/folder.svg";
}

function getProjectDescription(projectId){
    if(projectId == "MapMaker") return despcriptions.mapMakerDescription;
    else if(projectId =="Prototypes") return despcriptions.prototypesDescription;
}

function getProjectFullDescription(projectId){
    if(projectId == "MapMaker") return despcriptions.mapMakerFullDescription;
    else if(projectId == "Prototypes") return despcriptions.prototypesFullDescription;
}

function getFolderLength(projectId){
    if(projectId == "Prototypes") return 3;
}

function getFolderProjectName(projectId, currentItem){
    if(projectId == "Prototypes"){
        if(currentItem == 0) return despcriptions.prototypesItem1;
        else if(currentItem == 1) return despcriptions.prototypesItem2;
        else if(currentItem == 2) return despcriptions.prototypesItem3;
    }
}

function getFolderProjectLink(projectId, currentItem){
    if(projectId == "Prototypes"){
        if(currentItem == 0) return despcriptions.prototypesLink1;
        else if(currentItem == 1) return despcriptions.prototypesLink2;
        else if(currentItem == 2) return despcriptions.prototypesLink3;
    }
}

function changeParents(currentParent, newParent){
    while(currentParent.children.length > 0){
        newParent.appendChild(currentParent.children[0]);
    }
}