const formStepsContainer = document.querySelector('#steps__container');
const numberSteps = document.querySelectorAll('.steps');
const changeBtn = document.querySelectorAll('.change-btn');

// ||----- valid form 2 -----||
const planOptions = document.querySelectorAll('.plan');
const switchOptions = document.querySelector('.switch-inp');
const monthDiscount = document.querySelectorAll('.month-discount');
const yearlyCost = document.querySelectorAll('.yearly-cost');
const monthlyCost = document.querySelectorAll('.monthly-cost');
const yearSpan = document.querySelector('.yearly');
const monthSpan = document.querySelector('.monthly');
// ||------ End form 2 -----||


// ||------ Valid form 3 -----||
const labelsOfPrices = document.querySelectorAll('.add-on-label')
// ||------ End form 3 -----||

// ||------  Form 4 --------||
const planTitle = document.querySelector('.plan-name');
const planCost = document.querySelector('.plan-cost');
const planContainer = document.querySelector('.add-ons__text');
const addOnPrices = document.querySelectorAll('.add-on-cost');

const subtotalContainer = document.querySelector('.subtotal___container');
const changePlanBtn = document.querySelector('.change-plan-btn');
const totalMonth = document.querySelector('.total-month');
const totalYear = document.querySelector('.total-year');
const totalCount = document.querySelector('.total-product');
// ||------ End Form 4 -----||


let currentStep = 1;
let stepForms = Array.from(formStepsContainer.children);
let totalPlanCost = 0;

function setStepNumber() {

    numberSteps.forEach(step => {
        step.classList.remove('active');
        if (step.innerText == currentStep) { step.classList.add('active') };
    });

    stepForms.forEach(form => {
        form.classList.remove('active-step');
        if (form.dataset.formId == currentStep) { form.classList.add('active-step'); }
    })
}

function changeCurrentStep() {
    let backBtn = document.querySelector('.change-btn.back');
    let nextBtn = document.querySelector('.change-btn.next');

    changeBtn.forEach(btn => btn.addEventListener('click', (event) => {
        if (event.target.classList.contains('next') && currentStep < 5) {
            currentStep += validateForm1(); 

            if (currentStep == 4) { btn.classList.add('confirm'); btn.innerText = 'Confirm'; }
            else { btn.classList.remove('confirm'); btn.innerText = 'Next Step'; }

            if (currentStep == 2) { backBtn.classList.add('active') }

            setStepNumber();

        } else if (event.target.classList.contains('back') && currentStep > 1) {
            currentStep -= 1;

            if (currentStep == 1) { btn.classList.remove('active') }
            if (currentStep < 4) { nextBtn.classList.remove('confirm'); nextBtn.innerText = 'Next Step' }
            setStepNumber();
        }

        if (currentStep == 5) { changeBtn.forEach(btn => btn.style.display = 'none') }
    }))
} // disable the form comment

function validateForm1() {
    const nameInp = document.getElementById('name');
    const enmailInp = document.getElementById('email');
    const phoneInp = document.getElementById('phone');
    const RegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let isValid = []; // where every valid boolean stores

    if (nameInp.value.trim() == '') {// error clause
        setErrorMsg(nameInp, 'name must be fill'); isValid.push(false);
    } else { setSuccessMsg(nameInp); isValid.push(true); }  // succed clause


    if (!RegEx.test(enmailInp.value.trim())) {
        setErrorMsg(enmailInp, 'please insert a valid email'); isValid.push(false);
    } else { setSuccessMsg(enmailInp); isValid.push(true); }

    if (phoneInp.value.trim() == "") {
        setErrorMsg(phoneInp, 'please insert a valid number'); isValid.push(false)
    } else { setSuccessMsg(phoneInp); isValid.push(true); }

    if (isValid.every(bool => bool == true) && isValid.length != 0) { return 1; }
    else { return 0; } // gotcha 

    function setErrorMsg(element, message) {
        let errorElement = element.parentElement.querySelector('.error');
        errorElement.classList.add('active-error');
        errorElement.innerText = message;
    }

    function setSuccessMsg(element) {
        let errorElement = element.parentElement.querySelector('.error');
        errorElement.classList.remove('active-error');
    }
}

