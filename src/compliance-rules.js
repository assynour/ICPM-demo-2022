import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const registeredBpmnElements = new Map();
const bpmnContainerElt = window.document.getElementById("bpmn-container");

// tippy global configuration
tippy.setDefaultProps({
  content: "Loading...",
  allowHTML: true,
  onShow(instance) {
    instance.setContent(getContent(instance.reference));
  },
  onHidden(instance) {
    instance.setContent("Loading...");
  },

  // don't consider `data-tippy-*` attributes on the reference element as we fully manage tippy with javascript
  // and we cannot update the reference here as it is generated by bpmn-visualization
  ignoreAttributes: true,

  // https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
  // modifiers: [
  //     {
  //         name: 'computeStyles',
  //         options: {
  //             adaptive: false, // true by default
  //         },
  //     },
  // ],
  // popperOptions: {
  //     strategy: 'fixed',
  // },

  // https://atomiks.github.io/tippyjs/v6/all-props/#placement

  // https://atomiks.github.io/tippyjs/v6/all-props/#inlinepositioning
  // inlinePositioning: true,

  // https://atomiks.github.io/tippyjs/v6/all-props/#interactive
  interactive: true

  // https://atomiks.github.io/tippyjs/v6/all-props/#movetransition
  // custom transition --> not needed
  // moveTransition: 'transform 0.2s ease-out',
});

export function showComplianceRules(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.addCssClasses(
    "Activity_0yabbur",
    "rule-violation"
  );

  bpmnVisualization.bpmnElementsRegistry.addCssClasses(
    "Activity_1u4jwkv",
    "rule-violation"
  );

  //on click, show activities that are affected by the violation rule
  const violActivityElt1 = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
    "Activity_0yabbur"
  )[0].htmlElement;

  violActivityElt1.children[0].onclick = () => {
    /*bpmnVisualization.bpmnElementsRegistry.addCssClasses(
      "Activity_0yabbur",
      "highlight-rule-violation-level1"
    );

    bpmnVisualization.bpmnElementsRegistry.addCssClasses(
      "Activity_1u4jwkv",
      "pulse-rule-violation-level2"
    );
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(
      "Activity_00vbm9s",
      "pulse-rule-violation-level3"
    );*/
    //add overlays and tiptools showing more info
    addPopover(
      bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
        "Activity_0yabbur"
      ),
      bpmnVisualization
    );

    addPopover(
      bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
        "Activity_1u4jwkv"
      ),
      bpmnVisualization
    );
  };

  //add ripple circles on activities of the violation rules
  const activities = ["Activity_0yabbur", "Activity_1u4jwkv"];
  activities.forEach(function (activityId, index) {
    addRippleCircles(activityId, bpmnVisualization);
  });
  console.log(violActivityElt1);
}

function addRippleCircles(activityId, bpmnVisualization) {
  const svgHtmlElement = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
    activityId
  )[0].htmlElement;

  var x = parseInt(svgHtmlElement.children[0].getAttribute("x"), 10);
  var y = parseInt(svgHtmlElement.children[0].getAttribute("y"), 10);
  var width = parseInt(svgHtmlElement.children[0].getAttribute("width"), 10);
  var height = parseInt(svgHtmlElement.children[0].getAttribute("height"), 10);
  x = x + Math.floor(width / 1.2);
  y = y + Math.floor(height / 1.2);

  const circle1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle1.setAttribute("class", "rp1");
  circle1.setAttribute("cx", x);
  circle1.setAttribute("cy", y);
  circle1.setAttribute("r", "1");
  circle1.setAttribute("pointer-events", "all");
  circle1.style.stroke = "red";
  circle1.style.fill = "none";
  circle1.style.strokeWidth = "4px";

  const circle2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle2.setAttribute("class", "rp2");
  circle2.setAttribute("cx", x);
  circle2.setAttribute("cy", y);
  circle2.setAttribute("r", "6");
  circle2.setAttribute("pointer-events", "all");
  circle2.style.stroke = "red";
  circle2.style.fill = "none";
  circle2.style.strokeWidth = "2px";

  const circle3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle3.setAttribute("class", "rp3");
  circle3.setAttribute("cx", x);
  circle3.setAttribute("cy", y);
  circle3.setAttribute("r", "10");
  circle3.setAttribute("pointer-events", "all");
  circle3.style.stroke = "red";
  circle3.style.fill = "none";
  circle3.style.strokeWidth = "2px";

  svgHtmlElement.appendChild(circle1);
  svgHtmlElement.appendChild(circle2);
  svgHtmlElement.appendChild(circle3);

  /*var myanim = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );

  myanim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  myanim.setAttribute("id", "myAnimation2");
  myanim.setAttribute("attributeName", "stroke-width");
  myanim.setAttribute("values", "5;15");
  myanim.setAttribute("dur", "1.5s");
  myanim.setAttribute("begin", "0s");
  myanim.setAttribute("repeatCount", "indefinite");
  svgHtmlElement.children[0].appendChild(myanim);

  myanim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  myanim.setAttribute("id", "myAnimation6");
  myanim.setAttribute("attributeName", "opacity");
  myanim.setAttribute("values", "1;0");
  myanim.setAttribute("dur", "1.5s");
  myanim.setAttribute("begin", "0s");
  myanim.setAttribute("repeatCount", "indefinite");
  svgHtmlElement.appendChild(myanim);

  myanim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  myanim.setAttribute("id", "myAnimation7");
  myanim.setAttribute("attributeName", "width");
  myanim.setAttribute("values", "50;100");
  myanim.setAttribute("dur", "1.5s");
  myanim.setAttribute("begin", "0s");
  myanim.setAttribute("repeatCount", "indefinite");
  svgHtmlElement.children[0].appendChild(myanim);

  myanim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  myanim.setAttribute("id", "myAnimation8");
  myanim.setAttribute("attributeName", "height");
  myanim.setAttribute("values", "50;80");
  myanim.setAttribute("dur", "1.5s");
  myanim.setAttribute("begin", "0s");
  myanim.setAttribute("repeatCount", "indefinite");
  svgHtmlElement.children[0].appendChild(myanim);

  document.getElementById("myAnimation1").beginElement();
  document.getElementById("myAnimation2").beginElement();
  document.getElementById("myAnimation6").beginElement();
  document.getElementById("myAnimation7").beginElement();
  document.getElementById("myAnimation8").beginElement();*/
}

