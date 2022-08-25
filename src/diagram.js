import { BpmnVisualization } from "bpmn-visualization";

import subDiagram from "./diagrams/SRM-subprocess.bpmn?raw";
import { removeSectionInBreadcrumb, addSectionInBreadcrumb } from "./breadcrumb";

let secondaryBpmnDiagramIsAlreadyLoad = false;
let currentView = 'main';

// Secondary BPMN Container
const secondaryBpmnVisualization = new BpmnVisualization({ container: 'secondary-bpmn-container' });


export function loadBpmnDiagram(tabIndex) {
    if (currentView === tabIndex) {
        return;
    }
    //document.querySelector("#main-bpmn-container")

    const mainBPMNContainerElt = document.getElementById('main-bpmn-container');
    const secondaryBPMNContainerElt = document.getElementById('secondary-bpmn-container');

    switch(tabIndex) {
        case 'main':
            removeSectionInBreadcrumb();
            mainBPMNContainerElt.classList.remove('hide');
            secondaryBPMNContainerElt.classList.add('hide');
            break;
        case 'secondary':
            addSectionInBreadcrumb();
            mainBPMNContainerElt.classList.add('hide');
            secondaryBPMNContainerElt.classList.remove('hide');

            if(!secondaryBpmnDiagramIsAlreadyLoad) {
                // Load secondary diagram. Need to have the container displayed
                secondaryBpmnVisualization.load(subDiagram, { fit: {type: 'Center', margin: 10 } });
                secondaryBpmnDiagramIsAlreadyLoad = true;
            }
            break;
    }

    currentView = tabIndex;
}