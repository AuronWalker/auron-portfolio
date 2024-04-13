import * as despcriptions from "./descriptions.js";
const projects = document.getElementsByClassName("project");

makeButton(projects);

function makeButton(element){
    for(var i=0; i<element.length; i++){
        element[i].addEventListener("click", function(){
            if(!this.classList.contains("active")){
                this.classList.add("active");
                createActiveDisplay(this);
                removeActiveAllButCurrent(this, element);
            }
        })
    }
}

//taking all the child elements and putting them in a div so that it gets styled properly
function createActiveDisplay(parent){
    const holder = document.createElement("div");
    const header = document.createElement("div");
    const source = document.createElement("div");
    const projectGif = document.createElement("img");

    parent.children[1].innerHTML = getProjectFullDescription(parent.id);
    
    projectGif.src = getGifSource(parent.id);
    projectGif.classList.add("project-gif");
    holder.classList.add("holder");
    header.classList.add("header");
    source.classList.add("source");
    source.innerHTML = "Source";

    header.appendChild(parent.children[0]);
    header.appendChild(source);
    holder.appendChild(header);

    changeParents(parent, holder);
    parent.appendChild(projectGif);
    parent.appendChild(holder);
    
    toggleActiveChildren(holder.children);
    toggleActiveChildren(header.children);
}

function removeActiveDisplay(parent){
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

function removeActiveAllButCurrent(current, projects){
    for(var i=0; i<projects.length; i++){
        if(projects[i].classList.contains("active") && projects[i] != current){
            removeActiveDisplay(projects[i]);
        }
    }
}

function toggleActiveChildren(projectChildren){
    for (var i = 0; i < projectChildren.length; i++) {
        var child = projectChildren[i];
        toggleActive(child);
    }
}

//not a fan that it has to be done manually but it works for now
function getGifSource(projectId){
    if(projectId = "MapMaker"){
        return "./assets/gifs/MapMaker.gif";
    }
}

function getProjectDescription(projectId){
    if(projectId = "MapMaker"){
        return despcriptions.mapMakerDescription;
    }
}
function getProjectFullDescription(projectId){
    if(projectId = "MapMaker"){
        return despcriptions.mapMakerFullDescription;
    }
}

function changeParents(currentParent, newParent){
    while(currentParent.children.length > 0){
        newParent.appendChild(currentParent.children[0]);
    }
}