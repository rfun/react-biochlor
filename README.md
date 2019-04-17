# Biochlor Web

[Biochlor](https://www.epa.gov/water-research/biochlor-natural-attenuation-decision-support-system) is a utility written by the EPA based on openly available analytical solutions to understanding the movement of groundwater contaminants and estimating plume size for further studies. This utility is critical to engineers in this field, however the software was written in `VBA` (about 5000 lines) and is very old and clunky to use. The image below shows the input screen for this Excel VBA app.

Alongwith being old, there are various in built calculators : For example in the first window (Advection), you could enter the Seepage velocity or the other three parameters and click the `C` button to update the value.

![alt text](https://img.informer.com/screenshots/539/539315_2.jpg)

In the past I have worked on other aspects of Web Development such as Database Systems, Node JS apis, etc. hence i wanted to focus on the skills I learnt from this class which included some new tricks in ES6 and mostly React and front end responsive design. Hence my goal with this application is to have a web version of the above excel application which is responsive, easy to use and has tons of help.

[Click Here for the Web App](https://rfun.github.io/react-biochlor/)

# Feature Highlights of Web App

## Mobile First Development

The first goal of the web application was to have a better looking UI, and more importantly support for mobile devices so that such an analysis could be performed out in the field without the need of a computer. This was achieved by using `React` and `Material-UI`.

A custom component for field input was created which includes validation as well.

## Example Component : Advection

This app will cycle through multiple level of inputs hence my focus was to get a template component ready that I could reuse for other input sections. So I focused on getting one component (or rather one input) ready. This input can either be a single line input (if the switch is off) or if we move the switch over, it will accept three inputs, which if they pass validation will display the calculated value in another field.

The calculators are separated into `utility` modules for ease of code management.

The first component can be easily referred to for other input sections from the excel form.

# Future Goals

-   Add converters for converting different input values
-   Store Date with Firebase, User accounts and authorization to store previously done analysis
-   Complete other inputs
-   Add Graphing and results table
-   Embed [React Joyride](https://github.com/gilbarbara/react-joyride) for teaching people how to use the application
-   Add greek symbols for variables where required

# Time Spent

I had spent about an hour or project one and 2 hours on project two since it covered mostly topics I had experience with. For this project including setting up and deployment I spent about 15 hours. The learning curve for some of the things in react (figuring out how to call methods on a child component, styles in react) was a little long.
