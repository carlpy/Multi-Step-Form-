# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- SCSS custom properties
- Flexbox
- SCSS
- Mobile-first workflow

### What I learned

while making this proyect i developed my skills to a next level which i think wasn't posible, until i finished it and fullfill my ambitions of learning and never stop

```scss
@media only screen and (min-width: $lg) {

        & { flex: .85; margin: 0 auto; }
        
        .btn__container { 
            bottom: 1rem; right: 0;
            display: flex;
            justify-content: space-between;
        }
    }
```

```js
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
```


### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [MDN Mozilla developer](https://developer.mozilla.org/en-US/) - this source helped me a lot to review some javascript concepts such as arrays, array method, js events, html5 markup, etc.

- [Freecodecamp](https://www.freecodecamp.org) - This is an amazing site which helped me through examples to figure out solution to my main problems in this way

## Author

- Frontend Mentor - [@carlpy](https://www.frontendmentor.io/profile/carlpy)

## Acknowledgments

i want to thank all my friends who helped me through this proyect which was thought but extremely satisfying to complete