function addPopover(bpmnElements, bpmnVisualization) {
  registerBpmnElements(bpmnElements);
  // Set the cursor to mark the elements as clickable
  /*bpmnVisualization.bpmnElementsRegistry.addCssClasses(
    bpmnElements.map((element) => element.bpmnSemantic.id),
    "c-hand"
  );*/

  const htmlElements = bpmnElements.map((elt) => elt.htmlElement);
  tippy(htmlElements, {
    theme: "violation",
    // sticky option behavior with this appendTo
    // The following is only needed to manage diagram navigation
    // Current issue while pan, the dimension of the popper changed while dragging which may also wrongly trigger a flip
    // during the pan and then, an new flip after dimensions are restored
    // for issue on pan, this may help: https://github.com/atomiks/tippyjs/issues/688

    // Notice that we cannot have the same configuration when we trigger on mouseover/focus or on click

    // When trigger on click
    // 'reference': work with zoom (do not move the popper), but disappear on pan, mainly vertical pan (translation computation issue)
    // 'popper': do not move on zoom, move on pan but also change the dimension of the tooltip while pan)
    appendTo: bpmnContainerElt,

    // When trigger on click
    // when using this, no resize issue on pan, but no more flip nor overflow. We can however use sticky: 'reference' with is better
    // It is almost ok when trigger on mouse over/focus as even if there is still an overflow issue, the tooltip disappear right
    // after the bpmn element is no more displayed after overflow
    //appendTo: bpmnContainerElt.parentElement,

    // https://atomiks.github.io/tippyjs/v6/all-props/#sticky
    // This has a performance cost since checks are run on every animation frame. Use this only when necessary!
    // enable it
    //sticky: true,
    // only check the "reference" rect for changes
    sticky: "reference",
    // only check the "popper" rect for changes
    // sticky: 'popper',

    duration: 400,
    delay: [200, 400],

    trigger: "click"
  });
}

function registerBpmnElements(bpmnElements) {
  bpmnElements.forEach((elt) =>
    registeredBpmnElements.set(elt.htmlElement, elt.bpmnSemantic)
  );
}

function getContent(htmlElement) {
  const bpmnSemantic = registeredBpmnElements.get(htmlElement);
  if (bpmnSemantic.id === "Activity_0yabbur") {
    return `<div class="bpmn-popover">
    <b style="color:white">Precedence Rule Violation info:</b>
    <table border="1" bordercolor="white"  style="text-align:center; border-collapse:collapse;">
  <tr style="color:white">
    <th>Preceding activity</th>
    <th>#violations</th>
    <th>%traces</th>
  </tr>
  <tr>
    <td>Record Goods Receipt</td>
    <td>31</td>
    <td>5.80</td>
  </tr>
  <tr>
  <td>Record Invoice Receipt</td>
  <td>3</td>
  <td>0.67</td>
</tr>
</table>
    </div>`;
  } else if (bpmnSemantic.id === "Activity_1u4jwkv") {
    return `<div class="bpmn-popover">
    <b style="color:white">Precedence Rule Violation info:</b>
    <table border="1" bordercolor="white"  style="text-align:center; border-collapse:collapse;">
  <tr style="color:white">
    <th>Preceding activity</th>
    <th>#violations</th>
    <th>%traces</th>
  </tr>
  <tr>
    <td>Record Goods Receipt</td>
    <td>55</td>
    <td>6.88</td>
  </tr>
</table>
    </div>`;
  }
}

export function hideComplianceRules() {
  removeRippleCircles();
}

function removeRippleCircles() {
  var circles = document.querySelectorAll(".rp1");
  circles.forEach((circle) => {
    circle.remove();
  });

  circles = document.querySelectorAll(".rp2");
  circles.forEach((circle) => {
    circle.remove();
  });

  circles = document.querySelectorAll(".rp3");
  circles.forEach((circle) => {
    circle.remove();
  });
}