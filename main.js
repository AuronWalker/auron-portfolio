const projects = document.getElementsByClassName("project");

makeButton(projects);

function makeButton(element){
    for(i=0; i<element.length; i++){
        element[i].addEventListener("click", function(){
            toggleActive(this);
            toggleActiveChildren(this.children);
        })
    }
}

function toggleActiveChildren(projectChildren){
    for (var i = 0; i < projectChildren.length; i++) {
        var child = projectChildren[i];
        toggleActive(child);
    }
}

function toggleActive(project){
    if(project.classList.contains("active")){
        project.classList.remove("active");
    }else{
        project.classList.add("active");
    }
}

