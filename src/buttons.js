import { hideHappyPath, showHappyPath } from "./happy-path";
import { hideConformanceData, showConformanceData } from "./conformance";
import { hideComplianceRules, showComplianceRules } from "./compliance-rules";

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function configureButtons(bpmnVisualization) {
    let happyPathButton = new RuleButton("happy_path", () => showHappyPath(bpmnVisualization), () => hideHappyPath(bpmnVisualization));
    let conformanceDataButton = new RuleButton("conformance_data", () => showConformanceData(bpmnVisualization), () => hideConformanceData(bpmnVisualization));
    let complianceRulesButton = new RuleButton("compliance_rules", () => showComplianceRules(bpmnVisualization), () => hideComplianceRules(bpmnVisualization));

    const hideAllCallback = () => {
        happyPathButton.hide();
        conformanceDataButton.hide();
        complianceRulesButton.hide();
    }

    happyPathButton.addEventListenerOnClick(hideAllCallback);
    conformanceDataButton.addEventListenerOnClick(hideAllCallback);
    complianceRulesButton.addEventListenerOnClick(hideAllCallback);

    document.getElementById("reset_all").addEventListener("click", hideAllCallback);
}

class RuleButton {
    constructor(id, showCallback, hideCallback) {
        this.button = document.getElementById(id);
        this.dataAreShowed = false;
        this.showCallback = showCallback;
        this.hideCallback = hideCallback;
    }

    addEventListenerOnClick(hideAllCallback) {
        this.button.addEventListener("click", () => {
            if(!this.dataAreShowed) {
                hideAllCallback();
                this.showCallback();
                this.dataAreShowed = true;
            }
        });
    }

    hide() {
        if(this.dataAreShowed) {
            this.hideCallback();
            this.dataAreShowed = false;
        }
    }
}