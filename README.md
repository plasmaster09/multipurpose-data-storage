# Part 01: Prototyping our web pages 

> You can the example prototype pages on [the Github Pages site.](https://atcs-wang.github.io/inventory-webapp-01-static-prototypes/)

## (1.1) Using a front-end framework

To help avoid spending too much time on making our web pages look good, we will utilize [Materialize](https://materializecss.com/), a front-end "framework", to do a lot of the design work and decisions for us. It is an open-source library of CSS and JS that can be easily used in any web page. By incorporating Materialize's preset classes (and a short bit of JS script or two), your HTML elements will be styled to have that bold, user-friendly, "material" design that was popularized by Google product designers. Materialize can also help make pages more "responsive", or adaptive to the user's device, be it a laptop or tablet or mobile phone.

## (1.2) Building the static prototype pages

There are three HTML pages. Each was first generated with the Emmet abbreviation in VSCode (simply create an empty HTML file, type `!` and hit enter). The `title` element was changed, and the relevant parts of the Materialize library was "imported" 

For all 3 pages, Materialize's CSS and Google's material icons are linked in the `<head>`. 

```html
    <!-- Materialize CSS and Icons-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```


At the bottom of the `<body>` of `stuff.html` and `item.html` is a link to Materialize's JS, and a short "auto-initialize" script.

```html
    <!-- Materialize JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <!-- initialize Materialize elements -->
    <script> M.AutoInit();</script>
```

The main content of the pages are found in the `<body>`, above the scripts. Each page uses a number of Materialize features in its content. Relevant documentation from the [Materialize website](https://materializecss.com/) is linked for each feature.

- Every page:
    - Surrounding container `<div>` to lightly center all main content. | [container documentation](https://materializecss.com/grid.html#grid-container)
    - Icons (`<i>`) - (Materialize supports Google's Material Icons) | [icons documentation](https://materializecss.com/icons.html)
    - "Waves" effects applied to various elements. | [waves effect documentation](https://materializecss.com/waves.html)

- `index.html`, the Home page
    - Simple greeting headings. | [headers documentation](https://materializecss.com/typography.html#headers)
    - Link-"button" to Stuff Inventory page | [button documentation](https://materializecss.com/buttons.html)

- `stuff.html`, the Stuff inventory page 
    - Table of info for each item (name & quantity). | [table documentation](https://materializecss.com/table.html)
    - "INFO / EDIT" link-"button" to Item detail page and "DELETE" link-"button" (non-functional) for each item | [button documentation](https://materializecss.com/buttons.html)
    - "Add Item" form that contains:
        - Text and number inputs for name quantity | [form inputs documentation](https://materializecss.com/text-inputs.html )
        - a form submit button | [button documentation](https://materializecss.com/buttons.html#submit)
        - The form layout is done via Materialize's Grid system. | [grid documentation](https://materializecss.com/grid.html#grid-intro)

- `item.html`, the Item detail page
    - Item info in a table (name & quantity & description) | [table documentation](https://materializecss.com/table.html)
    - Text size/layout is responsive to screen size/layout. | [flow text documentation](https://materializecss.com/typography.html#flow)
    - "DELETE" link-"button" (non-functional) | [button documentation](https://materializecss.com/buttons.html)
    - Modal ("pop-up" mini-window) | [modal documentation](https://materializecss.com/modals.html)
        - "EDIT" link-"button" outside the modal that shows it
        - "NEVER MIND" link-"button" inside the modal that closes the modal. 
    - "Edit Item" form inside the modal - similar to the "Add Item" form in `stuff.html` with an additional input for description | [form inputs documentation](https://materializecss.com/text-inputs.html )

In the `stuff.html` and `item.html` pages, there is a small internal CSS stylesheet to set a few styles.  and .

```css
    /* these make the forms pop a little with a border that highlights when interacting with form inputs */
    form {
        border: solid 2px lightgrey;
        padding: 10px;
        border-radius: 5px;
    }

    form:focus-within {
        border-color: orange;
    }
    /* this makes the table rows change color when your mouse hovers over them */
    tr:hover {
        background-color: #F0F0F0;
    }
```
> You might be wondering why we aren't using external stylesheets or JS scripts, . We'll refactor and move it later; for now, its easier keeping everything related to one page in one file.

## (1.3) Optional: Publishing your prototypes 

Althoug prototypes aren't a fully working webapp yet, you can publish them for fun!

You can use [Github Pages](https://pages.github.com/) to easily publish any Github repository as a simple website. 

This creates a *static web server* that handles requests for your files. 


## (1.4) Conclusion:

In the next lesson, we'll discuss what a web server does and build our own.

Next up: [Part 02: Web app server setup and basics](https://github.com/atcs-wang/inventory-webapp-02-app-server-basics)