function validateForm2() {
    yearlyCost.forEach(span => { span.style.display = 'none'; span.parentElement.style.display = 'none'; });
    monthlyCost.forEach(span => span.style.display = 'inline');

    planOptions[0].classList.add('active');
    ShowPlanCost(planOptions[0]);
    totalPlanCost = parseInt(planOptions[0].querySelector('.cost').innerHTML); // at first the value will be 9

    planOptions.forEach((plan) => {

        plan.addEventListener('click', () => {
            planOptions.forEach((plan) => plan.classList.remove('active'));
            plan.classList.add('active');
            ShowPlanCost(plan);

            let costOfPlans = plan.querySelectorAll('.cost');
            costOfPlans.forEach(cost => {

                if (cost.style.display === 'inline') {
                    let stringToParse = parseInt(cost.innerText);
                    totalPlanCost = stringToParse; // this set the value of the total cost 
                }
            });
        });
    });

    switchOptions.addEventListener('click', () => {
        if (switchOptions.checked) { // yearly options which affects form 3 and 4
            YearlyPlans();

            planOptions.forEach((plan) => {
                let costOfPlans = plan.querySelectorAll('.cost');
                costOfPlans.forEach(cost => {
                    if (cost.classList.contains('yearly-cost') && plan.classList.contains('active')) {
                        totalPlanCost *= 10; // this set the value of the total cost 
                        ShowPlanCost(plan);
                    }
                })
            });
            
        } else { // monthly options
            monthlyPlans();

            planOptions.forEach((plan) => {
                let costOfPlans = plan.querySelectorAll('.cost');
                costOfPlans.forEach(cost => {
                    if (cost.classList.contains('monthly-cost') && plan.classList.contains('active')) {
                        totalPlanCost /= 10;
                        ShowPlanCost(plan);
                    }
                })
            });
        }
    });
}

function validateForm3() {
    updatePrices();
    let switchState;

    switchOptions.addEventListener('click', () => {
        switchState = switchOptions.checked;

        console.log(addOnPrices);
        updatePrices(switchState);
    })

    changePlanBtn.addEventListener('click', (e) => {

        switchState = !switchOptions.checked;
        switchOptions.checked = switchState;

        e.preventDefault();
        updatePrices(switchState);
        getFacturation(switchState);

        if(!switchState) { totalMonth.style.display = 'block'; totalYear.style.display = 'none'; } 
        else { totalMonth.style.display = 'none'; totalYear.style.display = 'block' }

        getTotal(false);
        console.log(totalPlanCost);
    })
    
    labelsOfPrices.forEach(label => label.addEventListener('click', () => {
        let addOnCost = parseInt(label.querySelector('.visible').innerText);

        if (!label.previousElementSibling.checked) { totalPlanCost += addOnCost; createAddOnCost(label); }
        else { totalPlanCost -= addOnCost; removeAddOnCost(label); }

        console.log(totalPlanCost);
        getTotal(false);
    }));
}

function ShowPlanCost(plan) {
    // change the plan name
    const titleText = plan.querySelector('.plan-names');
    const planPrice = plan.querySelectorAll('.cost');

    planPrice.forEach(price => { 
        if (price.style.display != 'none') {
            planCost.innerText = price.innerText; 
        } 
    });

    planTitle.innerText = titleText.innerText;
}

