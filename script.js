let cpt_task = 1;
let draggedtask = null;

document.getElementById("task-add").addEventListener("click", () => {
    console.log("cocou");
    let txt = document.getElementById("task-name").value;
    if (txt != ""){
        let liste = document.getElementById("todo-list");
        let newtask = document.createElement("li");

        newtask.id = `li-${cpt_task}`;
        cpt_task ++;

        newtask.draggable = true;
        newtask.classList.add("todo-elt")

        let p = document.createElement("p");
        p.textContent = txt;
        newtask.appendChild(p);

        let inp = document.createElement("input");
        inp.type = "checkbox";
        newtask.appendChild(inp);

        let rem = document.createElement("button");
        rem.classList.add("todo-remove-button");
        rem.addEventListener("click", () => {
            deletetask(newtask.id)
        });

        let im = document.createElement("img");
        im.src = "images/poubelle.svg";
        rem.appendChild(im);


        newtask.appendChild(rem);

        /*drag and drop*/

        newtask.addEventListener("dragstart", () => {
            newtask.classList.add("task-dragged");
            draggedtask = newtask;
        })

        /* si survoler*/
        newtask.addEventListener("dragover", (event) => {
            event.preventDefault(); //autorise le drop

            // récupère les dimensions de l'elt survolé
            const bound = newtask.getBoundingClientRect();

            //position de la souris par rapport à la tâche survoler
            const po = event.clientY - bound.top;

            const middle = bound.height / 2;

            if(po > middle){ // insert après, ici avec befort car pas de after
                //parentnoe -> la liste des tâches
                newtask.parentNode.insertBefore(draggedtask, newtask.nextSibling);
            }
            else{
                newtask.parentNode.insertBefore(draggedtask, newtask);
            }

        // quand on lâche
        newtask.addEventListener("dragend", () => {
            draggedtask = null;
            newtask.classList.remove("task-dragged");
        })
        
        })


        liste.appendChild(newtask);

    }
});

function deletetask(id_task){
    document.getElementById(id_task).remove();
}