function updatePrices(switchStatus = false) {
    addOnPrices.forEach(item => {
        if (switchStatus) { // year
            if (item.classList.contains('yearly-add')) {
                item.style.display = 'inline'; item.parentElement.style.display = 'inline'; item.classList.add('visible');
            } else { item.style.display = 'none'; item.parentElement.style.display = 'none'; item.classList.remove('visible'); }

        } else {
            if (item.classList.contains('monthly-add')) {
                item.style.display = 'inline'; item.parentElement.style.display = 'inline'; item.classList.add('visible');
            } else { item.style.display = 'none'; item.parentElement.style.display = 'none'; item.classList.remove('visible'); }
        }
    })
}

function getFacturation(method) {
    const addOnItems = document.querySelectorAll('.extra-plans');

    if(method) { //yearly is active
        addOnItems.forEach(item => {
            const span = item.querySelector('span');
            span.innerText = parseInt(span.innerText) * 10 + '/yr';
        });

        YearlyPlans();
        planCost.innerText = parseInt(planCost.innerText) * 10 + '/yr'; console.log('yearly');

    } else { // monthly one
        addOnItems.forEach(item => {
            const span = item.querySelector('span');
            span.innerText = parseInt(span.innerText) / 10 + '/mo';
        });

        monthlyPlans();
        planCost.innerText = parseInt(planCost.innerText) / 10 + '/mo'; console.log('monthly');
    }
    console.log(method);
}

function createAddOnCost(addOn) {

    switchOptions.addEventListener('click', () => {
        let switchState = switchOptions.checked;
        updatePrices(switchState);
    })
    console.log(addOn);

    //use the state to determine whether it is monthly oder  yearly
    const addOnContainer = document.createElement('div');
    const addOnName = document.createElement('p');
    const addOnCost = document.createElement('span');    

    // find how to add the addon class to the created element, then you can remove it
    let newClass = addOn.querySelector('.title').innerText.replace(/\s/g, '');

    addOnContainer.classList.add('extra-plans', newClass);
    addOnName.innerText = addOn.querySelector('.title').innerText;
    
    let currentCost = addOn.querySelectorAll('.add-on-cost');
    let newCost = Array.from(currentCost).find(cost => cost.classList.contains('visible'))
    console.log(addOnCost);
    addOnCost.innerText = newCost.innerText;
    
    addOnContainer.append(addOnName, addOnCost);
    subtotalContainer.append(addOnContainer);
}

function removeAddOnCost(addOn) {
    let newClass = addOn.querySelector('.title').innerText.replace(/\s/g, '');
    let addToRemove = Array.from(subtotalContainer.children)
        .find((subItem => subItem.classList.contains(newClass)))

    subtotalContainer.removeChild(addToRemove);
}

function monthlyPlans() {
    monthDiscount.forEach(textItem => textItem.style.display = 'none');
    yearlyCost.forEach(span => { span.style.display = 'none'; span.parentElement.style.display = 'none'; });
    monthlyCost.forEach(span => { span.style.display = 'inline'; span.parentElement.style.display = 'inline'; });
    monthSpan.style.fontWeight = 700; yearSpan.style.fontWeight = 400;
} // styling

function YearlyPlans() {
    monthDiscount.forEach(textItem => textItem.style.display = 'block');
    yearlyCost.forEach(span => { span.style.display = 'inline'; span.parentElement.style.display = 'inline'; });
    monthlyCost.forEach(span => { span.style.display = 'none'; span.parentElement.style.display = 'none'; });
    yearSpan.style.fontWeight = 700; monthSpan.style.fontWeight = 400;
} // pure styling

function getTotal(changeValue) {
    let localTotal = totalPlanCost;

    if(changeValue) {
        if(!switchOptions.checked) { totalCount.innerText = '+$' + localTotal / 10 + '/mo';  } // yearly access
        else { totalCount.innerText = '+$' + localTotal * 10 + '/yr'; } // monthly access
    } else {
        if(!switchOptions.checked) { totalCount.innerText = '+$' + localTotal + '/mo';  } // yearly access
        else { totalCount.innerText = '+$' + localTotal * 10 + '/yr'; } // monthly access
    }
}

setStepNumber();
changeCurrentStep();
validateForm2();
validateForm3();